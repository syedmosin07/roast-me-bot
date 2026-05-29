import { useState, useRef } from "react";

const FIRE_EMOJIS = ["🔥", "💀", "😂", "🫵", "👀", "💅", "🤣", "😭"];
function randomFire() { return FIRE_EMOJIS[Math.floor(Math.random() * FIRE_EMOJIS.length)]; }

// ── MODES ──────────────────────────────────────────────────────────────────
const MODES = [
  { id: "student", label: "Student", emoji: "🎓", desc: "Still studying, still suffering" },
  { id: "job", label: "Working", emoji: "💼", desc: "Soul sold, salary deposited" },
  { id: "unemployed", label: "Unemployed", emoji: "🛋️", desc: "Professionally doing nothing" },
  { id: "dropout", label: "Dropout", emoji: "🚪", desc: "Left the building early" },
  { id: "10th_12th", label: "10th / 12th", emoji: "📝", desc: "Stopped right there" },
];

// ── COURSES ────────────────────────────────────────────────────────────────
const COURSES = [
  { id: "mbbs", label: "MBBS", emoji: "🩺", desc: "Medicine" },
  { id: "bca", label: "BCA", emoji: "💻", desc: "Computer Apps" },
  { id: "mca", label: "MCA", emoji: "🖥️", desc: "Master Comp Apps" },
  { id: "bcom", label: "B.Com", emoji: "💰", desc: "Commerce" },
  { id: "mcom", label: "M.Com", emoji: "📊", desc: "Master Commerce" },
  { id: "btech", label: "B.Tech", emoji: "⚙️", desc: "Engineering" },
  { id: "mba", label: "MBA", emoji: "👔", desc: "Business Admin" },
  { id: "ba", label: "B.A.", emoji: "📚", desc: "Arts" },
  { id: "bsc", label: "B.Sc", emoji: "🔬", desc: "Science" },
  { id: "llb", label: "LLB", emoji: "⚖️", desc: "Law" },
  { id: "bpharm", label: "B.Pharm", emoji: "💊", desc: "Pharmacy" },
  { id: "bba", label: "BBA", emoji: "📈", desc: "Business Admin" },
  { id: "bed", label: "B.Ed", emoji: "🏫", desc: "Teacher Training" },
  { id: "bams", label: "BAMS", emoji: "🌿", desc: "Ayurvedic Doctor" },
  { id: "bds", label: "BDS", emoji: "🦷", desc: "Dentist" },
  { id: "barch", label: "B.Arch", emoji: "🏛️", desc: "Architecture" },
  { id: "bdes", label: "B.Des", emoji: "🎨", desc: "Design" },
  { id: "ballb", label: "BA LLB", emoji: "📜", desc: "5yr Law" },
  { id: "mtech", label: "M.Tech", emoji: "🔧", desc: "Master Engineering" },
  { id: "phd", label: "PhD", emoji: "🧪", desc: "Doctorate" },
  { id: "diploma", label: "Diploma", emoji: "📋", desc: "Polytechnic" },
  { id: "iti", label: "ITI", emoji: "🔩", desc: "Industrial Training" },
  { id: "animation", label: "Animation", emoji: "🎬", desc: "Multimedia/Design" },
  { id: "bsc_nursing", label: "B.Sc Nursing", emoji: "💉", desc: "Nursing" },
];

// ── JOBS ────────────────────────────────────────────────────────────────────
const JOBS = [
  { id: "software_eng", label: "Software Eng", emoji: "💻", desc: "IT / Dev" },
  { id: "govt_job", label: "Govt Job", emoji: "🏛️", desc: "Sarkari Naukri" },
  { id: "teacher", label: "Teacher", emoji: "📖", desc: "Education" },
  { id: "doctor", label: "Doctor", emoji: "🩺", desc: "Medical" },
  { id: "banker", label: "Banker", emoji: "🏦", desc: "Banking" },
  { id: "ca", label: "CA", emoji: "🧾", desc: "Chartered Acc." },
  { id: "sales", label: "Sales", emoji: "📞", desc: "Sales / Marketing" },
  { id: "manager", label: "Manager", emoji: "📋", desc: "Management" },
  { id: "freelancer", label: "Freelancer", emoji: "🏠", desc: "Self Employed" },
  { id: "startup", label: "Startup", emoji: "🚀", desc: "Entrepreneur" },
  { id: "police", label: "Police", emoji: "👮", desc: "Law Enforcement" },
  { id: "content", label: "Content Creator", emoji: "🎥", desc: "YouTube/Insta" },
  { id: "driver", label: "Driver", emoji: "🚗", desc: "Uber/Ola" },
  { id: "accountant", label: "Accountant", emoji: "🧮", desc: "Accounts" },
  { id: "hr", label: "HR", emoji: "😊", desc: "Human Resources" },
  { id: "data_analyst", label: "Data Analyst", emoji: "📉", desc: "Data & Analytics" },
  { id: "nurse", label: "Nurse", emoji: "💉", desc: "Healthcare" },
  { id: "chef", label: "Chef", emoji: "👨‍🍳", desc: "Food & Kitchen" },
  { id: "journalist", label: "Journalist", emoji: "📰", desc: "Media" },
  { id: "realestate", label: "Real Estate", emoji: "🏠", desc: "Property Agent" },
  { id: "gym_trainer", label: "Gym Trainer", emoji: "💪", desc: "Fitness" },
  { id: "mechanic", label: "Mechanic", emoji: "🔧", desc: "Repairs" },
  { id: "delivery", label: "Delivery", emoji: "🛵", desc: "Swiggy/Zomato" },
  { id: "intern", label: "Intern", emoji: "🐣", desc: "Unpaid Suffering" },
];

