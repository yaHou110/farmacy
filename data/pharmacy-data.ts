export interface ProductBatch {
  id: string;
  batchNumber: string;
  expiryDate: string; // e.g. "۲۰۲۶/۰۹"
  availableQty: number;
  reservedQty: number;
  shelfLocation: string;
  purchaseCost: number;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "بسته‌بندی ۶۰ عددی" or "طعم شکلات ۲ کیلوگرم"
  sku: string;
  price: number;
  salePrice?: number;
  inStock: boolean;
  batches: ProductBatch[];
}

export interface Product {
  id: string;
  nameFa: string;
  nameEn: string;
  brand: string;
  brandOrigin: string;
  category: string;
  categorySlug: string;
  price: number;
  salePrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  ttacId: string;
  ircCode: string;
  prescriptionType: 'OTC' | 'RX_REQUIRED' | 'SUPPLEMENT' | 'MEDICAL_DEVICE';
  isColdChain: boolean;
  dosageForm: string; // کپسول، شربت، ساشه، کرم، دستگاه
  packageSize: string;
  targetAudience: string;
  expiryNotice: string;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  variants: ProductVariant[];
  selectedVariantId: string;
  shortDesc: string;
  description: string;
  activeIngredients: string[];
  clinicalUsage: string;
  contraindications: string[]; // تداخلات و منع مصرف
  storageConditions: string;
  pharmacistNote: string;
  tags: string[];
  frequentlyBoughtWith?: string[]; // IDs of products
}

export interface HealthConcern {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  badge: string;
  description: string;
  keyIngredients: string[];
  productsCount: number;
  recommendedProductIds: string[];
  clinicalProtocol: {
    step1: string;
    step2: string;
    step3: string;
    duration: string;
    pharmacistTip: string;
  };
}

export interface CertifiedBrand {
  id: string;
  nameEn: string;
  nameFa: string;
  origin: string;
  category: string;
  officialImporter: string;
  logoText: string;
  badge: string;
}

export interface ClinicalArticle {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  author: string;
  authorTitle: string;
  authorAvatar: string;
  summary: string;
  image: string;
  relatedProductIds: string[];
}

