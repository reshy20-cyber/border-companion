# تحويل رفيق الحدود إلى تطبيق Android (من الجوال)

كل الخطوات تتم من متصفح الجوال، بدون كمبيوتر.

## 1. إنشاء ملف Android عبر PWABuilder
1. افتح https://www.pwabuilder.com واكتب رابط التطبيق:
   `https://reshy20-cyber.github.io/border-companion/`
2. اضغط **Start**، وانتظر التقييم. لازم يكون الـ Manifest والـ Service Worker بعلامة صح.
3. اضغط **Package for stores** ثم **Android** ثم **Generate Package**.
4. في الإعدادات:
   - **Package ID:** `io.github.reshy20_cyber.bordercompanion` (لا يتغير بعد النشر أبداً)
   - **App name:** رفيق الحدود · Border Companion
   - **Launcher name:** رفيق الحدود
   - **Signing key:** اختر **Create new**
5. نزّل الملف المضغوط (zip). بداخله:
   - ملف **.aab**: هذا اللي ترفعه على Google Play.
   - ملف **signing.keystore** و **signing-key-info.txt**: احفظهم في مكان آمن (Google Drive مثلاً). **إذا ضاعوا ما تقدر تحدّث التطبيق.**
   - ملف **assetlinks.json**: نحتاجه في الخطوة 2.

## 2. إخفاء شريط العنوان (assetlinks)
بدون هذه الخطوة يظهر شريط متصفح أعلى التطبيق.
- الملف لازم يكون على: `https://reshy20-cyber.github.io/.well-known/assetlinks.json`
- يعني نحتاج مستودع جديد اسمه بالضبط **reshy20-cyber.github.io** فيه مجلد `.well-known` وبداخله الملف، مع ملف فارغ اسمه `.nojekyll`.
- بعد رفع التطبيق على Play Console: افتح **Test and release ← App integrity ← App signing** وانسخ بصمة **SHA-256** الخاصة بـ Google، وأضفها في assetlinks.json بجانب بصمة PWABuilder.

## 3. الرفع على Google Play (بعد موافقة الحساب)
1. أنشئ التطبيق في Play Console، اللغة الافتراضية: العربية.
2. انسخ النصوص من `store/listing.md` لكل لغة.
3. ارفع: الأيقونة `store/play-icon-512.png`، الصورة المميزة `store/feature-graphic-1024x500.png`، ولقطات الشاشة من `store/screenshots/`.
4. رابط سياسة الخصوصية: `https://reshy20-cyber.github.io/border-companion/privacy.html`
5. **Data safety:** لا يتم جمع أي بيانات ولا مشاركتها.
6. **الاختبار المغلق (Closed testing):** ارفع ملف .aab، وأضف إيميلات 12 مختبِر على الأقل (يفضل 15)، ويبقون مشتركين 14 يوماً متواصلة.
7. بعد 14 يوماً: قدّم طلب **Production access** وجاوب على الأسئلة بتفصيل.

## ملاحظة
تحديث المحتوى (data.js و index.html) يصل للمستخدمين تلقائياً من GitHub Pages بدون رفع نسخة جديدة على Google Play.