// ── DROPOUT OPTIONS ──────────────────────────────────────────────────────────
const DROPOUT_OPTIONS = [
  { id: "1yr", label: "1st Year Dropout", emoji: "🚪", desc: "Left fastest" },
  { id: "2yr", label: "2nd Year Dropout", emoji: "😬", desc: "Almost halfway" },
  { id: "3yr", label: "3rd Year Dropout", emoji: "💔", desc: "So close yet so far" },
  { id: "backlog", label: "Graduated w/ Backlogs", emoji: "📛", desc: "Technically done" },
  { id: "gap_year", label: "Gap Year(s)", emoji: "⏳", desc: "Finding myself" },
  { id: "neet_jee", label: "NEET/JEE Repeater", emoji: "😭", desc: "3rd attempt life" },
];

// ── 10TH / 12TH OPTIONS ────────────────────────────────────────────────────
const SCHOOL_OPTIONS = [
  { id: "10th", label: "Stopped at 10th", emoji: "📝", desc: "SSC done, life undone" },
  { id: "12th", label: "Stopped at 12th / PUC", emoji: "📗", desc: "HSC but no degree" },
  { id: "12th_fail", label: "12th Fail", emoji: "💥", desc: "The og struggle" },
];

// ── LANGUAGE OPTIONS ────────────────────────────────────────────────────────
const LANGUAGES = [
  { id: "english", label: "English", emoji: "🇬🇧" },
  { id: "hinglish", label: "Hinglish", emoji: "🇮🇳" },
  { id: "hindi", label: "Hindi", emoji: "🙏" },
];

// ── INTENSITY OPTIONS ───────────────────────────────────────────────────────
const INTENSITIES = [
  { id: "mild", label: "Mild 😏", desc: "Friendly roast" },
  { id: "savage", label: "Savage 💀", desc: "No mercy" },
  { id: "nuclear", label: "Nuclear ☠️", desc: "Soul destroyer" },
];

// ── CONTEXTS ─────────────────────────────────────────────────────────────────
const STUDENT_CONTEXT = {
  mbbs:"an MBBS student who spent 6 years studying to earn less than a software engineer, memorizes 10,000 diseases but still Googles symptoms, and hasn't slept since 2019",
  bca:"a BCA student who thinks they're a software engineer but mostly copies from Stack Overflow, can't code without YouTube, and tells everyone they're 'in IT'",
  mca:"an MCA student who spent 3 more years after BCA still learning the same things, drops 'I'm doing Masters in CS' at family functions to feel superior",
  bcom:"a B.Com student who chose commerce to avoid maths but ended up drowning in accounting, taxation and statistics — the ultimate betrayal",
  mcom:"an M.Com student who did 2 more years of B.Com because they still couldn't figure out what to do with their life",
  btech:"a B.Tech student who chose engineering to make parents proud, hasn't used 90% of what they studied, and survives on Maggi and missed deadlines",
  mba:"an MBA student who paid 20 lakhs to learn 'synergy', 'networking', and 'blue ocean strategy' — things that could've been a free LinkedIn post",
  ba:"a B.A. student who everyone says took the easy route, writes 50-page assignments on ancient history nobody asked about, and has the strongest opinions about everything",
  bsc:"a B.Sc student stuck between engineers who code and doctors who heal, doing experiments that already have known results and wondering where life went wrong",
  llb:"an LLB student who now argues with everyone professionally, reads 500-page case files for fun, and will literally bill you for this conversation",
  bpharm:"a B.Pharm student who memorized every drug interaction ever but still can't cure their own existential crisis",
  bba:"a BBA student who puts 'leverage', 'scalable', and 'disruptive' in every sentence and makes PowerPoints about things nobody asked for",
  bed:"a B.Ed student who is training to become a teacher — a noble profession that pays roughly the same as a part-time delivery job",
  bams:"a BAMS student who became an Ayurvedic doctor so they could tell people to drink turmeric milk for every disease including broken bones",
  bds:"a BDS student who studied dentistry so they could spend their career being the most feared person in someone's day",
  barch:"a B.Arch student who sleeps 2 hours a night making models nobody will build, has sacrificed every relationship to AutoCAD, and calls it passion",
  bdes:"a B.Des student whose parents still ask 'but what exactly do you do?' and honestly they're not sure either",
  ballb:"a BA LLB student spending 5 years combining two confusing subjects so they can be both opinionated AND legally dangerous",
  mtech:"an M.Tech student doing a masters because they couldn't get a good job with B.Tech, and suspect M.Tech won't help either",
  phd:"a PhD student who has been 'almost done' with their thesis for 3 years, gets paid stipend that's an insult to the word 'salary', and their family introduces them as 'still studying'",
  diploma:"a Diploma student that engineers look down on despite doing more practical work than all of them combined",
  iti:"an ITI student who will actually be employable the fastest but gets zero respect at family functions",
  animation:"an Animation student whose parents thought they were 'good at drawing' and somehow that became a 3-year course that costs 4 lakhs",
  bsc_nursing:"a B.Sc Nursing student who does the hardest work in any hospital, gets the least credit, and their salary is a crime against humanity",
};

