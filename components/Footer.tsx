'use client';

import React from 'react';
import { usePharmacy } from '@/context/PharmacyContext';

export default function Footer() {
  const { setCurrentView, setIsPrescriptionModalOpen, setIsConsultationModalOpen } = usePharmacy();

  return (
    <footer className="bg-[#052621] text-[#D1ECE5] border-t border-[#124B42] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Top 4 Trust Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#124B42]">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#0E7A69] flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined text-2xl">local_pharmacy</span>
              </div>
              <div>
                <span className="text-xl font-black text-white block tracking-tight">داروخانه درمانیک</span>
                <span className="text-[11px] text-[#72F4CE] block">پلتفرم سلامت گروه نرم‌افزاری هیمورا</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#A4CFBE]">
              داروخانه آنلاین و شبانه‌روزی درمانیک، ارائه‌دهنده مکمل‌های رژیمی، ورزشی، آرایشی و بهداشتی اصل با نظارت مستقیم داروساز و تضمین زنجیره سرد دارویی کشور.
            </p>

            <div className="text-xs space-y-1 text-[#86BEAA]">
              <div>پروانه تاسیس داروخانه: <strong>۴۸۷۱۲/د</strong></div>
              <div>مسئول فنی: <strong>دکتر سید مهدی حسینی (نظام پزشکی د-۱۲۸۴۰)</strong></div>
            </div>
          </div>

          {/* Col 2: Fast Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">خدمات دارویی و بیمه</h4>
            <ul className="space-y-2 text-xs text-[#A4CFBE]">
              <li>
                <button
                  onClick={() => setIsPrescriptionModalOpen(true)}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[15px] text-[#72F4CE]">check</span>
                  استعلام نسخه الکترونیک تامین اجتماعی و سلامت
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[15px] text-[#72F4CE]">check</span>
                  مشاوره رایگان تلفنی با داروساز کشیک
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('ORDER_TRACKING')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[15px] text-[#72F4CE]">check</span>
                  رهگیری زنده مرسوله و دمای زنجیره سرد
                </button>
              </li>
              <li>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#72F4CE]">check</span>
                  ارسال اکسپرس ۳ ساعته در بسته‌های عایق کول‌پک
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Emergency */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">ارتباط و پشتیبانی شبانه‌روزی</h4>
            <div className="space-y-2.5 text-xs text-[#A4CFBE]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-[#72F4CE]">call</span>
                <span className="font-mono text-white text-sm font-bold" dir="ltr">
                  ۰۲۱-۹۱۰۰۸۸۴۴ (خط ویژه ۱۰ رقمی)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-[#72F4CE]">location_on</span>
                <span>تهران، خیابان ولیعصر، نرسیده به میدان ونک، مجتمع دارویی درمانیک</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-[#72F4CE]">schedule</span>
                <span>پاسخگویی داروسازان: ۲۴ ساعته در تمام ۳۶۵ روز سال</span>
              </div>
            </div>
          </div>

          {/* Col 4: Electronic Badges & Trust Seals */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">مجوزها و تاییدیه‌های رسمی</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-[#72F4CE] mb-1">verified</span>
                <span className="text-[10px] font-bold text-white">سازمان غذا و دارو</span>
                <span className="text-[9px] text-[#86BEAA]">شناسه TTAC</span>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-[#72F4CE] mb-1">shield</span>
                <span className="text-[10px] font-bold text-white">اینماد ۵ ستاره</span>
                <span className="text-[9px] text-[#86BEAA]">مرکز توسعه تجارت</span>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-[#72F4CE] mb-1">domain</span>
                <span className="text-[10px] font-bold text-white">نظام پزشکی ایران</span>
                <span className="text-[9px] text-[#86BEAA]">کد د-۱۲۸۴۰</span>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-[#72F4CE] mb-1">inventory</span>
                <span className="text-[10px] font-bold text-white">استاندارد GSP</span>
                <span className="text-[9px] text-[#86BEAA]">انبارش دارویی</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Medical Disclaimer */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-xs text-[#8BB9A7] leading-relaxed">
          <strong className="text-white block mb-1">سلب مسئولیت پزشکی و حقوقی طبق قوانین سلامت:</strong>
          اطلاعات مندرج در وب‌سایت صرفاً جنبه راهنمای بهداشتی داشته و نباید جایگزین توصیه، تشخیص یا درمان پزشک متخصص قلمداد شود. عرضه داروهای تخصصی نیازمند نسخه (Rx) منحصراً پس از تایید نسخه الکترونیک در سامانه رسمی و نظارت حضوری داروساز امکان‌پذیر است.
        </div>

        {/* Copyright & Hemora Software Group Mention */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F9C8B] pt-4">
          <p>© تمامی حقوق برای داروخانه آنلاین درمانیک محفوظ است.</p>
          <div className="flex items-center gap-1.5 text-white font-medium">
            <span>توسعه‌یافته با بالاترین استانداردهای سلامت توسط</span>
            <strong className="text-[#72F4CE]">گروه نرم‌افزاری هیمورا (Hemora)</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
