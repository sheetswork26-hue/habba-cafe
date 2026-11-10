# حَبّة — صفحة هبوط لكافيه قهوة مختصة

صفحة هبوط عربية (RTL) لكافيه وهمي في المعادي، القاهرة.

> مشروع تجريبي لمعرض الأعمال، والبراند وهمي. فورم الحجز والطلب للعرض فقط: مفيش بيانات بتتبعت ولا بتتحفظ.

## التقنيات

Vite · React · TypeScript · Tailwind CSS v4 · Framer Motion

## التشغيل

محتاج Node.js 20 أو أحدث.

```bash
npm install
npm run dev
```

الصفحة هتفتح على `http://localhost:5173`.

| الأمر | وظيفته |
| --- | --- |
| `npm run dev` | سيرفر التطوير |
| `npm run build` | فحص الأنواع ثم بناء نسخة الإنتاج في `dist` |
| `npm run preview` | معاينة نسخة الإنتاج محليًا |
| `npm run typecheck` | فحص الأنواع فقط |

## الرفع على Vercel

الإعدادات جاهزة في `vercel.json` (أمر البناء، مجلد `dist`، وكاش طويل لملفات `assets`).

**من الموقع:** ارفع المشروع على GitHub، ثم من vercel.com اختار Add New → Project واختار الريبو. Vercel هيتعرف على Vite لوحده، دوس Deploy.

**من الـ CLI:**

```bash
npm i -g vercel
vercel
vercel --prod
```

بعد الرفع، حدّث `og:image` أو ضيف `og:url` في `index.html` لو عايز معاينة اللينك تظهر بدومينك.

## هيكل المشروع

```
src/
├── components/   كل قسم في كومبوننت (Navbar, Hero, Menu, BeanOfWeek, Gallery,
│                 Testimonials, Reservation, Hours, Footer, CartDrawer ...)
├── context/      CartContext: حالة سلة الطلب
├── data/         المحتوى: menu.ts, bean.ts, gallery.ts, testimonials.ts, hours.ts
├── hooks/        useTheme, useScrolled, useOpenStatus
└── lib/          images (روابط Unsplash), phone (التحقق من الرقم),
                  cairoTime (مفتوح/مقفول), format (أرقام وأسعار)
```

## تعديل المحتوى

- **المنيو والأسعار:** `src/data/menu.ts`. حقل `image` هو معرّف صورة Unsplash (الجزء اللي بعد `photo-` في الرابط).
- **بن الأسبوع:** `src/data/bean.ts`.
- **المواعيد والعنوان ولينك الخرائط:** `src/data/hours.ts`. المواعيد بالدقايق من بداية اليوم، و`close` أكبر من 1440 معناها القفل بعد نص الليل.
- **الألوان:** متغيرات CSS في أول `src/index.css` (فاتح في `:root` وليلي في `.dark`).
- **صورة الهيرو:** لو غيّرتها في `Hero.tsx` غيّر كمان الـ `preload` في `index.html`.

## المميزات

- منيو بتابات، وطلب أونلاين: سلة، كميات، استلام أو توصيل، وتأكيد تجريبي
- علامة «مفتوح دلوقتي / مقفول» محسوبة على توقيت القاهرة أيًّا كان توقيت الزائر
- فورم حجز بتحقق من رقم الموبايل المصري (010 / 011 / 012 / 015، بأرقام عربية أو بكود الدولة)
- وضع ليلي وفاتح، بيتحفظ وبيمشي ورا إعداد النظام أول مرة
- أنيميشن ظهور مع السكرول بيحترم `prefers-reduced-motion`
- صور `lazy` بـ `srcset`، وخطوط مستضافة مع المشروع (Reem Kufi و IBM Plex Sans Arabic)

## الأداء

Lighthouse على نسخة الإنتاج محليًا (`npm run preview`): 100 في الأداء وإمكانية الوصول وأفضل الممارسات والـ SEO، موبايل وديسكتوب. الأرقام على الاستضافة الفعلية ممكن تختلف شوية حسب الشبكة.

## الصور

كل الصور من [Unsplash](https://unsplash.com) وبتتحمّل من سيرفراتهم مباشرة.

## Deploy (Cloudflare Pages)

Live: https://habba-cafe.pages.dev

```bash
npm run build
npx wrangler pages deploy dist --project-name habba-cafe --branch main
```
Run wrangler in an interactive terminal.
