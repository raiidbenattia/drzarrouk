function toggleMenu() {
  document.querySelector(".nav-menu").classList.toggle("show");
}

// Close dropdown if clicked outside
let menu = document.querySelector(".w-nav-button");
menu.onclick = function (event) {
  let dropdown = document.querySelector(".nav-menu");
  if (dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
  } else {
    dropdown.classList.add("show");
  }
};

// Availability status
/* 
function getTunisTime() {
  const now = new Date();

  const options = {
    timeZone: "Africa/Tunis",
    hour: "numeric",
    minute: "numeric",
    weekday: "long",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(now);

  const hour = parseInt(parts.find((p) => p.type === "hour").value, 10);
  const minute = parseInt(parts.find((p) => p.type === "minute").value, 10);
  const dayName = parts.find((p) => p.type === "weekday").value.toLowerCase();

  return { hour, minute, dayName };
}

function isBetween(h1, m1, h2, m2, currentH, currentM) {
  const now = currentH * 60 + currentM;
  const start = h1 * 60 + m1;
  const end = h2 * 60 + m2;
  return now >= start && now < end;
}

function getStatusClass() {
  const { hour, minute, dayName } = getTunisTime();
  const openElem = document.querySelector(".open");
  const closedElem = document.querySelector(".closed");

  // Fonction pour activer/désactiver les classes
  function setOpen() {
    closedElem.classList.remove("now");
    openElem.classList.add("now");
  }

  function setClosed() {
    openElem.classList.remove("now");
    closedElem.classList.add("now");
  }

  // Dimanche : fermé
  if (dayName === "sunday") {
    setClosed();
    return;
  }

  // Lundi → Vendredi : 8h00 - 19h00
  if (
    ["monday", "tuesday", "wednesday", "thursday", "friday"].includes(dayName)
  ) {
    if (isBetween(8, 0, 19, 0, hour, minute)) {
      setOpen();
    } else {
      setClosed();
    }
    return;
  }

  // Samedi : 8h00 - 16h00
  if (dayName === "saturday") {
    if (isBetween(8, 0, 16, 0, hour, minute)) {
      setOpen();
    } else {
      setClosed();
    }
    return;
  }

  // Par défaut : fermé
  setOpen();
} */

/* function startAccurateClock() {
  const now = new Date();
  const min = now.getMinutes();
  const seconds = now.getSeconds();

  // قداش باقي لحد الدقيقة الجاية
  const delay = (60 - min) * 1000 - seconds * 1000;

  setTimeout(() => {
    getStatusClass(); // أول تحديث مضبوط

    // من بعد تولي كل دقيقة بالضبط
    setInterval(getStatusClass, 60000);
  }, delay);
}

// تشغيل
getStatusClass(); // مباشرة
startAccurateClock(); */

// === 1. نجيبو وقت تونس ===
function getTunisNow() {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Tunis",
    hour12: false,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = formatter.formatToParts(now);

  const get = (type) => parts.find((p) => p.type === type).value;

  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    day: dayMap[get("weekday")],
    hour: parseInt(get("hour")),
    minute: parseInt(get("minute")),
    second: parseInt(get("second")),
  };
}

function getStatusClass() {
  const { day, hour, minute } = getTunisNow();

  const openElem = document.querySelector(".open");
  const closedElem = document.querySelector(".closed");

  if (!openElem || !closedElem) return;

  function setOpen() {
    closedElem.classList.remove("now");
    openElem.classList.add("now");
  }

  function setClosed() {
    openElem.classList.remove("now");
    closedElem.classList.add("now");
  }

  // dimanche
  if (day === 0) return setClosed();

  // samedi
  if (day === 6) {
    if (hour >= 8 && (hour < 16 || (hour === 16 && minute === 0))) {
      setOpen();
    } else {
      setClosed();
    }
    return;
  }

  // lundi → vendredi
  if (hour >= 8 && hour < 19) {
    setOpen();
  } else {
    setClosed();
  }
}

// === 2. نحسبو التبديل الجاي ===
function getNextChangeDelay() {
  const now = getTunisNow();

  let nextHour,
    nextMinute = 0,
    daysToAdd = 0;

  // dimanche → الاثنين 8
  if (now.day === 0) {
    nextHour = 8;
    daysToAdd = 1;
  }
  // samedi
  else if (now.day === 6) {
    if (now.hour < 8) {
      nextHour = 8;
    } else if (now.hour < 16) {
      nextHour = 16;
    } else {
      nextHour = 8;
      daysToAdd = 2; // الاثنين
    }
  }
  // semaine
  else {
    if (now.hour < 8) {
      nextHour = 8;
    } else if (now.hour < 19) {
      nextHour = 19;
    } else {
      nextHour = 8;
      daysToAdd = now.day === 5 ? 1 : 1;
    }
  }

  const nowDate = new Date();
  const target = new Date();

  target.setDate(nowDate.getDate() + daysToAdd);
  target.setHours(nextHour, nextMinute, 0, 0);

  return target - nowDate;
}

// === 3. scheduler ===
function smartScheduler() {
  getStatusClass();

  const delay = getNextChangeDelay();

  setTimeout(smartScheduler, delay);
}

// === تشغيل ===
smartScheduler();

// Sticky CTA Button
document.addEventListener("DOMContentLoaded", () => {
  const ctaSticky = document.querySelector(".cta-sticky");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      ctaSticky.classList.add("scroll");
    } else {
      ctaSticky.classList.remove("scroll");
    }
  });
});

// FAQ Toggle
document.querySelectorAll(".faq-block .q-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.add("active");
    document.querySelectorAll(".faq-block .q-card").forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.classList.remove("active");
      }
    });
  });
});

// Slider
const container = document.querySelector(".team-slider-mask");
const cards = document.querySelectorAll(".team-slider-item");
const dotsContainer = document.querySelector(".slide-nav-2");

let index = 0;
let startX = 0;
let isDragging = false;

// create dots
cards.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateSlider() {
  container.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// TOUCH (mobile)
container.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  },
  { passive: true },
);

container.addEventListener(
  "touchend",
  (e) => {
    if (!isDragging) return;

    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        index = Math.min(index + 1, cards.length - 1);
      } else {
        index = Math.max(index - 1, 0);
      }
    }

    updateSlider();
    isDragging = false;
  },
  { passive: true },
);
