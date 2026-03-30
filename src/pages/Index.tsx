import React from 'react';
import { LanguageProvider } from '../i18n/LanguageContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Services from '../components/Services';
import SalesFunnel1 from '../components/SalesFunnel1';
import SalesFunnel2 from '../components/SalesFunnel2';
import SalesFunnel3 from '../components/SalesFunnel3';
import SalesFunnel4 from '../components/SalesFunnel4';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Stats />
        <About />
        <Services />
        <SalesFunnel1 />
        <SalesFunnel3 />
        <Testimonials />
        <SalesFunnel2 />
        <SalesFunnel4 />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
