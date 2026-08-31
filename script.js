const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const playingLabel = document.getElementById("playingLabel");
const playerCard = document.querySelector(".player-card");

const progressFill = document.getElementById("progressFill");
const time = document.getElementById("time");

const trackTitle = document.getElementById("trackTitle");
const message = document.getElementById("message");

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

const soundBtn = document.getElementById("soundBtn");
const infoBtn = document.getElementById("infoBtn");

let playing = false;
let progress = 0;
let timer = null;
let soundEnabled = true;


/* ==========================================
   CREATE AUDIO WAVE
========================================== */

const wave = document.getElementById("wave");

for (let i = 0; i < 48; i++) {

  const bar = document.createElement("span");

  const height = Math.floor(Math.random() * 24) + 5;

  bar.style.setProperty("--h", `${height}px`);
  bar.style.setProperty("--d", `${Math.random() * .6}s`);

  wave.appendChild(bar);
}


/* ==========================================
   VOICE DATA
========================================== */

const voices = {

  love: {
    message: `بعض الأصوات مش بتتسمع...
    <br>
    بعض الأصوات بتتحس.`,
    duration: 38
  },

  miss: {
    message: `في ناس لما بتوحشنا...
    <br>
    حتى صوتهم بنفتكره.`,
    duration: 42
  },

  morning: {
    message: `صباح الخير...
    <br>
    يمكن النهارده يكون أحلى.`,
    duration: 35
  },

  night: {
    message: `نامي وإنتي مطمنة...
    <br>
    بكرة يوم جديد.`,
    duration: 40
  }

};


/* ==========================================
   PLAY / PAUSE
========================================== */

playBtn.addEventListener("click", () => {

  playing = !playing;

  if (playing) {

    startPlayer();

  } else {

    stopPlayer();

  }

});


function startPlayer() {

  playerCard.classList.add("playing");

  playIcon.textContent = "Ⅱ";

  playingLabel.textContent = "جاري التشغيل...";

  showToast("الصوت بيشتغل معاك ♥");

  clearInterval(timer);

  timer = setInterval(() => {

    progress++;

    updatePlayer();

    if (progress >= 100) {

      progress = 0;

      stopPlayer();

    }

  }, 100);

}


function stopPlayer() {

  playing = false;

  clearInterval(timer);

  playerCard.classList.remove("playing");

  playIcon.textContent = "▶";

  playingLabel.textContent = "متوقف";

}


/* ==========================================
   PLAYER UPDATE
========================================== */

function updatePlayer() {

  progressFill.style.width = `${progress}%`;

  const current = Math.floor(
    (voices.love.duration * progress) / 100
  );

  const minutes = Math.floor(current / 60);
  const seconds = current % 60;

  time.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


/* ==========================================
   VOICE SELECT
========================================== */

const voiceCards = document.querySelectorAll(".voice-card");

voiceCards.forEach(card => {

  card.addEventListener("click", () => {

    voiceCards.forEach(item => {
      item.classList.remove("active");
    });

    card.classList.add("active");

    const title = card.dataset.title;
    const type = card.dataset.type;

    trackTitle.textContent = title;

    if (voices[type]) {
      message.innerHTML = voices[type].message;
    }

    progress = 0;
    progressFill.style.width = "0%";
    time.textContent = "00:00";

    stopPlayer();

    showToast(`تم اختيار: ${title}`);

  });

});


/* ==========================================
   SOUND BUTTON
========================================== */

soundBtn.addEventListener("click", () => {

  soundEnabled = !soundEnabled;

  soundBtn.textContent = soundEnabled
    ? "🔊"
    : "🔇";

  showToast(
    soundEnabled
      ? "الصوت مفتوح"
      : "الصوت مكتوم"
  );

});


/* ==========================================
   INFO
========================================== */

infoBtn.addEventListener("click", () => {

  showToast("صوتك معايا — تجربة صوتية صغيرة ♥");

});


/* ==========================================
   BOTTOM NAV
========================================== */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {

  item.addEventListener("click", () => {

    navItems.forEach(nav => {
      nav.classList.remove("active");
    });

    item.classList.add("active");

    const text = item.querySelector("small").textContent;

    showToast(text);

  });

});


/* ==========================================
   TOAST
========================================== */

let toastTimer;

function showToast(text) {

  toastText.textContent = text;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


/* ==========================================
   HAPTIC FEEDBACK
========================================== */

document.querySelectorAll("button").forEach(button => {

  button.addEventListener("click", () => {

    if (navigator.vibrate) {
      navigator.vibrate(12);
    }

  });

});


/* ==========================================
   INITIAL STATE
========================================== */

playingLabel.textContent = "جاهز؟";
