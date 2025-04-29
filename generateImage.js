// استيراد مكتبة fetch التي تستخدم لإرسال الطلبات HTTP
const fetch = require('node-fetch');  // تأكد من أنك قد قمت بتثبيت node-fetch باستخدام npm


// دالة لتوليد صورة من النص
async function generateImage() {
    // النص الذي سيتم إرساله لتوليد الصورة
    const text = 'أدخل النص الذي تريد تحويله إلى صورة هنا';  // استبدل هذا بالنص الذي تريد استخدامه

    // الحصول على الـ API Token من متغير البيئة (كما تم تمريره من GitHub Actions)
    const apiKey = process.env.HUGGINGFACE_API_KEY;  // تأكد من أنك قد خزنت الـ Token في GitHub Secrets

    // عنوان الـ API الخاص بـ Hugging Face
    const url = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';

    // رؤوس (Headers) الطلب HTTP، تتضمن الـ Authorization باستخدام الـ API Token
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    // البيانات التي سيتم إرسالها إلى API، وتشمل النص الذي ترغب في تحويله إلى صورة
    const data = {
        inputs: text
    };

    // إرسال طلب POST إلى API
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)  // تحويل البيانات إلى JSON
    });

    // التحقق إذا كان الطلب قد نجح
    if (response.ok) {
        const result = await response.json();  // تحويل الرد إلى JSON
        if (result.data && result.data.length > 0) {
            const imageUrl = result.data[0].url;  // الحصول على رابط الصورة
            console.log('Generated image URL:', imageUrl);  // طباعة رابط الصورة في الكونسول
        } else {
            console.error('No image generated');
        }
    } else {
        console.error('Failed to fetch from Hugging Face:', response.statusText);  // في حال فشل الطلب
    }
}

// استدعاء الدالة لتوليد الصورة
generateImage();