export interface PrescriptionOrder {
  id: string;
  trackingNumber: string;
  patientNationalId: string;
  insuranceType: 'تامین اجتماعی' | 'بیمه سلامت' | 'نیروهای مسلح' | 'آزاد';
  rxTrackingCode: string;
  phoneNumber: string;
  isColdChain: boolean;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'PRICED' | 'REJECTED' | 'DISPATCHED';
  submittedAt: string;
  reviewedBy?: string;
  pharmacistNotes?: string;
  totalOfficialPrice?: number;
  insuranceDeduction?: number;
  patientShare?: number;
  itemsDetected?: string[];
}

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'PHARMACIST_REVIEW'
  | 'PROCESSING'
  | 'PACKED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface AuditLog {
  id: string;
  operator: string;
  role: string;
  action: string;
  entity: string;
  entityId?: string;
  actor?: string;
  details: string;
  timestamp: string;
  ip: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    nameFa: 'کپسول کمپلکس مولتی‌ویتامین ارگانیک نوترالب',
    nameEn: 'NutraLab Organic Daily Multivitamin Complex',
    brand: 'نوترالب (NutraLab)',
    brandOrigin: 'کانادا',
    category: 'ویتامین‌ها و مینرال‌ها',
    categorySlug: 'vitamins',
    price: 480000,
    salePrice: 415000,
    discountPercent: 14,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9teY-rvLdif-zTM_x_oBMKdwoPpmYCaoypDfqg2gV9AJtTqf7RrHfCAzis8d9TX7QPUClJIiijaSd5KAsGLVE39si6e-eSelM2Z3T4pXEC-Sxj6FpN639mr2mm7pQAEOXD-Oi4-ggYuiJwpozlp6ao6msI5-6-uUNtPc5dX2oNk6MyDm926W5NPvQqPGEvqEvuixhiyY7_28mpfaN4tG601ZLYmeelxy8Aa_jduB_rw8cwqdrtctT',
    ttacId: '۲۱۸۹۸۴۰۵۵۱',
    ircCode: 'IRC-89210452',
    prescriptionType: 'SUPPLEMENT',
    isColdChain: false,
    dosageForm: 'کپسول گیاهی (Veggie Cap)',
    packageSize: 'قوطی ۶۰ عددی',
    targetAudience: 'بزرگسالان و ورزشکاران',
    expiryNotice: 'حداقل ۱۸ ماه تا انقضا (۲۰۲۶/۰۹)',
    stockStatus: 'IN_STOCK',
    selectedVariantId: 'var-1-1',
    variants: [
      {
        id: 'var-1-1',
        name: 'قوطی ۶۰ عددی (دوره ۲ ماهه)',
        sku: 'NL-MV-60',
        price: 480000,
        salePrice: 415000,
        inStock: true,
        batches: [
          { id: 'b-1', batchNumber: 'NL24B09', expiryDate: '۲۰۲۶/۰۹', availableQty: 48, reservedQty: 3, shelfLocation: 'A-12-04', purchaseCost: 310000 }
        ]
      },
      {
        id: 'var-1-2',
        name: 'بسته اقتصادی ۱۲۰ عددی (دوره ۴ ماهه)',
        sku: 'NL-MV-120',
        price: 890000,
        salePrice: 765000,
        inStock: true,
        batches: [
          { id: 'b-2', batchNumber: 'NL24B11', expiryDate: '۲۰۲۶/۱۱', availableQty: 25, reservedQty: 1, shelfLocation: 'A-12-05', purchaseCost: 590000 }
        ]
      }
    ],
    shortDesc: 'حاوی ۲۴ ریزمغذی فعال با جذب سلولی بالا، زینک شلاته و فولیک اسید طبیعی بدون تحریک دستگاه گوارش.',
    description: 'کمپلکس مولتی‌ویتامین ارگانیک نوترالب با فناوری فرمولاسیون آهسته‌رهش، ویتامین‌های گروه B، کوآنزیم Q10، ویتامین D3 و زینک شلاته را با بیشترین ضریب زیست‌فراهمی (Bioavailability) به سلول‌های بدن می‌رساند. این محصول فاقد هرگونه نگهدارنده مصنوعی، گلوتن، سویا و رنگ‌های شیمیایی است.',
    activeIngredients: ['فولیک اسید ۴۰۰mcg', 'زینک شلاته ۱۵mg', 'ویتامین D3 طبیعی ۱۰۰۰IU', 'کوآنزیم Q10 معادل ۳۰mg', 'منیزیم مالات ۱۰۰mg'],
    clinicalUsage: 'روزانه ۱ عدد کپسول همراه با وعده اصلی غذایی (ترجیحاً ناهار) با یک لیوان آب خنک میل شود.',
    contraindications: ['همزمانی با داروهای ضد انعقاد خون مانند وارفارین نیازمند پایش پزشک است.', 'در صورت سابقه سنگ کلیه کلسیمی با داروساز مشورت فرمایید.'],
    storageConditions: 'در دمای کمتر از ۲۵ درجه سانتی‌گراد، دور از تابش مستقیم آفتاب و رطوبت نگهداری شود.',
    pharmacistNote: 'فرمولاسیون کپسول‌های گیاهی نوترالب به دلیل استفاده از ملح شلاته گلیسینات زینک و آهن، کمترین میزان حالت تهوع ناشی از مصرف آهن را ایجاد می‌کند.',
    tags: ['مولتی ویتامین', 'تقویت سیستم ایمنی', 'رفع خستگی مزمن', 'فاقد گلوتن'],
    frequentlyBoughtWith: ['prod-3']
  },
  {
    id: 'prod-2',
    nameFa: 'قرص پرفکتیل پلاتینوم اورجینال ویتابیوتیکس',
    nameEn: 'Vitabiotics Perfectil Platinum Radiance',
    brand: 'ویتابیوتیکس (Vitabiotics)',
    brandOrigin: 'انگلستان',
    category: 'مراقبت پوست و مو',
    categorySlug: 'skin-hair',
    price: 980000,
    salePrice: 833000,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 96,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFY83muLq0JJWp9904p0qIpqkRhOaxFfEc478w-6mTEelXPJOjGHEIu6eV0BdfRaWzA21jgSFRBFPhjVw31jX3hNbVue02clZ3GZaYw27qZXtkpEi6kCpRaqwVA7jbl9VFav-nVFuUyJdZReZCx7d9sy0Q8z1Z6pW86XEq2UMyEKpaK7JK6xIuX0geMGEtydBMsi_YVG2ebhWOFNPCxYqfQvXtn2ieEc-plyfA54lbLW0v3qqnebP6',
    ttacId: '۲۱۸۹۸۴۰',
    ircCode: 'IRC-1200941',
    prescriptionType: 'SUPPLEMENT',
    isColdChain: false,
    dosageForm: 'قرص روکش‌دار',
    packageSize: 'جعبه ۶۰ عددی (۴ بلیستر ۱۵ تایی)',
    targetAudience: 'بانوان و آقایان بالای ۲۰ سال',
    expiryNotice: 'تاریخ انقضا: ۲۰۲۶/۱۰ (تضمین حداقل ۲ سال)',
    stockStatus: 'IN_STOCK',
    selectedVariantId: 'var-2-1',
    variants: [
      {
        id: 'var-2-1',
        name: 'بسته‌بندی ۶۰ عددی استاندارد',
        sku: 'VB-PERF-PLAT-60',
        price: 980000,
        salePrice: 833000,
        inStock: true,
        batches: [
          { id: 'b-2-1', batchNumber: 'VB8912K', expiryDate: '۲۰۲۶/۱۰', availableQty: 34, reservedQty: 4, shelfLocation: 'B-04-01', purchaseCost: 650000 }
        ]
      }
    ],
    shortDesc: 'فرمولاسیون تخصصی پیشگیری از افتادگی پوست با کلاژن دریایی پپتایدی، بیومارین کمپلکس و عصاره پوست کاج.',
    description: 'پرفکتیل پلاتینوم پرچمدار مکمل‌های جوانسازی کمپانی ویتابیوتیکس انگلستان است. ترکیب هم‌افزای کلاژن هیدرولیز شده پپتیدی، عصاره بذر انگور، چای سبز، عصاره پوست درخت کاج اروپایی (پیکنوژنول) و آلفا لیپوئیک اسید، اثرات رادیکال‌های آزاد را در لایه‌های عمقی درم خنثی می‌سازد.',
    activeIngredients: ['بیومارین کلاژن ۲۰۰mg', 'عصاره پوست کاج (پیکنوژنول)', 'کوآنزیم Q10', 'عصاره هسته انگور', 'سیلیکون، زینک و سلنیوم'],
    clinicalUsage: 'روزانه ۲ عدد قرص همراه با وعده غذایی اصلی با آب میل فرمایید. بیش از دوز توصیه شده مصرف نشود.',
    contraindications: ['افراد با سابقه حساسیت به فرآورده‌های دریایی (ماهی و میگو) با احتیاط مصرف نمایند.', 'در دوران بارداری با نظر پزشک زنان مصرف گردد.'],
    storageConditions: 'در جای خشک و خنک، دمای زیر ۲۵ درجه سانتی‌گراد نگهداری شود.',
    pharmacistNote: 'برای اثربخشی بالینی بر تراکم کلاژن لایه درم پوست، مصرف یک دوره کامل ۳ ماهه توصیه اکید می‌گردد.',
    tags: ['ضد چروک', 'کلاژن ساز', 'جوانساز پوست', 'ضد ریزش مو', 'ویتابیوتیکس اورجینال'],
    frequentlyBoughtWith: ['prod-4']
  },
  {
    id: 'prod-3',
    nameFa: 'کرم آبرسان قوی هیالورونیک اسید B5 لاروش پوزای',
    nameEn: 'La Roche-Posay Hyalu B5 Serum Cream',
    brand: 'لاروش پوزای (La Roche-Posay)',
    brandOrigin: 'فرانسه',
    category: 'مراقبت پوست و مو',
    categorySlug: 'skin-hair',
    price: 1420000,
    salePrice: 1278000,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw1htnFiPq95NhvcPd1BSCU-7EDbqfmZtfPIy8h_6beIlegksm_I1iyp9D2VhHAXKkommGciLsXiERovJU_uZGpw2gJHHSDyv3kctWLpbSGmKxJW20XHqmapM6zh7zPkKrAnwIaRA67OoWbKPaNTOoSY2K7rfEvtlTGcbeDXB31fLcWaDaASB5Chz9b-W41nr-Yojk1i0kpI5yhKWzW16_Ru-8GaycW-t8AHSNqGKKs6wfwPdeci3E',
    ttacId: '۹۰۱۸۴۵۶۲',
    ircCode: 'IRC-4491028',
    prescriptionType: 'OTC',
    isColdChain: false,
    dosageForm: 'سرم درماتولوژیک با قطره‌چکان',
    packageSize: 'ویال شیشه‌ای ۴۰ میلی‌لیتر',
    targetAudience: 'پوست‌های دهیدراته، حساس و آسیب‌دیده',
    expiryNotice: 'تنها ۳ عدد در انبار باقیست (انقضا ۲۰۲۷/۰۲)',
    stockStatus: 'LOW_STOCK',
    selectedVariantId: 'var-3-1',
    variants: [
      {
        id: 'var-3-1',
        name: 'شیشه قطره‌چکان ۴۰ میلی‌لیتر استاندارد',
        sku: 'LRP-HYALU-B5-40',
        price: 1420000,
        salePrice: 1278000,
        inStock: true,
        batches: [
          { id: 'b-3-1', batchNumber: 'LRP7710', expiryDate: '۲۰۲۷/۰۲', availableQty: 3, reservedQty: 2, shelfLocation: 'C-01-14', purchaseCost: 1050000 }
        ]
      }
    ],
    shortDesc: 'حاوی هیالورونیک اسید با دو وزن مولکولی برای نفوذ سطحی و عمقی، ویتامین B5 التیام‌بخش و مادکاسوزید ترمیم‌کننده.',
    description: 'سرم درماتولوژیک هیالو B5 لاروش پوزای با آب چشمه حرارتی التیام‌بخش لاروش پوزای فرموله شده است. این محصول بافت پوست آسیب‌دیده در اثر لیزر، پیلینگ یا اگزمای فصلی را ظرف ۴ ساعت تسکین داده و خطوط ناشی از خشکی را پر می‌کند.',
    activeIngredients: ['هیالورونیک اسید با وزن مولکولی بالا و پایین', 'پانتنول (پروویتامین B5 معادل ۵٪)', 'مادکاسوزید گیاهی (Madecassoside)', 'آب چشمه درمانی لاروش پوزای'],
    clinicalUsage: 'صبح و شب ۳ الی ۴ قطره بر روی پوست تمیز و کمی مرطوب صورت و گردن ماساژ داده شود.',
    contraindications: ['از تماس مستقیم با مخاط چشم خودداری شود.'],
    storageConditions: 'در دمای ۱۵ الی ۲۵ درجه سانتی‌گراد، دور از دسترس اطفال نگهداری شود.',
    pharmacistNote: 'نکته طلایی داروساز: سرم‌های هیالورونیک حتماً باید بر روی پوست نم‌دار زده شوند تا آب موجود روی پوست را به لایه‌های اپیدرم قفل کنند، در غیر این صورت ممکن است حس کشیدگی ایجاد شود.',
    tags: ['آبرسان قوی', 'ترمیم کننده', 'هیالورونیک اسید', 'لاروش پوزای اورجینال', 'سرم پوست'],
    frequentlyBoughtWith: ['prod-2']
  },
  {
    id: 'prod-4',
    nameFa: 'مکمل امگا ۳ اولترا باری ویتال بدون جیوه ۱۰۰۰mg',
    nameEn: 'BariVital Ultra Omega 3 Mercury Free 1000mg',
    brand: 'باری ویتال (BariVital)',
    brandOrigin: 'ایران / تحت لیسانس سوئیس',
    category: 'ویتامین‌ها و مینرال‌ها',
    categorySlug: 'vitamins',
    price: 450000,
    salePrice: 360000,
    discountPercent: 20,
    rating: 4.7,
    reviewsCount: 78,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2y5bJ94t3z4thBrXJlgWvDZ72DL--2tl5Q72EhzzxCLQikySg4pv5gFWGMwwXJKKQsMRv9vbnRqe4WWGKHvdwIQwwyRmmB5opReqoCILgyRyVk5a8tNG_s9ZGM0auz0mWqrimq1brYAzWB-n5-GavnCM4F0_rqpT2Jryg8XvF23L43gwrIJxoeXbrqIxO5vbptwYUyDX63QdKoHeL4kWdggaCYNmiLNa7fDPSGKwZG-R8Ivt_F9tI',
    ttacId: '۳۳۱۸۹۵۰۱',
    ircCode: 'IRC-991204',
    prescriptionType: 'SUPPLEMENT',
    isColdChain: false,
    dosageForm: 'کپسول ژلاتینی نرم (سافت‌ژل)',
    packageSize: 'قوطی ۹۰ عددی',
    targetAudience: 'سلامت قلب، عروق، مفاصل و بهبود بینایی',
    expiryNotice: 'تاریخ انقضا: ۲۰۲۶/۱۲',
    stockStatus: 'IN_STOCK',
    selectedVariantId: 'var-4-1',
    variants: [
      {
        id: 'var-4-1',
        name: 'قوطی ۹۰ عددی (دوره ۳ ماهه)',
        sku: 'BV-OMEGA-90',
        price: 450000,
        salePrice: 360000,
        inStock: true,
        batches: [
          { id: 'b-4-1', batchNumber: 'BV2408W', expiryDate: '۲۰۲۶/۱۲', availableQty: 60, reservedQty: 5, shelfLocation: 'A-08-02', purchaseCost: 260000 }
        ]
      }
    ],
    shortDesc: 'تقطیر مولکولی پیشرفته جهت حذف کامل جیوه و فلزات سنگین، غنی از EPA معادل ۳۶۰mg و DHA معادل ۲۴۰mg.',
    description: 'سافت‌ژل امگا ۳ اولترا باری ویتال از روغن ماهیان آب‌های سرد شمال اقیانوس استخراج شده و با تکنولوژی پیشرفته داروسازی تقطیر مولکولی شده تا از عدم وجود سرب، کادمیوم، جیوه و دی‌اکسین اطمینان حاصل شود. این محصول سلامت عروق کرونر، کنترل تری‌گلیسرید خون و بهبود انعطاف‌پذیری غضروف مفاصل را ارتقا می‌بخشد.',
    activeIngredients: ['روغن ماهی خالص ۱۰۰۰mg', 'اسید ایکوزاپنتانوئیک (EPA) معادل ۳۶۰mg', 'اسید دوکوزاهگزانوئیک (DHA) معادل ۲۴۰mg', 'ویتامین E طبیعی ۵mg'],
    clinicalUsage: 'روزانه ۱ الی ۲ عدد سافت‌ژل بعد از غذای چرب با مقدار کافی آب میل شود.',
    contraindications: ['بیماران تحت درمان با داروهای رقیق‌کننده خون قبل از مصرف با پزشک معالج هماهنگ کنند.'],
    storageConditions: 'در دمای زیر ۲۵ درجه، دور از نور مستقیم و در ظروف در بسته نگهداری شود.',
    pharmacistNote: 'برای جلوگیری از بوی ناخوشایند ماهی در دهان، سافت‌ژل را دقیقاً در میانه وعده غذایی یا همراه با شام مصرف نمایید.',
    tags: ['امگا ۳', 'بدون جیوه', 'سلامت قلب و عروق', 'کاهش کلسترول', 'تقویت حافظه'],
    frequentlyBoughtWith: ['prod-1']
  },
  {
    id: 'prod-5',
    nameFa: 'دستگاه تست قند خون بیورر آلمان مدل GL42',
    nameEn: 'Beurer GL42 Blood Glucose Monitor Kit',
    brand: 'بیورر (Beurer)',
    brandOrigin: 'آلمان',
    category: 'تجهیزات پزشکی',
    categorySlug: 'equipment',
    price: 1100000,
    salePrice: 968000,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 65,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcPBM-aw1noAYCaVMYMiGAkzJKWnQxD9bfpavLRrgn0AP-uVhP67p3Ef7zUl53BvwBSFLVU8DDChad-CHuTdp8c5P_paFkcMMnfLBTw3E1h7UCC3gUGaswGIVMI9Fh99BXi0pTzX0536xhWwMUYdVgxWzZh-K6lz8gfrttuntc9XKZISMrrTYU4wqCVOBvyIkcJ-Yc7sSM7ocDBe8iTyacQ9iPo6cCOyqrH2gRmU6sguuGRysWZxo7',
    ttacId: '۵۵۴۹۱۰۹',
    ircCode: 'IRC-MED-44102',
    prescriptionType: 'MEDICAL_DEVICE',
    isColdChain: false,
    dosageForm: 'کیت کامل دستگاه دیجیتال + ۵۰ نوار تست + اتولنست',
    packageSize: 'کیت مسافرتی همراه با کیف محافظ',
    targetAudience: 'بیماران دیابتی و پایش قند در منزل',
    expiryNotice: 'دستگاه دارای ۲ سال گارانتی رسمی تعویض شرکتی',
    stockStatus: 'IN_STOCK',
    selectedVariantId: 'var-5-1',
    variants: [
      {
        id: 'var-5-1',
        name: 'کیت کامل دستگاه + ۵۰ عدد نوار تست رایگان',
        sku: 'BEU-GL42-KIT',
        price: 1100000,
        salePrice: 968000,
        inStock: true,
        batches: [
          { id: 'b-5-1', batchNumber: 'BEU24-90', expiryDate: '۲۰۲۷/۰۵', availableQty: 18, reservedQty: 2, shelfLocation: 'E-03-09', purchaseCost: 780000 }
        ]
      }
    ],
    shortDesc: 'کالیبراسیون اتوماتیک پلاسما، بدون نیاز به کدگذاری دستی، خوانش دقیق قند خون در ۵ ثانیه با تنها ۰.۶ میکرولیتر خون.',
    description: 'دستگاه بیورر GL42 محصول مهندسی دقیق پزشکی آلمان مطابق با استاندارد بین‌المللی ISO 15197:2013 کالیبره شده است. این دستگاه مجهز به نمایشگر بزرگ با نور پس‌زمینه آبی، حافظه ۴۸۰ تایی با درج تاریخ و ساعت و سیستم هشدار افت قند خون (هیپوگلیسمی) می‌باشد.',
    activeIngredients: ['تراشه آنزیم گلوکز اکسیداز کالیبره', 'الکترودهای طلاکاری شده نوار تست'],
    clinicalUsage: 'پس از ضدعفونی نوک انگشت با پد الکلی، نمونه خون ۰.۶ میکرولیتری را روی لبه نوار تست قرار دهید. نتیجه پس از ۵ ثانیه روی صفحه نقش می‌بندد.',
    contraindications: ['نوارهای تست را تنها در دمای اتاق و درب بسته نگهداری کنید.'],
    storageConditions: 'در دمای ۲ الی ۳۰ درجه سانتی‌گراد، به دور از رطوبت شدید نگهداری شود.',
    pharmacistNote: 'دقت دستگاه‌های تست قند در دمای زیر ۱۰ یا بالای ۴۰ درجه مختل می‌شود؛ پیش از تست دستگاه را در دمای اتاق نگه دارید.',
    tags: ['تست قند خون', 'بیورر آلمان', 'تجهیزات پزشکی خانگی', 'گارانتی رسمی', 'دیابت'],
    frequentlyBoughtWith: ['prod-1']
  },
  {
    id: 'prod-6',
    nameFa: 'پروتئین وی ایزوله ۱۰۰٪ کارن (Karen Whey Isolate)',
    nameEn: 'Karen 100% Whey Protein Isolate 1818g',
    brand: 'کارن (karen)',
    brandOrigin: 'ایران',
    category: 'مکمل ورزشی و بدنسازی',
    categorySlug: 'sports',
    price: 2450000,
    salePrice: 2180000,
    discountPercent: 11,
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZNzJME0U-26uIv1XA4E0gv-FfNASwwQ9vIsW5kc4Qe1pLN_3uc1kVLZtuQ9IfY-MnsUiK9SgzsKwG7jmIZBaMXMkXYmNRWAL3zFglAYzCdP3zG7weuRbQOAtk6KXrWztj2JCkI9lmbXsSbueDou-0kjyLFa8C__T6sqF3MfFn0KywVjUvv1nmfBVzxXRxtZUW7NWkhLA6wfv6iNxU-X6AMKNhwnJVHPon5BD0pASpflNoqzt9lWCm',
    ttacId: '۱۱۹۸۲۴۰',
    ircCode: 'IRC-SPO-8911',
    prescriptionType: 'SUPPLEMENT',
    isColdChain: false,
    dosageForm: 'پودر میکرونایز حل‌شونده فوری',
    packageSize: 'سطل ۱۸۱۸ گرمی (۵۵ سروینگ)',
    targetAudience: 'ورزشکاران، رژیم‌های کات عضلانی و افراد حساس به لاکتوز',
    expiryNotice: 'تاریخ انقضا: ۲۰۲۶/۰۸',
    stockStatus: 'IN_STOCK',
    selectedVariantId: 'var-6-1',
    variants: [
      {
        id: 'var-6-1',
        name: 'طعم دابل شکلات ۱۸۱۸ گرم',
        sku: 'KAR-WHEY-ISO-CHOC',
        price: 2450000,
        salePrice: 2180000,
        inStock: true,
        batches: [
          { id: 'b-6-1', batchNumber: 'KW24-D11', expiryDate: '۲۰۲۶/۰۸', availableQty: 22, reservedQty: 2, shelfLocation: 'S-01-02', purchaseCost: 1750000 }
        ]
      },
      {
        id: 'var-6-2',
        name: 'طعم وانیل فرانسوی ۱۸۱۸ گرم',
        sku: 'KAR-WHEY-ISO-VAN',
        price: 2450000,
        salePrice: 2180000,
        inStock: true,
        batches: [
          { id: 'b-6-2', batchNumber: 'KW24-D12', expiryDate: '۲۰۲۶/۰۹', availableQty: 14, reservedQty: 1, shelfLocation: 'S-01-03', purchaseCost: 1750000 }
        ]
      }
    ],
    shortDesc: 'حاوی ۲۷ گرم پروتئین خالص وی ایزوله در هر اسکوپ، بدون چربی اشباع و نزدیک به صفر لاکتوز با سرعت هضم فوق‌العاده.',
    description: 'پروتئین وی ایزوله کارن با تکنولوژی فیلتراسیون جریان متقاطع (Cross-Flow Microfiltration) تولید شده تا ساختار پروتئینی دناتوره نشود. این مکمل غنی از اسیدهای آمینه شاخه‌دار (BCAA) و گلوتامین است که بازسازی بافت عضلانی پس از تمرینات سنگین را بدون ایجاد عوارض گوارشی و نفخ تضمین می‌نماید.',
    activeIngredients: ['پروتئین وی ایزوله WPI معادل ۲۷g در سروینگ', 'BCAA معادل ۵.۵g', 'گلوتامین ۴g', 'فاقد قند افزوده'],
    clinicalUsage: 'یک پیمانه (۳۳ گرم) را در ۲۵۰ میلی‌لیتر آب یا شیر کم‌چرب حل کرده و بلافاصله پس از تمرین میل فرمایید.',
    contraindications: ['افراد مبتلا به نارسایی مزمن کلیه تحت نظر پزشک مصرف کنند.'],
    storageConditions: 'در جای خشک و خنک، درب سطل را پس از هر بار مصرف کاملاً محکم ببندید.',
    pharmacistNote: 'به دلیل جداسازی تقریباً ۱۰۰ درصدی لاکتوز در این محصول، ورزشکارانی که به شیر حساسیت دارند به راحتی می‌توانند از این منبع پروتئینی استفاده کنند.',
    tags: ['وی ایزوله', 'کارن اصل', 'پروتئین ورزشی', 'بدون لاکتوز', 'عضله سازی خشک'],
    frequentlyBoughtWith: ['prod-4']
  }
];

