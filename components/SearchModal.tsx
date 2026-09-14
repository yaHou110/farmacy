'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePharmacy } from '@/context/PharmacyContext';
import { formatToman, toPersianDigits } from '@/lib/utils';
import { Product } from '@/data/pharmacy-data';

export default function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    setSelectedProduct,
    addToCart,
    setCurrentView,
  } = usePharmacy();

  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = products.filter((p) => {
    if (!normalizedQuery) return true;
    return (
      p.nameFa.toLowerCase().includes(normalizedQuery) ||
      p.nameEn.toLowerCase().includes(normalizedQuery) ||
      p.brand.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(normalizedQuery)) ||
      p.activeIngredients.some((i) => i.toLowerCase().includes(normalizedQuery))
    );
  });

  const popularKeywords = ['پرفکتیل', 'وی کارن', 'امگا ۳ بدون جیوه', 'هیالورونیک اسید', 'تست قند بیورر', 'مولتی ویتامین'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#D5E1DC] overflow-hidden z-10 animate-scale-up flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E5EFEA] flex items-center gap-3 bg-[#F8FAF9]">
          <span className="material-symbols-outlined text-[#0A3D36] text-2xl">search</span>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی نام دارو، مکمل، ماده موثره (زینک، B5...) یا برند..."
            className="flex-1 bg-transparent border-none outline-hidden text-sm sm:text-base text-[#191C1B] placeholder-[#768D85] font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#839C93] hover:text-[#0A3D36] text-xs p-1"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] bg-white border border-[#D5E1DC] px-2 py-0.5 rounded text-[#677F77]">
            ESC
          </kbd>
        </div>

        {/* Popular searches chips */}
        {!searchQuery && (
          <div className="p-4 border-b border-[#EDF4F1] bg-[#FCFDFD]">
            <span className="text-xs font-bold text-[#556963] block mb-2">
              بیشترین جستجوهای اخیر مراجعین:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setSearchQuery(kw)}
                  className="px-2.5 py-1 bg-[#F0F5F2] hover:bg-[#E2EEE8] text-[#0A3D36] rounded-lg text-xs transition-colors border border-[#DEE9E4]"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#F0F5F2]">
          <div className="text-xs font-semibold text-[#5A736C] pb-2 flex justify-between">
            <span>
              {searchQuery ? `نتایج جستجو برای «${searchQuery}»:` : 'محصولات پرطرفدار و منتخب داروساز:'}
            </span>
            <span className="font-mono">{toPersianDigits(filteredProducts.length)} مورد</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#748D85]">
              <span className="material-symbols-outlined text-4xl text-[#B0C5BD] mb-2">search_off</span>
              <p className="font-bold text-[#0A3D36] text-sm">موردی یافت نشد</p>
              <p className="text-xs mt-1">
                املای کلمه را بررسی کنید یا با مشاور داروساز از طریق شماره ۰۲۱-۹۱۰۰۸۸۴۴ تماس بگیرید.
              </p>
            </div>
          ) : (
            filteredProducts.map((p) => {
              const currentPrice = p.salePrice || p.price;
              return (
                <div
                  key={p.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-[#F8FAF9] px-2 rounded-xl transition-colors group cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(p);
                    setIsSearchOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.image}
                      alt={p.nameFa}
                      className="w-14 h-14 object-contain rounded-lg bg-[#F8FAF9] p-1 border border-[#E8F0EC] shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[11px] text-[#0E7A69] font-medium block">
                        {p.brand} • {p.category}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#0A3D36] truncate group-hover:text-[#12584E]">
                        {p.nameFa}
                      </h4>
                      <p className="text-[11px] text-[#69847C] truncate mt-0.5 max-w-md">
                        {p.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-left">
                      {p.salePrice && (
                        <span className="text-[10px] text-[#94A3B8] line-through block">
                          {formatToman(p.price)}
                        </span>
                      )}
                      <span className="font-bold text-xs sm:text-sm text-[#0A3D36]">
                        {formatToman(currentPrice)} <span className="text-[10px] text-[#556963]">تومان</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                        setIsSearchOpen(false);
                      }}
                      className="w-8 h-8 rounded-lg bg-[#0A3D36] text-white flex items-center justify-center hover:bg-[#12584E] transition-colors"
                      title="افزودن سریع به سبد"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F2F6F4] border-t border-[#E3ECE8] text-[11px] text-[#637C74] flex justify-between items-center">
          <span>داروخانه آنلاین درمانیک | توسعه با فناوری‌های هوشمند گروه هیمورا</span>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setCurrentView('PLP');
            }}
            className="font-bold text-[#0A3D36] hover:underline"
          >
            مشاهده همه محصولات در کاتالوگ
          </button>
        </div>
      </div>
    </div>
  );
}
