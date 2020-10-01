import React, { FC } from 'react';
import { Box, PseudoBox, Flex, Grid } from '@chakra-ui/core';

// Constants
import events from 'lib/constants/events';

// UI
import EventCard from 'ui/components/EventCard';

// Assets
import question from 'assets/images/events/question.png';

const Events: FC = () => {
  return (
    <PseudoBox w={'100%'} pb={'100px'} mt={'50px'}>
      <PseudoBox w={['100%', ' 100%', '100%', '100%', '100%', '85%']} maxW={1600} m={'0 auto'}>
        <Grid
          templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr 1fr']}
          padding={['0', '0', '0 50px', '0 150px', '0']}
        >
          {Object.keys(events)
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