const JOB_CONTEXT = {
  software_eng:"a Software Engineer who googles basic syntax after 5 years, has 47 browser tabs open always, calls moving text around 'solving complex problems', and their life is Stack Overflow, chai, and pretending to understand AI",
  govt_job:"a Government employee who took 6 years of exam prep to get a job where the goal is to do as little as possible, comes in at 10, leaves at 4, and considers 'file pending' a complete project update",
  teacher:"a Teacher who controls 40 students all day but can't control their own screen time, still writes on whiteboards in 2026, and their salary makes engineers feel guilty for complaining",
  doctor:"a Doctor who studied for 10 years, works 36-hour shifts, gets paid less than an Instagram influencer, and the only prescription they need is sleep and therapy",
  banker:"a Banker who smiles at customers while dying inside, knows 47 financial products but has zero personal savings, and their biggest fear is the RBI audit",
  ca:"a CA who spent 5 years studying for exams with a 5% pass rate, now does other people's taxes while their own finances are a mess, and their social life died in articleship",
  sales:"a Sales person who hits targets and still gets a motivational speech instead of a raise, smiles through 40 rejections a day, and their manager says 'the market is tough' every quarter",
  manager:"a Manager who attends 8 meetings about work others do, says 'circle back' and 'let's sync' instead of emailing, and mistakes a PowerPoint for actual productivity",
  freelancer:"a Freelancer who told everyone they escaped the 9-to-5 but actually works 24/7 for less money, chases unpaid invoices, and their LinkedIn says 'entrepreneur'",
  startup:"a Startup founder who calls sleeping on an office couch 'the hustle', raised pre-seed funding from parents, and has a brilliant idea that's basically Zomato but different",
  police:"a Police officer who has seen everything humanity has to offer and none of it was good, writes FIRs in handwriting nobody can read, and gets called at 3am for problems Google could solve",
  content:"a Content Creator who films themselves eating food and calls it a career, refreshes analytics every 4 minutes, and has had a full existential crisis over a Reel getting only 200 views",
  driver:"an Uber/Ola driver who has heard every kind of human problem as a free therapist, gets 1-star ratings for asking which route to take, and their car smells like regret and air freshener",
  accountant:"an Accountant who spends all year doing other people's finances while their own salary makes a calculator cry, and March 31st is basically their version of a war zone",
  hr:"an HR person who sends 'we'll be in touch' emails knowing full well they won't be, organizes team-building events nobody wants, and fires people with a smile",
  data_analyst:"a Data Analyst who makes beautiful dashboards that executives glance at for 4 seconds before making decisions based on gut feeling anyway",
  nurse:"a Nurse who does 80% of the actual medical work, gets 10% of the credit, works 12-hour shifts on their feet, and somehow still has to be polite to rude patients",
  chef:"a Chef who works in 45-degree heat while everyone else enjoys their weekend, has burns on burns on burns, and gets paid less than the restaurant's Instagram manager",
  journalist:"a Journalist who is told 'exposure' is payment, writes 5 articles a day for a salary that's an insult, and their job title sounds glamorous but their bank account disagrees",
  realestate:"a Real Estate agent who has driven clients to 40 properties and they still chose the first one, uses words like 'cozy' for tiny and 'vintage' for falling apart",
  gym_trainer:"a Gym Trainer who is in perfect shape but their bank balance needs serious training, gets unsolicited diet advice from clients who haven't seen their feet in years",
  mechanic:"a Mechanic who can fix anything with their hands but can't fix the fact that customers never trust their honest diagnosis and always think they're being overcharged",
  delivery:"a Swiggy/Zomato delivery person who is the only reason people eat hot food, gets 1-star ratings when the restaurant is slow, and their petrol costs eat most of the earnings",
  intern:"an Intern doing full-time work for zero or minimum pay, being told this is 'valuable experience', making chai and Excel sheets with equal enthusiasm, and praying for a PPO",
};

