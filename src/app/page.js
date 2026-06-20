import AdvertiseTickets from '@/component/AdminComponents/AdvertiseTickets';
import PublicBanner from '@/component/PublicComponents/Banner';
import ContactUs from '@/component/PublicComponents/ContactUs';
import PlatformStats from '@/component/PublicComponents/PlatoormStats';
import PopularRoutes from '@/component/PublicComponents/PopularRoutes';
import Reviews from '@/component/PublicComponents/Review';
import TrustedCompanies from '@/component/PublicComponents/TrustedCompanies';
import WhyChooseUs from '@/component/PublicComponents/WhyChooseUs';
import React from 'react';

const PublicHomePage = () => {
  return (
    <div>
      <PublicBanner />
      <TrustedCompanies />
      <AdvertiseTickets/>
      <PopularRoutes />
      <WhyChooseUs />
      <PlatformStats />
      <Reviews />
      <ContactUs />
    </div>
  );
};

export default PublicHomePage;