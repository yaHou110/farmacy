import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'درمانیک | داروخانه تخصصی آنلاین هیمورا',
  description: 'پلتفرم جامع تجارت الکترونیک سلامت و داروخانه شبانه‌روزی هیمورا با نظارت مستقیم دکتر داروساز، استعلام نسخه، پیگیری زنجیره سرد و تضمین اصالت کالا',
  openGraph: {
    title: 'درمانیک | داروخانه تخصصی آنلاین هیمورا',
    description: 'پلتفرم جامع تجارت الکترونیک سلامت و داروخانه شبانه‌روزی هیمورا با نظارت مستقیم دکتر داروساز، استعلام نسخه، پیگیری زنجیره سرد و تضمین اصالت کالا',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'درمانیک | داروخانه تخصصی آنلاین هیمورا',
    description: 'پلتفرم جامع تجارت الکترونیک سلامت و داروخانه شبانه‌روزی هیمورا با نظارت مستقیم دکتر داروساز',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8FAF7] text-[#191C1B] antialiased selection:bg-[#C9E6DE] selection:text-[#0A3D36]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
