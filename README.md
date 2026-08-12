# دليل الإعداد الكامل لمشروع سوق SouQ
### للمبتدئين — كل خطوة بالتفصيل

---

## قبل أي شيء — ماذا تحتاج؟

هذا المشروع يتكون من جزأين:
- **الفرونت اند** (الموقع الذي يراه الزوار) — يعمل الآن على http://localhost:3000
- **الباك اند** (الخادم الذي يدير البيانات والمستخدمين) — يحتاج إعداد

لتشغيل الباك اند تحتاج:
1. قاعدة بيانات PostgreSQL
2. قاعدة كاش Redis
3. حساب Google OAuth (لتسجيل الدخول بجوجل)
4. حساب SMTP (لإرسال رسائل OTP بالبريد)

---

## الخطوة 1 — تثبيت Node.js (إذا لم يكن مثبتاً)

> إذا كان `node --version` يعطيك رقماً مثل `v20.x.x` تجاوز هذه الخطوة.

1. افتح المتصفح واذهب إلى: **https://nodejs.org**
2. اضغط على الزر الأخضر الكبير الذي يقول **"LTS"** (الإصدار الثابت)
3. سيبدأ تحميل ملف `.msi`
4. افتح الملف بعد التحميل
5. اضغط **Next** في كل شاشة حتى تنتهي التثبيت
6. افتح **PowerShell** أو **Command Prompt** وتحقق:
   ```
   node --version
   npm --version
   ```
   يجب أن يظهر رقم إصدار لكل منهما.

---

## الخطوة 2 — تثبيت PostgreSQL (قاعدة البيانات)

### الطريقة السهلة — استخدام خدمة سحابية مجانية (نوصي بها)

استخدام **Supabase** (مجاني 100%) أسهل بكثير من التثبيت المحلي:

1. افتح المتصفح واذهب إلى: **https://supabase.com**
2. اضغط **"Start your project"** (الزر الأخضر الكبير)
3. اضغط **"Continue with GitHub"** أو **"Sign Up"**
4. أنشئ حساباً جديداً أو ادخل بحسابك
5. بعد تسجيل الدخول، اضغط **"New Project"**
6. اختر **Organization** (اسم مؤسستك — يمكنك كتابة اسمك)
7. في حقل **Project Name** اكتب: `souq`
8. في حقل **Database Password** اكتب كلمة مرور قوية واحفظها (ستحتاجها لاحقاً)
9. اختر منطقة قريبة منك مثل **Frankfurt (EU)** أو **Singapore**
10. اضغط **"Create new project"** وانتظر دقيقة أو دقيقتين
11. بعد إنشاء المشروع، اضغط على **"Settings"** من القائمة الجانبية اليسرى
12. اضغط على **"Database"**
13. تحت قسم **"Connection string"**، اختر **"URI"**
14. انسخ الرابط الذي يبدأ بـ `postgresql://...`
15. في الرابط استبدل `[YOUR-PASSWORD]` بكلمة المرور التي أنشأتها
16. **احفظ هذا الرابط** — سنضعه في ملف `.env`

### الطريقة البديلة — تثبيت محلي

1. اذهب إلى: **https://www.postgresql.org/download/windows/**
2. اضغط **"Download the installer"**
3. اختر الإصدار **16** وحمّله
4. افتح ملف التثبيت واضغط **Next** في كل شاشة
5. عند طلب كلمة مرور، اكتب: `postgres123` واحفظها
6. المنفذ الافتراضي `5432` — لا تغيّره
7. بعد انتهاء التثبيت، افتح **pgAdmin** من قائمة ابدأ
8. كليك يمين على **Databases** ← **Create** ← **Database**
9. في حقل **Name** اكتب: `souq`
10. اضغط **Save**
11. رابط قاعدة البيانات سيكون: `postgresql://postgres:postgres123@localhost:5432/souq`

---

## الخطوة 3 — تثبيت Redis (قاعدة الكاش)

Redis يُستخدم لتخزين رموز OTP وجلسات المستخدمين.

### الطريقة السهلة — استخدام خدمة سحابية مجانية

**Upstash Redis** — مجاني:

1. اذهب إلى: **https://upstash.com**
2. اضغط **"Start for Free"**
3. سجّل بحسابك على GitHub أو بالبريد الإلكتروني
4. بعد تسجيل الدخول اضغط **"Create Database"**
5. في حقل **Name** اكتب: `souq-cache`
6. اختر منطقة قريبة منك
7. اضغط **"Create"**
8. ستجد صفحة المعلومات — انظر إلى قسم **"Connect"**
9. اضغط على **"Redis CLI"** أو **".env"** لترى الرابط
10. انسخ الرابط الذي يبدأ بـ `redis://...` أو `rediss://...`
11. **احفظ هذا الرابط**

