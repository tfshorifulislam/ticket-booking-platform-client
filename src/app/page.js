import PublicBanner from '@/component/PublicComponents/Banner';
import PlatformStats from '@/component/PublicComponents/PlatoormStats';
import PopularRoutes from '@/component/PublicComponents/PopularRoutes';
import WhyChooseUs from '@/component/PublicComponents/WhyChooseUs';
import React from 'react';

const PublicHomePage = () => {
  return (
    <div>
      <PublicBanner />
      <PopularRoutes />
      <WhyChooseUs />
      <PlatformStats />
    </div>
  );
};

export default PublicHomePage;