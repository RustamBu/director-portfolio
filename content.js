/* =========================================================================
   CONTENT — единственный файл, который тебе нужно редактировать.
   ONLY FILE YOU NEED TO EDIT.

   Здесь: имя, тексты, проекты, фотографии, контакты, переводы EN/PL.
   ========================================================================= */

const SITE = {
  // Имя в шапке и в подвале
  name: "RUSTAM BULATOV",
  // Маленький значок рядом с именем ("®", "©", "*" или "" чтобы убрать)
  mark: "®",

  // Город и часовой пояс для часов в hero-секции
  city: { en: "Warsaw", pl: "Warszawa" },
  timezone: "Europe/Warsaw",

  // Контакты
  email: "rusyabulatov05@gmail.com",
  phone: "", // например "+48 000 000 000" — оставь "" чтобы скрыть

  // Соцсети. Убери строку, если не нужна.
  socials: [
    { label: "Instagram", handle: "@rustam", url: "https://instagram.com/" },
    { label: "YouTube", handle: "/@rustam", url: "https://youtube.com/" },
  ],

  // Ссылка на резюме / шоурил-PDF. Оставь "" чтобы скрыть кнопку.
  resumeUrl: "",

  // Главный шоурил — открывается по кнопке в hero.
  // kind: "youtube" (просто вставь ID из ссылки) или "mp4" (файл в assets/video/)
  reel: { kind: "youtube", id: "dQw4w9WgXcQ" },
  // Пример mp4: reel: { kind: "mp4", src: "assets/video/reel.mp4" },

  // Фон hero-секции. Может быть картинкой или видео-лупом.
  // kind: "image" | "video"
  heroMedia: { kind: "image", src: "assets/img/hero.jpg" },
  // Пример видео-фона: { kind: "video", src: "assets/video/hero-loop.mp4", poster: "assets/img/hero.jpg" }

  // Бегущая строка под hero — ключевые слова / клиенты
  marquee: [
    "COMMERCIAL",
    "MUSIC VIDEO",
    "SHORT FILM",
    "FASHION",
    "DOCUMENTARY",
    "BRANDED CONTENT",
  ],
};

/* -------------------------------------------------------------------------
   РАБОТЫ / WORK
   video: { kind: "youtube", id: "ID_ИЗ_ССЫЛКИ" }
          { kind: "mp4", src: "assets/video/имя.mp4" }
          null — если видео пока нет (карточка останется, но без плеера)
   poster: превью-кадр 16:9, положи в assets/img/
   featured: true — карточка на всю ширину (делай так для 1–2 лучших работ)
   ------------------------------------------------------------------------- */

const PROJECTS = [
  {
    title: "Metropolis",
    client: "Nike",
    year: "2025",
    role: { en: "Director", pl: "Reżyser" },
    type: { en: "Commercial", pl: "Reklama" },
    featured: true,
    poster: "assets/img/work-1.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "A night-run through a city that never resolves. Shot handheld on anamorphic glass, lit almost entirely by practicals.",
      pl: "Nocny bieg przez miasto, które nigdy się nie domyka. Zdjęcia z ręki, optyka anamorficzna, światło niemal wyłącznie praktyczne.",
    },
    credits: [
      { role: { en: "DOP", pl: "Operator" }, name: "Name Surname" },
      { role: { en: "Production", pl: "Produkcja" }, name: "Studio Name" },
    ],
  },
  {
    title: "Blue Hour",
    client: "Independent",
    year: "2025",
    role: { en: "Director", pl: "Reżyser" },
    type: { en: "Short Film", pl: "Film krótkometrażowy" },
    featured: false,
    poster: "assets/img/work-2.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "Twelve minutes in the last light of a day that will not come back.",
      pl: "Dwanaście minut w ostatnim świetle dnia, który już nie wróci.",
    },
    credits: [],
  },
  {
    title: "Static",
    client: "Artist Name",
    year: "2024",
    role: { en: "Director", pl: "Reżyser" },
    type: { en: "Music Video", pl: "Teledysk" },
    featured: false,
    poster: "assets/img/work-3.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "One take, one room, one slowly failing television set.",
      pl: "Jedno ujęcie, jeden pokój, jeden powoli gasnący telewizor.",
    },
    credits: [],
  },
  {
    title: "Salt",
    client: "Fashion House",
    year: "2024",
    role: { en: "Director", pl: "Reżyser" },
    type: { en: "Fashion Film", pl: "Film modowy" },
    featured: false,
    poster: "assets/img/work-4.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "Bodies and weather. Shot on the Baltic coast over two grey mornings.",
      pl: "Ciała i pogoda. Nakręcone na wybrzeżu Bałtyku przez dwa szare poranki.",
    },
    credits: [],
  },
  {
    title: "Rehearsal",
    client: "Theatre Company",
    year: "2023",
    role: { en: "Director", pl: "Reżyser" },
    type: { en: "Documentary", pl: "Dokument" },
    featured: false,
    poster: "assets/img/work-5.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "Three weeks with a company that only exists between six and ten in the evening.",
      pl: "Trzy tygodnie z zespołem, który istnieje tylko między szóstą a dziesiątą wieczorem.",
    },
    credits: [],
  },
  {
    title: "Nightshift",
    client: "Brand",
    year: "2023",
    role: { en: "Director", pl: "Reżyser" },
    type: { en: "Branded Content", pl: "Content brandowy" },
    featured: false,
    poster: "assets/img/work-6.jpg",
    video: { kind: "youtube", id: "dQw4w9WgXcQ" },
    description: {
      en: "Portraits of people who work while the city sleeps.",
      pl: "Portrety ludzi, którzy pracują, gdy miasto śpi.",
    },
    credits: [],
  },
];