export const HEALTH_CONCERNS: HealthConcern[] = [
  {
    id: 'concern-hair-loss',
    title: 'ریزش و نازک شدن تارهای مو',
    subtitle: 'مهار هورمون DHT و تقویت ریشه مو با مکمل‌های زینک و سیستین',
    iconName: 'keyboard_double_arrow_left',
    badge: 'مخصوص آقایان و بانوان',
    description: 'ترکیب بیوتین در دوزهای درمانی، کلاژن هیدرولیز شده نوع ۱ و ۳ و کمپلکس اسیدهای آمینه گوگرددار برای قطع ریزش تلوژن افلوویوم و تحریک فولیکول‌های خفته.',
    keyIngredients: ['بیوتین ۵۰۰۰mcg', 'زینک گلوکونات', 'کلاژن هیدرولیز شده نوع ۱ و ۳', 'سیستین B6'],
    productsCount: 44,
    recommendedProductIds: ['prod-2', 'prod-1'],
    clinicalProtocol: {
      step1: 'پاکسازی پوست سر و تقویت ساقه با شامپوی حاوی کافئین و زینک',
      step2: 'مصرف روزانه کپسول تقویتی حاوی اسیدهای آمینه گوگرددار و بیوتین با ناهار',
      step3: 'استفاده موضعی از محلول پپتیدی محرک گردش خون مویرگی کف سر قبل از خواب',
      duration: 'دوره درمانی توصیه شده: ۳ ماه مداوم',
      pharmacistTip: 'آزمایش سطح فریتین خون و ویتامین D پیش از شروع درمان ریزش مو الزامی است تا کم‌خونی پنهان برطرف گردد.'
    }
  },
  {
    id: 'concern-skin-dryness',
    title: 'خشکی شدید، اگزما و التهاب پوستی',
    subtitle: 'ترمیم سد دفاعی پوست با سرامیدهای خالص و هیالورونیک اسید',
    iconName: 'dermatology',
    badge: 'سد دفاعی پوست',
    description: 'بازسازی لایه هیدرولیپیدی پوست، رفع خارش و پوسته‌ریزی ناشی از آلودگی، تغییر فصل یا درمان‌های آکنه با فرمول‌های غیرکومدوژنیک.',
    keyIngredients: ['سرامید NP و AP', 'هیالورونیک اسید چندوزنی', 'نیاسینامید ۴٪', 'روغن دانه گاوزبان'],
    productsCount: 31,
    recommendedProductIds: ['prod-3'],
    clinicalProtocol: {
      step1: 'استفاده از شوینده‌های ملایم غیرصابونی (سندت بار یا ژل شستشوی بدون سولفات)',
      step2: 'آبرسانی عمیق با سرم هیالورونیک اسید روی پوست کمی مرطوب',
      step3: 'قفل کردن رطوبت با کرم حاوی کمپلکس سرامید و نیاسینامید',
      duration: 'دوره درمان: ۲ الی ۶ هفته تا ترمیم کامل سد دفاعی',
      pharmacistTip: 'از شستشوی صورت با آب داغ جداً خودداری کنید زیرا چربی‌های مفید بین سلولی پوست را حل می‌کند.'
    }
  },
  {
    id: 'concern-immunity',
    title: 'تقویت ایمنی و پیشگیری از عفونت',
    subtitle: 'افزایش آمادگی گلبول‌های سفید با آنتی‌اکسیدان‌ها و ویتامین D3',
    iconName: 'shield_with_heart',
    badge: 'فصلی و پیشگیرانه',
    description: 'ارتقای سیستم دفاعی موکوسی دستگاه تنفس و کاهش طول دوره سرماخوردگی فصلی با هم‌افزایی ویتامین C لیپوزومال و زینک.',
    keyIngredients: ['ویتامین D3 طبیعی ۵۰۰۰IU', 'ویتامین C لیپوزومال', 'عصاره اکیناسه استاندارد شده', 'سلنیوم شلاته'],
    productsCount: 52,
    recommendedProductIds: ['prod-1', 'prod-4'],
    clinicalProtocol: {
      step1: 'مصرف هفتگی یا ماهانه ویتامین D3 با توجه به آزمایش سرمی خون',
      step2: 'مکمل ویتامین C جوشان یا لیپوزومال همراه با صبحانه',
      step3: 'استفاده از عصاره استاندارد پروپولیس یا اکیناسه در فصول سرد',
      duration: 'دوره پیشگیرانه: پاییز و زمستان',
      pharmacistTip: 'ویتامین D3 محلول در چربی است و جذب آن با یک وعده غذایی حاوی روغن زیتون یا کره تا ۵۰٪ افزایش می‌یابد.'
    }
  },
  {
    id: 'concern-joint-pain',
    title: 'درد مفاصل و بازسازی غضروف',
    subtitle: 'کاهش سفتی صبحگاهی زانو و افزایش مایع سینوویال',
    iconName: 'accessibility_new',
    badge: 'مفصلی و استخوان',
    description: 'کاهش التهاب مفصلی با گلوکزآمین سولفات بدون سدیم، کندروئیتین دریایی و امگا ۳ برای مبتلایان به آرتروز و ورزشکاران.',
    keyIngredients: ['گلوکزآمین سولفات ۱۵۰۰mg', 'کندروئیتین دریایی', 'متیل‌سولفونیل‌متان (MSM)', 'عصاره زردچوبه'],
    productsCount: 26,
    recommendedProductIds: ['prod-4'],
    clinicalProtocol: {
      step1: 'کنترل التهاب حاد با مکمل‌های گیاهی ضدالتهاب کورکومین و MSM',
      step2: 'مصرف روزانه گلوکزآمین سولفات با دوز تقسیم شده پس از غذا',
      step3: 'همراه کردن با اسیدهای چرب امگا ۳ با خلوص بالا جهت مهار سیتوکین‌ها',
      duration: 'دوره درمان: حداقل ۲ تا ۳ ماه متوالی',
      pharmacistTip: 'گلوکزآمین سولفات در مقایسه با هیدروکلراید، زیست‌دسترسی بهتری برای بازسازی بافت همبند مفاصل دارد.'
    }
  },
  {
    id: 'concern-sleep-stress',
    title: 'کاهش استرس، بهبود خواب و خستگی مزمن',
    subtitle: 'تنظیم ریتم شبانه‌روزی بدون ایجاد وابستگی دارویی',
    iconName: 'bedtime',
    badge: 'سیستم عصبی',
    description: 'تثبیت انتقال‌دهنده‌های عصبی آرامش‌بخش (GABA) با منیزیم بیس‌گلیسینات، ویتامین B6 و ملاتونین ساب‌لینگوآل.',
    keyIngredients: ['منیزیم بیس‌گلیسینات ۲۰۰mg', 'ملاتونین ساب‌لینگوآل ۳mg', 'عصاره ریشه سنبل‌الطیب', 'گل ساعتی'],
    productsCount: 38,
    recommendedProductIds: ['prod-1'],
    clinicalProtocol: {
      step1: 'قطع مصرف قهوه و کافئین بعد از ساعت ۴ بعدازظهر',
      step2: 'مصرف ساشه یا قرص منیزیم بیس‌گلیسینات ۲ ساعت پیش از خواب',
      step3: 'قرار دادن قرص زیرزبانی ملاتونین ۳۰ دقیقه قبل از خاموشی',
      duration: 'دوره استفاده: ۲ الی ۴ هفته به عنوان تنظیم‌کننده ریتم',
      pharmacistTip: 'ملح بیس‌گلیسینات منیزیم بر خلاف اکسید منیزیم، اسهال ایجاد نکرده و به سرعت از سد خونی-مغزی عبور می‌کند.'
    }
  },
  {
    id: 'concern-pregnancy',
    title: 'مکمل‌های پیش از بارداری و دوران حاملگی',
    subtitle: 'تامین نیازهای تکامل مغز جنین و ذخایر آهن مادر',
    iconName: 'pregnant_woman',
    badge: 'مراقبت جنین و مادر',
    description: 'فرمولاسیون‌های پیشرفته حاوی فولات فعال (۵-MTHF)، آهن سوکروزومیال فاقد عوارض یبوست و ید کافی مطابق رهنمودهای بالینی.',
    keyIngredients: ['متیل‌فولات (نه اسید فولیک خام)', 'امگا ۳ با DHA بالا', 'آهن سوکروزومیال', 'ید و کلسیم هیدروکسی'],
    productsCount: 22,
    recommendedProductIds: ['prod-1', 'prod-4'],
    clinicalProtocol: {
      step1: 'شروع مصرف متیل‌فولات حداقل ۳ ماه پیش از اقدام به بارداری',
      step2: 'افزودن آهن سوکروزومیال و کلسیم با فاصله زمانی مشخص در سه‌ماهه دوم',
      step3: 'مصرف کپسول امگا ۳ با درصد بالای اسید چرب DHA برای تشکیل شبکیه و مغز جنین',
      duration: 'طول دوره بارداری و ۳ ماه شیردهی',
      pharmacistTip: 'بسیاری از افراد به دلیل نقص ژنتیکی آنزیم MTHFR توان تبدیل اسید فولیک معمولی را ندارند، لذا استفاده از متیل‌فولات ارجحیت دارد.'
    }
  }
];

