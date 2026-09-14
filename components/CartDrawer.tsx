'use client';

import React from 'react';
import { usePharmacy } from '@/context/PharmacyContext';
import { formatToman, toPersianDigits } from '@/lib/utils';

export default function CartDrawer() {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotalCount,
    cartSubtotal,
    cartDiscountTotal,
    cartFinalTotal,
    isCartColdChainRequired,
    setCurrentView,
  } = usePharmacy();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 800000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartFinalTotal);
  const progressPercent = Math.min(100, Math.round((cartFinalTotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left">
        {/* Header */}
        <div className="p-4 border-b border-[#E3ECE8] flex items-center justify-between bg-[#F8FAF9]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0A3D36] text-2xl">shopping_cart</span>
            <div>
              <h3 className="font-bold text-[#0A3D36] text-base">سبد خرید داروخانه</h3>
              <span className="text-xs text-[#556963]">
                {cartTotalCount > 0
                  ? `${toPersianDigits(cartTotalCount)} قلم کالا با نظارت مسئول فنی`
                  : 'سبد خرید شما خالی است'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#556963] hover:bg-[#E5EEEA] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Free Shipping Meter */}
        {cart.length > 0 && (
          <div className="p-3 bg-[#EBF6F3] border-b border-[#D4E8E1] text-xs">
            <div className="flex items-center justify-between font-medium text-[#0A3D36] mb-1.5">
              <span>
                {remainingForFreeShipping === 0 ? (
                  <strong className="text-[#059669] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    ارسال رایگان دارویی به سراسر کشور فعال شد!
                  </strong>
                ) : (
                  <span>
                    تنها <strong>{formatToman(remainingForFreeShipping)} تومان</strong> تا ارسال رایگان
                  </span>
                )}
              </span>
              <span className="font-bold">{toPersianDigits(progressPercent)}٪</span>
            </div>
            <div className="w-full h-1.5 bg-[#CBE5DC] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0A3D36] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cold-chain Alert if required */}
        {isCartColdChainRequired && (
          <div className="mx-4 mt-3 p-2.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2563EB] text-[20px] shrink-0">ac_unit</span>
            <div>
              <strong className="font-bold block">شامل کالای یخچالی (۲ تا ۸ درجه):</strong>
              این سفارش با کیف مخصوص عایق دما و یخ ژله‌ای کنترل‌شده ارسال می‌گردد.
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#6A817A] py-12">
              <div className="w-16 h-16 rounded-full bg-[#F0F5F2] flex items-center justify-center mb-3 text-[#A1B6B0]">
                <span className="material-symbols-outlined text-3xl">remove_shopping_cart</span>
              </div>
              <p className="font-bold text-[#0A3D36] text-base mb-1">سبد خرید شما هنوز خالی است</p>
              <p className="text-xs max-w-xs mb-4">
                می‌توانید از بخش مکمل‌ها، محصولات مراقبت پوست یا ثبت نسخه، اقلام مورد نیاز خود را اضافه نمایید.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCurrentView('PLP');
                }}
                className="px-4 py-2 bg-[#0A3D36] text-white rounded-xl text-xs font-bold hover:bg-[#12534A] transition-colors"
              >
                مشاهده کاتالوگ محصولات
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const currentPrice = item.salePrice || item.price;
              return (
                <div
                  key={item.sku}
                  className="p-3 bg-white rounded-xl border border-[#E3ECE8] shadow-2xs flex gap-3 relative hover:border-[#BED6CD] transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.nameFa}
                    className="w-18 h-18 object-contain bg-[#F8FAF9] rounded-lg p-1 border border-[#E8F0EC] shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs text-[#0A3D36] leading-snug line-clamp-2">
                          {item.product.nameFa}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.sku)}
                          className="text-[#9CA3AF] hover:text-[#E11D48] transition-colors shrink-0 p-0.5"
                          title="حذف از سبد"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      <span className="text-[11px] text-[#5A736C] block mt-0.5">
                        {item.variantName}
                      </span>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-[#69847C]">
                        <span className="bg-[#F0F5F3] px-1.5 py-0.5 rounded font-mono">
                          بچ: {item.batchNumber}
                        </span>
                        <span>انقضا: {item.expiryDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0F5F2]">
                      <div className="flex items-center border border-[#DEE8E3] rounded-lg overflow-hidden bg-[#F8FAF9]">
                        <button
                          onClick={() => updateCartQuantity(item.sku, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#556963] hover:bg-[#E2EEE8]"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#0A3D36]">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.sku, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#556963] hover:bg-[#E2EEE8]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-left">
                        {item.salePrice && item.salePrice < item.price && (
                          <span className="text-[10px] text-[#94A3B8] line-through block">
                            {formatToman(item.price * item.quantity)}
                          </span>
                        )}
                        <span className="font-bold text-xs text-[#0A3D36]">
                          {formatToman(currentPrice * item.quantity)}{' '}
                          <span className="text-[10px] font-normal text-[#5A736C]">تومان</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-[#E3ECE8] bg-[#F8FAF9] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#556963]">
                <span>جمع اقلام سبد:</span>
                <span>{formatToman(cartSubtotal)} تومان</span>
              </div>
              {cartDiscountTotal > 0 && (
                <div className="flex justify-between text-[#E11D48] font-medium">
                  <span>سود شما از خرید تخصصی:</span>
                  <span>{formatToman(cartDiscountTotal)} تومان-</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-[#0A3D36] pt-1.5 border-t border-[#E3ECE8]">
                <span>مبلغ نهایی قابل پرداخت:</span>
                <span className="text-base">{formatToman(cartFinalTotal)} تومان</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCurrentView('CHECKOUT');
                }}
                className="flex-1 py-3 bg-[#0A3D36] hover:bg-[#12584E] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#0A3D36]/20 transition-all cursor-pointer"
              >
                <span>تکمیل اطلاعات و پرداخت</span>
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              </button>
              <button
                onClick={clearCart}
                className="px-3 py-3 border border-[#DEE8E3] rounded-xl text-[#758E86] hover:text-[#E11D48] hover:bg-white text-xs transition-colors"
                title="تخلیه سبد"
              >
                <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
