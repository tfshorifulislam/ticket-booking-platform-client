import PublicBanner from '@/component/PublicComponents/Banner';
import PlatformStats from '@/component/PublicComponents/PlatoormStats';
import PopularRoutes from '@/component/PublicComponents/PopularRoutes';
import TrustedCompanies from '@/component/PublicComponents/TrustedCompanies';
import WhyChooseUs from '@/component/PublicComponents/WhyChooseUs';
import React from 'react';

const PublicHomePage = () => {
  return (
    <div>
      <PublicBanner />
      <TrustedCompanies/>
      <PopularRoutes />
      <WhyChooseUs />
      <PlatformStats />
    </div>
  );
};

export default PublicHomePage;