### الطريقة البديلة — تثبيت محلي (Windows)

1. اذهب إلى: **https://github.com/microsoftarchive/redis/releases**
2. حمّل الملف `Redis-x64-3.2.100.msi`
3. افتح الملف وثبّته (اضغط Next في كل شاشة)
4. Redis سيعمل تلقائياً كـ Windows Service
5. الرابط سيكون: `redis://localhost:6379`

---

## الخطوة 4 — إعداد Google OAuth (تسجيل الدخول بجوجل)

هذا يتيح للمستخدمين الدخول بحساب Google.

1. افتح **https://console.cloud.google.com**
2. سجّل الدخول بحسابك على Google
3. في الأعلى، اضغط على قائمة **"Select a project"** (قد تقول "My Project" أو اسم مشروع سابق)
4. اضغط **"NEW PROJECT"** في النافذة التي تظهر
5. في حقل **Project Name** اكتب: `SouQ Marketplace`
6. اضغط **"CREATE"** وانتظر ثوانٍ
7. تأكد أن المشروع الجديد محدد في القائمة العلوية
8. من القائمة الجانبية اليسرى، اضغط **"APIs & Services"**
9. اضغط **"OAuth consent screen"**
10. اختر **"External"** ثم اضغط **"CREATE"**
11. في حقل **App name** اكتب: `سوق SouQ`
12. في حقل **User support email** اختر بريدك الإلكتروني
13. في حقل **Developer contact information** أدخل بريدك مرة أخرى
14. اضغط **"SAVE AND CONTINUE"** ثلاث مرات حتى تصل لصفحة **Summary**
15. اضغط **"BACK TO DASHBOARD"**
16. من القائمة الجانبية اضغط **"Credentials"**
17. اضغط **"+ CREATE CREDENTIALS"** في الأعلى
18. اختر **"OAuth client ID"**
19. في **Application type** اختر **"Web application"**
20. في **Name** اكتب: `SouQ Web Client`
21. في قسم **Authorized redirect URIs** اضغط **"+ ADD URI"**
22. اكتب بالضبط: `http://localhost:4000/auth/google/callback`
23. اضغط **"CREATE"**
24. ستظهر نافذة فيها **Client ID** و **Client Secret**
25. اضغط على أيقونة النسخ بجانب كل منهما واحفظهما
26. اضغط **"OK"**

---

## الخطوة 5 — إعداد SMTP لإرسال رسائل OTP

نستخدم **Mailtrap** (مجاني للتطوير):

1. اذهب إلى: **https://mailtrap.io**
2. اضغط **"Sign Up"** (التسجيل مجاني)
3. بعد تسجيل الدخول، من القائمة الجانبية اضغط **"Email Testing"**
4. اضغط **"Inboxes"**
5. اضغط على بريد الوارد الافتراضي (اسمه عادةً **Demo inbox**)
6. اضغط على **"SMTP Settings"** أو **"Integration"**
7. اختر **"Nodemailer"** من القائمة المنسدلة
8. ستظهر الإعدادات بهذا الشكل:
   ```
   host: "sandbox.smtp.mailtrap.io"
   port: 2525
   auth.user: "xxxxxxxxx"
   auth.pass: "xxxxxxxxx"
   ```
9. **احفظ هذه القيم الأربع**

---

## الخطوة 6 — إعداد ملف البيئة (.env)

1. افتح **Visual Studio Code** أو أي محرر نصوص
2. افتح المجلد: `C:\Users\samer\Desktop\SouQ\apps\api`
3. ستجد ملف اسمه `.env` (قد يظهر مخفياً، تأكد من إظهار الملفات المخفية)
4. افتح الملف وستجد محتوى مثل هذا — **استبدل كل القيم** بما جمعته في الخطوات السابقة:

```env
# ───── قاعدة البيانات ─────
# ضع هنا رابط PostgreSQL الذي نسخته من Supabase أو من التثبيت المحلي
DATABASE_URL="postgresql://postgres:كلمة_المرور@localhost:5432/souq"

# ───── Redis ─────
# ضع هنا رابط Redis من Upstash أو المحلي
REDIS_URL="redis://localhost:6379"

# ───── JWT (مفاتيح التشفير) ─────
# اكتب أي نص عشوائي طويل — على الأقل 32 حرف
JWT_ACCESS_SECRET="souq_access_secret_change_this_to_random_32chars_minimum"
JWT_REFRESH_SECRET="souq_refresh_secret_change_this_to_random_32chars_minimum"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"

# ───── Google OAuth ─────
# ضع هنا Client ID و Client Secret من Google Cloud Console
GOOGLE_CLIENT_ID="xxxxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxxxxxxxx"
GOOGLE_CALLBACK_URL="http://localhost:4000/auth/google/callback"

# ───── البريد الإلكتروني (OTP) ─────
# ضع هنا بيانات Mailtrap
MAIL_HOST="sandbox.smtp.mailtrap.io"
MAIL_PORT=2525
MAIL_USER="ضع_هنا_user_من_mailtrap"
MAIL_PASS="ضع_هنا_pass_من_mailtrap"
MAIL_FROM="noreply@souq.sa"

# ───── إعدادات عامة ─────
FRONTEND_URL="http://localhost:3000"
PORT=4000
NODE_ENV="development"
```

5. احفظ الملف بالضغط على **Ctrl + S**

---

## الخطوة 7 — تثبيت مكتبات الباك اند وتشغيله

افتح **PowerShell** أو **Command Prompt** كمدير وشغّل هذه الأوامر **بالترتيب**:

### أ) الانتقال لمجلد الباك اند:
```powershell
cd C:\Users\samer\Desktop\SouQ\apps\api
```

### ب) تثبيت المكتبات:
```powershell
npm install
```
> انتظر حتى تنتهي — قد يأخذ 2-5 دقائق حسب سرعة الإنترنت

### ج) توليد Prisma Client:
```powershell
npx prisma generate
```

### د) إنشاء جداول قاعدة البيانات:
```powershell
npx prisma migrate dev --name init
```
> إذا سألك عن اسم فاكتب: `init` ثم اضغط Enter

### هـ) زرع التصنيفات (مرة واحدة فقط):
```powershell
npx ts-node -r tsconfig-paths/register src/seed/categories.seed.ts
```

### و) تشغيل الباك اند:
```powershell
npm run start:dev
```

إذا نجح كل شيء ستظهر رسائل خضراء وستقدر تفتح: **http://localhost:4000**

---

## الخطوة 8 — تشغيل الفرونت اند (إذا لم يكن يعمل)

افتح **PowerShell جديد** (لا تغلق الباك اند) وشغّل:

```powershell
cd C:\Users\samer\Desktop\SouQ\apps\web
npm run dev
```

ثم افتح المتصفح على: **http://localhost:3000**

---

## ملخص الروابط بعد التشغيل

| ما هو | الرابط |
|-------|--------|
| الموقع الرئيسي | http://localhost:3000 |
| API الباك اند | http://localhost:4000 |
| Prisma Studio (إدارة قاعدة البيانات) | شغّل: `npx prisma studio` |

---

## مشاكل شائعة وحلولها

### "ECONNREFUSED" عند تشغيل الباك اند
- تأكد أن PostgreSQL وRedis يعملان
- تأكد أن الروابط في ملف `.env` صحيحة

### "Invalid database URL"
- تأكد أن رابط قاعدة البيانات في `DATABASE_URL` صحيح بالكامل بدون مسافات

### صفحة تسجيل الدخول بجوجل لا تعمل
- تأكد أن `GOOGLE_CLIENT_ID` و `GOOGLE_CLIENT_SECRET` مضبوطان في `.env`
- تأكد أن رابط `http://localhost:4000/auth/google/callback` مضاف في Google Console

### الـ OTP لا يصل بالبريد
- افتح **Mailtrap Inbox** — الرسائل تظهر هناك (ليس في بريدك الحقيقي)
- هذا طبيعي في وضع التطوير

### "Cannot find module" عند تشغيل الباك اند
- شغّل `npm install` مجدداً داخل `apps/api`

---

## ترتيب تشغيل المشروع في كل مرة

```
1. تشغيل PostgreSQL  (تلقائي كـ Service إذا ثبّتها محلياً)
2. تشغيل Redis       (تلقائي كـ Service إذا ثبّتها محلياً)
3. cd apps/api && npm run start:dev
4. cd apps/web && npm run dev  (في PowerShell جديد)
5. افتح http://localhost:3000
```

إذا استخدمت Supabase وUpstash فقط تحتاج خطوات 3 و 4 و 5 في كل مرة.