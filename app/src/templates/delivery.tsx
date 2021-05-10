import React, { useState, useEffect } from 'react';

// Lib
import PageWrapper from 'lib/hoc/PageWrapper';
import { endpoints } from 'lib/api';

// Hooks
import { useDeliveryAddresses } from 'lib/hooks/useDeliveryAddresses';

// Types
import { AirdropEventData, AddressData, ClaimData } from 'lib/types';

// UI
import MainLayout from 'ui/layouts/MainLayout';
import Container from 'ui/components/Container';
import ClaimHeader from 'ui/components/ClaimHeader';
import ClaimV2 from 'ui/components/claim/ClaimV2';

const Delivery = ({ pathContext }) => {
  const { delivery } = pathContext;
  const [event, setEvent] = useState<AirdropEventData | null>(null);

  const { data: addresses, refetch } = useDeliveryAddresses({ id: delivery.id });

  const reloadAction = () => {
    refetch();
  };

  useEffect(() => {
    if (addresses) {
      let _addresses: AddressData = {
        [addresses[0].address.toLowerCase()]: addresses[0].event_ids
          .split(',')
          .map((e) => parseInt(e, 10)),
      };
      let claims: ClaimData = {
        [addresses[0].address.toLowerCase()]: addresses[0].claimed,
      };

      for (let each of addresses) {
        _addresses[each.address] = each.event_ids.split(',').map((e) => parseInt(e, 10));
        claims[each.address] = each.claimed;
      }
      let _event: AirdropEventData = {
        key: delivery.slug,
        image: delivery.image,
        cardTitle: delivery.card_title,
        cardText: delivery.card_text,
        pageTitle: delivery.page_title,
        pageTitleImage: delivery.page_title_image,
        pageText: delivery.page_text,
        contractAddress: '',
        addresses: _addresses,
        claims,
        eventIds: delivery.event_ids.split(',').map((e) => parseInt(e, 10)),
        githubLink: endpoints.poap.deliveryAddresses(delivery.id),
        active: true,
        link: delivery.slug,
      };

      setEvent(_event);
    }
  }, [
    setEvent,
    addresses,
    delivery.slug,
    delivery.image,
    delivery.card_title,
    delivery.card_text,
    delivery.page_title,
    delivery.page_title_image,
    delivery.page_text,
    delivery.event_ids,
    delivery.id,
  ]);

  return (
    <PageWrapper
      title={`POAP ✈️ | ${delivery.metadata_title}`}
      description={delivery.metadata_description}
    >
      <MainLayout>
        <Container>
          {event && (
            <>
              <ClaimHeader event={event} />
              <ClaimV2 event={event} deliveryId={delivery.id} reloadAction={reloadAction} />
            </>
          )}
        </Container>
      </MainLayout>
    </PageWrapper>
  );
};

export default Delivery;
