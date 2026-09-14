'use client';

import React, { useState, useMemo } from 'react';
import { usePharmacy } from '@/context/PharmacyContext';
import { formatToman, toPersianDigits } from '@/lib/utils';
import { Product } from '@/data/pharmacy-data';

export default function ProductListingView() {
  const {
    products,
    setSelectedProduct,
    addToCart,
    activeFilterCategory,
    setActiveFilterCategory,
  } = usePharmacy();

  // Filters State
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [onlyColdChain, setOnlyColdChain] = useState<boolean>(false);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [selectedPrescriptionType, setSelectedPrescriptionType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'POPULAR' | 'CHEAPEST' | 'EXPENSIVE' | 'DISCOUNT'>('POPULAR');
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST'>('GRID');

  // Categories list
  const categories = [
    { name: 'همه محصولات', slug: null },
    { name: 'ویتامین‌ها و مینرال‌ها', slug: 'vitamins' },
    { name: 'مراقبت پوست و مو', slug: 'skin-hair' },
    { name: 'مکمل ورزشی و بدنسازی', slug: 'sports' },
    { name: 'تجهیزات پزشکی خانگی', slug: 'equipment' },
  ];

  // Unique Brands
  const availableBrands = Array.from(new Set(products.map((p) => p.brand)));

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeFilterCategory) {
      list = list.filter((p) => p.categorySlug === activeFilterCategory);
    }
    if (selectedBrand) {
      list = list.filter((p) => p.brand === selectedBrand);
    }
    if (onlyColdChain) {
      list = list.filter((p) => p.isColdChain);
    }
    if (onlyInStock) {
      list = list.filter((p) => p.stockStatus === 'IN_STOCK');
    }
    if (selectedPrescriptionType) {
      list = list.filter((p) => p.prescriptionType === selectedPrescriptionType);
    }

    // Sort
    if (sortBy === 'CHEAPEST') {
      list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortBy === 'EXPENSIVE') {
      list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sortBy === 'DISCOUNT') {
      list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [
    products,
    activeFilterCategory,
    selectedBrand,
    onlyColdChain,
    onlyInStock,
    selectedPrescriptionType,
    sortBy,
  ]);

  const activeFiltersCount =
    (activeFilterCategory ? 1 : 0) +
    (selectedBrand ? 1 : 0) +
    (onlyColdChain ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (selectedPrescriptionType ? 1 : 0);

  const clearAllFilters = () => {
    setActiveFilterCategory(null);
    setSelectedBrand(null);
    setOnlyColdChain(false);
    setOnlyInStock(false);
    setSelectedPrescriptionType(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#5A736C]">
        <span>صفحه اصلی</span>
        <span>/</span>
        <span>داروخانه آنلاین</span>
        <span>/</span>
        <span className="text-[#0A3D36] font-bold">
          {categories.find((c) => c.slug === activeFilterCategory)?.name || 'کاتالوگ جامع'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar: Faceted Navigation */}
        <div className="lg:col-span-3 space-y-5 bg-white p-5 rounded-2xl border border-[#DDE8E3] shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7EFEA]">
            <h3 className="font-bold text-sm text-[#0A3D36] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[19px] text-[#0E7A69]">tune</span>
              فیلترهای تخصصی
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#E11D48] hover:underline font-bold"
              >
                حذف فیلترها ({toPersianDigits(activeFiltersCount)})
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0A3D36] block">گروه‌های درمانی:</span>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveFilterCategory(cat.slug)}
                  className={`w-full text-right px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    activeFilterCategory === cat.slug
                      ? 'bg-[#0A3D36] text-white'
                      : 'hover:bg-[#F0F6F3] text-[#475C55]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {activeFilterCategory === cat.slug && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2 pt-3 border-t border-[#EDF4F0]">
            <span className="text-xs font-bold text-[#0A3D36] block">برندهای معتبر داروسازی:</span>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {availableBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center justify-between text-xs text-[#475C55] hover:text-[#0A3D36] cursor-pointer py-1"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="brandFilter"
                      checked={selectedBrand === brand}
                      onChange={() =>
                        setSelectedBrand(selectedBrand === brand ? null : brand)
                      }
                      className="text-[#0A3D36] focus:ring-[#0A3D36]"
                    />
                    <span>{brand}</span>
                  </span>
                </label>
              ))}
              {selectedBrand && (
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-[11px] text-[#0E7A69] hover:underline block pt-1 font-semibold"
                >
                  حذف انتخاب برند
                </button>
              )}
            </div>
          </div>

          {/* Toggles: Cold Chain & In Stock */}
          <div className="space-y-3 pt-3 border-t border-[#EDF4F0] text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-1.5 font-bold text-[#0A3D36]">
                <span className="material-symbols-outlined text-[#2563EB] text-[18px]">ac_unit</span>
                فقط زنجیره سرد (داروی یخچالی)
              </span>
              <input
                type="checkbox"
                checked={onlyColdChain}
                onChange={(e) => setOnlyColdChain(e.target.checked)}
                className="w-4 h-4 rounded text-[#0A3D36] focus:ring-[#0A3D36]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-1.5 font-bold text-[#0A3D36]">
                <span className="material-symbols-outlined text-[#059669] text-[18px]">inventory</span>
                فقط کالاهای موجود در انبار
              </span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-[#0A3D36] focus:ring-[#0A3D36]"
              />
            </label>
          </div>

          {/* Prescription Status */}
          <div className="space-y-2 pt-3 border-t border-[#EDF4F0]">
            <span className="text-xs font-bold text-[#0A3D36] block">طبقه‌بندی نسخه:</span>
            <div className="space-y-1 text-xs">
              {[
                { label: 'همه اقلام', value: null },
                { label: 'مکمل دارویی و تغذیه‌ای', value: 'SUPPLEMENT' },
                { label: 'بدون نسخه (OTC)', value: 'OTC' },
                { label: 'تجهیزات و ملزومات پزشکی', value: 'MEDICAL_DEVICE' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSelectedPrescriptionType(item.value)}
                  className={`w-full text-right px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedPrescriptionType === item.value
                      ? 'bg-[#E5F3EE] text-[#0A3D36] font-bold'
                      : 'text-[#556963] hover:bg-[#F8FAF9]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content: Products Grid */}
        <div className="lg:col-span-9 space-y-5">
          {/* Top Control Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#DDE8E3] flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#556963]">مرتب‌سازی بر اساس:</span>
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                {[
                  { label: 'بیشترین رضایت بالینی', value: 'POPULAR' },
                  { label: 'ارزان‌ترین', value: 'CHEAPEST' },
                  { label: 'گران‌ترین', value: 'EXPENSIVE' },
                  { label: 'بیشترین تخفیف', value: 'DISCOUNT' },
                ].map((sort) => (
                  <button
                    key={sort.value}
                    onClick={() => setSortBy(sort.value as any)}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                      sortBy === sort.value
                        ? 'bg-[#0A3D36] text-white font-bold'
                        : 'bg-[#F0F6F3] text-[#475C55] hover:bg-[#E2EEE8]'
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#556963]">
              <span className="font-num">
                نمایش <strong>{toPersianDigits(filteredProducts.length)}</strong> کالا
              </span>
              <div className="flex items-center border border-[#DEE8E3] rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('GRID')}
                  className={`p-1.5 ${
                    viewMode === 'GRID' ? 'bg-[#0A3D36] text-white' : 'text-[#556963] hover:bg-[#F0F6F3]'
                  }`}
                  title="نمایش شبکه‌ای"
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </button>
                <button
                  onClick={() => setViewMode('LIST')}
                  className={`p-1.5 ${
                    viewMode === 'LIST' ? 'bg-[#0A3D36] text-white' : 'text-[#556963] hover:bg-[#F0F6F3]'
                  }`}
                  title="نمایش ردیفی"
                >
                  <span className="material-symbols-outlined text-[18px]">view_list</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#556963]">فیلترهای فعال:</span>
              {activeFilterCategory && (
                <span className="bg-[#E6F4F0] text-[#0A3D36] border border-[#C6E5DC] px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <span>گروه: {categories.find((c) => c.slug === activeFilterCategory)?.name}</span>
                  <button onClick={() => setActiveFilterCategory(null)}>
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}
              {selectedBrand && (
                <span className="bg-[#E6F4F0] text-[#0A3D36] border border-[#C6E5DC] px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <span>برند: {selectedBrand}</span>
                  <button onClick={() => setSelectedBrand(null)}>
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}
              {onlyColdChain && (
                <span className="bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <span>زنجیره سرد</span>
                  <button onClick={() => setOnlyColdChain(false)}>
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}
              {onlyInStock && (
                <span className="bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <span>کالاهای موجود</span>
                  <button onClick={() => setOnlyInStock(false)}>
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Items */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#DEE8E3] text-[#6A817A] space-y-3">
              <span className="material-symbols-outlined text-5xl text-[#A6BFB7]">sentiment_dissatisfied</span>
              <h3 className="font-bold text-base text-[#0A3D36]">کالایی با فیلترهای انتخابی یافت نشد</h3>
              <p className="text-xs max-w-sm mx-auto">
                می‌توانید فیلترها را حذف کنید یا عبارت مورد نظر خود را در نوار جستجو تایپ فرمایید.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-[#0A3D36] text-white rounded-xl text-xs font-bold hover:bg-[#12584E]"
              >
                پاکسازی همه فیلترها
              </button>
            </div>
          ) : viewMode === 'GRID' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => {
                const currentPrice = product.salePrice || product.price;
                const currentBatch = product.variants[0]?.batches[0];

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#DEE8E3] p-4 flex flex-col justify-between hover:border-[#0A3D36] hover:shadow-lg transition-all group relative"
                  >
                    {product.isColdChain && (
                      <span className="absolute top-3 left-3 bg-[#EFF6FF] text-[#1D4ED8] text-[10px] font-bold px-2 py-0.5 rounded border border-[#BFDBFE] flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">ac_unit</span>
                        یخچالی
                      </span>
                    )}

                    {product.discountPercent && (
                      <span className="absolute top-3 right-3 bg-[#E11D48] text-white text-[11px] font-black px-2 py-0.5 rounded-md">
                        {toPersianDigits(product.discountPercent)}٪
                      </span>
                    )}

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

                      {currentBatch && (
                        <div className="text-[10px] text-[#718B83] bg-[#F8FAF9] p-1.5 rounded-lg border border-[#E6EFEA] flex justify-between">
                          <span>انقضا: {currentBatch.expiryDate}</span>
                          <span>بچ: {currentBatch.batchNumber}</span>
                        </div>
                      )}

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
                          title="افزودن به سبد"
                        >
                          <span className="material-symbols-outlined text-[19px]">add_shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // List View
            <div className="space-y-3">
              {filteredProducts.map((product) => {
                const currentPrice = product.salePrice || product.price;
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#DEE8E3] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-[#0A3D36] transition-all"
                  >
                    <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                      <img
                        src={product.image}
                        alt={product.nameFa}
                        className="w-20 h-20 object-contain bg-[#F8FAF9] rounded-xl p-1 border border-[#E8F0EC] shrink-0 cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-[#0E7A69]">
                          {product.brand} • {product.category}
                        </span>
                        <h3
                          onClick={() => setSelectedProduct(product)}
                          className="font-bold text-sm text-[#0A3D36] hover:text-[#12584E] cursor-pointer mt-0.5 line-clamp-1"
                        >
                          {product.nameFa}
                        </h3>
                        <p className="text-xs text-[#526B63] line-clamp-1 mt-1">
                          {product.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EDF4F1]">
                      <div className="text-left">
                        {product.salePrice && (
                          <span className="text-xs text-[#94A3B8] line-through block font-num">
                            {formatToman(product.price)}
                          </span>
                        )}
                        <span className="text-base font-black text-[#0A3D36] font-num">
                          {formatToman(currentPrice)}{' '}
                          <span className="text-xs font-normal text-[#5A736C]">تومان</span>
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2.5 bg-[#0A3D36] hover:bg-[#12584E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                        <span>افزودن</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Category Rich-Text SEO Box (Google E-Commerce SEO Mandate) */}
          <div className="mt-8 p-6 bg-white rounded-2xl border border-[#DDE8E3] text-xs text-[#4C645D] leading-relaxed space-y-3 shadow-2xs">
            <h3 className="font-bold text-sm text-[#0A3D36] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0E7A69] text-[18px]">verified</span>
              راهنمای خرید تخصصی از داروخانه آنلاین درمانیک (گروه نرم‌افزاری هیمورا)
            </h3>
            <p>
              تمامی اقلام موجود در این بخش تحت نظارت مستقیم مسئول فنی داروساز از مبادی قانونی و شرکت‌های پخش مجاز دارویی کشور تامین شده‌اند. انبار مرکزی داروخانه درمانیک مجهز به سیستم‌های پایش مداوم دما و رطوبت (Data Logger) بوده و مکمل‌های حساس به حرارت با زنجیره سرد استاندارد ارسال می‌شوند.
            </p>
            <p>
              برای کسب مشاوره تخصصی در رابطه با انتخاب دوز صحیح، بررسی تداخلات دارویی و سوابق آزمایشگاهی با شماره پشتیبانی داروخانه (۰۲۱-۹۱۰۰۸۸۴۴) تماس حاصل فرمایید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
