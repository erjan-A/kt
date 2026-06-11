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
    body: "Codex для меня не просто чат, а среда управления агентами: место, где рабочие агенты читают контекст, используют инструменты и возвращают результат.",
    example: "Старт:\n1. Наговорить голосом роль и проект.\n2. Превратить запись в контекст.\n3. Разложить память по слоям.\n4. Сделать первый повторяемый рабочий процесс.",
    copy: `Role: You are my AI OS setup assistant.
Task: Turn my raw voice notes into the first context for a personal Codex OS.
Goal: Help me stop re-briefing every new AI chat from zero.
Context: I will paste a rough transcript about my role, responsibilities, projects, people, current status, decisions, blockers, and materials.
Steps: extract my role, project types, active projects, sources of truth, recurring workflows, open gaps.
Output format: starter structure, first KONTEXT.md outline, first 3 actions.
Constraints: do not invent facts, mark gaps as "не найдено", do not create files until I approve.`,
  },
  map: {
    title: "Карта KT OS",
    body: "Схема нужна, чтобы коллега увидел не папки, а связи между источниками, tools layer, контекстом, skills и automations.",
    example: "Пример схемы:\nВходы -> Tools -> Router\nProject context -> Output -> Review\nKB + Skills + Automations -> Compound loop",
    copy: `Role: You are an operating model designer.
Task: Map my Codex OS as a simple workflow.
Goal: Show how signals become useful outputs.
Context: If my folder is blank, propose the minimum map. If it exists, inspect current folders.
Steps: identify inputs, system rules, project context, KB, skills, automations, Telegram, review.
Output format: Mermaid diagram plus 1 sentence per layer.
Constraints: do not change files, keep it understandable for a first-time reader.`,
  },
  system: {
    title: "00_Система",
    body: "AGENTS.md должен быть коротким входом, а детали должны жить в нужных папках: правила, источники, проекты, automations.",
    example: "Пример:\nAGENTS.md -> короткие правила\n00_START_HERE.md -> куда идти\ncodex_task_router.md -> типовые маршруты\nКОНТЕКСТ.md -> правда проекта",
    copy: `Role: You are my system-folder architect.
Task: Design the minimum system layer for my Codex OS.
Goal: Make Codex know what to read first, what not to guess, and where review is needed.
Context: I may be migrating from Claude where the main instruction file was CLAUDE.md. In Codex the equivalent is AGENTS.md.
Steps: propose a short AGENTS.md, START_HERE.md, task router, source-of-truth rules, review checklist.
Output format: file list, purpose of each file, draft content outline.
Constraints: show the plan before writing, keep rules short, do not create a huge encyclopedia.`,
  },
  projects: {
    title: "01_Проекты",
    body: "Проектный документ должен быть human-readable и agent-readable: понятен коллеге и достаточно структурирован для Codex.",
    example: "Что наговорить:\nкто я\nчто за проект\nкто участвует\nчто сделано\nкакие решения\nгде материалы\nчто блокирует",
    copy: `Role: You are my project-context builder.
Task: Turn my raw project notes into KONTEXT.md.
Goal: Make this project understandable without re-briefing Codex every time.
Context: I will paste a voice transcript or rough notes. If PROJECT_PATH exists, inspect it first. If not, ask only for missing essentials.
Steps: extract goal, users, stakeholders, status, decisions, blockers, next actions, open questions, linked files.
Output format: KONTEXT.md draft plus missing facts.
Constraints: write "не найдено" for gaps, do not invent owners, dates, status, or impact.`,
  },
  skills: {
    title: "Skills",
    body: "Skills бывают стабильные и диалоговые: одни каждый раз делают одно и то же, другие помогают с оценкой по ситуации и проверкой.",
    example: "Простые skills:\nproject-update\nkt-project-briefing\nyoutube-daily-digest\nba-task-followup\n\nУмные skills:\nceo-strategy-reviewer\nbusiness-analyst-project-intake\nkt-session-compound",
    copy: `Role: You are my workflow-to-skill analyst.
Task: Find which repeated tasks should become skills.
Goal: Turn good recurring prompts into reusable Codex procedures.
Context: If my folder is blank, use my role, project types, and repeated pain points. If it exists, inspect current work.
Steps: find repeated formats, risk points, sources, review needs, output formats, and maintenance needs.
Output format: 5 skill candidates with trigger, sources, steps, output, review, failure modes.
Constraints: do not write code or create skills until I approve.`,
  },
  automations: {
    title: "Автоматизации и Telegram",
    body: "До automation нужен automation brainstorm: какие циклы повторяются, где источник правды, где review point и что пока рано автоматизировать.",
    example: "Пример:\n09:00 BA reminders -> Telegram\n10:00 update collector -> статусы и blockers\n17:30 daily truth sync -> что обновить в source of truth\nWeekly hygiene -> структура и skills health",
    copy: `Role: You are my Codex OS automation reviewer.
Task: Look at my current work folder and suggest the first automations I should build.
Goal: Find repeated work that is useful, safe, and easy to review.
Context: I may be starting from a blank folder or an early Codex OS. If folders exist, inspect AGENTS.md, START_HERE.md, project contexts, skills, and recent notes. If not, ask for my role, projects, and repeated tasks.
Steps:
1. Identify repeated tasks.
2. Separate prompts, templates, skills, and automations.
3. For each automation candidate, define inputs, source of truth, output, review point, and risk.
4. Mark what should not be automated yet.
Output format:
- Top 5 candidates
- Why it matters
- Source of truth
- Human review point
- First safe version
Constraints: do not create files, send messages, or change automations without approval. Do not invent tools or integrations I do not have.`,
  },
  tools: {
    title: "Инструменты и MCP",
    body: "Практичный порядок: сначала локальная папка, потом Drive/Sheets, потом GitHub Pages для публичных прототипов.",
    example: "Пример tools layer:\nLocal folder -> стабильный skeleton\nGoogle Drive -> shared materials\nGoogle Sheets -> Реестр\nGitHub Pages -> public preview\nMCP/connectors -> tools layer",
    copy: `Role: You are my tools-layer mapper.
Task: Describe which tools my Codex OS needs.
Goal: Separate memory, action, verification, and delivery.
Context: Start local-first. Add Google Drive and Google Sheets after the folder skeleton is clear. Add GitHub Pages if I build prototypes.
Steps: list tools for reading sources, drafting documents, checking output, sending results, and publishing prototypes.
Output format: table with tool, purpose, source of truth, allowed actions, review needed.
Constraints: use simple BA/PM language, avoid implementation details.`,
  },
  knowledge: {
    title: "База знаний",
    body: "KB хранит reusable insights, а не текущий статус проекта.",
    example: "Пример структуры:\n03_База знаний/\n  AI Knowledge Base.md\n  YouTube/notes/\n  YouTube/digests/\n  Внешние материалы/",
    copy: `Role: You are my knowledge-base curator.
Task: Design simple rules for my AI knowledge base.
Goal: Make external insights reusable across projects.
Context: If no KB exists, propose a minimal one. If it exists, inspect current notes and examples.
Steps: define what goes to KB, project context, template, skill, or trash.
Output format: README draft plus 5 routing examples.
Constraints: do not store current project status in KB, do not edit files without approval.`,
  },
  youtube: {
    title: "Пример YouTube-дайджеста",
    body: "Видео из playlist To Summarize становятся базой идей: их можно прогонять через новый проект, чтобы найти patterns, risks и skills.",
    example: "Пример формата:\nСуть\n- Почему видео стоит внимания.\n- Как оно связано с моей рабочей OS.\nТезисы\n- 2-5 главных мыслей.\n- Без пересказа ради пересказа.\nВозможности для KT\n- Где применить в проектах.\n- Какой skill или prompt может появиться.\nКак применить сегодня\n- Один маленький следующий шаг.\n- Что сохранить в базу знаний.",
    copy: `Role: You are my project research partner.
Task: Run PROJECT_PATH through my YouTube digests and knowledge base.
Goal: Find patterns, risks, prompts, and skill ideas before I start building.
Context: If PROJECT_PATH exists, read its KONTEXT.md first. If not, ask for a 5-line project brief.
Steps: search relevant digests, extract 5-7 insights, connect each to project decisions.
Output format: insight, source, why it applies, what to try today, what needs review.
Constraints: do not invent sources, do not summarize videos by title only.`,
  },
  choose: {
    title: "Как выбрать, что строить",
    body: "Сначала докажите, что гипотеза работает на сильной модели. Потом оптимизируйте стоимость, скорость и развёртывание.",
    example: "Пример фильтра:\nTop model first -> проверить возможно ли\nVerify before build -> как проверить\nЧеловек в начале и в конце -> человек -> AI -> человек\nOptimize later -> local LLM, кеш, prompts, guardrails",
    copy: `Role: You are my build-prioritization coach.
Task: Decide what should become a prompt, template, skill, or automation.
Goal: Build only what is useful, repeatable, and checkable.
Context: If my OS is new, use one project and one workflow as the baseline.
Steps: score candidates by frequency, risk, source of truth, review need, ease of testing.
Output format: 10 candidates, type, reason, first 3 to build now.
Constraints: do not recommend automation when a prompt or template is enough.`,
  },
  copy: {
    title: "7-day starter plan",
    body: "Новичку нужно пройти путь: voice dump, folder skeleton, проектный контекст, первый workflow, tools layer, review и compound.",
    example: "Starter kit:\nDay 1 -> voice dump\nDay 2 -> AGENTS/START_HERE\nDay 3 -> KONTEXT.md\nDay 4 -> reusable prompt\nDay 5 -> skill candidate\nDay 6 -> tools layer\nDay 7 -> review + compound",
    copy: `Role: You are my seven-day Codex OS coach.
Task: Guide me from blank state to a working personal AI OS.
Goal: Build a usable v1 in 7 days.
Context: My role is ROLE. My main project types are PROJECT_TYPES. I may have no folders yet.
Steps: give one concrete action per day: voice dump, system rules, project context, reusable prompt, skill candidate, tools layer, review and compound.
Output format: 7-day checklist with done criteria and copyable prompts.
Constraints: keep it simple, do not propose complex automations before one project context works.`,
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
    showToast("Copied");
  } catch {
    showToast("Copy failed");
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
    railKicker.textContent = `Section ${sectionNumber}`;
    railTitle.textContent = data.title;
    railBody.textContent = data.body;
    currentExample.textContent = data.copy;
    currentCopy.dataset.copySection = id;
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
    <span>Prompt ${sectionNumber} / ${sections.length}</span>
    <h3></h3>
    <p></p>
    <pre class="rail-example"><code></code></pre>
    <button class="primary-copy" type="button">Copy this prompt</button>
  `;

  note.querySelector("h3").textContent = data.title;
  note.querySelector("p").textContent = data.body;
  note.querySelector("code").textContent = data.copy;
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