/* -------------------------------------------------------------------------
   ПОДХОД / СТИЛЬ — секция "Approach"
   ------------------------------------------------------------------------- */

const APPROACH = {
  portrait: "assets/img/portrait.jpg", // твой портрет для этой секции
  statement: {
    en: [
      "I direct with the camera as a second character — not an observer, but something that wants, hesitates, and looks away at the wrong moment.",
      "My work sits between commercial precision and documentary accident. I build a rigorous frame, then leave a door open inside it for something unplanned to walk through.",
      "I shoot for texture: practical light, real locations, weather I did not order. Grain is not a filter — it is the evidence that something physically happened in front of the lens.",
    ],
    pl: [
      "Reżyseruję tak, by kamera była drugą postacią — nie obserwatorem, lecz kimś, kto pragnie, waha się i odwraca wzrok w złym momencie.",
      "Moja praca leży między precyzją reklamy a przypadkiem dokumentu. Buduję rygorystyczny kadr, a potem zostawiam w nim uchylone drzwi, przez które może wejść coś nieplanowanego.",
      "Kręcę dla faktury: światło praktyczne, prawdziwe lokacje, pogoda, której nie zamawiałem. Ziarno to nie filtr — to dowód, że coś naprawdę wydarzyło się przed obiektywem.",
    ],
  },
  principles: [
    {
      title: { en: "Light before lens", pl: "Światło przed obiektywem" },
      text: {
        en: "Every setup starts with where the light already lives in the room. The camera adapts to it, never the reverse.",
        pl: "Każde ustawienie zaczyna się od tego, gdzie światło już mieszka w pomieszczeniu. To kamera się do niego dostosowuje, nigdy odwrotnie.",
      },
    },
    {
      title: { en: "One idea per frame", pl: "Jedna myśl na kadr" },
      text: {
        en: "If a shot is carrying two ideas, one of them belongs to a different shot. Clarity is what survives the edit.",
        pl: "Jeśli ujęcie niesie dwie myśli, jedna z nich należy do innego ujęcia. To jasność przetrwa montaż.",
      },
    },
    {
      title: { en: "Cast for behaviour", pl: "Casting pod zachowanie" },
      text: {
        en: "I cast people for how they wait, listen and fidget — not for how they deliver a line.",
        pl: "Szukam ludzi po tym, jak czekają, słuchają i się wiercą — nie po tym, jak mówią kwestię.",
      },
    },
    {
      title: { en: "Edit as rewriting", pl: "Montaż jako pisanie na nowo" },
      text: {
        en: "The film is written three times: on paper, on set, and in the timeline. The third draft is the honest one.",
        pl: "Film pisze się trzy razy: na papierze, na planie i na osi montażowej. Trzecia wersja jest tą szczerą.",
      },
    },
  ],
  // Технические строки — колонка справа
  facts: [
    { k: { en: "Based in", pl: "Baza" }, v: { en: "Warsaw / travelling", pl: "Warszawa / w podróży" } },
    { k: { en: "Formats", pl: "Formaty" }, v: { en: "Commercial · Music video · Short film", pl: "Reklama · Teledysk · Krótki metraż" } },
    { k: { en: "Languages", pl: "Języki" }, v: { en: "English · Polish · Russian", pl: "Angielski · Polski · Rosyjski" } },
    { k: { en: "Available", pl: "Dostępność" }, v: { en: "Worldwide", pl: "Na całym świecie" } },
  ],
};

