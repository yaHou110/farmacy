'use client';

import React, { useState } from 'react';
import { usePharmacy } from '@/context/PharmacyContext';
import { formatToman, toPersianDigits } from '@/lib/utils';
import { Product } from '@/data/pharmacy-data';

export default function ProductDetailModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    products,
  } = usePharmacy();

  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'INTERACTIONS' | 'PHARMACIST_NOTE'>('DETAILS');

  if (!selectedProduct) return null;

  const currentVariant =
    selectedProduct.variants.find((v) => v.id === selectedVariantId) ||
    selectedProduct.variants[0];

  const currentBatch = currentVariant.batches[0];
  const unitPrice = currentVariant.salePrice || currentVariant.price;

  const frequentlyBought = (selectedProduct.frequentlyBoughtWith || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#D5E1DC] overflow-hidden z-10 animate-scale-up my-8 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-[#F8FAF9] border-b border-[#E3ECE8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#E5F3EE] text-[#0A3D36] text-[11px] font-bold px-2 py-0.5 rounded-md border border-[#C5E4D9]">
              {selectedProduct.category}
            </span>
            <span className="text-xs text-[#6A817A]">•</span>
            <span className="text-xs font-semibold text-[#0E7A69]">
              برند: {selectedProduct.brand} ({selectedProduct.brandOrigin})
            </span>
          </div>
          <button
            onClick={() => setSelectedProduct(null)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#556963] hover:bg-[#E2EEE8] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left: Product Images & Quality Badges */}
            <div className="md:col-span-5 space-y-3">
              <div className="bg-[#F8FAF9] border border-[#E3ECE8] rounded-2xl p-4 flex items-center justify-center relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.nameFa}
                  className="max-h-72 w-full object-contain"
                />
                {selectedProduct.discountPercent && (
                  <span className="absolute top-3 right-3 bg-[#E11D48] text-white text-xs font-black px-2 py-0.5 rounded-md">
                    {toPersianDigits(selectedProduct.discountPercent)}٪ تخفیف
                  </span>
                )}
                {selectedProduct.isColdChain && (
                  <span className="absolute bottom-3 left-3 bg-[#EFF6FF] text-[#1E40AF] text-[11px] font-bold px-2.5 py-1 rounded-md border border-[#BFDBFE] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">ac_unit</span>
                    زنجیره سرد (۲-۸ درجه)
                  </span>
                )}
              </div>

              {/* TTAC and IRC Verification Box */}
              <div className="p-3 bg-[#F0F7F4] border border-[#CBE5DC] rounded-xl text-xs space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-[#0A3D36]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[#059669] text-[16px]">verified</span>
                    اصالت غذا و دارو (TTAC)
                  </span>
                  <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-[#CBE5DC]">
                    {selectedProduct.ttacId}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#536E65] text-[11px]">
                  <span>کد ثبت دارو (IRC):</span>
                  <span className="font-mono">{selectedProduct.ircCode}</span>
                </div>
              </div>
            </div>

            {/* Right: Product Info & Actions */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h1 className="text-xl font-bold text-[#0A3D36] leading-snug">
                  {selectedProduct.nameFa}
                </h1>
                <p className="text-xs font-mono text-[#6A817A] mt-1" dir="ltr">
                  {selectedProduct.nameEn}
                </p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-[#F59E0B] font-bold">
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span>{toPersianDigits(selectedProduct.rating)}</span>
                </div>
                <span className="text-[#899F98]">|</span>
                <span className="text-[#556963]">
                  {toPersianDigits(selectedProduct.reviewsCount)} نظر ثبت شده داروسازان و بیماران
                </span>
                <span className="text-[#899F98]">|</span>
                <span className="text-[#059669] font-medium">موجود در انبار مرکزی داروخانه</span>
              </div>

              {/* Variants Selector */}
              {selectedProduct.variants.length > 1 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-bold text-[#0A3D36] block">
                    انتخاب نوع بسته‌بندی یا طعم:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          v.id === currentVariant.id
                            ? 'bg-[#0A3D36] text-white border-[#0A3D36] shadow-xs'
                            : 'bg-white hover:bg-[#F2F7F5] text-[#334641] border-[#D5E1DC]'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Batch & Expiry Card */}
              {currentBatch && (
                <div className="p-3 bg-[#FAF8F5] border border-[#F3E5D4] rounded-xl text-xs flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[#8C5E28] font-bold block">
                      مشخصات بچ فیزیکی انبار:
                    </span>
                    <span className="text-[#654823] text-[11px]">
                      بچ: <strong className="font-mono">{currentBatch.batchNumber}</strong> | تاریخ انقضا:{' '}
                      <strong className="font-mono">{currentBatch.expiryDate}</strong>
                    </span>
                  </div>
                  <div className="text-[11px] bg-white border border-[#E9D7C2] px-2.5 py-1 rounded-md text-[#8C5E28] font-medium">
                    موجودی آزاد: {toPersianDigits(currentBatch.availableQty)} عدد
                  </div>
                </div>
              )}

              {/* Short Summary */}
              <p className="text-xs sm:text-sm text-[#475C55] leading-relaxed">
                {selectedProduct.shortDesc}
              </p>

              {/* Price & Add to Cart Controls */}
              <div className="p-4 bg-[#F8FAF9] rounded-2xl border border-[#E1ECE7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#556963] font-medium">قیمت مصرف‌کننده مصوب:</span>
                  <div className="text-left">
                    {currentVariant.salePrice && (
                      <span className="text-xs text-[#94A3B8] line-through block font-num">
                        {formatToman(currentVariant.price)} تومان
                      </span>
                    )}
                    <span className="text-xl font-black text-[#0A3D36] font-num">
                      {formatToman(unitPrice)}{' '}
                      <span className="text-xs font-normal text-[#5A736C]">تومان</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#CBDCD4] rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-10 flex items-center justify-center text-[#556963] hover:bg-[#F0F6F3]"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-[#0A3D36] font-num">
                      {toPersianDigits(quantity)}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-10 flex items-center justify-center text-[#556963] hover:bg-[#F0F6F3]"
                    >
                      +
                    </button>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => {
                      addToCart(selectedProduct, currentVariant.id, quantity);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3 bg-[#0A3D36] hover:bg-[#12584E] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#0A3D36]/20 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[19px]">add_shopping_cart</span>
                    <span>افزودن به سبد خرید</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Tabs Section */}
          <div className="border-t border-[#E3ECE8] pt-5">
            <div className="flex border-b border-[#E3ECE8] gap-4 text-xs sm:text-sm font-bold">
              <button
                onClick={() => setActiveTab('DETAILS')}
                className={`pb-2.5 transition-colors border-b-2 ${
                  activeTab === 'DETAILS'
                    ? 'border-[#0A3D36] text-[#0A3D36]'
                    : 'border-transparent text-[#6A817A] hover:text-[#0A3D36]'
                }`}
              >
                توضیحات و ترکیبات فعال
              </button>
              <button
                onClick={() => setActiveTab('INTERACTIONS')}
                className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1 ${
                  activeTab === 'INTERACTIONS'
                    ? 'border-[#0A3D36] text-[#0A3D36]'
                    : 'border-transparent text-[#6A817A] hover:text-[#0A3D36]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#DC2626]">warning</span>
                تداخلات دارویی و موارد منع مصرف
              </button>
              <button
                onClick={() => setActiveTab('PHARMACIST_NOTE')}
                className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1 ${
                  activeTab === 'PHARMACIST_NOTE'
                    ? 'border-[#0A3D36] text-[#0A3D36]'
                    : 'border-transparent text-[#6A817A] hover:text-[#0A3D36]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#0E7A69]">stethoscope</span>
                دیدگاه بالینی دکتر داروساز
              </button>
            </div>

            <div className="py-4 text-xs sm:text-sm leading-relaxed text-[#3B4E47]">
              {activeTab === 'DETAILS' && (
                <div className="space-y-4">
                  <p>{selectedProduct.description}</p>
                  <div>
                    <h4 className="font-bold text-[#0A3D36] mb-2">ترکیبات اصلی و مواد موثره:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.activeIngredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="bg-[#F0F6F3] text-[#0A3D36] border border-[#DEE8E3] px-3 py-1 rounded-lg text-xs font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-[#F8FAF9] rounded-xl border border-[#E3ECE8]">
                    <strong className="text-[#0A3D36] block mb-1">دستور و شیوه مصرف بالینی:</strong>
                    <p className="text-xs text-[#526861]">{selectedProduct.clinicalUsage}</p>
                  </div>
                </div>
              )}

              {activeTab === 'INTERACTIONS' && (
                <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl space-y-2 text-[#991B1B]">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="material-symbols-outlined text-[20px]">report_problem</span>
                    هشدارهای مهم تداخل دارویی و بالینی
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    {selectedProduct.contraindications.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-[#7F1D1D] pt-2 border-t border-[#FCA5A5]/40">
                    در صورت مصرف همزمان داروهای قلبی، تیرویید یا دیابت، پیش از خرید با سامانه مشاوره تلفنی داروخانه (۰۲۱-۹۱۰۰۸۸۴۴) ارتباط برقرار فرمایید.
                  </p>
                </div>
              )}

              {activeTab === 'PHARMACIST_NOTE' && (
                <div className="p-4 bg-[#F0F9F6] border border-[#CCE8DF] rounded-xl space-y-2 text-[#0A3D36]">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="material-symbols-outlined text-[20px] text-[#0E7A69]">verified_user</span>
                    توصیه اختصاصی مسئول فنی داروخانه درمانیک
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#2A4B43]">
                    {selectedProduct.pharmacistNote}
                  </p>
                  <div className="text-[11px] text-[#556963] pt-2 border-t border-[#CCE8DF] flex items-center justify-between">
                    <span>دکتر سید حسینی • شماره نظام پزشکی: د-۱۲۸۴۰</span>
                    <span className="text-[#059669] font-medium">تایید شده بر اساس فارماکوپه رسمی</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Frequently Bought Together */}
          {frequentlyBought.length > 0 && (
            <div className="border-t border-[#E3ECE8] pt-5">
              <h4 className="font-bold text-xs sm:text-sm text-[#0A3D36] mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#0E7A69]">auto_awesome</span>
                پیشنهاد مکمل هم‌افزا (خرید مکرر به همراه این محصول):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {frequentlyBought.map((fp) => (
                  <div
                    key={fp.id}
                    className="p-3 bg-[#F8FAF9] rounded-xl border border-[#E3ECE8] flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={fp.image}
                        alt={fp.nameFa}
                        className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-[#E8F0EC]"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#0A3D36] block truncate">
                          {fp.nameFa}
                        </span>
                        <span className="text-[11px] text-[#556963] font-num">
                          {formatToman(fp.salePrice || fp.price)} تومان
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(fp)}
                      className="px-2.5 py-1.5 bg-[#0A3D36] hover:bg-[#12584E] text-white text-xs font-bold rounded-lg shrink-0 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[15px]">add</span>
                      افزودن
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
