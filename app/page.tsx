'use client';

import React from 'react';
import { PharmacyProvider, usePharmacy } from '@/context/PharmacyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import ProblemShoppingModal from '@/components/ProblemShoppingModal';
import PrescriptionUploadModal from '@/components/PrescriptionUploadModal';
import PharmacistConsultationModal from '@/components/PharmacistConsultationModal';

// Views
import HomeView from '@/components/views/HomeView';
import ProductListingView from '@/components/views/ProductListingView';
import PrescriptionHubView from '@/components/views/PrescriptionHubView';
import CheckoutView from '@/components/views/CheckoutView';
import OrderTrackingView from '@/components/views/OrderTrackingView';
import AdminPanelView from '@/components/views/AdminPanelView';

function PharmacyAppContent() {
  const { currentView, setIsConsultationModalOpen, setIsPrescriptionModalOpen } = usePharmacy();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#191C1B]">
      {/* Global Navigation Header */}
      <Header />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'HOME' && <HomeView />}
        {currentView === 'PLP' && <ProductListingView />}
        {currentView === 'RX_HUB' && <PrescriptionHubView />}
        {currentView === 'CHECKOUT' && <CheckoutView />}
        {currentView === 'ORDER_TRACKING' && <OrderTrackingView />}
        {(currentView === 'ADMIN' || currentView === 'ADMIN_PANEL') && <AdminPanelView />}
      </main>

      {/* Regulatory Healthcare Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <SearchModal />
      <ProductDetailModal />
      <ProblemShoppingModal />
      <PrescriptionUploadModal />
      <PharmacistConsultationModal />

      {/* Floating Action Button for Emergency Pharmacist Consultation */}
      <div className="fixed bottom-5 left-5 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setIsPrescriptionModalOpen(true)}
          className="bg-white hover:bg-[#F0F6F3] text-[#0A3D36] border border-[#CBDED6] p-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold transition-transform hover:scale-105 cursor-pointer"
          title="ثبت سریع نسخه الکترونیک"
        >
          <span className="material-symbols-outlined text-[#0E7A69] text-xl">prescriptions</span>
          <span className="hidden sm:inline">ثبت نسخه</span>
        </button>

        <button
          onClick={() => setIsConsultationModalOpen(true)}
          className="bg-[#0A3D36] hover:bg-[#12584E] text-white p-3 sm:px-4 sm:py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold transition-transform hover:scale-105 cursor-pointer border border-[#166355]"
          title="مشاوره زنده با دکتر داروساز"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
          <span className="material-symbols-outlined text-xl text-[#72F4CE]">support_agent</span>
          <span className="hidden sm:inline">مشاوره رایگان داروساز</span>
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <PharmacyProvider>
      <PharmacyAppContent />
    </PharmacyProvider>
  );
}
