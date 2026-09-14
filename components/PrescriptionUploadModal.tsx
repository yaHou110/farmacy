'use client';

import React, { useState } from 'react';
import { usePharmacy } from '@/context/PharmacyContext';

export default function PrescriptionUploadModal() {
  const {
    isPrescriptionModalOpen,
    setIsPrescriptionModalOpen,
    addPrescription,
    setCurrentView,
  } = usePharmacy();

  const [insuranceType, setInsuranceType] = useState<'تامین اجتماعی' | 'بیمه سلامت' | 'نیروهای مسلح' | 'آزاد'>('تامین اجتماعی');
  const [nationalId, setNationalId] = useState('');
  const [trackingCode, setTrackingCode] = useState('');
  const [phone, setPhone] = useState('');
  const [isColdChain, setIsColdChain] = useState(false);
  const [notes, setNotes] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isPrescriptionModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationalId || !phone) {
      alert('لطفاً کد ملی و شماره تماس بیمار را وارد نمایید.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addPrescription({
        patientNationalId: nationalId,
        insuranceType,
        rxTrackingCode: trackingCode || 'استعلام با کد ملی',
        phoneNumber: phone,
        isColdChain,
        itemsDetected: ['در صف واکشی از سرور سپاس و غذا و دارو...'],
      });

      setIsSubmitting(false);
      setIsPrescriptionModalOpen(false);
      setCurrentView('RX_HUB');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsPrescriptionModalOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#D5E1DC] overflow-hidden z-10 animate-scale-up my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-l from-[#0A3D36] to-[#0E685C] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-2xl text-[#72F4CE]">prescriptions</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">سامانه استعلام و ثبت نسخه الکترونیک</h3>
              <p className="text-xs text-[#D1ECE5]">تحت نظارت دکتر داروساز با استعلام مستقیم بیمه</p>
            </div>
          </div>
          <button
            onClick={() => setIsPrescriptionModalOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Insurance Selector */}
          <div>
            <label className="block text-xs font-bold text-[#0A3D36] mb-1.5">
              سازمان بیمه‌گر طرف قرارداد:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['تامین اجتماعی', 'بیمه سلامت', 'نیروهای مسلح', 'آزاد'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setInsuranceType(type)}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                    insuranceType === type
                      ? 'bg-[#0A3D36] text-white border-[#0A3D36] shadow-2xs'
                      : 'bg-[#F8FAF9] text-[#334641] border-[#D5E1DC] hover:bg-[#EBF3EF]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* National ID */}
            <div>
              <label className="block text-xs font-bold text-[#0A3D36] mb-1">
                کد ملی بیمار (۱۰ رقمی): <span className="text-[#E11D48]">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={10}
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                placeholder="مثلاً: ۰۰۱۲۳۴۵۶۷۸"
                className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-sm outline-hidden focus:border-[#0A3D36] font-mono"
              />
            </div>

            {/* Tracking Code */}
            <div>
              <label className="block text-xs font-bold text-[#0A3D36] mb-1">
                کد رهگیری نسخه الکترونیک:
              </label>
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="کد پیامک‌شده از بیمه (اختیاری)"
                className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-sm outline-hidden focus:border-[#0A3D36] font-mono"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-[#0A3D36] mb-1">
              شماره تلفن همراه جهت اطلاع‌رسانی وضعیت: <span className="text-[#E11D48]">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="مثلاً: ۰۹۱۲۳۴۵۶۷۸۹"
              className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-sm outline-hidden focus:border-[#0A3D36] font-mono"
            />
          </div>

          {/* Image upload dropzone */}
          <div>
            <label className="block text-xs font-bold text-[#0A3D36] mb-1">
              بارگذاری تصویر نسخه دستی یا دستور پزشک (اختیاری):
            </label>
            <div
              onClick={() => setUploadedFileName('نسخه_دکتر_حسینی_۱۴۰۳.jpg')}
              className="p-4 border-2 border-dashed border-[#CBDCD4] hover:border-[#0A3D36] rounded-xl bg-[#F8FAF9] text-center cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-3xl text-[#7E968E] mb-1">cloud_upload</span>
              <p className="text-xs text-[#556963]">
                {uploadedFileName ? (
                  <span className="text-[#059669] font-bold">فایل ضمیمه شد: {uploadedFileName}</span>
                ) : (
                  'کلیک کنید یا تصویر نسخه را اینجا رها کنید (JPG, PNG یا PDF)'
                )}
              </p>
            </div>
          </div>

          {/* Cold chain checkbox */}
          <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl flex items-start gap-2.5">
            <input
              type="checkbox"
              id="coldChain"
              checked={isColdChain}
              onChange={(e) => setIsColdChain(e.target.checked)}
              className="mt-0.5 rounded text-[#1D4ED8] focus:ring-[#1D4ED8] cursor-pointer"
            />
            <label htmlFor="coldChain" className="text-xs text-[#1E3A8A] cursor-pointer leading-relaxed">
              <strong>داروی نیازمند زنجیره سرد (یخچالی):</strong> اگر نسخه شما شامل انسولین، آمپول‌های هورمونی یا واکسن است، تیک بزنید تا ارسال با محفظه کول‌پک یخچالی انجام شود.
            </label>
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setIsPrescriptionModalOpen(false)}
              className="flex-1 py-3 border border-[#D5E1DC] rounded-xl text-xs sm:text-sm font-bold text-[#556963] hover:bg-[#F0F5F3] transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 py-3 bg-[#0A3D36] hover:bg-[#12584E] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#0A3D36]/20 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <span>در حال استعلام سامانه سپاس...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>ثبت و ارسال به داروساز کشیک</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
