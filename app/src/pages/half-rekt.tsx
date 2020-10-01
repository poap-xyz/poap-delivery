import React from 'react';

// Lib
import PageWrapper from 'lib/hoc/PageWrapper';

// Constants
import events from 'lib/constants/events';

// UI
import MainLayout from 'ui/layouts/MainLayout';
import Container from 'ui/components/Container';
import ClaimHeader from 'ui/components/ClaimHeader';
import Claim from 'ui/components/claim';

const HalfRekt = () => {
  return (
    <PageWrapper
      title={'POAP ✈️ | 🤦‍ #halfrekt'}
      description={'You yoloed hard and somehow you only got #HalfRekt.'}
    >
      <MainLayout>
        <Container>
          <ClaimHeader event={events['halfRekt']} />
          <Claim event={events['halfRekt']} />
        </Container>
      </MainLayout>
    </PageWrapper>
  );
};

export default HalfRekt;
