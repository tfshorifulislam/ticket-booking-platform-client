import PublicBanner from '@/component/PublicComponents/Banner';
import PlatformStats from '@/component/PublicComponents/PlatoormStats';
import WhyChooseUs from '@/component/PublicComponents/WhyChooseUs';
import React from 'react';

const PublicHomePage = () => {
  return (
    <div>
      <PublicBanner/>
      <WhyChooseUs/>
      <PlatformStats/>
    </div>
  );
};

export default PublicHomePage;