const DROPOUT_CONTEXT = {
  "1yr":"someone who dropped out in the 1st year of their degree — they paid a full year's fees, attended orientation, bought textbooks, and then said 'actually no' and left",
  "2yr":"someone who dropped out in the 2nd year — they survived the hardest year, made friends, almost figured out the course, and then dramatically exited stage left",
  "3yr":"someone who dropped out in the 3rd year — they were THIS close to finishing, had already suffered through 75% of the degree, and still chose chaos over completion",
  "backlog":"someone who technically graduated but still has active backlogs — they have a degree certificate in one hand and a hall ticket in the other, living a double life",
  "gap_year":"someone on a gap year that has quietly become multiple years — they said they were 'finding themselves' but mostly found Netflix, sleep schedules, and existential dread",
  "neet_jee":"someone appearing for NEET/JEE for the 3rd time — they have memorized every formula known to science but the exam keeps saying 'try again', and their coaching fees could buy a small car",
};

const SCHOOL_CONTEXT = {
  "10th":"someone who stopped their education after 10th standard — SSC complete, career unclear, relatives' questions infinite",
  "12th":"someone who completed 12th/PUC and stopped there — they have a higher secondary certificate, no degree, and a very creative answer ready for 'so what next?'",
  "12th_fail":"someone who failed 12th — inspiration for Bollywood movies, target of family WhatsApp forwards, and genuinely tougher than anyone who passed",
};

const UNEMPLOYED_CONTEXT = "someone who is currently unemployed — they wake up at 11am, send 3 job applications, watch Netflix for 6 hours, and tell everyone they're 'actively exploring opportunities'";

