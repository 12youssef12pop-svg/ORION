// قائمة الآيات القرآنية والتسجيلات الصوتية
const ayahs = [
    {
        text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        ref: "[سورة الشرح: 6]",
        audio: "https://server8.mp3quran.net/afs/094.mp3"
    },
    {
        text: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
        ref: "[سورة طه: 114]",
        audio: "https://server8.mp3quran.net/afs/020.mp3"
    },
    {
        text: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
        ref: "[سورة البقرة: 152]",
        audio: "https://server8.mp3quran.net/afs/002.mp3"
    },
    {
        text: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
        ref: "[سورة الرعد: 28]",
        audio: "https://server8.mp3quran.net/afs/013.mp3"
    },
    {
        text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
        ref: "[سورة الطلاق: 2-3]",
        audio: "https://server8.mp3quran.net/afs/065.mp3"
    }
];

// عناصر DOM
const quranText = document.getElementById('quranText');
const quranRef = document.getElementById('quranRef');
const playAudioBtn = document.getElementById('playAudioBtn');
const audioIcon = document.getElementById('audioIcon');
const audioStatus = document.getElementById('audioStatus');
const progressBar = document.getElementById('progressBar');
const toggleTimerBtn = document.getElementById('toggleTimerBtn');
const timerIcon = document.getElementById('timerIcon');
const nextAyahBtn = document.getElementById('nextAyahBtn');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const submitBtn = document.getElementById('submitBtn');
const answerCard = document.getElementById('answerCard');
const answerContent = document.getElementById('answerContent');
const popularQuestions = document.querySelectorAll('.q-btn');

let currentAyahIndex = 0;
let audioElement = new Audio();
let timerInterval = null;
let isTimerRunning = true;
const DURATION = 10; // بالثواني
let timeLeft = DURATION;

// التبديل إلى الآية التالية
function changeAyah(index = null) {
    if (index !== null) {
        currentAyahIndex = index;
    } else {
        currentAyahIndex = (currentAyahIndex + 1) % ayahs.length;
    }

    // تأثير اختفاء وتغيير النص
    quranText.style.opacity = '0';
    quranRef.style.opacity = '0';

    setTimeout(() => {
        const item = ayahs[currentAyahIndex];
        quranText.innerText = `"${item.text}"`;
        quranRef.innerText = item.ref;
        audioElement.src = item.audio;

        quranText.style.opacity = '1';
        quranRef.style.opacity = '1';
        
        // إيقاف الصوت عند الانتقال
        audioElement.pause();
        audioIcon.className = "fa-solid fa-volume-high";
        audioStatus.innerText = "استمع للآية بصوت الشيخ العفاسي";
    }, 300);

    resetTimer();
}

// مؤقت العد التنازلي للآيات
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!isTimerRunning) return;
        
        timeLeft -= 0.1;
        const percentage = (timeLeft / DURATION) * 100;
        progressBar.style.width = `${Math.max(0, percentage)}%`;

        if (timeLeft <= 0) {
            changeAyah();
        }
    }, 100);
}

function resetTimer() {
    timeLeft = DURATION;
    progressBar.style.width = '100%';
}

// التحكم بالتشغيل والإيقاف المؤقت للتايمر
toggleTimerBtn.addEventListener('click', () => {
    isTimerRunning = !isTimerRunning;
    if (isTimerRunning) {
        timerIcon.className = 'fa-solid fa-pause';
    } else {
        timerIcon.className = 'fa-solid fa-play';
    }
});

nextAyahBtn.addEventListener('click', () => {
    changeAyah();
});

// تشغيل وإيقاف الصوت
playAudioBtn.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        audioIcon.className = "fa-solid fa-pause text-amber-400";
        audioStatus.innerText = "جاري التشغيل...";
    } else {
        audioElement.pause();
        audioIcon.className = "fa-solid fa-volume-high";
        audioStatus.innerText = "استمع للآية بصوت الشيخ العفاسي";
    }
});

audioElement.addEventListener('ended', () => {
    audioIcon.className = "fa-solid fa-volume-high";
    audioStatus.innerText = "استمع للآية بصوت الشيخ العفاسي";
});

// التعامل مع الأسئلة الإضافية والنماذج
popularQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
        searchInput.value = btn.innerText.trim();
        searchForm.dispatchEvent(new Event('submit'));
    });
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    submitBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i>`;
    answerCard.classList.remove('hidden');
    answerContent.innerHTML = `<p class="text-slate-400 animate-pulse">جاري البحث في المصادر الإسلامية الموثوقة...</p>`;

    // محاكاة إجابة ذكية
    setTimeout(() => {
        submitBtn.innerHTML = `<i class="fa-solid fa-arrow-up text-lg"></i>`;
        answerContent.innerHTML = `
            <p>الحمد لله والصلاة والسلام على رسول الله، أما بعد:</p>
            <p>بخصوص سؤالك حول <strong>"${query}"</strong>:</p>
            <p class="bg-[#040e17] p-3 rounded-lg border border-cyan-900/60">
                هذه المسألة تعد من الأمور المهمة، ويبين العلماء وفق كتاب الله وسنة نبينا ﷺ الحرص دائماً على اتباع الهدي والعمل بالنية الصادقة والإخلاص في جميع الطاعات.
            </p>
            <p class="text-xs text-slate-400 mt-2">المصدر: موسوعة الإجابات الإسلامية الموثوقة.</p>
        `;
    }, 1200);
});

// البدء عند التحميل
changeAyah(0);
startTimer();