/* -------------------------------------------------------------------------
   ПЕРЕВОДЫ ИНТЕРФЕЙСА — меняй тексты здесь
   ------------------------------------------------------------------------- */

const I18N = {
  en: {
    "nav.work": "Work",
    "nav.approach": "Approach",
    "nav.contact": "Contact",

    "hero.eyebrow": "Film direction for brands and artists.",
    "hero.title.1": "Director working",
    "hero.title.2": "in light, grain and",
    "hero.title.3": "unrepeatable moments",
    "hero.lede":
      "I make commercials, music videos and short films that keep the texture of the real thing — practical light, real locations, and performances caught rather than staged.",
    "hero.cta.reel": "Watch the reel",
    "hero.cta.work": "Selected work",
    "hero.scroll": "Scroll",

    "work.label": "01 — Selected work",
    "work.title": "Recent projects",
    "work.note": "Click any project to play.",
    "work.play": "Play",
    "work.soon": "Coming soon",
    "work.credits": "Credits",

    "approach.label": "02 — Approach",
    "approach.title": "How I work",
    "approach.principles": "Principles",
    "approach.facts": "Details",

    "contact.label": "03 — Contact",
    "contact.title": "Let's make something",
    "contact.lede":
      "Treatments, availability, rates — write to me directly. I reply to everything within two days.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.social": "Elsewhere",
    "contact.resume": "Download CV",
    "contact.copy": "Copy",
    "contact.copied": "Copied",

    "footer.rights": "All rights reserved.",
    "footer.built": "Available worldwide",

    "modal.close": "Close",
  },

  pl: {
    "nav.work": "Prace",
    "nav.approach": "Podejście",
    "nav.contact": "Kontakt",

    "hero.eyebrow": "Reżyseria filmowa dla marek i artystów.",
    "hero.title.1": "Reżyser pracujący",
    "hero.title.2": "światłem, ziarnem i",
    "hero.title.3": "niepowtarzalną chwilą",
    "hero.lede":
      "Robię reklamy, teledyski i filmy krótkometrażowe, które zachowują fakturę rzeczywistości — praktyczne światło, prawdziwe lokacje i aktorstwo złapane, a nie zainscenizowane.",
    "hero.cta.reel": "Zobacz showreel",
    "hero.cta.work": "Wybrane prace",
    "hero.scroll": "Przewiń",

    "work.label": "01 — Wybrane prace",
    "work.title": "Ostatnie projekty",
    "work.note": "Kliknij projekt, aby odtworzyć.",
    "work.play": "Odtwórz",
    "work.soon": "Wkrótce",
    "work.credits": "Ekipa",

    "approach.label": "02 — Podejście",
    "approach.title": "Jak pracuję",
    "approach.principles": "Zasady",
    "approach.facts": "Szczegóły",

    "contact.label": "03 — Kontakt",
    "contact.title": "Zróbmy coś razem",
    "contact.lede":
      "Treatmenty, dostępność, stawki — pisz bezpośrednio. Odpowiadam na wszystko w ciągu dwóch dni.",
    "contact.email": "E-mail",
    "contact.phone": "Telefon",
    "contact.social": "Gdzie indziej",
    "contact.resume": "Pobierz CV",
    "contact.copy": "Kopiuj",
    "contact.copied": "Skopiowano",

    "footer.rights": "Wszelkie prawa zastrzeżone.",
    "footer.built": "Dostępny na całym świecie",

    "modal.close": "Zamknij",
  },
};
