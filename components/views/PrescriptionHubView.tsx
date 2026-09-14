'use client';

import React, { useState } from 'react';
import { usePharmacy } from '@/context/PharmacyContext';
import { formatToman, toPersianDigits } from '@/lib/utils';

export default function PrescriptionHubView() {
  const {
    prescriptions,
    addPrescription,
    setIsPrescriptionModalOpen,
  } = usePharmacy();

  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'APPROVED'>('ALL');

  const filtered = prescriptions.filter((rx) => {
    if (filterStatus === 'PENDING') return rx.status === 'PENDING_REVIEW';
    if (filterStatus === 'APPROVED') return rx.status === 'APPROVED';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A3D36] via-[#10564C] to-[#0E685C] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-[#72F4CE] border border-white/20 inline-block">
            سامانه سپاس و سازمان‌های بیمه‌گر
          </span>
          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            استعلام و ثبت نسخه الکترونیک با پوشش بیمه
          </h1>
          <p className="text-xs sm:text-sm text-[#D1ECE5] leading-relaxed">
            نسخه پزشک خود را با کد ملی یا کد رهگیری بیمه ثبت کنید؛ دکتر داروساز کشیک سهمیه را بررسی، فرانشیز بیمه را کسر کرده و دارو را در محفظه استاندارد آماده ارسال می‌نماید.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsPrescriptionModalOpen(true)}
              className="px-6 py-3 bg-white text-[#0A3D36] hover:bg-[#F0F5F3] rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform cursor-pointer hover:scale-102"
            >
              <span className="material-symbols-outlined text-[20px] text-[#0E7A69]">add_circle</span>
              <span>ثبت نسخه الکترونیک جدید</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Step Prescription Flow explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-[#DDE8E3] space-y-2 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[#E8F5F1] text-[#0A3D36] flex items-center justify-center font-bold">
            ۱
          </div>
          <h3 className="font-bold text-sm text-[#0A3D36]">ثبت کد ملی و کد رهگیری</h3>
          <p className="text-xs text-[#556963] leading-relaxed">
            کد رهگیری پیامک شده از سامانه تامین اجتماعی، بیمه سلامت یا نیروهای مسلح را در فرم ثبت کنید.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#DDE8E3] space-y-2 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[#E8F5F1] text-[#0A3D36] flex items-center justify-center font-bold">
            ۲
          </div>
          <h3 className="font-bold text-sm text-[#0A3D36]">بررسی بالینی داروساز کشیک</h3>
          <p className="text-xs text-[#556963] leading-relaxed">
            مسئول فنی دوز مصرفی، تداخلات دارویی و موجودی بچ‌های انبار را تایید و سهم بیمار را محاسبه می‌کند.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#DDE8E3] space-y-2 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[#E8F5F1] text-[#0A3D36] flex items-center justify-center font-bold">
            ۳
          </div>
          <h3 className="font-bold text-sm text-[#0A3D36]">ارسال با زنجیره سرد دارویی</h3>
          <p className="text-xs text-[#556963] leading-relaxed">
            داروهای یخچالی در دمای ۲ الی ۸ درجه در پک عایق بسته‌بندی شده و با پیک اکسپرس تحویل می‌گردند.
          </p>
        </div>
      </div>

      {/* Submitted Prescriptions List */}
      <div className="bg-white rounded-3xl border border-[#DDE8E3] p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EDF4F0]">
          <div>
            <h2 className="text-lg font-black text-[#0A3D36]">نسخه‌های ثبت‌شده در سامانه درمانیک</h2>
            <p className="text-xs text-[#556963]">پیگیری وضعیت تایید توسط داروخانه و محاسبه فرانشیز</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterStatus === 'ALL'
                  ? 'bg-[#0A3D36] text-white'
                  : 'bg-[#F0F6F3] text-[#475C55] hover:bg-[#E2EEE8]'
              }`}
            >
              همه ({toPersianDigits(prescriptions.length)})
            </button>
            <button
              onClick={() => setFilterStatus('APPROVED')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterStatus === 'APPROVED'
                  ? 'bg-[#0A3D36] text-white'
                  : 'bg-[#F0F6F3] text-[#475C55] hover:bg-[#E2EEE8]'
              }`}
            >
              تایید شده
            </button>
            <button
              onClick={() => setFilterStatus('PENDING')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterStatus === 'PENDING'
                  ? 'bg-[#0A3D36] text-white'
                  : 'bg-[#F0F6F3] text-[#475C55] hover:bg-[#E2EEE8]'
              }`}
            >
              در صف بررسی
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((rx) => (
            <div
              key={rx.id}
              className="p-5 bg-[#F8FAF9] rounded-2xl border border-[#DEE8E3] space-y-4 hover:border-[#BED6CD] transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-2xl text-[#0A3D36]">
                    medical_information
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold text-[#0A3D36]">{rx.trackingNumber}</strong>
                      <span className="text-[11px] bg-white border border-[#D5E1DC] px-2 py-0.5 rounded text-[#556963]">
                        بیمه: {rx.insuranceType}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#6F877F] block mt-0.5">
                      ثبت در: {rx.submittedAt} • کد ملی: {rx.patientNationalId}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {rx.isColdChain && (
                    <span className="bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">ac_unit</span>
                      زنجیره سرد یخچالی
                    </span>
                  )}

                  {rx.status === 'APPROVED' ? (
                    <span className="bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      تایید شده توسط داروساز
                    </span>
                  ) : rx.status === 'REJECTED' ? (
                    <span className="bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] text-xs font-bold px-3 py-1 rounded-lg">
                      عدم تایید بالینی
                    </span>
                  ) : (
                    <span className="bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                      در صف بررسی مسئول فنی
                    </span>
                  )}
                </div>
              </div>

              {/* Items detected & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E3ECE8] space-y-1.5">
                  <strong className="text-[#0A3D36] block">اقلام تجویز شده در نسخه الکترونیک:</strong>
                  <ul className="list-disc list-inside text-[#556963] space-y-1">
                    {rx.itemsDetected?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E3ECE8] space-y-1.5">
                  <strong className="text-[#0A3D36] block">یادداشت مسئول فنی داروخانه:</strong>
                  <p className="text-[#4C645D] leading-relaxed">
                    {rx.pharmacistNotes}
                  </p>
                  {rx.reviewedBy && (
                    <span className="text-[10px] text-[#059669] block font-semibold">
                      تایید کننده: {rx.reviewedBy}
                    </span>
                  )}
                </div>
              </div>

              {/* Price & Insurance Breakdown */}
              {rx.totalOfficialPrice && (
                <div className="p-3.5 bg-white rounded-xl border border-[#CDE3DB] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div>
                      <span className="text-[#6A817A] block">قیمت مصوب کل داروها:</span>
                      <strong className="text-[#0A3D36] font-num">{formatToman(rx.totalOfficialPrice)} تومان</strong>
                    </div>
                    <div>
                      <span className="text-[#059669] block">سهم پرداختی سازمان بیمه:</span>
                      <strong className="text-[#059669] font-num">{formatToman(rx.insuranceDeduction || 0)} تومان-</strong>
                    </div>
                  </div>

                  <div className="text-left">
                    <span className="text-[#6A817A] block">فرانشیز پرداختی بیمار:</span>
                    <strong className="text-sm sm:text-base text-[#0A3D36] font-black font-num">
                      {formatToman(rx.patientShare || 0)} تومان
                    </strong>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
