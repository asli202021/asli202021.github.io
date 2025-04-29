const fetch = require('node-fetch');  // تأكد من أنك قد قمت بتثبيت node-fetch باستخدام npm

// دالة لتوليد صورة من النص
async function generateImage() {
    const text = 'أدخل النص الذي تريد تحويله إلى صورة هنا';  // استبدل هذا بالنص الذي تريد استخدامه
    const apiKey = process.env.HUGGINGFACE_API_KEY;  // تأكد من أنك خزنت الـ Token في GitHub Secrets

    const url = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    const data = { inputs: text };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)  // تحويل البيانات إلى JSON
        });

        // التحقق إذا كان الطلب قد نجح
        if (!response.ok) {
            // إذا كانت الاستجابة غير صالحة، اطبع الخطأ مع التفاصيل
            const errorDetails = await response.text();
            console.error('Failed to fetch from Hugging Face:', response.statusText);
            console.error('Error Details:', errorDetails);  // طباعة تفاصيل الخطأ
            return;
        }

        const result = await response.json();  // تحويل الرد إلى JSON
        if (result.data && result.data.length > 0) {
            const imageUrl = result.data[0].url;  // الحصول على رابط الصورة
            console.log('Generated image URL:', imageUrl);  // طباعة رابط الصورة في الكونسول
        } else {
            console.error('No image generated');
        }
    } catch (error) {
        console.error('Error:', error);  // إذا كان هناك خطأ في الاتصال، طباعة الخطأ
    }
}

generateImage();
