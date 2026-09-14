'use client';

import React from 'react';
import { usePharmacy } from '@/context/PharmacyContext';
import { formatToman, toPersianDigits } from '@/lib/utils';
import { OrderStatus } from '@/data/pharmacy-data';

export default function OrderTrackingView() {
  const {
    orders,
    activeTrackingOrderId,
    setActiveTrackingOrderId,
    transitionOrderStatus,
    setCurrentView,
  } = usePharmacy();

  const currentOrder =
    orders.find((o) => o.id === activeTrackingOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <span className="material-symbols-outlined text-5xl text-[#A0B8AF]">local_shipping</span>
        <h2 className="text-xl font-bold text-[#0A3D36]">سفارشی جهت پیگیری یافت نشد</h2>
        <p className="text-xs text-[#556963]">
          هنوز سفارشی در این نشست ثبت نشده است. می‌توانید محصولی را خریداری کنید یا از لیست سفارش‌ها استفاده فرمایید.
        </p>
        <button
          onClick={() => setCurrentView('PLP')}
          className="px-5 py-2.5 bg-[#0A3D36] text-white rounded-xl text-xs font-bold"
        >
          ورود به کاتالوگ داروخانه
        </button>
      </div>
    );
  }

  const steps: { status: OrderStatus; label: string; desc: string; icon: string }[] = [
    { status: 'PAID', label: 'پرداخت موفق شاپرک', desc: 'تراکنش بانکی تایید شد', icon: 'check_circle' },
    { status: 'PHARMACIST_REVIEW', label: 'بررسی مسئول فنی', desc: 'تایید بالینی و تطابق بچ دارویی', icon: 'stethoscope' },
    { status: 'PACKED', label: 'پک و پلمپ دارویی', desc: 'الصاق شناسه TTAC و یخ ژله‌ای', icon: 'inventory_2' },
    { status: 'SHIPPED', label: 'تحویل به ناوگان توزیع', desc: 'در مسیر تحویل با کنترل دما', icon: 'local_shipping' },
    { status: 'DELIVERED', label: 'تحویل موفق به گیرنده', desc: 'سفارش در مقصد تحویل گردید', icon: 'home_pin' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    return steps.findIndex((s) => s.status === status);
  };

  const currentStepIdx = getStepIndex(currentOrder.status);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#DDE8E3] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#E6F4F0] text-[#0A3D36] text-xs font-bold px-2.5 py-0.5 rounded-md border border-[#C6E5DC]">
              رهگیری مرسوله دارویی
            </span>
            <span className="text-xs text-[#556963] font-num">کد سفارش: {currentOrder.orderNumber}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0A3D36]">
            وضعیت لحظه‌ای پردازش و ارسال مرسوله
          </h1>
          <span className="text-xs text-[#556963]">
            تحویل‌گیرنده: <strong>{currentOrder.recipientName}</strong> | تاریخ ثبت: {currentOrder.createdAt}
          </span>
        </div>

        {/* Action: Next Step simulator for the client pitch */}
        <div className="flex flex-wrap items-center gap-2">
          {currentOrder.status !== 'DELIVERED' && (
            <button
              onClick={() => {
                const nextStatuses: OrderStatus[] = [
                  'PAID',
                  'PHARMACIST_REVIEW',
                  'PACKED',
                  'SHIPPED',
                  'DELIVERED',
                ];
                const nextIdx = Math.min(nextStatuses.length - 1, currentStepIdx + 1);
                transitionOrderStatus(currentOrder.id, nextStatuses[nextIdx]);
              }}
              className="px-4 py-2 bg-[#0E7A69] hover:bg-[#0A3D36] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[17px]">fast_forward</span>
              <span>شبیه‌سازی گام بعدی چرخه عمر سفارش</span>
            </button>
          )}

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white border border-[#CBDCD4] text-[#0A3D36] rounded-xl text-xs font-bold hover:bg-[#F0F5F2] flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">print</span>
            <span>چاپ فاکتور رسمی دارویی</span>
          </button>
        </div>
      </div>

      {/* Visual State Machine (FSM) Stepper */}
      <div className="bg-white p-6 rounded-3xl border border-[#DDE8E3] shadow-xs">
        <h3 className="font-bold text-sm text-[#0A3D36] mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0E7A69]">timeline</span>
          چرخه حیات سفارش و نظارت بالینی داروخانه (State Machine):
        </h3>

        <div className="relative">
          {/* Track line */}
          <div className="hidden md:block absolute top-5 right-8 left-8 h-1 bg-[#E1ECE7] z-0" />
          <div
            className="hidden md:block absolute top-5 right-8 h-1 bg-[#0A3D36] z-0 transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(0, (currentStepIdx / (steps.length - 1)) * 88))}%`,
            }}
          />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const isPast = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.status} className="flex md:flex-col items-center md:text-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shrink-0 ${
                      isCurrent
                        ? 'bg-[#0A3D36] text-white shadow-lg ring-4 ring-[#A2D9C8]'
                        : isPast
                        ? 'bg-[#0E7A69] text-white'
                        : 'bg-[#F0F5F2] text-[#869E96] border border-[#DEE9E4]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{step.icon}</span>
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold leading-tight ${
                        isPast ? 'text-[#0A3D36]' : 'text-[#869E96]'
                      }`}
                    >
                      {step.label}
                    </h4>
                    <p className="text-[11px] text-[#556963] mt-0.5 max-w-[140px] leading-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Telemetry & Cold Chain Card */}
        <div className="lg:col-span-4 space-y-5">
          {/* Live Cold-Chain Sensor Card */}
          {currentOrder.isColdChain && (
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-3xl p-5 text-[#1E3A8A] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#2563EB] text-[20px]">ac_unit</span>
                  پایش پیوسته زنجیره سرد (سنسور IoT)
                </span>
                <span className="bg-[#DBEAFE] text-[#1E40AF] text-[10px] font-bold px-2 py-0.5 rounded">
                  کنترل فعال
                </span>
              </div>

              <div className="p-3 bg-white/80 rounded-2xl border border-[#BFDBFE] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#4B6B94] block">دمای ثبت‌شده محفظه در آخرین نقطه:</span>
                  <strong className="text-2xl font-black text-[#1E40AF] font-mono">۴.۳°C</strong>
                </div>
                <div className="text-left text-[11px] text-[#059669] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  محدوده مجاز (۲ تا ۸ درجه)
                </div>
              </div>

              <p className="text-[11px] text-[#2563EB] leading-relaxed">
                این محفظه به دیتالاگر الکترونیکی با ثبت رکورد کالیبره‌شده مجهز است و هنگام تحویل تست سلامت حرارتی انجام می‌شود.
              </p>
            </div>
          )}

          {/* Delivery Details Card */}
          <div className="bg-white rounded-3xl border border-[#DDE8E3] p-5 space-y-3 shadow-2xs">
            <h4 className="font-bold text-sm text-[#0A3D36] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#0E7A69] text-[19px]">pin_drop</span>
              مشخصات تحویل گیرنده
            </h4>

            <div className="space-y-2 text-xs text-[#556963]">
              <div>
                <span className="block text-[#859E95]">نام تحویل‌گیرنده:</span>
                <strong className="text-[#0A3D36]">{currentOrder.recipientName}</strong>
              </div>
              <div>
                <span className="block text-[#859E95]">شماره تماس هماهنگی:</span>
                <strong className="text-[#0A3D36] font-mono">{currentOrder.phoneNumber}</strong>
              </div>
              <div>
                <span className="block text-[#859E95]">نشانی پستی ثبت شده:</span>
                <strong className="text-[#0A3D36] leading-relaxed block">{currentOrder.address}</strong>
              </div>
              <div>
                <span className="block text-[#859E95]">کد رهگیری پستی / بارکد اختصاصی:</span>
                <strong className="text-[#0A3D36] font-mono text-xs bg-[#F0F5F2] px-2 py-0.5 rounded border border-[#DDE8E3] inline-block mt-0.5">
                  {currentOrder.trackingCode}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Items & Audit Trail */}
        <div className="lg:col-span-8 space-y-5">
          {/* Items card */}
          <div className="bg-white rounded-3xl border border-[#DDE8E3] p-6 shadow-xs space-y-4">
            <h4 className="font-bold text-sm text-[#0A3D36] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0E7A69]">medication</span>
              اقلام ارسال شده در این سفارش:
            </h4>

            <div className="divide-y divide-[#F0F5F2]">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <strong className="text-xs sm:text-sm font-bold text-[#0A3D36] block">
                      {item.productName}
                    </strong>
                    <div className="flex items-center gap-2 text-[11px] text-[#6A817A] mt-0.5">
                      <span>تعداد: {toPersianDigits(item.quantity)}</span>
                      <span>•</span>
                      <span className="font-mono">بچ: {item.batchNumber}</span>
                      <span>•</span>
                      <span>انقضا: {item.expiryDate}</span>
                    </div>
                  </div>

                  <span className="font-bold text-xs sm:text-sm text-[#0A3D36] font-num shrink-0">
                    {formatToman(item.unitPrice * item.quantity)} تومان
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EDF4F1] flex justify-between items-center text-sm">
              <span className="text-[#556963]">مبلغ کل پرداخت شده با احتساب تخفیف و مالیات:</span>
              <strong className="text-base text-[#0A3D36] font-num">
                {formatToman(currentOrder.finalTotal)} تومان
              </strong>
            </div>
          </div>

          {/* Audit History for this order */}
          <div className="bg-white rounded-3xl border border-[#DDE8E3] p-6 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-[#0A3D36] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0E7A69]">history</span>
              گزارش ثبت رویدادهای بازرسی دارویی (Audit Trail):
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#F8FAF9] rounded-xl border border-[#E3ECE8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#059669] text-[18px]">verified</span>
                  <span>تایید شناسه TTAC و خروج از انبار کنترل‌شده</span>
                </div>
                <span className="text-[#728E84] font-num">ثبت در پایگاه مرکزی داروخانه</span>
              </div>

              <div className="p-2.5 bg-[#F8FAF9] rounded-xl border border-[#E3ECE8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#059669] text-[18px]">lock</span>
                  <span>تراکنش شاپرک ثبت و رسید دیجیتال صادر شد</span>
                </div>
                <span className="text-[#728E84] font-num">بانک مرکزی جمهوری اسلامی</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
