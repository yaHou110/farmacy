'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  INITIAL_PRODUCTS,
  HEALTH_CONCERNS,
  HealthConcern,
  PrescriptionOrder,
  INITIAL_PRESCRIPTIONS,
  AuditLog,
  INITIAL_AUDIT_LOGS,
} from '@/data/pharmacy-data';

export interface CartItem {
  product: Product;
  variantId: string;
  variantName: string;
  sku: string;
  price: number;
  salePrice?: number;
  quantity: number;
  batchNumber: string;
  expiryDate: string;
  isColdChain: boolean;
}

export type AppView =
  | 'HOME'
  | 'PLP'
  | 'RX_HUB'
  | 'CHECKOUT'
  | 'ORDER_TRACKING'
  | 'ADMIN_PANEL'
  | 'ADMIN';

export type UserRole = 'PHARMACIST' | 'INVENTORY_MANAGER' | 'ADMIN';

export interface CheckoutFormState {
  fullName: string;
  phoneNumber: string;
  nationalCode: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  deliveryMethod: 'EXPRESS_COLD' | 'STANDARD_COURIER' | 'POST_PISHTAZ';
  paymentMethod: 'ONLINE_GATEWAY' | 'WALLET' | 'COD';
  discountCode: string;
  appliedDiscount: number;
  orderNote: string;
}

export interface PlacedOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
    batchNumber: string;
    expiryDate: string;
  }[];
  totalAmount: number;
  shippingFee: number;
  finalAmount: number;
  finalTotal: number;
  recipientName: string;
  phoneNumber: string;
  address: string;
  trackingCode: string;
  recipient: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  deliveryMethodTitle: string;
  isColdChain: boolean;
  status:
    | 'PENDING_PAYMENT'
    | 'PAID'
    | 'PHARMACIST_REVIEW'
    | 'PROCESSING'
    | 'PACKED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED';
  timeline: { title: string; time: string; completed: boolean; current?: boolean }[];
  failureSimulated?: boolean;
}