export const CERTIFIED_BRANDS: CertifiedBrand[] = [
  { id: 'b-vitabiotics', nameEn: 'VITABIOTICS', nameFa: 'ویتابیوتیکس', origin: 'انگلستان', category: 'مکمل‌های درمانی و تخصصی', officialImporter: 'داروسازی مداوا', logoText: 'VITABIOTICS', badge: 'نماینده رسمی انگلستان' },
  { id: 'b-laroche', nameEn: 'LA ROCHE-POSAY', nameFa: 'لاروش پوزای', origin: 'فرانسه', category: 'درماتولوژی و مراقبت درمانی پوست', officialImporter: 'روژین درم', logoText: 'LA ROCHE-POSAY', badge: 'مجوز غذا و دارو' },
  { id: 'b-cerave', nameEn: 'CeraVe', nameFa: 'سراوی', origin: 'فرانسه/آمریکا', category: 'ترمیم سد دفاعی و سرامیدها', officialImporter: 'پارس درما سلامت', logoText: 'CeraVe', badge: 'برچسب اصالت TTAC' },
  { id: 'b-doppel', nameEn: 'Doppelherz', nameFa: 'داپلهرتز', origin: 'آلمان', category: 'ویتامین‌ها و سلامت قلب و مفاصل', officialImporter: 'کیش مدیفارم', logoText: 'Doppelherz', badge: 'استاندارد GMP آلمان' },
  { id: 'b-karen', nameEn: 'karen', nameFa: 'داروسازی کارن', origin: 'ایران', category: 'تغذیه ورزشی و انترال بیمارستانی', officialImporter: 'تولید کننده مستقیم', logoText: 'karen', badge: 'برترین برند مکمل ورزشی' },
  { id: 'b-barij', nameEn: 'BARIJ', nameFa: 'باریج اسانس', origin: 'ایران', category: 'داروهای گیاهی و طب سنتی علمی', officialImporter: 'تولید کننده مستقیم', logoText: 'BARIJ', badge: 'داروسازی استاندارد' },
  { id: 'b-cerita', nameEn: 'CERITA', nameFa: 'سریتا تخصصی', origin: 'ایران', category: 'درمان تخصصی مو و ابرو', officialImporter: 'پارس آزمای طب', logoText: 'CERITA', badge: 'فرمولاسیون آزمایشگاهی' },
  { id: 'b-cinere', nameEn: 'CINERE', nameFa: 'سینره', origin: 'ایران', category: 'مراقبت پوست و موی ارگانیک', officialImporter: 'طبیعت زنده', logoText: 'CINERE', badge: 'تاییدیه بالینی' }
];

