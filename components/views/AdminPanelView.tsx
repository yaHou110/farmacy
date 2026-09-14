'use client';

import React, { useState } from 'react';
import { usePharmacy } from '@/context/PharmacyContext';
import { formatToman, toPersianDigits } from '@/lib/utils';
import { Product, AuditLog } from '@/data/pharmacy-data';

export default function AdminPanelView() {
  const {
    currentRole,
    setCurrentRole,
    products,
    prescriptions,
    reviewPrescription,
    auditLogs,
    orders,
    addAuditLog,
    setCurrentView,
  } = usePharmacy();

  const [activeTab, setActiveTab] = useState<'PRESCRIPTIONS' | 'INVENTORY' | 'AUDIT_LOGS' | 'ORDERS'>('PRESCRIPTIONS');

  // New batch modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newBatchNo, setNewBatchNo] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newQty, setNewQty] = useState('20');

  // Filter audit logs
  const [auditFilter, setAuditFilter] = useState<string>('ALL');

  const pendingRx = prescriptions.filter((r) => r.status === 'PENDING_REVIEW');
  const coldChainOrders = orders.filter((o) => o.isColdChain);

  const totalGmv = orders.reduce((sum, o) => sum + o.finalTotal, 0);

  const handleApproveRx = (id: string) => {
    reviewPrescription(id, 'APPROVED', 'تایید شده بر اساس فارماکوپه و سهمیه استعلام‌شده سازمان تامین اجتماعی');
  };

  const handleRejectRx = (id: string) => {
    reviewPrescription(id, 'REJECTED', 'عدم انطباق دوز مصرفی یا نیاز به استعلام حضوری نسخه دستی');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-[#0A3D36] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-[#155E52] text-[#72F4CE] text-xs font-bold px-2.5 py-0.5 rounded-md border border-[#23786B]">
              سامانه جامع نظارت بالینی و انبارداری هیمورا
            </span>
            <span className="text-xs text-[#A1D6C7]">نسخه ۲.۴ سازمانی</span>
          </div>
          <h1 className="text-2xl font-black">پنل اختصاصی مسئول فنی داروساز و انبار</h1>
          <p className="text-xs text-[#C6E6DD] mt-1">
            پایش آنلاین بچ‌های دارویی، تایید نسخ الکترونیک سپاس و ممیزی لاگ‌های امنیتی غذا و دارو
          </p>
        </div>

        {/* Role Switcher */}
        <div className="bg-white/10 p-2 rounded-2xl border border-white/20 flex items-center gap-2">
          <span className="text-xs font-bold text-[#A5E3D3] pr-2">نقش کاربری:</span>
          {(['PHARMACIST', 'INVENTORY_MANAGER', 'ADMIN'] as const).map((role) => {
            const labels = {
              PHARMACIST: 'دکتر داروساز (مسئول فنی)',
              INVENTORY_MANAGER: 'مدیر انبار دارویی',
              ADMIN: 'مدیر سیستم هیمورا',
            };
            return (
              <button
                key={role}
                onClick={() => setCurrentRole(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentRole === role
                    ? 'bg-white text-[#0A3D36] shadow-sm'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {labels[role]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Key Business Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#DDE8E3] space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#556963]">گردش مالی سفارش‌ها (GMV):</span>
            <span className="material-symbols-outlined text-[#0E7A69] text-xl">account_balance</span>
          </div>
          <div className="text-xl font-black text-[#0A3D36] font-num">
            {formatToman(totalGmv)} <span className="text-xs font-normal text-[#556963]">تومان</span>
          </div>
          <span className="text-[11px] text-[#059669] block">تسویه حساب شاپرک برخط</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#DDE8E3] space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#556963]">نسخ در انتظار بررسی:</span>
            <span className="material-symbols-outlined text-[#D97706] text-xl">pending_actions</span>
          </div>
          <div className="text-xl font-black text-[#0A3D36] font-num">
            {toPersianDigits(pendingRx.length)} <span className="text-xs font-normal text-[#556963]">نسخه</span>
          </div>
          <span className="text-[11px] text-[#D97706] block">نیازمند بررسی مسئول فنی کشیک</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#DDE8E3] space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#556963]">مرسوله‌های زنجیره سرد:</span>
            <span className="material-symbols-outlined text-[#2563EB] text-xl">ac_unit</span>
          </div>
          <div className="text-xl font-black text-[#0A3D36] font-num">
            {toPersianDigits(coldChainOrders.length)} <span className="text-xs font-normal text-[#556963]">سفارش</span>
          </div>
          <span className="text-[11px] text-[#2563EB] block">در محفظه کول‌پک ۲ تا ۸ درجه</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#DDE8E3] space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#556963]">تعداد کل کالاهای فعال:</span>
            <span className="material-symbols-outlined text-[#059669] text-xl">inventory_2</span>
          </div>
          <div className="text-xl font-black text-[#0A3D36] font-num">
            {toPersianDigits(products.length)} <span className="text-xs font-normal text-[#556963]">قلم کالا</span>
          </div>
          <span className="text-[11px] text-[#059669] block">دارای شناسه IRC و تاییدیه TTAC</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-3xl border border-[#DDE8E3] shadow-xs overflow-hidden">
        <div className="p-4 bg-[#F8FAF9] border-b border-[#E7EFEA] flex flex-wrap gap-2">
          {[
            { id: 'PRESCRIPTIONS', label: 'کارتابل نسخ الکترونیک', icon: 'prescriptions', count: pendingRx.length },
            { id: 'INVENTORY', label: 'انبار فیزیکی و بچ‌های دارویی', icon: 'inventory' },
            { id: 'ORDERS', label: 'سفارشات فروش و وضعیت توزیع', icon: 'local_shipping' },
            { id: 'AUDIT_LOGS', label: 'لاگ‌های ممیزی و بازرسی غذا و دارو', icon: 'security' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0A3D36] text-white shadow-xs'
                  : 'bg-white text-[#475C55] hover:bg-[#EBF3EF] border border-[#DEE9E4]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="bg-[#E11D48] text-white text-[10px] px-1.5 py-0.2 rounded-full">
                  {toPersianDigits(tab.count)}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* TAB 1: Prescriptions Management */}
          {activeTab === 'PRESCRIPTIONS' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDF4F0]">
                <h3 className="font-bold text-sm text-[#0A3D36]">
                  کارتابل بررسی بالینی مسئول فنی داروخانه
                </h3>
                <span className="text-xs text-[#556963]">
                  تطابق اقلام با استعلام برخط سپاس و بیمه سلامت
                </span>
              </div>

              <div className="space-y-4">
                {prescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-4 bg-[#F8FAF9] rounded-2xl border border-[#DEE8E3] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-bold text-[#0A3D36]">
                            {rx.trackingNumber}
                          </strong>
                          <span className="text-xs bg-white border border-[#D5E1DC] px-2 py-0.5 rounded text-[#556963]">
                            بیمه: {rx.insuranceType}
                          </span>
                          <span className="text-xs text-[#6E8880]">
                            کد ملی: {rx.patientNationalId}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#556963] block mt-0.5">
                          تلفن تماس: {rx.phoneNumber} | ثبت شده در: {rx.submittedAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {rx.status === 'PENDING_REVIEW' ? (
                          <>
                            <button
                              onClick={() => handleApproveRx(rx.id)}
                              className="px-3.5 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span className="material-symbols-outlined text-[16px]">check_circle</span>
                              <span>تایید بالینی و صدور فرانشیز</span>
                            </button>
                            <button
                              onClick={() => handleRejectRx(rx.id)}
                              className="px-3 py-2 bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEE2E2] border border-[#FECACA] text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span className="material-symbols-outlined text-[16px]">cancel</span>
                              <span>عدم تایید</span>
                            </button>
                          </>
                        ) : (
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-lg border ${
                              rx.status === 'APPROVED'
                                ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
                                : 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                            }`}
                          >
                            {rx.status === 'APPROVED' ? 'تایید شده' : 'عدم تایید بالینی'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-[#E3ECE8]">
                        <span className="font-bold text-[#0A3D36] block mb-1">اقلام نسخه:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-[#556963]">
                          {rx.itemsDetected?.map((it, i) => (
                            <li key={i}>{it}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#E3ECE8]">
                        <span className="font-bold text-[#0A3D36] block mb-1">یادداشت مسئول فنی:</span>
                        <p className="text-[#556963]">{rx.pharmacistNotes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Inventory & Batches */}
          {activeTab === 'INVENTORY' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDF4F0]">
                <div>
                  <h3 className="font-bold text-sm text-[#0A3D36]">
                    مدیریت موجودی انبار فیزیکی و بچ‌های دارویی (GSP)
                  </h3>
                  <p className="text-xs text-[#556963]">
                    ردیابی سری ساخت، تاریخ انقضا و رزرو همزمان سفارش‌ها
                  </p>
                </div>
              </div>

              <div className="border border-[#DEE8E3] rounded-2xl overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#F8FAF9] text-[#0A3D36] font-bold border-b border-[#DEE8E3]">
                    <tr>
                      <th className="p-3">نام دارو / مکمل</th>
                      <th className="p-3">برند / کشور</th>
                      <th className="p-3">شماره بچ (Batch)</th>
                      <th className="p-3">تاریخ انقضا</th>
                      <th className="p-3">موجودی آزاد</th>
                      <th className="p-3">رزرو موقت</th>
                      <th className="p-3">زنجیره سرد</th>
                      <th className="p-3">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F5F2]">
                    {products.map((p) => {
                      const v = p.variants[0];
                      const b = v?.batches[0];
                      return (
                        <tr key={p.id} className="hover:bg-[#F8FAF9]">
                          <td className="p-3 font-bold text-[#0A3D36]">
                            <div className="flex items-center gap-2">
                              <img
                                src={p.image}
                                alt={p.nameFa}
                                className="w-8 h-8 object-contain rounded bg-white p-0.5 border border-[#DEE8E3]"
                              />
                              <span>{p.nameFa}</span>
                            </div>
                          </td>
                          <td className="p-3 text-[#556963]">{p.brand}</td>
                          <td className="p-3 font-mono font-bold text-[#0A3D36]">
                            {b?.batchNumber || '-'}
                          </td>
                          <td className="p-3 font-mono text-[#556963]">{b?.expiryDate || '-'}</td>
                          <td className="p-3 font-bold text-[#059669] font-num">
                            {toPersianDigits(b?.availableQty || 0)} عدد
                          </td>
                          <td className="p-3 text-[#D97706] font-num">
                            {toPersianDigits(b?.reservedQty || 0)} عدد
                          </td>
                          <td className="p-3">
                            {p.isColdChain ? (
                              <span className="bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded text-[10px] font-bold">
                                ۲-۸ درجه
                              </span>
                            ) : (
                              <span className="text-[#859E95] text-[10px]">دمای اتاق</span>
                            )}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => {
                                addAuditLog({
                                  action: 'INVENTORY_ADJUSTED',
                                  entity: 'PRODUCT',
                                  entityId: p.id,
                                  actor: 'دکتر مسئول فنی',
                                  details: `بررسی فیزیکی موجودی ${p.nameFa} انجام شد.`,
                                });
                                alert(`تایید انبارگردانی فیزیکی کالا «${p.nameFa}» ثبت گردید.`);
                              }}
                              className="px-2.5 py-1 bg-[#F0F5F2] hover:bg-[#E0EBE6] text-[#0A3D36] rounded-lg font-bold transition-colors"
                            >
                              ثبت انبارگردانی
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Orders List */}
          {activeTab === 'ORDERS' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-[#0A3D36]">
                فهرست کلیه سفارش‌های پرداخت‌شده
              </h3>
              <div className="space-y-3">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-4 bg-[#F8FAF9] rounded-2xl border border-[#DEE8E3] flex flex-wrap items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-[#0A3D36]">{o.orderNumber}</strong>
                        <span className="bg-white border border-[#D5E1DC] px-2 py-0.5 rounded text-[#556963]">
                          وضعیت: {o.status}
                        </span>
                      </div>
                      <span className="text-[#6C847C] block mt-0.5">
                        تحویل‌گیرنده: {o.recipientName} ({o.phoneNumber}) • تاریخ: {o.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-left">
                        <span className="text-[11px] text-[#556963] block">مبلغ سفارش:</span>
                        <strong className="text-sm text-[#0A3D36] font-num">
                          {formatToman(o.finalTotal)} تومان
                        </strong>
                      </div>
                      <button
                        onClick={() => setCurrentView('ORDER_TRACKING')}
                        className="px-3 py-1.5 bg-[#0A3D36] text-white rounded-xl font-bold hover:bg-[#12584E]"
                      >
                        رهگیری زنده
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Audit Logs (Healthcare Compliance) */}
          {activeTab === 'AUDIT_LOGS' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDF4F0]">
                <div>
                  <h3 className="font-bold text-sm text-[#0A3D36]">
                    دفتر ثبت وقایع و ممیزی نظارتی (Audit Trail)
                  </h3>
                  <p className="text-xs text-[#556963]">
                    ثبت غیرقابل دستکاری کلیه تراکنش‌ها، تغییرات موجودی و تاییدهای نسخه طبق دستورالعمل وزارت بهداشت
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setAuditFilter('ALL')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      auditFilter === 'ALL'
                        ? 'bg-[#0A3D36] text-white'
                        : 'bg-[#F0F5F2] text-[#475C55]'
                    }`}
                  >
                    همه لاگ‌ها
                  </button>
                  <button
                    onClick={() => setAuditFilter('RX_PROCESSED')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      auditFilter === 'RX_PROCESSED'
                        ? 'bg-[#0A3D36] text-white'
                        : 'bg-[#F0F5F2] text-[#475C55]'
                    }`}
                  >
                    تاییدهای نسخه
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {auditLogs
                  .filter((l) => auditFilter === 'ALL' || l.action === auditFilter)
                  .map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-[#F8FAF9] rounded-xl border border-[#E3ECE8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#E6F4F0] text-[#0A3D36] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[17px]">security</span>
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-[#0A3D36]">{log.action}</strong>
                            <span className="text-[#6D877F] text-[11px] font-mono">
                              [{log.entity}{log.entityId ? `: ${log.entityId}` : ''}]
                            </span>
                          </div>
                          <p className="text-[#4C645D] mt-0.5">{log.details}</p>
                        </div>
                      </div>

                      <div className="text-left shrink-0 text-[11px] text-[#78938B]">
                        <span className="block font-semibold text-[#0A3D36]">{log.actor || log.operator}</span>
                        <span>{log.timestamp}</span>
                      </div>
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
