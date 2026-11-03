import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Preloader } from './components/Preloader';
import { Navbar, NavPageId } from './components/Navbar';
import { Hero } from './components/Hero';
import { Cake3DStudio } from './components/Cake3DStudio';
import { Gallery } from './components/Gallery';
import { MenuPricing } from './components/MenuPricing';
import { Specialities } from './components/Specialities';
import { AboutUs } from './components/AboutUs';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';
import { OrderModal } from './components/OrderModal';
import { FeaturedCreationSection } from './components/FeaturedCreationSection';
import { AdminDashboard } from './components/AdminDashboard';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CustomOrder } from './types/bakery';

function BakeryApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<NavPageId>('home');
  const [adminOpen, setAdminOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Selected cake specs transferred to floating order form modal
  const [modalInitialValues, setModalInitialValues] = useState<{
    cakeType?: string;
    weightSize?: string;
    flavor?: string;
    budget?: string;
    threeDConfig?: {
      tiers: number;
      icingColor: string;
      topper: string;
    };
  }>({});

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavPageId;
      const validPages: NavPageId[] = ['home', '3d-studio', 'gallery', 'menu', 'specialities', 'about'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageId: NavPageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenOrderModalWithItem = (specs?: {
    cakeType?: string;
    weightSize?: string;
    flavor?: string;
    budget?: string;
    threeDConfig?: {
      tiers: number;
      icingColor: string;
      topper: string;
    };
  }) => {
    if (specs) {
      setModalInitialValues(specs);
    }
    // Never redirects, opens floating form directly
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#140703] text-[#fbf6ee] font-sans selection:bg-[#d4af37] selection:text-[#140703] relative flex flex-col justify-between">
      {/* Official Preloader with Emblem Logo */}
      {isLoading && <Preloader onLoaded={() => setIsLoading(false)} />}

      <div className={`flex-1 flex flex-col transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navigation Bar (No WhatsApp button as requested, distinct page routing) */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenOrderModal={() => handleOpenOrderModalWithItem()}
          onOpenAdmin={() => setAdminOpen(true)}
        />

        {/* Dedicated Page Views with Individual Hero Headers */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <>
              <Hero
                onOpenOrderModal={() => handleOpenOrderModalWithItem()}
                onNavigatePage={(p) => handleNavigate(p)}
              />
              <FeaturedCreationSection
                onOpenOrderModal={(specs) => handleOpenOrderModalWithItem(specs)}
              />
            </>
          )}

          {currentPage === '3d-studio' && (
            <Cake3DStudio
              onSelectForOrder={(cfg) => {
                setModalInitialValues({
                  cakeType: `${cfg.tiers} Tier 3D Custom Cake`,
                  weightSize: cfg.tiers === 1 ? '1 KG (₹500)' : cfg.tiers === 2 ? '2 KG (₹1000)' : '3 KG (₹1500)',
                  flavor: cfg.flavor,
                  budget: cfg.tiers === 1 ? '₹500' : cfg.tiers === 2 ? '₹1000' : '₹1500',
                  threeDConfig: {
                    tiers: cfg.tiers,
                    icingColor: cfg.colorName,
                    topper: cfg.topper
                  }
                });
              }}
              onOpenOrderModal={() => setIsOrderModalOpen(true)}
            />
          )}

          {currentPage === 'gallery' && (
            <Gallery
              onSelectForOrder={(title) => {
                setModalInitialValues({
                  cakeType: title,
                  weightSize: '1 KG (₹500)',
                  budget: '₹500'
                });
              }}
              onOpenOrderModal={() => setIsOrderModalOpen(true)}
            />
          )}

          {currentPage === 'menu' && (
            <MenuPricing
              onSelectProductForOrder={(item) => {
                setModalInitialValues({
                  cakeType: item.cakeType,
                  weightSize: item.size,
                  budget: `₹${item.estimatedPrice}`
                });
              }}
              onOpenOrderModal={() => setIsOrderModalOpen(true)}
            />
          )}

          {currentPage === 'specialities' && (
            <Specialities
              onSelectOccasion={(occ) => {
                setModalInitialValues({
                  cakeType: `${occ} Special Cake`,
                  weightSize: '1 KG (₹500)',
                  budget: '₹500'
                });
              }}
              onOpenOrderModal={() => setIsOrderModalOpen(true)}
            />
          )}

          {currentPage === 'about' && (
            <AboutUs
              onOpenOrderModal={() => handleOpenOrderModalWithItem()}
            />
          )}
        </main>

        {/* Footer */}
        <Footer onOpenAdmin={() => setAdminOpen(true)} />

        {/* Round Arrow Scroll-To-Top Button with Heart-Touching Message */}
        <ScrollToTop />

        {/* Floating WhatsApp Contact Button (Desktop / Tablet) */}
        <FloatingWhatsApp />

        {/* Smartphone Quick Sticky Bottom Menu */}
        <MobileBottomNav
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenOrderModal={() => handleOpenOrderModalWithItem()}
        />

        {/* Dedicated Floating "Flooring" Order Form Modal (Does NOT redirect, overlays on current page) */}
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          initialValues={modalInitialValues}
        />

        {/* Bakery Owner Admin Control Portal */}
        <AdminDashboard
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BakeryApp />
    </ThemeProvider>
  );
}