export const CLINICAL_ARTICLES: ClinicalArticle[] = [
  {
    id: 'art-1',
    title: 'تفاوت ویتامین D3 و D2؛ چه دوزی برای مصرف ماهیانه یا هفتگی واقعاً ایمن است؟',
    category: 'راهنمای مکمل‌ها',
    readingTime: '۵ دقیقه',
    author: 'دکتر مهرداد کاظمی',
    authorTitle: 'متخصص فارماکوتراپی و داروساز بالینی',
    authorAvatar: 'د.ک',
    summary: 'بررسی سطح سرمی 25-OH-D در آزمایش خون، تفاوت جذب کوله‌کلسیفرول با ارگوکلسیفرول و هشدارهای مربوط به سمیت کلیوی در مصرف خودسرانه دوزهای ۵۰٬۰۰۰ واحدی.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5FZTOIkWuOI3lalfEuYROZv-cPA9F3NexTa5sibDAjg2ps1Vj3ruSkWIaoVEh7kwJZ_RWxZKYf3zGRy0KXJ4C5nBZw_DIQxVc79GoXDwdsn__ulVAXnxXoy7PkgzgmxOGfjICnh_Q2r4gGSjPGaZW3zgQTsq0XJGHBnpKHnKjaFfS4DIKDDffDc-EMiUIlR2nbYoHaLuWg4U7i2nqtagiF_HFLz7xHylN_SyIar94A5qtUIViHw9-',
    relatedProductIds: ['prod-1']
  },
  {
    id: 'art-2',
    title: 'بهترین روتین پوستی برای ترمیم سد دفاعی آسیب‌دیده با سرم نیاسینامید و سرامید',
    category: 'درماتولوژی بالینی',
    readingTime: '۸ دقیقه',
    author: 'دکتر فرزانه رضایی',
    authorTitle: 'داروساز و مشاور پوست و مو',
    authorAvatar: 'د.ر',
    summary: 'چگونه قرمزی و سوزش ناشی از لایه‌بردارهای شیمیایی را کنترل کنیم؟ پروتکل ۳ مرحله‌ای بازسازی لایه هیدرولیپیدی پوست بدون ایجاد جوش زیرپوستی.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmvig6AcwpG8Y7vEY2EpF7b-qQ6XshTEebNwAt53ldIasGT5TLvBL9AJz8me9GyX-XebI7RTsJMXx2yRGyzcn7omKjDCJSDH3LR3zIGf-JOMKfx8o11B1uL48uQe0W9fnZQMOTs5B7JwdRCW4ynWhAJCW_X_O4MJulx6RWxq6Yv40A2_ACOdO9Unl2_EzWeFSRtWVojwBrhA1qSANTDFbWqavDbfaS5YypV11ZExi5eFna-epq_CB-',
    relatedProductIds: ['prod-3', 'prod-2']
  },
  {
    id: 'art-3',
    title: 'راهنمای انتخاب پروتئین وی ایزوله یا کنسانتره بر اساس حساسیت به لاکتوز',
    category: 'تغذیه ورزشی',
    readingTime: '۶ دقیقه',
    author: 'دکتر حسینی',
    authorTitle: 'متخصص داروسازی بالینی و مسئول فنی',
    authorAvatar: 'د.ح',
    summary: 'مقایسه درصد خلوص اسیدهای آمینه شاخه‌دار (BCAA)، سرعت هضم در پنجره آنابولیک و انتخاب هوشمندانه برای ورزشکاران دارای گوارش حساس.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZNzJME0U-26uIv1XA4E0gv-FfNASwwQ9vIsW5kc4Qe1pLN_3uc1kVLZtuQ9IfY-MnsUiK9SgzsKwG7jmIZBaMXMkXYmNRWAL3zFglAYzCdP3zG7weuRbQOAtk6KXrWztj2JCkI9lmbXsSbueDou-0kjyLFa8C__T6sqF3MfFn0KywVjUvv1nmfBVzxXRxtZUW7NWkhLA6wfv6iNxU-X6AMKNhwnJVHPon5BD0pASpflNoqzt9lWCm',
    relatedProductIds: ['prod-6']
  }
];

