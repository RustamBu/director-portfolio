/* =========================================================================
   CONTENT — единственный файл, который нужно редактировать.
   ONLY FILE YOU NEED TO EDIT.

   Здесь: имя, тексты, проекты, контакты, переводы EN / PL.
   ========================================================================= */

const SITE = {
  // Имя в шапке и в подвале
  name: "RUSTAM BULATOV",

  // Город (шапка подвала)
  city: { en: "Warsaw", pl: "Warszawa" },

  // Контакты
  email: "rustambulatov05@gmail.com",

  // Соцсети. Убери строку — исчезнет и ссылка.
  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
  ],

  // Шоурил на первом экране.
  // video: { kind: "youtube", id: "ID_ИЗ_ССЫЛКИ" } | { kind: "mp4", src: "assets/video/reel.mp4" }
  reel: {
    year: "2026",
    poster: "assets/img/hero.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
  },
};

/* -------------------------------------------------------------------------
   РАБОТЫ / WORK
   Каждая строка в таблице раскрывается по клику.

   format — то, что стоит в колонке FORMAT
   video  — { kind: "youtube", id: "..." } | { kind: "mp4", src: "..." } | null
   poster — кадр 16:9 из assets/img/
   credits — произвольные строки в раскрытой карточке
   ------------------------------------------------------------------------- */

const PROJECTS = [
  {
    title: "Metropolis",
    year: "2025",
    format: { en: "Commercial · 60″", pl: "Reklama · 60″" },
    poster: "assets/img/work-1.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "A night-run through a city that never resolves. Handheld, anamorphic, lit almost entirely by practicals.",
      pl: "Nocny bieg przez miasto, które nigdy się nie domyka. Z ręki, anamorf, światło niemal wyłącznie praktyczne.",
    },
    credits: [
      { k: { en: "DOP", pl: "Operator" }, v: "Name Surname" },
      { k: { en: "Format", pl: "Format" }, v: { en: "35mm anamorphic", pl: "35mm anamorf" } },
    ],
  },
  {
    title: "Blue Hour",
    year: "2025",
    format: { en: "Short Film · 12′", pl: "Krótki metraż · 12′" },
    poster: "assets/img/work-2.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "Twelve minutes in the last light of a day that will not come back.",
      pl: "Dwanaście minut w ostatnim świetle dnia, który już nie wróci.",
    },
    credits: [
      { k: { en: "DOP", pl: "Operator" }, v: "Name Surname" },
      { k: { en: "Format", pl: "Format" }, v: { en: "Super 16", pl: "Super 16" } },
    ],
  },
  {
    title: "Static",
    year: "2024",
    format: { en: "Music Video", pl: "Teledysk" },
    poster: "assets/img/work-3.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "One take, one room, one slowly failing television set.",
      pl: "Jedno ujęcie, jeden pokój, jeden powoli gasnący telewizor.",
    },
    credits: [
      { k: { en: "DOP", pl: "Operator" }, v: "Name Surname" },
      { k: { en: "Format", pl: "Format" }, v: { en: "Single take", pl: "Jedno ujęcie" } },
    ],
  },
  {
    title: "Salt",
    year: "2024",
    format: { en: "Fashion Film", pl: "Film modowy" },
    poster: "assets/img/work-4.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "Bodies and weather. Shot on the Baltic coast over two grey mornings.",
      pl: "Ciała i pogoda. Nakręcone na wybrzeżu Bałtyku przez dwa szare poranki.",
    },
    credits: [
      { k: { en: "DOP", pl: "Operator" }, v: "Name Surname" },
      { k: { en: "Location", pl: "Lokacja" }, v: { en: "Baltic coast", pl: "Wybrzeże Bałtyku" } },
    ],
  },
  {
    title: "Rehearsal",
    year: "2023",
    format: { en: "Documentary · 22′", pl: "Dokument · 22′" },
    poster: "assets/img/work-5.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "Three weeks with a company that only exists between six and ten in the evening.",
      pl: "Trzy tygodnie z zespołem, który istnieje tylko między szóstą a dziesiątą wieczorem.",
    },
    credits: [
      { k: { en: "DOP", pl: "Operator" }, v: "Name Surname" },
      { k: { en: "Format", pl: "Format" }, v: { en: "Handheld digital", pl: "Cyfra z ręki" } },
    ],
  },
  {
    title: "Nightshift",
    year: "2023",
    format: { en: "Branded · 3×30″", pl: "Branded · 3×30″" },
    poster: "assets/img/work-6.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "Portraits of people who work while the city sleeps.",
      pl: "Portrety ludzi, którzy pracują, gdy miasto śpi.",
    },
    credits: [
      { k: { en: "DOP", pl: "Operator" }, v: "Name Surname" },
      { k: { en: "Format", pl: "Format" }, v: { en: "Three films", pl: "Trzy filmy" } },
    ],
  },
];

/* -------------------------------------------------------------------------
   О СЕБЕ / ABOUT
   ------------------------------------------------------------------------- */

const ABOUT = {
  statement: {
    en: [
      "What interests me first is conflict — inside a person and between people — and the story that grows out of it. The format comes second: film, commercial or music video.",
    ],
    pl: [
      "Najbardziej interesuje mnie konflikt — wewnątrz człowieka i między ludźmi — oraz historia, która z niego wyrasta. Format jest drugorzędny: film, reklama czy teledysk.",
    ],
  },
  // Правая колонка секции ABOUT
  meta: [
    { k: { en: "Based", pl: "Baza" }, v: { en: "Warsaw", pl: "Warszawa" } },
    { k: { en: "Work", pl: "Praca" }, v: { en: "Europe", pl: "Europa" } },
    { k: { en: "Languages", pl: "Języki" }, v: { en: "EN · PL · RU", pl: "EN · PL · RU" } },
  ],
};

/* -------------------------------------------------------------------------
   ПЕРЕВОДЫ ИНТЕРФЕЙСА
   ------------------------------------------------------------------------- */

const I18N = {
  en: {
    "nav.work": "Work",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.menu": "Menu",

    "hero.title.1": "Director Rustam Bulatov.",
    "hero.title.2": "Warsaw and Europe.",

    "reel.label": "Showreel",
    "reel.play": "Play",

    "work.label": "Work",
    "work.projects": "projects",
    "work.sort": "By year",
    "work.col.n": "№",
    "work.col.title": "Title",
    "work.col.format": "Format",
    "work.col.year": "Year",
    "work.watch": "Watch",
    "work.soon": "Coming soon",

    "about.label": "About",

    "contact.label": "Contact",
    "contact.copy": "Copy",
    "contact.copied": "Copied",

    "modal.close": "Close",
  },

  pl: {
    "nav.work": "Prace",
    "nav.about": "O mnie",
    "nav.contact": "Kontakt",
    "nav.menu": "Menu",

    "hero.title.1": "Reżyser Rustam Bulatov.",
    "hero.title.2": "Warszawa i Europa.",

    "reel.label": "Showreel",
    "reel.play": "Odtwórz",

    "work.label": "Prace",
    "work.projects": "projekty",
    "work.sort": "Wg roku",
    "work.col.n": "№",
    "work.col.title": "Tytuł",
    "work.col.format": "Format",
    "work.col.year": "Rok",
    "work.watch": "Zobacz",
    "work.soon": "Wkrótce",

    "about.label": "O mnie",

    "contact.label": "Kontakt",
    "contact.copy": "Kopiuj",
    "contact.copied": "Skopiowano",

    "modal.close": "Zamknij",
  },
};
