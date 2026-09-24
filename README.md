<div dir="rtl" align="right">

# بک‌اند دیوار

[English Version](README.en.md)
بک‌اند پروژه دیوار (سایت آگهی آنلاین) با Node.js، Express و MongoDB.

---

## 📖 درباره پروژه

این پروژه بک‌اند یک سایت آگهی آنلاین مشابه دیوار است. کاربران می‌توانند ثبت‌نام کنند، آگهی ثبت کنند، دسته‌بندی داشته باشند و عکس آپلود کنند.

این پروژه فقط شامل **بک‌اند** است. فرانت‌اند آن در مخزن جداگانه‌ای قرار دارد.

---

## 🛠 تکنولوژی‌ها

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Swagger
- Multer

---

## ✨ امکانات

- ورود با کد پیامکی (OTP)
- مدیریت کاربران
- مدیریت دسته‌بندی‌ها
- مدیریت گزینه‌ها
- ساخت و حذف آگهی
- آپلود عکس
- مستندات API با Swagger
- مدیریت متمرکز خطاها

---

## 📁 ساختار پروژه

<div dir="rtl" align="right">

# بک‌اند دیوار

بک‌اند پروژه دیوار (سایت آگهی آنلاین) با Node.js، Express و MongoDB.

## درباره پروژه

این پروژه بک‌اند یک سایت آگهی آنلاین مشابه دیوار است. کاربران می‌توانند ثبت‌نام کنند، آگهی ثبت کنند، دسته‌بندی داشته باشند و عکس آپلود کنند.

این پروژه فقط شامل بک‌اند است. فرانت‌اند آن در مخزن جداگانه‌ای قرار دارد.

## تکنولوژی‌ها

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Swagger
- Multer

## امکانات

- ورود با کد پیامکی (OTP)
- مدیریت کاربران
- مدیریت دسته‌بندی‌ها
- مدیریت گزینه‌ها
- ساخت و حذف آگهی
- آپلود عکس
- مستندات API با Swagger
- مدیریت متمرکز خطاها

## ساختار پروژه

divar/
├── public/ فایل‌های استاتیک
├── src/
│ ├── common/ بخش‌های عمومی
│ ├── config/ تنظیمات
│ ├── modules/ ماژول‌ها
│ │ ├── auth/ احراز هویت
│ │ ├── user/ کاربران
│ │ ├── category/ دسته‌بندی‌ها
│ │ ├── option/ گزینه‌ها
│ │ └── post/ آگهی‌ها
│ ├── app.routes.js روتر اصلی
│ └── main.js نقطه شروع
├── .env
├── package.json
└── README.md

## نصب و راه‌اندازی

### پیش‌نیازها

- Node.js نسخه ۱۸ یا بالاتر
- MongoDB

### مراحل

۱. مخزن را clone کنید:

git clone https://github.com/hamidreza-babazamani/divar.git
cd divar

۲. پکیج‌ها را نصب کنید:

npm install

۳. فایل .env بسازید و این مقادیر را در آن قرار دهید:

PORT=3400
MONGODB_URL=mongodb://localhost:27017/divar
COOKIE_SECRET_KEY=your-secret-key-here
NODE_ENV=development

۴. سرور را اجرا کنید:

npm start

۵. آدرس سرور:

http://localhost:3400

## مستندات API

http://localhost:3400/swagger

## آدرس‌های API

### Auth

- POST /auth/send-otp — ارسال کد پیامکی
- POST /auth/check-otp — تایید کد و ورود
- GET /auth/logout — خروج از حساب

### User

- GET /user/whoami — دریافت پروفایل
- PATCH /user/edit — ویرایش پروفایل

### Category

- POST /category — ساخت دسته‌بندی
- GET /category — دریافت همه دسته‌بندی‌ها
- DELETE /category/:id — حذف دسته‌بندی

### Option

- POST /option — ساخت گزینه
- GET /option — دریافت همه گزینه‌ها
- GET /option/by-category/:categoryId — گزینه‌های یک دسته
- GET /option/:id — دریافت یک گزینه
- DELETE /option/:id — حذف گزینه

### Post

- POST /post/create — ساخت آگهی
- GET /post/my — آگهی‌های من
- GET /post/:id — دریافت یک آگهی
- DELETE /post/:id — حذف آگهی

## نکات مهم

- فایل .env را در GitHub آپلود نکنید
- پوشه node_modules را در GitHub آپلود نکنید
- برای اجرا، ابتدا MongoDB را روشن کنید

## ارتباط

GitHub: @hamidreza-babazamani

</div>