export const INITIAL_PRESCRIPTIONS: PrescriptionOrder[] = [
  {
    id: 'rx-901',
    trackingNumber: 'RX-1403-8821',
    patientNationalId: '۰۰۱۲۳۴۵۶۷۸',
    insuranceType: 'تامین اجتماعی',
    rxTrackingCode: '۸۴۹۲۰۱',
    phoneNumber: '۰۹۱۲۳۴۵۶۷۸۹',
    isColdChain: true,
    status: 'APPROVED',
    submittedAt: '۱۴۰۳/۰۶/۲۳ - ۱۰:۱۵',
    reviewedBy: 'دکتر حسینی (نظام: د-۱۲۸۴۰)',
    pharmacistNotes: 'داروی لانتوس (انسولین گلارژین) تایید شد. نیازمند ارسال فوری با کیف کول‌پک عایق یخچالی.',
    totalOfficialPrice: 680000,
    insuranceDeduction: 476000,
    patientShare: 204000,
    itemsDetected: ['انسولین قلمی لانتوس ۱۰۰ واحد (۳ عدد)', 'سر سوزن گیج ۳۱ (۱۰۰ عددی)']
  },
  {
    id: 'rx-902',
    trackingNumber: 'RX-1403-8822',
    patientNationalId: '۰۰۲۹۱۸۴۵۱۲',
    insuranceType: 'بیمه سلامت',
    rxTrackingCode: '۵۱۲۰۹۳',
    phoneNumber: '۰۹۱۸۵۵۵۴۳۲۱',
    isColdChain: false,
    status: 'PENDING_REVIEW',
    submittedAt: '۱۴۰۳/۰۶/۲۳ - ۱۱:۳۰',
    pharmacistNotes: 'در صف بررسی تداخل دارویی توسط داروساز کشیک',
    totalOfficialPrice: 420000,
    insuranceDeduction: 294000,
    patientShare: 126000,
    itemsDetected: ['قرص متفورمین ۵۰۰ (۱۰۰ عدد)', 'آتورواستاتین ۲۰ (۳۰ عدد)']
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    operator: 'دکتر حسینی',
    role: 'مسئول فنی داروساز',
    action: 'تایید نسخه الکترونیک',
    entity: 'RX-1403-8821',
    details: 'محاسبه سهم بیمه تامین اجتماعی و تخصیص سهمیه لانتوس با زنجیره سرد',
    timestamp: '۱۴۰۳/۰۶/۲۳ ۱۰:۲۲',
    ip: '192.168.1.104'
  },
  {
    id: 'aud-2',
    operator: 'مهندس رضوی (هیمورا)',
    role: 'مدیر انباردار',
    action: 'ثبت بچ ورودی جدید',
    entity: 'NL-MV-60 (NutraLab)',
    details: 'ورود بچ NL24B09 با انقضای ۲۰۲۶/۰۹ به تعداد ۵۰ عدد در قفسه A-12-04',
    timestamp: '۱۴۰۳/۰۶/۲۳ ۰۹:۱۵',
    ip: '192.168.1.112'
  },
  {
    id: 'aud-3',
    operator: 'خانم مرادی',
    role: 'پشتیبانی فروش',
    action: 'تخصیص سفارش به پیک اکسپرس',
    entity: 'ORD-1403-5591',
    details: 'ارسال با کول‌پک به مقصد تهران، محله یوسف‌آباد',
    timestamp: '۱۴۰۳/۰۶/۲۳ ۰۸:۴۰',
    ip: '192.168.1.108'
  }
];
