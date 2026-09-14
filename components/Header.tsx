'use client';

import React from 'react';
import { usePharmacy } from '@/context/PharmacyContext';
import { toPersianDigits } from '@/lib/utils';

export default function Header() {
  const {
    currentView,
    setCurrentView,
    cartTotalCount,
    setIsCartDrawerOpen,
    setIsSearchOpen,
    setIsPrescriptionModalOpen,
    setActiveFilterCategory,
  } = usePharmacy();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E1E9E4] bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top Bar: Credentials & Regulatory Trust Badges */}
      <div className="bg-[#0A3D36] text-[#E8F5F1] text-xs py-1.5 px-4 border-b border-[#12534A]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Right Side (RTL): Trust badges in clean order */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-[11px] sm:text-xs">
            {/* 1. داروخانه شبانه‌روزی با نظارت مستقیم دکتر داروساز */}
            <span className="flex items-center gap-1.5 font-medium text-[#C8E8DF] whitespace-nowrap">
              <span className="material-symbols-outlined text-[15px] text-[#5CE6BA]">verified_user</span>
              داروخانه شبانه‌روزی با نظارت مستقیم دکتر داروساز
            </span>

            <span className="hidden sm:inline text-[#5A8E83]">|</span>

            {/* 2. تضمین ارسال زنجیره سرد (Cold-Chain) داروهای یخچالی */}
            <span className="hidden sm:flex items-center gap-1 text-[#C4E3DB] whitespace-nowrap">
              <span className="material-symbols-outlined text-[14px] text-[#72F4CE]">ac_unit</span>
              تضمین ارسال زنجیره سرد (Cold-Chain) داروهای یخچالی
            </span>

            <span className="hidden lg:inline text-[#5A8E83]">|</span>

            {/* 3. استعلام اصالت شناسه رهگیری TTAC سازمان غذا و دارو */}
            <span className="hidden lg:flex items-center gap-1 text-[#C4E3DB] whitespace-nowrap">
              <span className="material-symbols-outlined text-[15px] text-[#72F4CE]">verified</span>
              استعلام اصالت شناسه رهگیری TTAC سازمان غذا و دارو
            </span>
          </div>

          {/* Left Side (RTL): Standalone Himora Software Group Distinctive Badge */}
          <div className="flex items-center shrink-0">
            <div
              id="himora-dev-badge"
              className="group relative flex items-center gap-2 bg-gradient-to-r from-[#0d4f43] via-[#09473b] to-[#06332a] hover:from-[#116354] hover:to-[#09473b] px-3 py-1 rounded-full border border-[#72F4CE]/35 shadow-xs hover:border-[#72F4CE]/70 transition-all cursor-pointer"
            >
              {/* Green pulsing radar indicator belonging to Himora */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981] shadow-xs shadow-[#10B981]/80"></span>
              </span>

              <span className="text-[11px] text-[#D8EFE8] flex items-center gap-1 whitespace-nowrap">
                <span>طراحی و توسعه:</span>
                <span className="font-extrabold text-white tracking-wide bg-gradient-to-l from-white to-[#A8F8DE] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#72F4CE]">
                  گروه نرم‌افزاری هیمورا
                </span>
              </span>

              <span className="text-[#3D7A6E]">|</span>

              <a
                href="tel:09354467269"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[11px] font-bold text-[#72F4CE] hover:text-white transition-colors whitespace-nowrap"
                dir="ltr"
                title="تماس مستقیم با توسعه‌دهنده (هیمورا)"
              >
                <span className="material-symbols-outlined text-[13px]">phone_iphone</span>
                <span className="font-mono font-semibold">۰۹۳۵ ۴۴۶ ۷۲۶۹</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div
          onClick={() => setCurrentView('HOME')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A3D36] to-[#12584E] flex items-center justify-center text-white shadow-md shadow-[#0A3D36]/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl text-[#6AE9C3]">local_pharmacy</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#0A3D36] tracking-tight">درمانیک</span>
              <span className="text-[10px] font-bold bg-[#E8F5F1] text-[#0A3D36] border border-[#BDE3D9] px-2 py-0.5 rounded-md">
                DARMANIK
              </span>
            </div>
            <span className="text-[11px] text-[#556963] font-medium">
              داروخانه تخصصی و سلامت آنلاین
            </span>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="flex-1 max-w-xl hidden md:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            type="button"
            className="w-full flex items-center justify-between px-4 py-2.5 bg-[#F2F6F4] hover:bg-[#E8F0EC] border border-[#DEE8E3] rounded-xl text-right transition-colors group"
          >
            <div className="flex items-center gap-2.5 text-[#697E77]">
              <span className="material-symbols-outlined text-[20px] text-[#0A3D36] group-hover:scale-110 transition-transform">
                search
              </span>
              <span className="text-xs sm:text-sm font-normal">
                جستجوی نام مکمل، دارو، برند (مثلاً پرفکتیل، وی کارن، بیورر)...
              </span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-mono text-[#556963] bg-white border border-[#D5E1DC] rounded shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Rx Prescription Button */}
          <button
            onClick={() => setIsPrescriptionModalOpen(true)}
            type="button"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-[#0E685C] to-[#0A3D36] hover:from-[#117C6E] hover:to-[#0D4B42] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-[#0A3D36]/20 transition-all hover:shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#71F2CB]">description</span>
            <span className="hidden sm:inline">استعلام و ثبت نسخه</span>
            <span className="sm:hidden">ثبت نسخه</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            type="button"
            className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F0F6F3] hover:bg-[#E2EEE8] border border-[#DEE8E3] text-[#0A3D36] transition-colors cursor-pointer"
            title="سبد خرید داروخانه"
          >
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#E11D48] text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white animate-bounce-short">
                {toPersianDigits(cartTotalCount)}
              </span>
            )}
          </button>

          {/* Admin Switcher (Special for Hemora Client Presentation) */}
          <button
            onClick={() => setCurrentView('ADMIN_PANEL')}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              currentView === 'ADMIN_PANEL'
                ? 'bg-[#0A3D36] text-white border-[#0A3D36] shadow-sm'
                : 'bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
            }`}
            title="ورود به پنل مدیریت انبار و مسئول فنی داروساز"
          >
            <span className="material-symbols-outlined text-[17px]">inventory_2</span>
            <span className="hidden lg:inline">پنل انبار و مدیریت</span>
          </button>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <div className="border-t border-[#EDF3F0] bg-white px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto py-2 scrollbar-none text-xs sm:text-sm font-medium text-[#465B54]">
          <div className="flex items-center gap-6 shrink-0">
            <button
              onClick={() => {
                setActiveFilterCategory(null);
                setCurrentView('HOME');
              }}
              className={`pb-1 transition-colors ${
                currentView === 'HOME'
                  ? 'text-[#0A3D36] font-bold border-b-2 border-[#0A3D36]'
                  : 'hover:text-[#0A3D36]'
              }`}
            >
              صفحه اصلی
            </button>

            <button
              onClick={() => {
                setActiveFilterCategory(null);
                setCurrentView('PLP');
              }}
              className={`pb-1 transition-colors flex items-center gap-1 ${
                currentView === 'PLP'
                  ? 'text-[#0A3D36] font-bold border-b-2 border-[#0A3D36]'
                  : 'hover:text-[#0A3D36]'
              }`}
            >
              کاتالوگ و فیلتر پیشرفته
              <span className="bg-[#E6F4F0] text-[#0A3D36] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                تخصصی
              </span>
            </button>

            <button
              onClick={() => {
                setActiveFilterCategory('vitamins');
                setCurrentView('PLP');
              }}
              className="hover:text-[#0A3D36] transition-colors"
            >
              مکمل و ویتامین‌ها
            </button>

            <button
              onClick={() => {
                setActiveFilterCategory('skin-hair');
                setCurrentView('PLP');
              }}
              className="hover:text-[#0A3D36] transition-colors"
            >
              مراقبت پوست و مو
            </button>

            <button
              onClick={() => {
                setActiveFilterCategory('sports');
                setCurrentView('PLP');
              }}
              className="hover:text-[#0A3D36] transition-colors"
            >
              مکمل ورزشی و تغذیه
            </button>

            <button
              onClick={() => {
                setActiveFilterCategory('equipment');
                setCurrentView('PLP');
              }}
              className="hover:text-[#0A3D36] transition-colors"
            >
              تجهیزات پزشکی خانگی
            </button>

            <button
              onClick={() => setCurrentView('RX_HUB')}
              className={`pb-1 transition-colors flex items-center gap-1 ${
                currentView === 'RX_HUB'
                  ? 'text-[#0A3D36] font-bold border-b-2 border-[#0A3D36]'
                  : 'hover:text-[#0A3D36]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-[#0E7A69]">health_and_safety</span>
              خدمات نسخه و بیمه
            </button>

            <button
              onClick={() => setCurrentView('ORDER_TRACKING')}
              className={`pb-1 transition-colors flex items-center gap-1 ${
                currentView === 'ORDER_TRACKING'
                  ? 'text-[#0A3D36] font-bold border-b-2 border-[#0A3D36]'
                  : 'hover:text-[#0A3D36]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-[#0E7A69]">local_shipping</span>
              رهگیری سفارشات
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-[#0E685C] font-semibold">
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              مشاوره بالینی داروساز
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