export default function App() {
  const [step, setStep] = useState("form");
  const [mode, setMode] = useState("");
  const [form, setForm] = useState({ name: "", course: "", job: "", dropout: "", school: "", year: "", fact1: "", fact2: "" });
  const [language, setLanguage] = useState("english");
  const [intensity, setIntensity] = useState("savage");
  const [roastStyle, setRoastStyle] = useState("comedian");
  const [roast, setRoast] = useState("");
  const [sparks, setSparks] = useState([]);
  const [copied, setCopied] = useState(false);
  const [reaction, setReaction] = useState("");
  const roastRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const spawnSparks = () => {
    const s = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i, x: Math.random() * 100,
      delay: Math.random() * 0.7, emoji: randomFire(),
    }));
    setSparks(s);
    setTimeout(() => setSparks([]), 2500);
  };

  const buildPrompt = () => {
    const facts = [form.fact1, form.fact2].filter(Boolean).join(", ");
    const langLine = language === "hinglish" ? "Write in Hinglish (mix of Hindi and English)." : language === "hindi" ? "Write entirely in Hindi." : "Write in English.";
    const intensityLine = intensity === "mild" ? "Keep it friendly and fun, not too brutal." : intensity === "nuclear" ? "Go ABSOLUTELY NUCLEAR — most savage, darkest, most brutal roast possible. No limits on darkness." : "Be savage and dark — no mercy but keep it funny.";
    const styleLine = roastStyle === "aunty" ? "Roast in the style of a nosy Indian aunty at a family function." : roastStyle === "shakespeare" ? "Roast in dramatic Shakespearean style with old English flair." : roastStyle === "news" ? "Roast as if reading a Breaking News bulletin on a serious news channel." : "Roast like a savage stand-up comedian.";

    let context = "";
    let label = "";

    if (mode === "student") {
      const obj = COURSES.find(c => c.id === form.course);
      context = STUDENT_CONTEXT[form.course] || "a confused student";
      label = obj?.label + " Student";
    } else if (mode === "job") {
      const obj = JOBS.find(j => j.id === form.job);
      context = JOB_CONTEXT[form.job] || "a professional suffering quietly";
      label = obj?.label;
    } else if (mode === "unemployed") {
      context = UNEMPLOYED_CONTEXT;
      label = "Unemployed";
    } else if (mode === "dropout") {
      const obj = DROPOUT_OPTIONS.find(d => d.id === form.dropout);
      context = DROPOUT_CONTEXT[form.dropout] || "a dropout";
      label = obj?.label;
    } else if (mode === "10th_12th") {
      const obj = SCHOOL_OPTIONS.find(s => s.id === form.school);
      context = SCHOOL_CONTEXT[form.school] || "someone who stopped studying early";
      label = obj?.label;
    }

    return `You are roasting ${form.name} who is ${context}.
${langLine}
${intensityLine}
${styleLine}

Details:
- Name: ${form.name}
- Category: ${label}
${form.year ? `- Year/Status: ${form.year}` : ""}
${facts ? `- Extra info: ${facts}` : ""}

Write ONLY 3 roast jokes. Use their name. End with a dark prediction/obituary line. Add relevant emojis. 3 jokes only — quality over quantity.`;
  };

  const getRoast = async (isRegenerate = false) => {
    if (!form.name) return;
    if (mode === "student" && !form.course) return;
    if (mode === "job" && !form.job) return;
    if (mode === "dropout" && !form.dropout) return;
    if (mode === "10th_12th" && !form.school) return;

    setStep("roasting");
    setReaction("");
    const prompt = buildPrompt();

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
      setRoast(data.roast);
      setStep("result");
      spawnSparks();
    } catch (err) {
      setRoast(`Server had an existential crisis trying to roast you. ${err.message} 💀`);
      setStep("result");
    }
  };

  const copyRoast = () => {
    navigator.clipboard.writeText(roast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`💀 My Dark Roast from RoastMeBot:\n\n${roast}\n\n🔥 Get roasted at roast-me-bot-beta.vercel.app`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const reset = () => {
    setForm({ name: "", course: "", job: "", dropout: "", school: "", year: "", fact1: "", fact2: "" });
    setRoast(""); setStep("form"); setMode(""); setReaction("");
  };

  const isFormValid = () => {
    if (!form.name || !mode) return false;
    if (mode === "student" && !form.course) return false;
    if (mode === "job" && !form.job) return false;
    if (mode === "dropout" && !form.dropout) return false;
    if (mode === "10th_12th" && !form.school) return false;
    return true;
  };

  const selectedItem = mode === "student" ? COURSES.find(c => c.id === form.course)
    : mode === "job" ? JOBS.find(j => j.id === form.job)
    : mode === "dropout" ? DROPOUT_OPTIONS.find(d => d.id === form.dropout)
    : mode === "10th_12th" ? SCHOOL_OPTIONS.find(s => s.id === form.school)
    : mode === "unemployed" ? { emoji: "🛋️", label: "Unemployed" } : null;

  return (
    <div style={s.page}>
      <style>{css}</style>
      {sparks.map(sp => (
        <div key={sp.id} style={{ ...s.spark, left: `${sp.x}%`, animationDelay: `${sp.delay}s` }}>{sp.emoji}</div>
      ))}

      <div style={s.container}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.badge}>💀 DARK ROAST BOT 💀</div>
          <h1 style={s.title}>Enter the<span style={s.accent}> Dark Roast Zone</span></h1>
          <p style={s.subtitle}>Students. Workers. Dropouts. Nobody is safe. ☠️</p>
        </div>

        {step === "form" && (
          <div style={s.card}>
            <div style={s.cardInner}>

              {/* Name */}
              <div style={s.inputGroup}>
                <label style={s.label}>Your Name *</label>
                <input style={s.input} name="name" value={form.name} onChange={handleChange} placeholder="What do people call you (besides a mistake)?" />
              </div>

              {/* Mode */}
              <div style={s.inputGroup}>
                <label style={s.label}>Who Are You? *</label>
                <div style={s.modeGrid}>
                  {MODES.map(m => (
                    <button key={m.id} style={{ ...s.modeBtn, ...(mode === m.id ? s.modeBtnActive : {}) }}
                      onClick={() => { setMode(m.id); setForm(f => ({ ...f, course: "", job: "", dropout: "", school: "" })); }}
                      className="course-btn">
                      <span style={{ fontSize: "24px" }}>{m.emoji}</span>
                      <span style={s.modeLabel}>{m.label}</span>
                      <span style={s.modeDesc}>{m.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Student courses */}
              {mode === "student" && (
                <div style={s.inputGroup}>
                  <label style={s.label}>Your Course * 🎯</label>
                  <div style={s.courseGrid}>
                    {COURSES.map(c => (
                      <button key={c.id} style={{ ...s.courseBtn, ...(form.course === c.id ? s.courseBtnActive : {}) }}
                        onClick={() => setForm(f => ({ ...f, course: c.id }))} className="course-btn">
                        <span style={s.courseEmoji}>{c.emoji}</span>
                        <span style={s.courseLabel}>{c.label}</span>
                        <span style={s.courseDesc}>{c.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Student year */}
              {mode === "student" && (
                <div style={s.inputGroup}>
                  <label style={s.label}>Year of Study</label>
                  <div style={s.yearRow}>
                    {["1st", "2nd", "3rd", "4th", "5th", "Final (still here lol)"].map(y => (
                      <button key={y} style={{ ...s.yearBtn, ...(form.year === y ? s.yearBtnActive : {}) }}
                        onClick={() => setForm(f => ({ ...f, year: y }))} className="course-btn">{y}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Jobs */}
              {mode === "job" && (
                <div style={s.inputGroup}>
                  <label style={s.label}>Your Job * 💼</label>
                  <div style={s.courseGrid}>
                    {JOBS.map(j => (
                      <button key={j.id} style={{ ...s.courseBtn, ...(form.job === j.id ? s.courseBtnActive : {}) }}
                        onClick={() => setForm(f => ({ ...f, job: j.id }))} className="course-btn">
                        <span style={s.courseEmoji}>{j.emoji}</span>
                        <span style={s.courseLabel}>{j.label}</span>
                        <span style={s.courseDesc}>{j.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dropout options */}
              {mode === "dropout" && (
                <div style={s.inputGroup}>
                  <label style={s.label}>Your Dropout Status * 🚪</label>
                  <div style={s.courseGrid}>
                    {DROPOUT_OPTIONS.map(d => (
                      <button key={d.id} style={{ ...s.courseBtn, ...(form.dropout === d.id ? s.courseBtnActive : {}) }}
                        onClick={() => setForm(f => ({ ...f, dropout: d.id }))} className="course-btn">
                        <span style={s.courseEmoji}>{d.emoji}</span>
                        <span style={s.courseLabel}>{d.label}</span>
                        <span style={s.courseDesc}>{d.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 10th/12th options */}
              {mode === "10th_12th" && (
                <div style={s.inputGroup}>
                  <label style={s.label}>Your Education * 📝</label>
                  <div style={s.courseGrid}>
                    {SCHOOL_OPTIONS.map(sc => (
                      <button key={sc.id} style={{ ...s.courseBtn, ...(form.school === sc.id ? s.courseBtnActive : {}) }}
                        onClick={() => setForm(f => ({ ...f, school: sc.id }))} className="course-btn">
                        <span style={s.courseEmoji}>{sc.emoji}</span>
                        <span style={s.courseLabel}>{sc.label}</span>
                        <span style={s.courseDesc}>{sc.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Unemployed type */}
              {mode === "unemployed" && (
                <div style={s.inputGroup}>
                  <label style={s.label}>Unemployment Status</label>
                  <div style={s.yearRow}>
                    {["Fresh Graduate", "Got Laid Off", "Quit Without Backup", "Never Worked", "Waiting for Sarkari Result"].map(u => (
                      <button key={u} style={{ ...s.yearBtn, ...(form.year === u ? s.yearBtnActive : {}) }}
                        onClick={() => setForm(f => ({ ...f, year: u }))} className="course-btn">{u}</button>
                    ))}
                  </div>
                </div>
              )}

              {mode && (
                <>
                  <div style={s.divider}><span style={s.dividerText}>🎛️ Customize your roast</span></div>

                  {/* Language */}
                  <div style={s.inputGroup}>
                    <label style={s.label}>🌍 Roast Language</label>
                    <div style={s.yearRow}>
                      {LANGUAGES.map(l => (
                        <button key={l.id} style={{ ...s.yearBtn, ...(language === l.id ? s.yearBtnActive : {}) }}
                          onClick={() => setLanguage(l.id)} className="course-btn">{l.emoji} {l.label}</button>
                      ))}
                    </div>
                  </div>

                  {/* Intensity */}
                  <div style={s.inputGroup}>
                    <label style={s.label}>🔥 Roast Intensity</label>
                    <div style={s.yearRow}>
                      {INTENSITIES.map(i => (
                        <button key={i.id} style={{ ...s.yearBtn, ...(intensity === i.id ? s.yearBtnActive : {}) }}
                          onClick={() => setIntensity(i.id)} className="course-btn">{i.label}</button>
                      ))}
                    </div>
                  </div>

                  {/* Style */}
                  <div style={s.inputGroup}>
                    <label style={s.label}>🎭 Roast Style</label>
                    <div style={s.yearRow}>
                      {[
                        { id: "comedian", label: "😂 Comedian" },
                        { id: "aunty", label: "👩 Desi Aunty" },
                        { id: "shakespeare", label: "🎭 Shakespeare" },
                        { id: "news", label: "📺 News Anchor" },
                      ].map(st => (
                        <button key={st.id} style={{ ...s.yearBtn, ...(roastStyle === st.id ? s.yearBtnActive : {}) }}
                          onClick={() => setRoastStyle(st.id)} className="course-btn">{st.label}</button>
                      ))}
                    </div>
                  </div>

                  <div style={s.divider}><span style={s.dividerText}>☠️ Extra ammo (optional)</span></div>

                  {[
                    { key: "fact1", ph: "e.g. I haven't opened my textbook since semester 1" },
                    { key: "fact2", ph: "e.g. My attendance is 23% and I'm stressed" },
                  ].map(({ key, ph }) => (
                    <div key={key} style={s.inputGroup}>
                      <input style={s.input} name={key} value={form[key]} onChange={handleChange} placeholder={ph} />
                    </div>
                  ))}

                  <button style={{ ...s.button, ...(!isFormValid() ? s.buttonDisabled : {}) }}
                    onClick={() => getRoast()} disabled={!isFormValid()} className="roast-btn">
                    💀 ROAST ME NOW 💀
                  </button>
                </>
              )}

              {!mode && <div style={s.pickHint}>👆 Pick who you are to get started</div>}
            </div>
          </div>
        )}

        {step === "roasting" && (
          <div style={s.loadingCard}>
            <div style={s.loadingEmoji} className="fire-pulse">☠️</div>
            <p style={s.loadingTitle}>Darkly roasting {form.name}...</p>
            <p style={s.loadingSubtitle}>Consulting the archives of suffering... 📂</p>
            <div style={s.dotsRow}>{[0,1,2].map(i => <div key={i} style={s.dot} className={`dot dot-${i}`} />)}</div>
          </div>
        )}

        {step === "result" && (
          <div style={s.roastCard} className="roast-reveal" ref={roastRef}>
            <div style={s.roastHeader}>
              <span style={s.roastEmoji}>{selectedItem?.emoji || "💀"}</span>
              <div>
                <div style={s.roastBadge}>☠️ {form.name.toUpperCase()}'S DARK ROAST ☠️</div>
                <div style={s.roastCourse}>{selectedItem?.label} · {intensity} · {roastStyle}</div>
              </div>
            </div>

            <div style={s.roastBody}>
              {roast.split("\n").map((line, i) => line.trim() ? <p key={i} style={s.roastLine}>{line}</p> : null)}
            </div>

            {/* Reaction buttons */}
            <div style={s.reactionRow}>
              {[["💀", "Dead"], ["😂", "Too Funny"], ["🫵", "Too Real"], ["😭", "It Hurts"]].map(([emoji, label]) => (
                <button key={label} style={{ ...s.reactionBtn, ...(reaction === label ? s.reactionBtnActive : {}) }}
                  onClick={() => setReaction(label)} className="course-btn">
                  {emoji} {label}
                </button>
              ))}
            </div>

            <div style={s.roastFooter}>
              <p style={s.disclaimer}>⚠️ Dark jokes only. Your soul is still (probably) intact.</p>

              {/* Action buttons */}
              <div style={s.actionRow}>
                <button style={s.actionBtn} onClick={copyRoast} className="course-btn">
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
                <button style={s.actionBtn} onClick={shareWhatsApp} className="course-btn">
                  📱 WhatsApp
                </button>
                <button style={s.actionBtn} onClick={() => getRoast(true)} className="course-btn">
                  🔄 Regenerate
                </button>
              </div>

              <button style={s.resetBtn} onClick={reset} className="roast-btn">💀 Roast Someone Else</button>
            </div>
          </div>
        )}

        <p style={s.footer}>Powered by Mosin + zero mercy 💀</p>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #050505 0%, #100005 50%, #050510 100%)", fontFamily: "'Georgia', serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", position: "relative", overflow: "hidden" },
  spark: { position: "fixed", top: "-10%", fontSize: "26px", animation: "sparkFall 2s ease-in forwards", zIndex: 999, pointerEvents: "none" },
  container: { width: "100%", maxWidth: "620px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", position: "relative", zIndex: 1 },
  header: { textAlign: "center" },
  badge: { display: "inline-block", background: "linear-gradient(90deg, #8b0000, #cc0000, #8b0000)", backgroundSize: "200% auto", animation: "shimmer 2s linear infinite", color: "#fff", fontSize: "12px", fontWeight: "bold", letterSpacing: "3px", padding: "6px 20px", borderRadius: "20px", marginBottom: "14px" },
  title: { fontSize: "clamp(1.9rem, 6vw, 3rem)", color: "#fff", margin: "0 0 8px", fontWeight: "900", lineHeight: 1.1, letterSpacing: "-1px" },
  accent: { color: "#cc0000", display: "block" },
  subtitle: { color: "#666", fontSize: "15px", margin: 0, fontStyle: "italic" },
  card: { width: "100%", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(180,0,0,0.2)", borderRadius: "20px", boxShadow: "0 0 40px rgba(150,0,0,0.08)" },
  cardInner: { padding: "28px", display: "flex", flexDirection: "column", gap: "18px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { color: "#cc3300", fontSize: "11px", fontWeight: "bold", letterSpacing: "1.5px", textTransform: "uppercase" },
  input: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(180,0,0,0.25)", borderRadius: "10px", color: "#fff", fontSize: "14px", padding: "11px 14px", outline: "none", fontFamily: "inherit" },
  modeGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" },
  modeBtn: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(180,0,0,0.2)", borderRadius: "12px", color: "#aaa", cursor: "pointer", padding: "12px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", transition: "all 0.15s", fontFamily: "inherit" },
  modeBtnActive: { background: "rgba(160,0,0,0.2)", border: "1px solid #cc0000", color: "#fff", boxShadow: "0 0 14px rgba(150,0,0,0.3)" },
  modeLabel: { fontSize: "13px", fontWeight: "bold", color: "inherit" },
  modeDesc: { fontSize: "10px", color: "#555", textAlign: "center" },
  courseGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" },
  courseBtn: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(180,0,0,0.18)", borderRadius: "10px", color: "#999", cursor: "pointer", padding: "10px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", transition: "all 0.15s", fontFamily: "inherit" },
  courseBtnActive: { background: "rgba(160,0,0,0.2)", border: "1px solid #cc0000", color: "#fff", boxShadow: "0 0 10px rgba(150,0,0,0.25)" },
  courseEmoji: { fontSize: "18px" },
  courseLabel: { fontSize: "11px", fontWeight: "bold", color: "inherit" },
  courseDesc: { fontSize: "10px", color: "#555", textAlign: "center" },
  yearRow: { display: "flex", flexWrap: "wrap", gap: "8px" },
  yearBtn: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(180,0,0,0.18)", borderRadius: "8px", color: "#999", cursor: "pointer", padding: "7px 12px", fontSize: "12px", fontFamily: "inherit", transition: "all 0.15s" },
  yearBtnActive: { background: "rgba(160,0,0,0.2)", border: "1px solid #cc0000", color: "#fff" },
  divider: { textAlign: "center", padding: "4px 0" },
  dividerText: { color: "#3a3a3a", fontSize: "12px" },
  button: { marginTop: "4px", background: "linear-gradient(135deg, #8b0000, #cc0000)", border: "none", borderRadius: "12px", color: "#fff", cursor: "pointer", fontSize: "16px", fontWeight: "900", letterSpacing: "1px", padding: "15px", width: "100%", boxShadow: "0 4px 20px rgba(150,0,0,0.4)", fontFamily: "inherit" },
  buttonDisabled: { opacity: 0.35, cursor: "not-allowed" },
  pickHint: { color: "#333", fontSize: "13px", textAlign: "center", fontStyle: "italic", padding: "8px 0" },
  loadingCard: { width: "100%", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(180,0,0,0.2)", borderRadius: "20px", padding: "48px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" },
  loadingEmoji: { fontSize: "52px" },
  loadingTitle: { color: "#fff", fontSize: "20px", fontWeight: "bold", margin: 0 },
  loadingSubtitle: { color: "#555", fontSize: "14px", margin: 0, fontStyle: "italic" },
  dotsRow: { display: "flex", gap: "8px", marginTop: "8px" },
  dot: { width: "10px", height: "10px", borderRadius: "50%", background: "#cc0000" },
  roastCard: { width: "100%", background: "rgba(100,0,0,0.06)", border: "1px solid rgba(180,0,0,0.3)", borderRadius: "20px", boxShadow: "0 0 60px rgba(120,0,0,0.15)", overflow: "hidden" },
  roastHeader: { background: "linear-gradient(135deg, #3a0000, #8b0000)", padding: "18px 24px", display: "flex", alignItems: "center", gap: "14px" },
  roastEmoji: { fontSize: "36px" },
  roastBadge: { color: "#fff", fontWeight: "900", fontSize: "13px", letterSpacing: "1.5px" },
  roastCourse: { color: "rgba(255,200,200,0.6)", fontSize: "11px", marginTop: "3px", textTransform: "capitalize" },
  roastBody: { padding: "24px 28px", display: "flex", flexDirection: "column", gap: "14px" },
  roastLine: { color: "#f0d0d0", fontSize: "16px", lineHeight: 1.75, margin: 0, fontFamily: "'Georgia', serif" },
  reactionRow: { display: "flex", flexWrap: "wrap", gap: "8px", padding: "0 28px 16px" },
  reactionBtn: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(180,0,0,0.2)", borderRadius: "20px", color: "#888", cursor: "pointer", padding: "6px 14px", fontSize: "12px", fontFamily: "inherit", transition: "all 0.15s" },
  reactionBtnActive: { background: "rgba(160,0,0,0.25)", border: "1px solid #cc0000", color: "#fff" },
  roastFooter: { padding: "16px 28px 24px", display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", borderTop: "1px solid rgba(180,0,0,0.12)" },
  disclaimer: { color: "#444", fontSize: "12px", textAlign: "center", fontStyle: "italic", margin: 0 },
  actionRow: { display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" },
  actionBtn: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(180,0,0,0.3)", borderRadius: "8px", color: "#cc3300", cursor: "pointer", fontSize: "13px", fontWeight: "bold", padding: "9px 18px", fontFamily: "inherit", transition: "all 0.15s" },
  resetBtn: { background: "transparent", border: "2px solid #cc0000", borderRadius: "10px", color: "#cc0000", cursor: "pointer", fontSize: "14px", fontWeight: "bold", padding: "11px 26px", fontFamily: "inherit" },
  footer: { color: "#2a2a2a", fontSize: "12px", fontStyle: "italic" },
};

const css = `
  @keyframes sparkFall { 0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; } 100% { transform: translateY(110vh) rotate(360deg) scale(0.2); opacity: 0; } }
  @keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
  @keyframes roastReveal { 0% { opacity: 0; transform: scale(0.93) translateY(24px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes firePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
  @keyframes dotPop { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; } 40% { transform: scale(1.1); opacity: 1; } }
  .roast-reveal { animation: roastReveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .fire-pulse { animation: firePulse 0.8s ease-in-out infinite; }
  .dot { animation: dotPop 1.2s infinite; }
  .dot-0 { animation-delay: 0s; } .dot-1 { animation-delay: 0.2s; } .dot-2 { animation-delay: 0.4s; }
  .roast-btn:hover:not(:disabled) { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 28px rgba(150,0,0,0.45) !important; }
  .roast-btn:active:not(:disabled) { transform: scale(0.98); }
  .course-btn:hover { border-color: rgba(180,0,0,0.5) !important; color: #fff !important; }
  input:focus { border-color: rgba(180,0,0,0.55) !important; background: rgba(255,255,255,0.06) !important; }
`;
