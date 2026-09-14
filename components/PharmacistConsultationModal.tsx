'use client';

import React, { useState } from 'react';
import { usePharmacy } from '@/context/PharmacyContext';

export default function PharmacistConsultationModal() {
  const {
    isConsultationModalOpen,
    setIsConsultationModalOpen,
    products,
    setSelectedProduct,
  } = usePharmacy();

  const [messages, setMessages] = useState<
    { sender: 'user' | 'pharmacist'; text: string; time: string }[]
  >([
    {
      sender: 'pharmacist',
      text: 'درود؛ دکتر حسینی هستم، داروساز کشیک درمانیک. لطفاً نام دارو، مکمل یا پرسش بالینی خود را مطرح فرمایید تا تداخلات و دوز بهینه را بررسی کنم.',
      time: 'هم‌اکنون',
    },
  ]);

  const [inputMsg, setInputMsg] = useState('');

  if (!isConsultationModalOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    const now = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: now }]);
    setInputMsg('');

    setTimeout(() => {
      let reply =
        'پرسش شما بررسی شد. در صورت مصرف وارفارین یا داروهای تیرویید، حتماً مصرف مکمل‌های حاوی کلسیم یا ویتامین K را حداقل با ۴ ساعت فاصله زمانی تنظیم نمایید.';
      if (userText.includes('ریزش') || userText.includes('مو')) {
        reply =
          'برای ریزش مو، ابتدا سطح فریتین و ویتامین D را ارزیابی فرمایید. کپسول پرفکتیل پلاتینوم به همراه تونیک تقویت‌کننده کافئین نتایج بالینی بسیار مطلوبی نشان داده‌اند.';
      } else if (userText.includes('امگا') || userText.includes('قلب')) {
        reply =
          'امگا ۳ بدون جیوه باریج دارای گواهی اسکن فلزات سنگین است و مصرف روزانه یک عدد همراه وعده غذایی چرب، جذب آن را تا ۲ برابر افزایش می‌دهد.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'pharmacist',
          text: reply,
          time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsConsultationModalOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#D5E1DC] overflow-hidden z-10 animate-scale-up my-8 flex flex-col h-[560px]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#0A3D36] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-2xl text-[#72F4CE]">support_agent</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">مشاوره مستقیم با داروساز کشیک</h3>
              <span className="text-[11px] text-[#C6E6DD] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                دکتر سید حسینی • شماره نظام پزشکی: د-۱۲۸۴۰ (آنلاین)
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsConsultationModalOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAF9]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#0A3D36] text-white rounded-bl-xs'
                    : 'bg-white text-[#1E3A33] border border-[#DEE8E3] rounded-br-xs shadow-2xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#78938B] mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Preset quick queries */}
        <div className="p-2 bg-white border-t border-[#EDF4F0] flex gap-1.5 overflow-x-auto text-[11px]">
          <button
            onClick={() => setInputMsg('تداخل امگا ۳ با داروهای ضد انعقاد چیه؟')}
            className="bg-[#F0F6F3] text-[#0A3D36] px-2.5 py-1 rounded-lg shrink-0 hover:bg-[#E2EEE8]"
          >
            تداخل امگا ۳ و وارفارین
          </button>
          <button
            onClick={() => setInputMsg('بهترین مکمل برای ریزش مو چیست؟')}
            className="bg-[#F0F6F3] text-[#0A3D36] px-2.5 py-1 rounded-lg shrink-0 hover:bg-[#E2EEE8]"
          >
            پیشنهاد مکمل ریزش مو
          </button>
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#E3ECE8] flex gap-2">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="پرسش خود را بنویسید..."
            className="flex-1 px-3.5 py-2 bg-[#F8FAF9] border border-[#D5E1DC] rounded-xl text-xs sm:text-sm outline-hidden focus:border-[#0A3D36]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#0A3D36] text-white rounded-xl text-xs font-bold hover:bg-[#12584E] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
