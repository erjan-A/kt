const sections = Array.from(document.querySelectorAll(".section[id]"));
const navLinks = Array.from(document.querySelectorAll(".contents-nav a"));
const progressLabel = document.querySelector("[data-progress-label]");
const progressBar = document.querySelector("[data-progress-bar]");
const railTitle = document.querySelector("[data-rail-title]");
const railBody = document.querySelector("[data-rail-body]");
const railKicker = document.querySelector("[data-rail-kicker]");
const currentExample = document.querySelector("[data-current-example]");
const currentCopy = document.querySelector("[data-current-copy]");
const themeToggle = document.querySelector(".kt-ai-theme-toggle");
const toast = document.querySelector(".copy-toast");

const railData = {
  story: {
    title: "Что это такое",
    body: "Codex для меня не просто чат, а рабочая среда: место, где ИИ читает контекст, использует инструменты и возвращает проверяемый результат.",
    copy: `Роль (role): помощник по сборке моей рабочей ИИ-системы.
Задача (task): превратить мои голосовые заметки в первый контекст для Codex.
Цель (goal): убрать повторную вводную в каждом новом ИИ-чате.
Контекст (context): я вставлю сырой текст о роли, обязанностях, проектах, людях, статусах, решениях, блокерах и материалах.
Шаги:
1. Выдели мою роль и зоны ответственности.
2. Найди активные проекты и типы задач.
3. Определи источники правды (sources of truth) и повторяемые рабочие процессы (workflows).
4. Предложи минимальную структуру папок.
Формат результата: стартовая структура, черновик \`КОНТЕКСТ.md\`, первые 3 действия.
Ограничения: не выдумывай факты, пробелы помечай как "не найдено", файлы не создавай без подтверждения.`,
  },
  map: {
    title: "Карта KT OS",
    body: "Схема нужна, чтобы коллега увидел не папки, а связи между источниками, инструментами, контекстом, навыками и автоматизациями.",
    copy: `Роль (role): дизайнер операционной модели.
Задача (task): описать мою Codex OS как простой рабочий процесс (workflow).
Цель (goal): показать, как входящие сигналы превращаются в полезный результат.
Контекст (context): если папка пустая, предложи минимальную карту. Если папка уже есть, сначала осмотри текущие разделы.
Шаги:
1. Найди входы: чаты, письма, задачи, встречи, файлы.
2. Найди системные правила и маршрутизатор (router).
3. Свяжи проектный контекст, базу знаний, навыки (skills), автоматизации, инструменты, Telegram и проверку (review).
4. Покажи путь одного нового сигнала через систему.
Формат результата: Mermaid-схема и 1 короткое объяснение на каждый слой.
Ограничения: файлы не меняй, пиши понятно для человека, который впервые видит Codex.`,
  },
  system: {
    title: "00_Система",
    body: "Системный слой держится на коротком входе, маршрутизаторе задач, проверке данных и диагностике коннекторов.",
    copy: `Роль (role): архитектор системной папки.
Задача (task): спроектировать минимальный системный слой для моей Codex OS.
Цель (goal): чтобы Codex знал, что читать первым, где нельзя угадывать и где нужна проверка (review).
Контекст (context): я могу переходить с Claude, где главный файл был \`CLAUDE.md\`; в Codex аналогичная точка входа - \`AGENTS.md\`.
Шаги:
1. Предложи короткий \`AGENTS.md\`.
2. Предложи \`START_HERE.md\`.
3. Предложи маршрутизатор задач (task router).
4. Добавь правила источников правды (sources of truth), проверки данных и диагностики сбоев.
Формат результата: список файлов, роль каждого файла, черновая структура содержания.
Ограничения: перед записью покажи план, правила держи короткими, не создавай энциклопедию.`,
  },
  projects: {
    title: "01_Проекты",
    body: "Проектный документ должен быть понятен человеку и агенту: прост для коллеги и достаточно структурирован для Codex.",
    copy: `Роль (role): сборщик проектного контекста.
Задача (task): превратить мои сырые заметки в \`КОНТЕКСТ.md\`.
Цель (goal): чтобы проект был понятен без новой устной вводной (briefing) каждый раз.
Контекст (context): я вставлю голосовую расшифровку или черновые заметки. Если PROJECT_PATH уже есть, сначала осмотри папку. Если нет, спроси только минимально необходимые данные.
Шаги:
1. Выдели цель, пользователей, участников и статус.
2. Выдели решения, блокеры, следующие действия и открытые вопросы.
3. Свяжи материалы и источники.
4. Отдели подтверждённые факты от пробелов.
Формат результата: черновик \`КОНТЕКСТ.md\` и список недостающих фактов.
Ограничения: для пробелов пиши "не найдено", не выдумывай владельцев, даты, статус и эффект.`,
  },
  skills: {
    title: "Навыки",
    body: "Навык появляется там, где хороший рабочий разговор нужно превратить в повторяемую процедуру: от обновления проекта до точного отчёта по поручению.",
    copy: `Роль (role): аналитик рабочих процессов и навыков.
Задача (task): выбрать первые 3 навыка (skills) для Codex.
Цель (goal): превратить повторяемую реальную работу в процедуры, которые можно запускать снова.
Контекст (context): если папка пустая, используй мою роль и повторяющиеся боли. Если папка уже есть, осмотри текущие проекты и системные файлы. Для бизнес-анализа ориентируйся на \`business-analyst-project-intake-v2\`.
Шаги: найди повторяемые задачи: обновление проектов, вводные, отчётность, проверка документов, регулярная коммуникация. Проверь частоту, риск, источник правды и точку проверки. Раздели: промпт (prompt), шаблон (template), навык (skill), автоматизация (automation). Для каждого навыка опиши сигнал запуска (trigger), источники, шаги, результат, проверку и возможный сбой.
Формат результата: топ-3 навыка по приоритету и 2 кандидата, которые лучше отложить.
Ограничения: навыки не создавай без моего подтверждения.`,
  },
  automations: {
    title: "Автоматизации и Telegram",
    body: "Ежедневная сверка (daily sync) - это цикл: health check, сигналы, change plan, обновление источника правды, propagation, readback и digest.",
    copy: `Роль (role): проектировщик автоматизаций Codex OS.
Задача (task): спроектировать первую ежедневную сверку (daily sync).
Цель (goal): понять, что изменилось за последние 24 часа и куда должен попасть каждый сигнал.
Контекст (context): у меня может быть один проект и ещё не быть автоматизаций. Если папка уже есть, осмотри \`AGENTS.md\`, \`START_HERE.md\`, проектные контексты, источники задач, заметки Telegram и последние файлы.
Шаги: перечисли источники сигналов; определи источник правды для фактов проекта, задач, управленческого статуса и повторно используемых инсайтов; добавь health check, change plan, propagation, readback и структуру дайджеста; отметь проверку человеком; отдельно напиши, что пока не стоит автоматизировать.
Формат результата: первый безопасный цикл, источники, результат, точка проверки, риски, чеклист пробного запуска на 3 дня.
Ограничения: не отправляй сообщения, не пиши в task-системы и не обновляй управленческие записи без подтверждения. Не выдумывай инструменты, которых у меня нет.`,
  },
  tools: {
    title: "Инструменты и MCP",
    body: "Инструменты дают Codex глаза и руки. Open Design и дизайн-система превращают содержание в последовательные презентации и интерфейсы.",
    copy: `Роль (role): картограф инструментов и дизайн-системы.
Задача (task): описать слой инструментов для моей Codex OS.
Цель (goal): разделить память, действие, проверку, доставку результата и визуальную последовательность.
Контекст (context): начинай с локальной папки. Google Drive и Sheets подключай после понятного скелета. GitHub Pages используй для публичных ссылок на прототипы. Дизайн-систему используй для гайдов, веб-приложений (webapps) и презентаций.
Шаги: перечисли инструменты для чтения источников, подготовки документов, проверки результата, доставки, публичного просмотра (preview) и визуальных правил.
Формат результата: таблица: инструмент, зачем нужен, источник правды, разрешённые действия, где нужна проверка, первый безопасный сценарий.
Ограничения: простой язык для BA/PM, без низкоуровневых технических деталей.`,
  },
  knowledge: {
    title: "База знаний",
    body: "База знаний хранит повторно используемые инсайты, а не текущий статус проекта.",
    example: "Пример структуры:\n03_База знаний/\n  AI Knowledge Base.md\n  YouTube/notes/\n  YouTube/digests/\n  Внешние материалы/",
    copy: `Роль (role): куратор базы знаний.
Задача (task): описать простые правила для моей ИИ-базы знаний.
Цель (goal): сделать внешние идеи повторно используемыми в разных проектах.
Контекст (context): если базы знаний нет, предложи минимальную структуру. Если она есть, осмотри текущие заметки и примеры.
Шаги: определи, что идёт в базу знаний, что в проектный контекст, что в шаблон, что в навык, а что можно не сохранять.
Формат результата: черновик README и 5 примеров маршрутизации.
Ограничения: не храни текущий статус проекта в базе знаний, файлы не редактируй без подтверждения.`,
  },
  youtube: {
    title: "YouTube-дайджест",
    body: "Это сжатый промпт из моего YouTube-навыка: сначала расшифровка, затем KT-формат, связь с проектами и доставка в Telegram.",
    copy: `Роль (role): агент ручного YouTube-дайджеста для KT.
Задача (task): обработать одну YouTube-ссылку от начала до конца.
Цель (goal): получить расшифровку, сохранить KT-саммари, добавить запись в дневной дайджест и отправить результат в Telegram.
Контекст (context): рабочая папка KT на вашем компьютере. Целевая папка внутри неё: 03_База знаний/YouTube/. Источник расшифровки: TranscriptAPI.
Шаги:
1. Извлеки videoId из ссылки.
2. Проверь, не было ли видео уже обработано.
3. Получи расшифровку и метаданные через TranscriptAPI.
4. Сохрани полную расшифровку.
5. Сохрани саммари на русском в KT-формате: Суть, Тезисы, Сложные концепции простыми словами, Кейсы/примеры/данные, Возможности для KT, Идеи для стартапа/бизнеса, Как применить сегодня, Цитаты.
6. В блоке "Возможности для KT" связывай идеи с реальными проектами и системами только там, где связь подтверждена.
7. Добавь запись в дневной дайджест.
8. После успешного сохранения отправь саммари в Telegram.
Формат результата: изменённые файлы, статус Telegram, жёсткие остановки, если они были.
Ограничения: не выдумывай связи с проектами, не используй task-code без полного текста задачи, если расшифровка недоступна - остановись.`,
  },
};

