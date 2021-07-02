import React, { FC, useCallback, useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { PseudoBox, Flex, Grid } from '@chakra-ui/core';

// Constants
import events from 'lib/constants/events';

// UI
import EventCard from 'ui/components/EventCard';

// Assets
import question from 'assets/images/events/question.png';

// Types
import { GraphDelivery } from 'lib/types';
import Input from 'ui/styled/Input';

const Events: FC = () => {
  const apiDeliveries = useStaticQuery(graphql`
    query {
      deliveries {
        list {
          card_text
          card_title
          event_ids
          id
          image
          page_title
          page_text
          page_title_image
          slug
        }
      }
    }
  `);
  let apiEvents: GraphDelivery[] = apiDeliveries?.deliveries?.list || [];

  const [search, setSearch] = useState({});
  const debounceFunction = (func, delay) => {
    let timer;
    return function () {
      let self = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(self, args);
      }, delay);
    };
  };
  const debounceHandleSearch = useCallback(
    debounceFunction((nextValue, items) => handleNewSearchValue(nextValue, items), 800),
    [],
  );
  const handleSearch = (event) => {
    const value = event.target.value;
    debounceHandleSearch(value, events);
  };
  const handleNewSearchValue = (value, items) => {
    if (value && value.length > 1) {
      var matchingKeys = Object.keys(items).filter(
        (k) => k.toLowerCase().indexOf(value.toLowerCase()) !== -1,
      );
      const filteredItems = {};
      matchingKeys.map((k) => (filteredItems[k] = items[k]));
      setSearch(filteredItems);
    } else {
      setSearch([]);
    }
  };

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <PseudoBox w={'100%'} pb={'100px'} mt={'50px'}>
      <PseudoBox w={['100%', ' 100%', '100%', '100%', '100%', '85%']} maxW={1600} m={'0 auto'}>
        <div className="gallery-search" style={{ position: 'relative', width: '200px' }}>
          <Input onChange={handleSearch} type="text" placeholder="Search.." />{' '}
          {Object.keys(search).length ? (
            <span
              style={{
                position: 'absolute',
                top: '80%',
                right: '0',
                color: '#66666688',
                fontSize: '.8rem',
              }}
            >
              {Object.keys(search).length} result(s)
            </span>
          ) : null}
        </div>
        <Grid
          templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr 1fr']}
          padding={['0', '0', '0 50px', '0 150px', '0']}
        >
          {apiEvents.map((delivery) => {
            return (
              <Flex flex={1} justifyContent={'center'} key={delivery.id} mt={'50px'}>
                <EventCard
                  title={delivery.card_title}
                  body={delivery.card_text}
                  image={delivery.image}
                  buttonText={'Claim your POAP'}
                  buttonEnabled
                  buttonLink={delivery.slug}
                />
              </Flex>
            );
          })}
          {Object.keys(Object.keys(search).length ? search : events)
            .reverse()
            .map((key) => {
              const _event = events[key];
              return (
                <Flex flex={1} justifyContent={'center'} key={_event.key} mt={'50px'}>
                  <EventCard
                    title={_event.cardTitle}
                    body={_event.cardText}
                    image={_event.image}
                    // buttonText={_event.active ? 'Claim your POAP' : 'Migration in process'}
                    buttonText={'Claim your POAP'}
                    buttonEnabled
                    buttonLink={_event.link}
                  />
                </Flex>
              );
            })}
          <Flex flex={1} justifyContent={'center'} mt={'50px'}>
            <EventCard
              title={'Have a suggestion?'}
              body={`<p>We love celebrating the community and these fantastic events. If you know about any other similar event, please let us know!</p>`}
              image={question}
              buttonText={'Contact us!'}
              buttonEnabled={true}
              buttonLink={'mailto:info@poap.xyz'}
              internalLink={false}
            />
          </Flex>
        </Grid>
      </PseudoBox>
    </PseudoBox>
  );
};

export default Events;
