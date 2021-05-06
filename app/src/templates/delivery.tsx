import React from 'react';

// Lib
import PageWrapper from 'lib/hoc/PageWrapper';

// Constants
// import events from 'lib/constants/events';

// UI
import MainLayout from 'ui/layouts/MainLayout';
import Container from 'ui/components/Container';
// import ClaimHeader from 'ui/components/ClaimHeader';
// import Claim from 'ui/components/claim';

const Delivery = ({ pathContext }) => {
  const { delivery } = pathContext;

  return (
    <PageWrapper
      title={`POAP ✈️ | ${delivery.metadata_title}`}
      description={delivery.metadata_description}
    >
      <MainLayout>
        <Container>
          <h1>New automagically generated delivery</h1>
          <pre>delivery</pre>
        </Container>
      </MainLayout>
    </PageWrapper>
  );
};

export default Delivery;
