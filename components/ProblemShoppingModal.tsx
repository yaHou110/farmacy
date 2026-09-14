'use client';

import React from 'react';
import { usePharmacy } from '@/context/PharmacyContext';
import { formatToman } from '@/lib/utils';
import { Product } from '@/data/pharmacy-data';

export default function ProblemShoppingModal() {
  const {
    selectedConcern,
    setSelectedConcern,
    products,
    addToCart,
    setSelectedProduct,
  } = usePharmacy();

  if (!selectedConcern) return null;

  const matchedProducts = selectedConcern.recommendedProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedConcern(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#D5E1DC] overflow-hidden z-10 animate-scale-up my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-l from-[#0A3D36] to-[#12584E] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-2xl text-[#6AE9C3]">
                {selectedConcern.iconName || 'healing'}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#8CECD0] bg-white/10 px-2 py-0.5 rounded">
                پروتکل بالینی درمانیک
              </span>
              <h3 className="font-bold text-lg leading-tight mt-0.5">{selectedConcern.title}</h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedConcern(null)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Clinical Overview */}
          <div>
            <h4 className="font-bold text-sm text-[#0A3D36] mb-1">تحلیل بالینی دغدغه سلامت:</h4>
            <p className="text-xs sm:text-sm text-[#475E57] leading-relaxed">
              {selectedConcern.description}
            </p>
          </div>

          {/* 3-Step Protocol */}
          <div className="p-4 bg-[#F2F8F5] rounded-2xl border border-[#CDE5DC] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-[#0A3D36] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#0E7A69] text-[18px]">checklist</span>
                پروتکل ۳ مرحله‌ای داروساز جهت بهبود پایدار
              </h4>
              <span className="text-xs font-bold text-[#0E7A69] bg-white px-2.5 py-1 rounded-lg border border-[#CDE5DC]">
                {selectedConcern.clinicalProtocol.duration}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-white rounded-xl border border-[#DCEBE5] space-y-1">
                <span className="w-5 h-5 rounded-full bg-[#0A3D36] text-white text-[10px] font-black flex items-center justify-center">
                  ۱
                </span>
                <strong className="text-xs font-bold text-[#0A3D36] block">گام نخست:</strong>
                <p className="text-[11px] text-[#556963] leading-relaxed">
                  {selectedConcern.clinicalProtocol.step1}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#DCEBE5] space-y-1">
                <span className="w-5 h-5 rounded-full bg-[#0A3D36] text-white text-[10px] font-black flex items-center justify-center">
                  ۲
                </span>
                <strong className="text-xs font-bold text-[#0A3D36] block">گام مکمل:</strong>
                <p className="text-[11px] text-[#556963] leading-relaxed">
                  {selectedConcern.clinicalProtocol.step2}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#DCEBE5] space-y-1">
                <span className="w-5 h-5 rounded-full bg-[#0A3D36] text-white text-[10px] font-black flex items-center justify-center">
                  ۳
                </span>
                <strong className="text-xs font-bold text-[#0A3D36] block">تثبیت و مراقبت:</strong>
                <p className="text-[11px] text-[#556963] leading-relaxed">
                  {selectedConcern.clinicalProtocol.step3}
                </p>
              </div>
            </div>

            <div className="p-2.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-xs text-[#92400E] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#D97706] shrink-0">tips_and_updates</span>
              <div>
                <strong>توصیه طلایی داروساز:</strong> {selectedConcern.clinicalProtocol.pharmacistTip}
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#0A3D36] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#0E7A69] text-[18px]">medication</span>
              محصولات دارویی و مکمل‌های مورد تایید برای این پروتکل:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedProducts.map((product) => {
                const price = product.salePrice || product.price;
                return (
                  <div
                    key={product.id}
                    className="p-3 bg-[#F8FAF9] rounded-xl border border-[#E1ECE7] flex flex-col justify-between hover:border-[#BED6CD] transition-colors"
                  >
                    <div className="flex gap-3">
                      <img
                        src={product.image}
                        alt={product.nameFa}
                        className="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-[#E8F0EC] shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#0E7A69] font-medium block">
                          {product.brand}
                        </span>
                        <h5 className="font-bold text-xs text-[#0A3D36] leading-snug line-clamp-2">
                          {product.nameFa}
                        </h5>
                        <span className="text-xs font-bold text-[#0A3D36] block mt-1 font-num">
                          {formatToman(price)} تومان
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3 pt-2 border-t border-[#EDF4F1]">
                      <button
                        onClick={() => {
                          setSelectedConcern(null);
                          setSelectedProduct(product);
                        }}
                        className="flex-1 py-1.5 border border-[#CBDCD4] text-[#0A3D36] rounded-lg text-xs font-bold hover:bg-white transition-colors"
                      >
                        بررسی بالینی
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-1.5 bg-[#0A3D36] hover:bg-[#12584E] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[15px]">add</span>
                        افزودن
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FAF9] border-t border-[#E3ECE8] flex justify-between items-center text-xs">
          <span className="text-[#556963]">نیاز به مشاوره دقیق‌تر دارید؟ تماس با دپارتمان تخصصی هیمورا</span>
          <button
            onClick={() => setSelectedConcern(null)}
            className="px-4 py-2 bg-[#0A3D36] text-white rounded-xl font-bold hover:bg-[#12584E] transition-colors"
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
}