interface PharmacyContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  selectedConcern: HealthConcern | null;
  setSelectedConcern: (c: HealthConcern | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isPrescriptionModalOpen: boolean;
  setIsPrescriptionModalOpen: (open: boolean) => void;
  isConsultationModalOpen: boolean;
  setIsConsultationModalOpen: (open: boolean) => void;
  cart: CartItem[];
  addToCart: (product: Product, variantId?: string, qty?: number) => void;
  updateCartQuantity: (sku: string, qty: number) => void;
  removeFromCart: (sku: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  cartDiscountTotal: number;
  cartFinalTotal: number;
  isCartColdChainRequired: boolean;
  orders: PlacedOrder[];
  placedOrders: PlacedOrder[];
  currentActiveOrder: PlacedOrder | null;
  setCurrentActiveOrder: (order: PlacedOrder | null) => void;
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (id: string | null) => void;
  transitionOrderStatus: (orderId: string, status: any) => void;
  prescriptions: PrescriptionOrder[];
  addPrescription: (rx: Omit<PrescriptionOrder, 'id' | 'trackingNumber' | 'submittedAt' | 'status'>) => void;
  reviewPrescription: (id: string, status: 'APPROVED' | 'REJECTED', notes: string) => void;
  approvePrescription: (id: string, pharmacistName: string, notes: string) => void;
  rejectPrescription: (id: string, reason: string) => void;
  auditLogs: AuditLog[];
  addAuditLog: (
    actionOrObj: string | { action: string; entity: string; entityId?: string; actor?: string; details: string },
    entity?: string,
    details?: string
  ) => void;
  checkoutState: CheckoutFormState;
  updateCheckoutState: (updates: Partial<CheckoutFormState>) => void;
  processOrderCheckout: (simulateFailure?: boolean) => { success: boolean; orderId?: string; error?: string };
  toastMessage: string | null;
  showToast: (msg: string) => void;
  activeFilterCategory: string | null;
  setActiveFilterCategory: (cat: string | null) => void;
}

const PharmacyContext = createContext<PharmacyContextType | undefined>(undefined);

export function PharmacyProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedConcern, setSelectedConcern] = useState<HealthConcern | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('PHARMACIST');
  const [activeFilterCategory, setActiveFilterCategory] = useState<string | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      variantId: INITIAL_PRODUCTS[0].variants[0].id,
      variantName: INITIAL_PRODUCTS[0].variants[0].name,
      sku: INITIAL_PRODUCTS[0].variants[0].sku,
      price: INITIAL_PRODUCTS[0].variants[0].price,
      salePrice: INITIAL_PRODUCTS[0].variants[0].salePrice,
      quantity: 1,
      batchNumber: INITIAL_PRODUCTS[0].variants[0].batches[0].batchNumber,
      expiryDate: INITIAL_PRODUCTS[0].variants[0].batches[0].expiryDate,
      isColdChain: false,
    },
  ]);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Prescriptions state
  const [prescriptions, setPrescriptions] = useState<PrescriptionOrder[]>(INITIAL_PRESCRIPTIONS);

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const addAuditLog = (
    actionOrObj: string | { action: string; entity: string; entityId?: string; actor?: string; details: string },
    entity = 'GENERAL',
    details = ''
  ) => {
    let action = '';
    let ent = entity;
    let det = details;
    let actor = 'دکتر داروساز کشیک (هیمورا)';

    if (typeof actionOrObj === 'object') {
      action = actionOrObj.action;
      ent = actionOrObj.entity + (actionOrObj.entityId ? `:${actionOrObj.entityId}` : '');
      det = actionOrObj.details;
      if (actionOrObj.actor) actor = actionOrObj.actor;
    } else {
      action = actionOrObj;
    }

    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      operator: actor,
      role: 'مسئول فنی و سرپرست داروخانه',
      action,
      entity: ent,
      details: det,
      timestamp: 'هم‌اکنون',
      ip: '192.168.1.100',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Checkout Form State
  const [checkoutState, setCheckoutState] = useState<CheckoutFormState>({
    fullName: 'امیررضا محمدی',
    phoneNumber: '۰۹۱۲۳۴۵۶۷۸۹',
    nationalCode: '۰۰۱۲۳۴۵۶۷۸',
    province: 'تهران',
    city: 'تهران',
    address: 'خیابان ولیعصر، بالاتر از میدان ونک، برج نگار، طبقه ۱۲',
    postalCode: '۱۹۶۹۸۴۳۲۱۱',
    deliveryMethod: 'EXPRESS_COLD',
    paymentMethod: 'ONLINE_GATEWAY',
    discountCode: '',
    appliedDiscount: 0,
    orderNote: 'لطفاً زنگ واحد ۳ فشرده شود و بسته به هیچ عنوان جلوی درب رها نشود.',
  });

  const updateCheckoutState = (updates: Partial<CheckoutFormState>) => {
    setCheckoutState((prev) => ({ ...prev, ...updates }));
  };

  // Preloaded Demo Orders
  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>([
    {
      id: 'ORD-1403-9021',
      orderNumber: 'DK-9021',
      createdAt: '۱۴۰۳/۰۶/۲۳ - ۰۹:۴۰',
      items: [
        {
          productName: INITIAL_PRODUCTS[1].nameFa,
          unitPrice: 833000,
          quantity: 1,
          batchNumber: 'VB8912K',
          expiryDate: '۲۰۲۶/۱۰',
        },
      ],
      totalAmount: 980000,
      shippingFee: 0,
      finalAmount: 833000,
      finalTotal: 833000,
      recipientName: 'سارا حسینی',
      phoneNumber: '۰۹۳۵۸۷۶۵۴۳۲',
      address: 'تهران، سعادت‌آباد، میدان کاج، خیابان مروارید، پلاک ۱۲',
      trackingCode: 'POST-89472910',
      recipient: {
        name: 'سارا حسینی',
        phone: '۰۹۳۵۸۷۶۵۴۳۲',
        address: 'تهران، سعادت‌آباد، میدان کاج، خیابان مروارید',
        city: 'تهران',
      },
      deliveryMethodTitle: 'پیک اکسپرس دارویی (تحویل ۳ ساعته با محفظه ایمن)',
      isColdChain: false,
      status: 'SHIPPED',
      timeline: [
        { title: 'ثبت سفارش و پرداخت آنلاین شاپرک', time: '۰۹:۴۰', completed: true },
        { title: 'کنترل اصالت بچ و تایید مسئول فنی داروساز', time: '۱۰:۱۰', completed: true },
        { title: 'بسته‌بندی بهداشتی و درج هولوگرام TTAC', time: '۱۰:۴۵', completed: true },
        { title: 'تحویل به سفیر ناوگان دارویی درمانیک', time: '۱۱:۲۰', completed: true, current: true },
        { title: 'تحویل به بیمار و اخذ کد تحویل', time: 'پیش‌بینی: ۱۲:۳۰', completed: false },
      ],
    },
  ]);

  const [currentActiveOrder, setCurrentActiveOrder] = useState<PlacedOrder | null>(placedOrders[0]);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>('ORD-1403-9021');

  const transitionOrderStatus = (orderId: string, status: any) => {
    setPlacedOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    addAuditLog('تغییر وضعیت چرخه سفارش', orderId, `انتقال وضعیت سفارش به: ${status}`);
    showToast(`وضعیت سفارش به روزرسانی شد: ${status}`);
  };

  // Cart Calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const cartFinalTotal = cart.reduce((sum, item) => {
    const unitPrice = item.salePrice || item.price;
    return sum + unitPrice * item.quantity;
  }, 0) - checkoutState.appliedDiscount;

  const cartDiscountTotal = cartSubtotal - cartFinalTotal;

  const isCartColdChainRequired = cart.some((item) => item.isColdChain);

  const addToCart = (product: Product, variantId?: string, qty = 1) => {
    const targetVariant = variantId
      ? product.variants.find((v) => v.id === variantId) || product.variants[0]
      : product.variants[0];

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.sku === targetVariant.sku);
      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex].quantity += qty;
        return nextCart;
      }
      return [
        ...prev,
        {
          product,
          variantId: targetVariant.id,
          variantName: targetVariant.name,
          sku: targetVariant.sku,
          price: targetVariant.price,
          salePrice: targetVariant.salePrice,
          quantity: qty,
          batchNumber: targetVariant.batches[0]?.batchNumber || 'BATCH-STD',
          expiryDate: targetVariant.batches[0]?.expiryDate || '۲۰۲۶/۰۹',
          isColdChain: product.isColdChain,
        },
      ];
    });

    // Update available vs reserved inventory
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === product.id) {
          const updatedVariants = p.variants.map((v) => {
            if (v.id === targetVariant.id && v.batches.length > 0) {
              const updatedBatches = [...v.batches];
              updatedBatches[0] = {
                ...updatedBatches[0],
                availableQty: Math.max(0, updatedBatches[0].availableQty - qty),
                reservedQty: updatedBatches[0].reservedQty + qty,
              };
              return { ...v, batches: updatedBatches };
            }
            return v;
          });
          return { ...p, variants: updatedVariants };
        }
        return p;
      })
    );

    showToast(`«${product.nameFa}» به سبد خرید افزوده شد.`);
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (sku: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(sku);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.sku === sku ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (sku: string) => {
    const item = cart.find((i) => i.sku === sku);
    if (item) {
      // release inventory reservation
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === item.product.id) {
            const updatedVariants = p.variants.map((v) => {
              if (v.sku === sku && v.batches.length > 0) {
                const updatedBatches = [...v.batches];
                updatedBatches[0] = {
                  ...updatedBatches[0],
                  availableQty: updatedBatches[0].availableQty + item.quantity,
                  reservedQty: Math.max(0, updatedBatches[0].reservedQty - item.quantity),
                };
                return { ...v, batches: updatedBatches };
              }
              return v;
            });
            return { ...p, variants: updatedVariants };
          }
          return p;
        })
      );
    }
    setCart((prev) => prev.filter((i) => i.sku !== sku));
    showToast('کالا از سبد خرید حذف شد.');
  };

  const clearCart = () => {
    setCart([]);
  };

  const addPrescription = (rxData: Omit<PrescriptionOrder, 'id' | 'trackingNumber' | 'submittedAt' | 'status'>) => {
    const randId = Math.floor(1000 + Math.random() * 9000);
    const newRx: PrescriptionOrder = {
      ...rxData,
      id: `rx-${randId}`,
      trackingNumber: `RX-1403-${randId}`,
      submittedAt: 'هم‌اکنون',
      status: 'PENDING_REVIEW',
      pharmacistNotes: 'نسخه با موفقیت در سامانه هیمورا ثبت شد؛ مسئول فنی در حال استعلام سهمیه و محاسبه پوشش بیمه است.',
    };

    setPrescriptions((prev) => [newRx, ...prev]);
    addAuditLog('ثبت نسخه الکترونیک جدید', newRx.trackingNumber, `کد رهگیری: ${newRx.rxTrackingCode} - بیمه: ${newRx.insuranceType}`);
    showToast(`نسخه با شناسه ${newRx.trackingNumber} ثبت گردید و در صف بررسی داروساز قرار گرفت.`);
  };

  const approvePrescription = (id: string, pharmacistName: string, notes: string) => {
    setPrescriptions((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'APPROVED',
              reviewedBy: pharmacistName,
              pharmacistNotes: notes || 'تایید شد و اقلام آماده بسته‌بندی در انبار هستند.',
              totalOfficialPrice: r.totalOfficialPrice || 540000,
              insuranceDeduction: r.insuranceDeduction || 378000,
              patientShare: r.patientShare || 162000,
            }
          : r
      )
    );
    addAuditLog('تایید نسخه و محاسبه بیمه', id, `توسط ${pharmacistName}: ${notes}`);
    showToast(`نسخه ${id} با موفقیت توسط دکتر داروساز تایید شد.`);
  };

  const reviewPrescription = (id: string, status: 'APPROVED' | 'REJECTED', notes: string) => {
    if (status === 'APPROVED') {
      approvePrescription(id, 'دکتر داروساز کشیک (هیمورا)', notes);
    } else {
      rejectPrescription(id, notes);
    }
  };

  const rejectPrescription = (id: string, reason: string) => {
    setPrescriptions((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'REJECTED',
              pharmacistNotes: `رد شد: ${reason}`,
            }
          : r
      )
    );
    addAuditLog('رد نسخه الکترونیک', id, `علت: ${reason}`);
    showToast(`نسخه ${id} به علت عدم تایید رد شد.`);
  };

  const processOrderCheckout = (simulateFailure = false) => {
    if (cart.length === 0) {
      return { success: false, error: 'سبد خرید شما خالی است.' };
    }

    if (simulateFailure) {
      // Simulate gateway failure / stock concurrency failure
      showToast('خطای شبیه‌سازی شده شاپرک: عدم تایید توکن بانکی / بازگشت موجودی رزرو شده');
      addAuditLog('خطای پرداخت درگاه شاپرک', 'ORDER_CHECKOUT', 'خطای شبیه‌سازی: بازگشت رزرو موجودی به انبار آزاد');
      return { success: false, error: 'تراکنش توسط درگاه شاپرک لغو شد و موجودی رزرو شده آزاد گردید.' };
    }

    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const shippingCost = cartFinalTotal > 800000 ? 0 : 45000;

    const formattedItems = cart.map((c) => ({
      productName: c.product.nameFa,
      quantity: c.quantity,
      unitPrice: c.salePrice || c.price,
      batchNumber: c.batchNumber,
      expiryDate: c.expiryDate,
      product: c.product,
    }));

    const newOrder: PlacedOrder = {
      id: `ORD-1403-${orderNum}`,
      orderNumber: `DK-${orderNum}`,
      createdAt: '۱۴۰۳/۰۶/۲۳ - هم‌اکنون',
      items: formattedItems,
      totalAmount: cartSubtotal,
      shippingFee: shippingCost,
      finalAmount: cartFinalTotal + shippingCost,
      finalTotal: cartFinalTotal + shippingCost,
      recipientName: checkoutState.fullName,
      phoneNumber: checkoutState.phoneNumber,
      address: `${checkoutState.province}، ${checkoutState.city}، ${checkoutState.address}`,
      trackingCode: `POST-${Math.floor(10000000 + Math.random() * 90000000)}`,
      recipient: {
        name: checkoutState.fullName,
        phone: checkoutState.phoneNumber,
        address: `${checkoutState.province}، ${checkoutState.city}، ${checkoutState.address}`,
        city: checkoutState.city,
      },
      deliveryMethodTitle:
        checkoutState.deliveryMethod === 'EXPRESS_COLD'
          ? 'پیک اکسپرس دارویی (تحویل ۳ ساعته با محفظه عایق دما)'
          : checkoutState.deliveryMethod === 'STANDARD_COURIER'
          ? 'ارسال با پیک معمولی تهران (روز بعد)'
          : 'پست پیشتاز سراسری',
      isColdChain: isCartColdChainRequired,
      status: 'PAID',
      timeline: [
        { title: 'ثبت سفارش و پرداخت شاپرک', time: 'هم‌اکنون', completed: true, current: true },
        { title: 'کنترل اصالت بچ و تایید داروساز کشیک', time: 'در حال پردازش', completed: false },
        { title: 'بسته‌بندی در انبار دارویی و الصاق TTAC', time: 'در صف انتظار', completed: false },
        { title: 'تحویل به ناوگان حمل و نقل داروخانه', time: 'در انتظار بسته‌بندی', completed: false },
        { title: 'تحویل نهایی به بیمار', time: 'پیش‌بینی تحویل', completed: false },
      ],
    };

    setPlacedOrders((prev) => [newOrder, ...prev]);
    setCurrentActiveOrder(newOrder);
    setActiveTrackingOrderId(newOrder.id);
    addAuditLog('ثبت سفارش قطعی و پرداخت موفق', newOrder.id, `مبلغ: ${newOrder.finalAmount.toLocaleString()} تومان - تحویل: ${newOrder.recipient.city}`);
    clearCart();
    showToast(`سفارش شماره ${newOrder.orderNumber} با موفقیت ثبت شد.`);
    setCurrentView('ORDER_TRACKING');
    return { success: true, orderId: newOrder.id };
  };

  return (
    <PharmacyContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentRole,
        setCurrentRole,
        products,
        selectedProduct,
        setSelectedProduct,
        selectedConcern,
        setSelectedConcern,
        isSearchOpen,
        setIsSearchOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isPrescriptionModalOpen,
        setIsPrescriptionModalOpen,
        isConsultationModalOpen,
        setIsConsultationModalOpen,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        cartDiscountTotal,
        cartFinalTotal,
        isCartColdChainRequired,
        orders: placedOrders,
        placedOrders,
        currentActiveOrder,
        setCurrentActiveOrder,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        transitionOrderStatus,
        prescriptions,
        addPrescription,
        reviewPrescription,
        approvePrescription,
        rejectPrescription,
        auditLogs,
        addAuditLog,
        checkoutState,
        updateCheckoutState,
        processOrderCheckout,
        toastMessage,
        showToast,
        activeFilterCategory,
        setActiveFilterCategory,
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
}

export function usePharmacy() {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error('usePharmacy must be used within a PharmacyProvider');
  }
  return context;
}
