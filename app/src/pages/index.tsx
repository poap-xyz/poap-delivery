import React from 'react';

// Lib
import PageWrapper from 'lib/hoc/PageWrapper';

// UI
import MainLayout from 'ui/layouts/MainLayout';
import Hero from 'ui/components/Hero';
import Welcome from 'ui/components/Welcome';
import Events from 'ui/components/Events';
import SiteNoticeModal from 'ui/components/SiteNoticeModal';

const Home = () => {
  return (
    <PageWrapper>
      <MainLayout>
        <Hero />
        <Welcome />
        <Events />
        <SiteNoticeModal />
      </MainLayout>
    </PageWrapper>
  );
};

export default Home;
