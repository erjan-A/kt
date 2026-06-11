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
    copy: `Role: You are my AI OS setup assistant.
Task: Turn my raw voice notes into the first context for my personal Codex OS.
Goal: Help me stop re-briefing every new AI chat from zero.
Context: I will paste a rough transcript about my role, responsibilities, projects, people, current status, decisions, blockers, and materials.
Steps:
1. Extract my role and responsibilities.
2. Identify active projects and project types.
3. Find sources of truth and recurring workflows.
4. Propose the first folder structure.
Output format: starter structure, first KONTEXT.md outline, first 3 actions.
Constraints: do not invent facts, mark gaps as "не найдено", do not create files until I approve.`,
  },
  map: {
    title: "Карта KT OS",
    body: "Схема нужна, чтобы коллега увидел не папки, а связи между источниками, tools layer, контекстом, skills и automations.",
    copy: `Role: You are an operating model designer.
Task: Map my Codex OS as a simple workflow.
Goal: Show how signals become useful outputs.
Context: If my folder is blank, propose the minimum map. If it exists, inspect current folders.
Steps:
1. Identify inputs.
2. Identify system rules and router.
3. Map project context, KB, skills, automations, tools, Telegram, and review.
4. Show how a new signal moves through the OS.
Output format: Mermaid diagram plus 1 sentence per layer.
Constraints: do not change files, keep it understandable for a first-time reader.`,
  },
  system: {
    title: "00_Система",
    body: "AGENTS.md должен быть коротким входом, а детали должны жить в нужных папках: правила, источники, проекты, automations.",
    copy: `Role: You are my system-folder architect.
Task: Design the minimum system layer for my Codex OS.
Goal: Make Codex know what to read first, what not to guess, and where review is needed.
Context: I may be migrating from Claude where the main instruction file was CLAUDE.md. In Codex the equivalent is AGENTS.md.
Steps:
1. Propose a short AGENTS.md.
2. Propose START_HERE.md.
3. Propose a task router.
4. Define source-of-truth and review rules.
Output format: file list, purpose of each file, draft content outline.
Constraints: show the plan before writing, keep rules short, do not create a huge encyclopedia.`,
  },
  projects: {
    title: "01_Проекты",
    body: "Проектный документ должен быть human-readable и agent-readable: понятен коллеге и достаточно структурирован для Codex.",
    copy: `Role: You are my project-context builder.
Task: Turn my raw project notes into KONTEXT.md.
Goal: Make this project understandable without re-briefing Codex every time.
Context: I will paste a voice transcript or rough notes. If PROJECT_PATH exists, inspect it first. If not, ask only for missing essentials.
Steps:
1. Extract goal, users, stakeholders, and status.
2. Extract decisions, blockers, next actions, and open questions.
3. Link materials and sources.
4. Separate confirmed facts from gaps.
Output format: KONTEXT.md draft plus missing facts.
Constraints: write "не найдено" for gaps, do not invent owners, dates, status, or impact.`,
  },
  skills: {
    title: "Skills",
    body: "Skill появляется там, где хороший рабочий разговор нужно превратить в повторяемую процедуру.",
    copy: `Role: workflow-to-skill analyst.
Task: choose my first 3 Codex skills.
Goal: turn repeated real work into reusable procedures.
Context: if my folder is blank, use my role and repeated pain points. If it exists, inspect current work. Use BA intake v2 as the pattern for BA work.
Steps: find repeated tasks; check frequency, risk, source of truth, and review need; separate prompt, template, skill, automation; define trigger, sources, steps, output, review point, failure mode.
Output format: ranked top 3 skills plus 2 candidates to postpone.
Constraints: do not create skills until I approve.`,
  },
  automations: {
    title: "Автоматизации и Telegram",
    body: "Daily sync нужен не как отчёт, а как утренняя сверка: что изменилось и куда должен попасть каждый сигнал.",
    copy: `Role: Codex OS automation designer.
Task: design my first daily sync loop.
Goal: see what changed in the last 24 hours and where each signal should go.
Context: I may have one project and no automations. If a folder exists, inspect AGENTS.md, START_HERE.md, project contexts, task sources, Telegram notes, and recent files.
Steps: list signal sources; define source of truth for project facts, tasks, management status, and reusable insights; propose digest structure; mark human review; mark what not to automate.
Output format: first safe loop, sources, output, review point, risks, 3-day trial checklist.
Constraints: do not send messages, write to task systems, or update management records without approval. Do not invent tools I do not have.`,
  },
  tools: {
    title: "Инструменты и MCP",
    body: "Tools дают Codex глаза и руки. Дизайн-система даёт ему визуальную память, чтобы результаты не выглядели случайно.",
    copy: `Role: tools and design-system mapper.
Task: map the tools layer for my Codex OS.
Goal: separate memory, action, verification, delivery, and visual consistency.
Context: start local-first. Add Drive and Sheets after the folder skeleton is clear. Add GitHub Pages for prototypes. Use DS for guides, webapps, and decks.
Steps: list tools for reading sources, drafting documents, checking output, delivery, public previews, and visual rules.
Output format: table with tool, purpose, source of truth, allowed actions, review needed, first safe use.
Constraints: simple BA/PM language, no low-level implementation details.`,
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
    title: "YouTube digest prompt",
    body: "Это сжатый prompt из моего YouTube skill: transcript first, KT format, project relevance, Telegram delivery only after successful save.",
    copy: `Role: YouTube Manual Digest agent for KT.
Task: process one YouTube URL end-to-end.
Goal: save transcript, KT-format summary, daily digest entry, processed state, then send summary to Telegram.
Context: KT folder is /Users/yerzhanassanov/Library/CloudStorage/GoogleDrive-yerzhan.assanov@gmail.com/My Drive/KT. Target folder: 03_База знаний/YouTube/. Use TranscriptAPI as the only transcript source.
Steps:
1. Extract 11-char videoId from the URL.
2. Read YouTube/.state/processed.json. If videoId is already summarized, stop and ask whether rerun is needed.
3. Fetch transcript and metadata via TranscriptAPI. If transcript is missing, 404, empty, or unavailable, hard stop: do not create files, do not update state, do not send Telegram.
4. Create slug from title, kebab-case, around 60 chars.
5. Save full transcript to transcripts/{slug}.md with frontmatter: title, channel, url, videoId, duration, date, type: transcript, summary link.
6. Save summary to videos/{slug}.md in Russian with sections: Суть, Тезисы, Сложные концепции простыми словами, Кейсы/примеры/данные, Возможности для КТ, Идеи для стартапа/бизнеса, Как применить сегодня, Цитаты, transcript link.
7. In Возможности для КТ, connect ideas to real KT projects/systems only when relevant. Be specific, not generic.
8. Append daily digest entry to digests/YYYY-MM-DD.md with title, channel, duration, essence, summary link, transcript link.
9. Update .state/processed.json: status summarized, date, title, last_run.
10. After successful file/state writes, send summary to Telegram through yt-digest Bot API. Telegram failure does not roll back files/state.
Output format: changed files, Telegram status, hard stops if any.
Constraints: no fallback from metadata, no Whisper/audio rerun unless explicitly asked, no invented project links, no task code without full task text.`,
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
    currentCopy.textContent = data.copyLabel || "Copy prompt";
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
      <summary>Prompt ${sectionNumber} / ${sections.length}</summary>
    <h3></h3>
    <p></p>
    <pre class="rail-example"><code></code></pre>
    <button class="primary-copy" type="button">Copy this prompt</button>
    </details>
  `;

  note.querySelector("h3").textContent = data.title;
  note.querySelector("p").textContent = data.body;
  note.querySelector("code").textContent = data.copy;
  note.querySelector("button").textContent = data.copyLabel || "Copy this prompt";
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
