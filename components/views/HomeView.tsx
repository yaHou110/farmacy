'use client';

import React, { useState, useEffect } from 'react';
import { usePharmacy } from '@/context/PharmacyContext';
import {
  HEALTH_CONCERNS,
  CERTIFIED_BRANDS,
  CLINICAL_ARTICLES,
  Product,
} from '@/data/pharmacy-data';
import { formatToman, toPersianDigits } from '@/lib/utils';

export default function HomeView() {
  const {
    products,
    setSelectedProduct,
    setSelectedConcern,
    addToCart,
    setCurrentView,
    setIsPrescriptionModalOpen,
    setIsSearchOpen,
    setActiveFilterCategory,
  } = usePharmacy();

  // Real-time flash deal countdown (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'آیا امکان خرید داروهای نیازمند نسخه (Rx) به صورت اینترنتی وجود دارد؟',
      a: 'خیر؛ بر اساس ضوابط رسمی معاونت غذا و داروی وزارت بهداشت، فروش اینترنتی داروهای تخصصی نسخه‌ای ممنوع است. در پلتفرم درمانیک شما می‌توانید اطلاعات و کد رهگیری نسخه الکترونیک خود را ثبت نمایید تا مسئول فنی داروساز بررسی و سهمیه شما را استعلام کند و پس از تایید هویت و نسخه، دارو به صورت حضوری یا با پیک امن تحویل گردد. اقلام OTC (مکمل‌ها، ویتامین‌ها، آرایشی و تجهیزات) به صورت آنلاین و فوری قابل خرید و پرداخت هستند.',
    },
    {
      q: 'داروهای نیازمند نگهداری در یخچال (زنجیره سرد ۲ تا ۸ درجه) چگونه ارسال می‌شوند؟',
      a: 'تمامی اقلام نیازمند زنجیره سرد (نظیر انسولین‌ها و برخی مکمل‌های پروبیوتیک خاص) در محفظه‌های عایق دوجداره به همراه ژل‌های یخ کنترل‌شده (Cold Pack) بسته‌بندی شده و با ناوگان اکسپرس ویژه تحویل ۳ ساعته در شهر تهران توزیع می‌گردند.',
    },
    {
      q: 'چگونه می‌توان اصالت کالاهای خریداری‌شده را از سازمان غذا و دارو استعلام کرد؟',
      a: 'تمامی محصولات دارای برچسب رسمی اصالت و رهگیری TTAC و کد شناسه IRC هستند. شما می‌توانید شناسه ۱۶ رقمی مندرج بر روی بسته‌بندی را در سامانه پیامکی ۲۰۰۰۸۸۲۲ یا درگاه رسمی ttac.ir استعلام فرمایید.',
    },
    {
      q: 'سیاست مرجوعی کالا در داروخانه آنلاین درمانیک به چه صورت است؟',
      a: 'مطابق آیین‌نامه ایمنی دارویی، مرجوع کردن داروها و مکمل‌های تغذیه‌ای پس از تحویل و خروج از انبار داروخانه به دلایل بهداشتی ممنوع است؛ مگر در مواردی که مغایرت با بچ‌نامبر فاکتور یا نقص در پلمپ فیزیکی کارخانه ظرف ۴۸ ساعت به پشتیبانی گزارش گردد.',
    },
  ];

  const heroProduct = products[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Clinical Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EBF5F1] via-[#F4F9F6] to-[#F8FAF7] pt-8 pb-12 border-b border-[#DFECE6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Right Column: Clinical Title & Messaging */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#BEDCD3] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                <span className="text-xs font-bold text-[#0A3D36]">
                  پلتفرم داروخانه دیجیتال تحت نظارت دکتر داروساز (هیمورا)
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A3D36] leading-[1.25] tracking-tight">
                مرکز تخصصی تامین دارو، مکمل‌های دارویی و مراقبت سلامت
              </h1>

              <p className="text-sm sm:text-base text-[#465E56] leading-relaxed max-w-2xl">
                تجربه خرید علمی، اصیل و بدون واسطه با تضمین زنجیره سرد دارویی، استعلام برخط شناسه‌های TTAC، و امکان ثبت نسخه الکترونیک تحت پوشش سازمان‌های بیمه‌گر.
              </p>

              {/* Fast Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setIsPrescriptionModalOpen(true)}
                  className="px-6 py-3.5 bg-[#0A3D36] hover:bg-[#12584E] text-white rounded-xl text-sm font-bold flex items-center gap-2.5 shadow-md shadow-[#0A3D36]/25 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl text-[#72F4CE]">prescriptions</span>
                  <span>استعلام و ثبت نسخه الکترونیک</span>
                </button>

                <button
                  onClick={() => {
                    setActiveFilterCategory(null);
                    setCurrentView('PLP');
                  }}
                  className="px-5 py-3.5 bg-white hover:bg-[#F0F5F2] text-[#0A3D36] border border-[#CBDED6] rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-xl text-[#0E7A69]">format_list_bulleted</span>
                  <span>کاتالوگ دارویی و مکمل‌ها</span>
                </button>
              </div>

              {/* Trust Indicators Pill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#D7E8E0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#CDE3DB] flex items-center justify-center text-[#0A3D36] shadow-2xs shrink-0">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#0A3D36] block">۱۰۰٪ تضمین اصالت</strong>
                    <span className="text-[11px] text-[#556963]">شناسه رهگیری TTAC</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#CDE3DB] flex items-center justify-center text-[#0A3D36] shadow-2xs shrink-0">
                    <span className="material-symbols-outlined text-[20px]">ac_unit</span>
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#0A3D36] block">زنجیره سرد دارو</strong>
                    <span className="text-[11px] text-[#556963]">تحویل ۲ تا ۸ درجه</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#CDE3DB] flex items-center justify-center text-[#0A3D36] shadow-2xs shrink-0">
                    <span className="material-symbols-outlined text-[20px]">support_agent</span>
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#0A3D36] block">مشاوره داروساز</strong>
                    <span className="text-[11px] text-[#556963]">پاسخگویی بالینی رایگان</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column: Featured Spotlight Card with Live Flash Timer */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-[#D5E6DF] relative group">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></span>
                    پیشنهاد طلایی با نظارت بالینی
                  </span>

                  {/* Countdown Timer */}
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#0A3D36]" dir="ltr">
                    <span className="bg-[#F0F6F3] px-2 py-1 rounded border border-[#D7E7E1]">
                      {toPersianDigits(String(timeLeft.hours).padStart(2, '0'))}
                    </span>
                    :
                    <span className="bg-[#F0F6F3] px-2 py-1 rounded border border-[#D7E7E1]">
                      {toPersianDigits(String(timeLeft.minutes).padStart(2, '0'))}
                    </span>
                    :
                    <span className="bg-[#F0F6F3] px-2 py-1 rounded border border-[#D7E7E1] text-[#E11D48]">
                      {toPersianDigits(String(timeLeft.seconds).padStart(2, '0'))}
                    </span>
                  </div>
                </div>

                {/* Hero Image */}
                <div
                  onClick={() => setSelectedProduct(heroProduct)}
                  className="bg-[#F8FAF9] rounded-2xl p-4 flex items-center justify-center border border-[#E3ECE8] cursor-pointer hover:border-[#BED6CD] transition-colors"
                >
                  <img
                    src={heroProduct.image}
                    alt={heroProduct.nameFa}
                    className="h-56 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#0E7A69]">{heroProduct.brand}</span>
                    <span className="text-[#6C857E] font-mono text-[11px]">
                      انقضا: {heroProduct.variants[0].batches[0].expiryDate}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedProduct(heroProduct)}
                    className="font-bold text-base text-[#0A3D36] hover:text-[#12584E] transition-colors cursor-pointer line-clamp-1"
                  >
                    {heroProduct.nameFa}
                  </h3>

                  <p className="text-xs text-[#526B63] line-clamp-2">
                    {heroProduct.shortDesc}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#EDF4F0]">
                    <div>
                      <span className="text-[11px] text-[#94A3B8] line-through block font-num">
                        {formatToman(heroProduct.price)} تومان
                      </span>
                      <span className="text-lg font-black text-[#0A3D36] font-num">
                        {formatToman(heroProduct.salePrice || heroProduct.price)}{' '}
                        <span className="text-xs font-normal text-[#5A736C]">تومان</span>
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(heroProduct)}
                      className="px-4 py-2.5 bg-[#0A3D36] hover:bg-[#12584E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-[#0A3D36]/20 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      <span>افزودن به سبد</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Based Navigation Section: "خرید بر اساس دغدغه و نیاز سلامت" */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0E7A69] mb-1">
              <span className="material-symbols-outlined text-[18px]">neurology</span>
              <span>رویکرد بالینی درمانیک</span>
            </div>
            <h2 className="text-2xl font-black text-[#0A3D36]">خرید بر اساس دغدغه و مشکل سلامت</h2>
            <p className="text-xs sm:text-sm text-[#556963] mt-1">
              پروتکل‌های ۳ مرحله‌ای توصیه شده توسط داروسازان جهت بهبود ریشه‌ای و پایدار
            </p>
          </div>
          <span className="text-xs text-[#0A3D36] font-bold bg-[#E8F4F0] px-3 py-1.5 rounded-lg border border-[#CDE5DC] shrink-0 self-start sm:self-auto">
            انتخاب مشکل جهت مشاهده پروتکل درمانی
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HEALTH_CONCERNS.map((concern) => (
            <div
              key={concern.id}
              onClick={() => setSelectedConcern(concern)}
              className="bg-white rounded-2xl p-5 border border-[#DEE8E3] hover:border-[#0A3D36] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F6F3] group-hover:bg-[#0A3D36] flex items-center justify-center text-[#0A3D36] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">
                      {concern.iconName}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold bg-[#E8F4F0] text-[#0A3D36] px-2.5 py-0.5 rounded-md border border-[#CBE5DC]">
                    {concern.badge}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#0A3D36] group-hover:text-[#12584E] transition-colors">
                  {concern.title}
                </h3>
                <p className="text-xs text-[#4F6860] mt-1.5 leading-relaxed">
                  {concern.subtitle}
                </p>

                {/* Key ingredients pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {concern.keyIngredients.slice(0, 3).map((ing, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-[#F8FAF9] border border-[#E3ECE8] text-[#556963] px-2 py-0.5 rounded"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EDF4F1] flex items-center justify-between text-xs font-bold text-[#0A3D36]">
                <span className="flex items-center gap-1 group-hover:underline">
                  <span>مشاهده پروتکل داروساز</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                </span>
                <span className="text-[11px] text-[#718B83] font-normal font-num">
                  {toPersianDigits(concern.productsCount)} محصول تخصصی
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Category Shelf */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#0A3D36] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 space-y-3">
              <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-[#72F4CE] border border-white/20 inline-block">
                دسته‌بندی‌های دارویی
              </span>
              <h2 className="text-2xl sm:text-3xl font-black leading-snug">
                دسترسی سریع به گروه‌های تخصصی داروخانه
              </h2>
              <p className="text-xs sm:text-sm text-[#C9E7DE] leading-relaxed">
                تمام اقلام مستقیماً از انبار مرکزی داروخانه با نگهداری در شرایط دمایی و رطوبتی استاندارد (GSP) ارسال می‌شوند.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: 'ویتامین و مینرال', icon: 'pill', slug: 'vitamins', count: '۹۴ کالا' },
                { title: 'مراقبت پوست و مو', icon: 'sanitizer', slug: 'skin-hair', count: '۱۲۰ کالا' },
                { title: 'تغذیه ورزشی', icon: 'fitness_center', slug: 'sports', count: '۴۸ کالا' },
                { title: 'تجهیزات پزشکی', icon: 'monitor_heart', slug: 'equipment', count: '۳۵ کالا' },
              ].map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveFilterCategory(cat.slug);
                    setCurrentView('PLP');
                  }}
                  className="p-4 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-right transition-all flex flex-col justify-between h-32 cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-3xl text-[#72F4CE] group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <div>
                    <strong className="text-xs sm:text-sm font-bold block">{cat.title}</strong>
                    <span className="text-[10px] text-[#A5D9CB] font-num">{cat.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clinical Products Shelf */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-[#0E7A69] block mb-1">
              دارونامه و مکمل‌های دارای بیشترین رضایت بالینی
            </span>
            <h2 className="text-2xl font-black text-[#0A3D36]">محصولات پرفروش و منتخب مسئول فنی</h2>
          </div>

          <button
            onClick={() => {
              setActiveFilterCategory(null);
              setCurrentView('PLP');
            }}
            className="text-xs sm:text-sm font-bold text-[#0A3D36] hover:text-[#12584E] flex items-center gap-1 cursor-pointer"
          >
            <span>مشاهده همه محصولات</span>
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0, 4).map((product) => {
            const currentPrice = product.salePrice || product.price;
            const currentBatch = product.variants[0]?.batches[0];

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#DEE8E3] p-4 flex flex-col justify-between hover:border-[#0A3D36] hover:shadow-lg transition-all group relative"
              >
                {/* Cold Chain Badge */}
                {product.isColdChain && (
                  <span className="absolute top-3 left-3 bg-[#EFF6FF] text-[#1D4ED8] text-[10px] font-bold px-2 py-0.5 rounded border border-[#BFDBFE] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px]">ac_unit</span>
                    یخچالی
                  </span>
                )}

                {/* Discount Badge */}
                {product.discountPercent && (
                  <span className="absolute top-3 right-3 bg-[#E11D48] text-white text-[11px] font-black px-2 py-0.5 rounded-md">
                    {toPersianDigits(product.discountPercent)}٪ تخفیف
                  </span>
                )}

                {/* Thumbnail */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="bg-[#F8FAF9] rounded-xl p-3 flex items-center justify-center border border-[#E9F1ED] cursor-pointer mt-2"
                >
                  <img
                    src={product.image}
                    alt={product.nameFa}
                    className="h-44 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="mt-3 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#556963]">
                      <span className="font-semibold text-[#0E7A69]">{product.brand}</span>
                      <span className="flex items-center gap-0.5 text-[#F59E0B] font-bold">
                        <span className="material-symbols-outlined text-[15px]">star</span>
                        {toPersianDigits(product.rating)}
                      </span>
                    </div>

                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-bold text-xs sm:text-sm text-[#0A3D36] hover:text-[#12584E] transition-colors cursor-pointer mt-1 line-clamp-2 leading-snug"
                    >
                      {product.nameFa}
                    </h3>
                  </div>

                  {/* Batch info */}
                  {currentBatch && (
                    <div className="text-[10px] text-[#718B83] bg-[#F8FAF9] p-1.5 rounded-lg border border-[#E6EFEA] flex justify-between">
                      <span>انقضا: {currentBatch.expiryDate}</span>
                      <span>بچ: {currentBatch.batchNumber}</span>
                    </div>
                  )}

                  {/* Price & Cart */}
                  <div className="pt-2 border-t border-[#EDF4F1] flex items-center justify-between">
                    <div>
                      {product.salePrice && (
                        <span className="text-[10px] text-[#94A3B8] line-through block font-num">
                          {formatToman(product.price)}
                        </span>
                      )}
                      <span className="text-sm font-black text-[#0A3D36] font-num">
                        {formatToman(currentPrice)}{' '}
                        <span className="text-[10px] font-normal text-[#5A736C]">تومان</span>
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-9 h-9 rounded-xl bg-[#0A3D36] hover:bg-[#12584E] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                      title="افزودن به سبد خرید"
                    >
                      <span className="material-symbols-outlined text-[19px]">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Certified Brands Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-6 bg-white rounded-3xl border border-[#DDE8E3] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl font-black text-[#0A3D36]">برندهای دارویی و بهداشتی مورد تایید</h2>
              <p className="text-xs text-[#556963] mt-0.5">
                تامین مستقیم از شرکت‌های پخش رسمی دارویی و واردکنندگان قانونی با شناسه رهگیری
              </p>
            </div>
            <span className="text-xs text-[#059669] font-bold flex items-center gap-1 bg-[#E8F8F2] px-3 py-1 rounded-lg border border-[#BEE7D7]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              ۱۰۰٪ گارانتی اصالت کالا
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CERTIFIED_BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="p-3 bg-[#F8FAF9] rounded-xl border border-[#E3ECE8] text-center hover:border-[#0A3D36] transition-colors group cursor-pointer"
              >
                <span className="text-xs font-black text-[#0A3D36] block font-mono group-hover:text-[#0E7A69]">
                  {brand.nameEn}
                </span>
                <span className="text-[11px] text-[#556963] block mt-0.5">{brand.nameFa}</span>
                <span className="text-[9px] text-[#718B83] bg-white px-1.5 py-0.5 rounded border border-[#DEE8E3] inline-block mt-1">
                  {brand.origin}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Blog & Pharmacist Articles */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-[#0E7A69] block mb-1">
              دانشنامه سلامت و فارماکوتراپی
            </span>
            <h2 className="text-2xl font-black text-[#0A3D36]">مقالات تحلیلی به قلم داروسازان</h2>
          </div>
          <span className="text-xs text-[#556963]">به‌روزرسانی روزانه با مقالات معتبر PubMed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLINICAL_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-[#DEE8E3] overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#6A817A] mb-2">
                    <span className="font-bold text-[#0E7A69] bg-[#E8F5F1] px-2.5 py-0.5 rounded-md">
                      {article.category}
                    </span>
                    <span>زمان مطالعه: {article.readingTime}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#0A3D36] leading-snug hover:text-[#12584E] cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#556963] line-clamp-3 mt-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EDF4F1] flex items-center justify-between text-xs text-[#526861]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#0A3D36] text-white text-[10px] font-bold flex items-center justify-center">
                      {article.authorAvatar}
                    </div>
                    <div>
                      <strong className="block text-[#0A3D36] text-xs">{article.author}</strong>
                      <span className="text-[10px] text-[#718B83]">{article.authorTitle}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#0A3D36] text-[18px]">arrow_back</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pharmacy FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-[#0E7A69] block mb-1">
            شفافیت در قوانین سلامت و پاسخگویی
          </span>
          <h2 className="text-2xl font-black text-[#0A3D36]">پرسش‌های متداول بیماران و مراجعین</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#DEE8E3] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full p-4.5 text-right flex items-center justify-between gap-3 font-bold text-sm text-[#0A3D36] hover:bg-[#F8FAF9] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[#0A3D36] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="p-4.5 pt-0 text-xs sm:text-sm text-[#4C645D] leading-relaxed border-t border-[#EDF4F0] bg-[#FAFCFB]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