let toastTimer;
let activeSectionId = "story";
let scrollSpyFrame;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1500);
}

async function copyText(value) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    showToast("Скопировано");
  } catch {
    showToast("Не скопировано");
  }
}

function setActiveSection(id) {
  if (!railData[id]) return;
  activeSectionId = id;
  const index = sections.findIndex((section) => section.id === id);
  const sectionNumber = Math.max(index + 1, 1);
  const data = railData[id];

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
  });

  if (data) {
    railKicker.textContent = `Раздел ${sectionNumber}`;
    railTitle.textContent = data.title;
    railBody.textContent = data.body;
    currentExample.textContent = data.copy;
    currentCopy.dataset.copySection = id;
    currentCopy.textContent = data.copyLabel || "Скопировать промпт";
  }

  progressLabel.textContent = `${sectionNumber} / ${sections.length}`;
  progressBar.style.width = `${(sectionNumber / sections.length) * 100}%`;
}

function createMobilePrompt(section, id, sectionNumber) {
  const data = railData[id];
  if (!data || section.querySelector(".mobile-rail-note")) return;

  const note = document.createElement("div");
  note.className = "mobile-rail-note";
  note.innerHTML = `
    <details>
      <summary>Промпт ${sectionNumber} / ${sections.length}</summary>
    <h3></h3>
    <p></p>
    <pre class="rail-example"><code></code></pre>
    <button class="primary-copy" type="button">Скопировать промпт</button>
    </details>
  `;

  note.querySelector("h3").textContent = data.title;
  note.querySelector("p").textContent = data.body;
  note.querySelector("code").textContent = data.copy;
  note.querySelector("button").textContent = data.copyLabel || "Скопировать промпт";
  note.querySelector("button").addEventListener("click", () => copyText(data.copy));
  section.appendChild(note);
}

