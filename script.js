// قائمة المصادر المتاحة
const SOURCES = [
    { name: 'Google', url: 'https://www.google.com/' },
    { name: 'Facebook', url: 'https://www.facebook.com/' },
    { name: 'Reddit', url: 'https://www.reddit.com/' },
    { name: 'Instagram', url: 'https://www.instagram.com/' },
    { name: 'Twitter', url: 'https://www.twitter.com/' },
    { name: 'YouTube', url: 'https://www.youtube.com/' }
];

// اختيار مصدر عشوائي
function getRandomSource() {
    return SOURCES[Math.floor(Math.random() * SOURCES.length)];
}

// حفظ بيانات الزيارة
function saveVisit(url, source) {
    let visits = JSON.parse(localStorage.getItem('visits') || '{}');
    
    if (!visits[url]) {
        visits[url] = {
            url: url,
            totalVisits: 0,
            sources: {}
        };
    }
    
    visits[url].totalVisits++;
    
    if (!visits[url].sources[source.name]) {
        visits[url].sources[source.name] = 0;
    }
    visits[url].sources[source.name]++;
    
    localStorage.setItem('visits', JSON.stringify(visits));
}

// الحصول على جميع البيانات
function getAllVisits() {
    return JSON.parse(localStorage.getItem('visits') || '{}');
}

// حذف جميع البيانات
function clearAllData() {
    localStorage.removeItem('visits');
}

// إعادة توجيه مع الـ referrer
function redirectWithSource(targetUrl, sourceUrl) {
    // محاولة تعيين الـ referrer عن طريق iframe (طريقة بديلة)
    const referrerMeta = document.createElement('meta');
    referrerMeta.name = 'referrer';
    referrerMeta.content = 'no-referrer-when-downgrade';
    document.head.appendChild(referrerMeta);
    
    // إعادة التوجيه
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 100);
}