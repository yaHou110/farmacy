'use client';

import React, { useState } from 'react';
import { usePharmacy } from '@/context/PharmacyContext';
import { formatToman, toPersianDigits } from '@/lib/utils';

export default function CheckoutView() {
  const {
    cart,
    cartSubtotal,
    cartDiscountTotal,
    cartFinalTotal,
    isCartColdChainRequired,
    checkoutState,
    updateCheckoutState,
    processOrderCheckout,
    setCurrentView,
  } = usePharmacy();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [failureNotice, setFailureNotice] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#F0F5F2] flex items-center justify-center mx-auto text-[#0A3D36]">
          <span className="material-symbols-outlined text-4xl">shopping_cart</span>
        </div>
        <h2 className="text-xl font-bold text-[#0A3D36]">سبد خرید شما در حال حاضر خالی است</h2>
        <p className="text-xs text-[#556963]">
          لطفاً ابتدا مکمل یا داروی مورد نظر خود را از کاتالوگ یا صفحه اصلی انتخاب نمایید.
        </p>
        <button
          onClick={() => setCurrentView('PLP')}
          className="px-6 py-3 bg-[#0A3D36] text-white rounded-xl text-xs font-bold hover:bg-[#12584E]"
        >
          مشاهده کاتالوگ محصولات
        </button>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === 'HEMORA' || couponInput.trim() === 'سلامت') {
      updateCheckoutState({ appliedDiscount: 50000, discountCode: couponInput.trim() });
      setCouponError(null);
    } else {
      setCouponError('کد تخفیف وارد شده معتبر نیست یا منقضی شده است.');
    }
  };

  const handlePayment = (simulateFailure = false) => {
    setIsProcessing(true);
    setFailureNotice(null);

    setTimeout(() => {
      setIsProcessing(false);
      const res = processOrderCheckout(simulateFailure);
      if (!res.success) {
        setFailureNotice(res.error || 'خطای غیرمنتظره در ارتباط با درگاه پرداخت');
      }
    }, 900);
  };

  const shippingCost = cartFinalTotal > 800000 ? 0 : 45000;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Step Wizard Header */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#DDE8E3] shadow-xs">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[
            { step: 1, title: 'مشخصات گیرنده و آدرس' },
            { step: 2, title: 'روش ارسال و زنجیره سرد' },
            { step: 3, title: 'بازبینی نهایی و درگاه شاپرک' },
          ].map((item, idx) => (
            <React.Fragment key={item.step}>
              <div
                onClick={() => setActiveStep(item.step as any)}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                    activeStep >= item.step
                      ? 'bg-[#0A3D36] text-white shadow-xs'
                      : 'bg-[#F0F5F2] text-[#637D74]'
                  }`}
                >
                  {toPersianDigits(item.step)}
                </div>
                <span
                  className={`text-xs sm:text-sm hidden md:inline font-bold ${
                    activeStep >= item.step ? 'text-[#0A3D36]' : 'text-[#728E84]'
                  }`}
                >
                  {item.title}
                </span>
              </div>
              {idx < 2 && <div className="flex-1 h-0.5 bg-[#DEEAE5] mx-3 max-w-[80px]" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Failure Scenario Callout Box (if triggered) */}
      {failureNotice && (
        <div className="p-4 bg-[#FEF2F2] border-2 border-[#F87171] rounded-2xl text-[#991B1B] text-xs sm:text-sm space-y-2 animate-shake">
          <div className="flex items-center gap-2 font-bold text-base">
            <span className="material-symbols-outlined text-2xl text-[#DC2626]">error</span>
            <span>شبیه‌سازی سناریوی خطای پرداخت شاپرک / اتمام موجودی همزمان (Race Condition)</span>
          </div>
          <p className="leading-relaxed">
            {failureNotice}
          </p>
          <div className="p-2.5 bg-white/70 rounded-xl border border-[#FECACA] text-[11px] text-[#7F1D1D]">
            <strong>اقدام خودکار سیستم درمانیک:</strong> کالاها از حالت رزرو موقت آزاد شدند، مبلغی از حساب کسر نگردید و سبد خرید شما کاملاً سالم نگهداری شده است تا مجدداً تلاش فرمایید.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Steps Form */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-[#DDE8E3] shadow-xs space-y-6">
          {/* STEP 1: Address & Recipient */}
          {activeStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-black text-[#0A3D36] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0E7A69]">location_on</span>
                مشخصات تحویل‌گیرنده دارو و آدرس ارسال
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0A3D36] mb-1">
                    نام و نام خانوادگی بیمار / تحویل‌گیرنده:
                  </label>
                  <input
                    type="text"
                    value={checkoutState.fullName}
                    onChange={(e) => updateCheckoutState({ fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-sm outline-hidden focus:border-[#0A3D36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A3D36] mb-1">
                    شماره تلفن همراه (جهت هماهنگی پیک):
                  </label>
                  <input
                    type="tel"
                    value={checkoutState.phoneNumber}
                    onChange={(e) => updateCheckoutState({ phoneNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-sm outline-hidden focus:border-[#0A3D36] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0A3D36] mb-1">استان:</label>
                  <input
                    type="text"
                    value={checkoutState.province}
                    onChange={(e) => updateCheckoutState({ province: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-sm outline-hidden focus:border-[#0A3D36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0A3D36] mb-1">شهر:</label>
                  <input
                    type="text"
                    value={checkoutState.city}
                    onChange={(e) => updateCheckoutState({ city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-sm outline-hidden focus:border-[#0A3D36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0A3D36] mb-1">کد پستی ۱۰ رقمی:</label>
                  <input
                    type="text"
                    value={checkoutState.postalCode}
                    onChange={(e) => updateCheckoutState({ postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-sm outline-hidden focus:border-[#0A3D36] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A3D36] mb-1">نشانی دقیق پستی:</label>
                <textarea
                  rows={2}
                  value={checkoutState.address}
                  onChange={(e) => updateCheckoutState({ address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-sm outline-hidden focus:border-[#0A3D36]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A3D36] mb-1">
                  یادداشت تحویل (طبقه، پلاک، شرایط نگهداری):
                </label>
                <input
                  type="text"
                  value={checkoutState.orderNote}
                  onChange={(e) => updateCheckoutState({ orderNote: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-sm outline-hidden focus:border-[#0A3D36]"
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-3 bg-[#0A3D36] hover:bg-[#12584E] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>مرحله بعد: انتخاب شیوه ارسال دارویی</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Shipping Method & Cold Chain */}
          {activeStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-black text-[#0A3D36] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0E7A69]">local_shipping</span>
                انتخاب روش توزیع دارویی و زنجیره سرد
              </h2>

              {isCartColdChainRequired && (
                <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl text-[#1E40AF] text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2563EB] text-[22px]">ac_unit</span>
                  <div>
                    <strong>توجه ویژه:</strong> سفارش شما حاوی اقلام حساس به دما است. محفظه کول‌پک دارویی به صورت رایگان به بسته شما الصاق می‌گردد.
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {[
                  {
                    id: 'EXPRESS_COLD',
                    title: 'پیک اکسپرس دارویی (تحویل ۳ ساعته در شهر تهران)',
                    desc: 'مناسب اقلام دارویی و نسخه‌ای، حمل در باکس عایق دمایی با نظارت پیک اختصاصی درمانیک',
                    badge: 'توصیه داروساز',
                    fee: 'رایگان برای سفارش‌های بالای ۸۰۰ هزار تومان',
                  },
                  {
                    id: 'STANDARD_COURIER',
                    title: 'ارسال با پیک استاندارد تهران (توزیع در روز کاری بعد)',
                    desc: 'تحویل در بازه زمانی انتخابی صبح یا عصر',
                    fee: 'هزینه مصوب: ۳۵٬۰۰۰ تومان',
                  },
                  {
                    id: 'POST_PISHTAZ',
                    title: 'پست پیشتاز سراسری شرکت ملی پست (سراسر ایران)',
                    desc: 'تحویل ظرف ۲۴ الی ۷۲ ساعت کاری با کد رهگیری پستی',
                    fee: 'هزینه مصوب: ۴۵٬۰۰۰ تومان',
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    onClick={() => updateCheckoutState({ deliveryMethod: item.id as any })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all block ${
                      checkoutState.deliveryMethod === item.id
                        ? 'border-[#0A3D36] bg-[#F2F8F5]'
                        : 'border-[#E3ECE8] hover:border-[#BED6CD]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={checkoutState.deliveryMethod === item.id}
                      onChange={() => updateCheckoutState({ deliveryMethod: item.id as any })}
                      className="mt-1 text-[#0A3D36] focus:ring-[#0A3D36]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-[#0A3D36]">{item.title}</strong>
                        {item.badge && (
                          <span className="bg-[#0A3D36] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#556963] mt-1">{item.desc}</p>
                      <span className="text-[11px] font-bold text-[#0E7A69] block mt-1">
                        {item.fee}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-5 py-2.5 border border-[#CBDCD4] rounded-xl text-xs font-bold text-[#556963] hover:bg-[#F0F5F2]"
                >
                  بازگشت
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-3 bg-[#0A3D36] hover:bg-[#12584E] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
                >
                  <span>مرحله بعد: بازبینی و پرداخت</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Payment Simulation */}
          {activeStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-lg font-black text-[#0A3D36] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0E7A69]">payments</span>
                انتخاب درگاه بانکی شاپرک و تایید سفارش
              </h2>

              {/* Items Summary Table */}
              <div className="border border-[#E3ECE8] rounded-2xl overflow-hidden text-xs">
                <div className="p-3 bg-[#F8FAF9] border-b border-[#E3ECE8] font-bold text-[#0A3D36]">
                  اقلام تحت رزرو در انبار داروخانه ({toPersianDigits(cart.length)} عنوان):
                </div>
                <div className="divide-y divide-[#F0F5F2] p-2">
                  {cart.map((item) => (
                    <div key={item.sku} className="py-2 px-2 flex items-center justify-between">
                      <div>
                        <strong className="block text-[#0A3D36]">{item.product.nameFa}</strong>
                        <span className="text-[11px] text-[#6A817A]">
                          تعداد: {toPersianDigits(item.quantity)} | بچ انبار: {item.batchNumber} (انقضا: {item.expiryDate})
                        </span>
                      </div>
                      <span className="font-bold text-[#0A3D36] font-num">
                        {formatToman((item.salePrice || item.price) * item.quantity)} تومان
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Gateway Selector */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#0A3D36] block">درگاه پرداخت امن شاپرک:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#F8FAF9] border-2 border-[#0A3D36] rounded-xl flex items-center gap-3">
                    <span className="material-symbols-outlined text-2xl text-[#0A3D36]">credit_card</span>
                    <div>
                      <strong className="text-xs font-bold text-[#0A3D36] block">درگاه پرداخت مستقیم به‌پرداخت ملت</strong>
                      <span className="text-[11px] text-[#556963]">شاپرک بانکی با تسویه آنی و رمز دوم پویا</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#F8FAF9] border border-[#DEE8E3] rounded-xl flex items-center gap-3 opacity-60">
                    <span className="material-symbols-outlined text-2xl text-[#6B857E]">account_balance_wallet</span>
                    <div>
                      <strong className="text-xs font-bold text-[#0A3D36] block">کیف پول اعتباری درمانیک</strong>
                      <span className="text-[11px] text-[#556963]">موجودی: ۰ تومان (عدم موجودی کافی)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* High-Value Feature for Hemora Client Pitch: Happy Path vs Failure Simulation */}
              <div className="p-4 bg-[#F8FAF9] rounded-2xl border border-[#D5E5DE] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0A3D36]">science</span>
                  <strong className="text-xs font-bold text-[#0A3D36]">
                    پنل تست معماری نرم‌افزاری هیمورا (ویژه پرزنت مشتری):
                  </strong>
                </div>
                <p className="text-xs text-[#526B63] leading-relaxed">
                  سیستم داروخانه درمانیک مجهز به مکانیزم قفل تراکنش (Distributed Lock) و مدیریت شکست شاپرک است. می‌توانید هر دو مسیر را بررسی کنید:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handlePayment(false)}
                    className="py-3 px-4 bg-[#0A3D36] hover:bg-[#12584E] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#0A3D36]/20 transition-all cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>در حال اتصال به شاپرک...</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span>پرداخت موفق شاپرک (مسیر عادی)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handlePayment(true)}
                    className="py-3 px-4 bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#BE123C] border border-[#FECDD3] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    <span>شبیه‌سازی خطای درگاه شاپرک</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right / Sticky Order Summary */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#DDE8E3] shadow-xs space-y-4 sticky top-28">
          <h3 className="font-bold text-base text-[#0A3D36] pb-3 border-b border-[#EDF4F0]">
            صورت‌حساب نهایی سفارش
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#556963]">
              <span>جمع اقلام سبد:</span>
              <span className="font-num">{formatToman(cartSubtotal)} تومان</span>
            </div>

            {cartDiscountTotal > 0 && (
              <div className="flex justify-between text-[#E11D48] font-semibold">
                <span>تخفیف ویژه دارویی:</span>
                <span className="font-num">{formatToman(cartDiscountTotal)} تومان-</span>
              </div>
            )}

            {checkoutState.appliedDiscount > 0 && (
              <div className="flex justify-between text-[#059669] font-semibold">
                <span>کد تخفیف ({checkoutState.discountCode}):</span>
                <span className="font-num">{formatToman(checkoutState.appliedDiscount)} تومان-</span>
              </div>
            )}

            <div className="flex justify-between text-[#556963]">
              <span>هزینه بسته‌بندی و ارسال:</span>
              <span className="font-num">
                {shippingCost === 0 ? (
                  <strong className="text-[#059669]">رایگان</strong>
                ) : (
                  `${formatToman(shippingCost)} تومان`
                )}
              </span>
            </div>

            <div className="flex justify-between text-sm font-black text-[#0A3D36] pt-3 border-t border-[#EDF4F0]">
              <span>مبلغ قابل پرداخت:</span>
              <span className="text-base font-num">
                {formatToman(cartFinalTotal + shippingCost)} تومان
              </span>
            </div>
          </div>

          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-[#EDF4F0] space-y-1.5">
            <label className="block text-[11px] font-bold text-[#556963]">کد تخفیف یا کارت سلامت:</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="مثلاً HEMORA"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-xs uppercase outline-hidden"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#0A3D36] text-white rounded-xl text-xs font-bold hover:bg-[#12584E]"
              >
                اعمال
              </button>
            </div>
            {couponError && <span className="text-[10px] text-[#DC2626] block">{couponError}</span>}
          </form>

          {/* Trust guarantee */}
          <div className="p-3 bg-[#F0F8F5] rounded-xl border border-[#CCE8DF] text-[11px] text-[#0A3D36] space-y-1">
            <div className="flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[16px] text-[#0E7A69]">verified_user</span>
              <span>تضمین سلامت کالا تا درب منزل</span>
            </div>
            <p className="text-[#4C645D]">
              سفارش با بارکد پستی و لینک زنده رهگیری دما و موقعیت به خریدار پیامک می‌گردد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