sections.forEach((section, index) => createMobilePrompt(section, section.id, index + 1));

function updateSectionFromScroll() {
  const anchor = window.scrollY + 120;
  let nextId = sections[0]?.id || "story";

  for (const section of sections) {
    if (section.offsetTop <= anchor) nextId = section.id;
    else break;
  }

  if (nextId !== activeSectionId) setActiveSection(nextId);
}

function scheduleScrollSpy() {
  cancelAnimationFrame(scrollSpyFrame);
  scrollSpyFrame = requestAnimationFrame(updateSectionFromScroll);
}

window.addEventListener("scroll", scheduleScrollSpy, { passive: true });
window.addEventListener("resize", scheduleScrollSpy);
setActiveSection("story");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    setActiveSection(id);
  });
});

document.querySelectorAll(".prompt-block").forEach((block) => {
  const button = block.querySelector("button");
  button.addEventListener("click", () => copyText(block.dataset.prompt));
});

currentCopy.addEventListener("click", () => {
  const id = currentCopy.dataset.copySection || activeSectionId;
  copyText(railData[id].copy);
});

function syncThemeLabel() {
  const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  themeToggle.dataset.mode = current;
}

const savedTheme = localStorage.getItem("kt-os-guide-theme");
if (savedTheme === "light") document.documentElement.setAttribute("data-theme", "light");
syncThemeLabel();

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("kt-os-guide-theme", next);
  syncThemeLabel();
});
