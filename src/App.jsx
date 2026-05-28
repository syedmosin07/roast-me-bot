import { useState } from "react";

const FIRE_EMOJIS = ["🔥", "💀", "😂", "🫵", "👀", "💅", "🤣", "😭"];
function randomFire() {
  return FIRE_EMOJIS[Math.floor(Math.random() * FIRE_EMOJIS.length)];
}

const COURSES = [
  { id: "mbbs", label: "MBBS", emoji: "🩺", desc: "Medicine" },
  { id: "bca", label: "BCA", emoji: "💻", desc: "Computer Apps" },
  { id: "mca", label: "MCA", emoji: "🖥️", desc: "Master of Comp Apps" },
  { id: "bcom", label: "B.Com", emoji: "💰", desc: "Commerce" },
  { id: "mcom", label: "M.Com", emoji: "📊", desc: "Master of Commerce" },
  { id: "btech", label: "B.Tech", emoji: "⚙️", desc: "Engineering" },
  { id: "mba", label: "MBA", emoji: "👔", desc: "Business Admin" },
  { id: "ba", label: "B.A.", emoji: "📚", desc: "Arts" },
  { id: "bsc", label: "B.Sc", emoji: "🔬", desc: "Science" },
  { id: "llb", label: "LLB", emoji: "⚖️", desc: "Law" },
  { id: "bpharm", label: "B.Pharm", emoji: "💊", desc: "Pharmacy" },
  { id: "bba", label: "BBA", emoji: "📈", desc: "Business Admin" },
];

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
];

const STUDENT_CONTEXT = {
  mbbs: "an MBBS student who spent 6 years studying to earn less than a software engineer, memorizes 10,000 diseases but still Googles symptoms, and hasn't slept since 2019",
  bca: "a BCA student who thinks they're a software engineer but mostly copies from Stack Overflow, can't code without YouTube, and tells everyone they're 'in IT'",
  mca: "an MCA student who spent 3 more years after BCA still learning the same things, drops 'I'm doing Masters in CS' at family functions to feel superior",
  bcom: "a B.Com student who chose commerce to avoid maths but ended up drowning in accounting, taxation and statistics — the ultimate betrayal",
  mcom: "an M.Com student who did 2 more years of B.Com because they still couldn't figure out what to do with their life",
  btech: "a B.Tech student who chose engineering to make parents proud, hasn't used 90% of what they studied, and survives on Maggi and missed deadlines",
  mba: "an MBA student who paid 20 lakhs to learn 'synergy', 'networking', and 'blue ocean strategy' — things that could've been a free LinkedIn post",
  ba: "a B.A. student who everyone says took the easy route, writes 50-page assignments on ancient history nobody asked about, and has the strongest opinions about everything",
  bsc: "a B.Sc student stuck between engineers who code and doctors who heal, doing experiments that already have known results and wondering where life went wrong",
  llb: "an LLB student who now argues with everyone professionally, reads 500-page case files for fun, and will literally bill you for this conversation",
  bpharm: "a B.Pharm student who memorized every drug interaction ever but still can't cure their own existential crisis",
  bba: "a BBA student who puts 'leverage', 'scalable', and 'disruptive' in every sentence and makes PowerPoints about things nobody asked for",
};

const JOB_CONTEXT = {
  software_eng: "a Software Engineer who googles basic syntax after 5 years of experience, has 47 browser tabs open at all times, calls moving text around 'solving complex problems', and their life is Stack Overflow, chai, and pretending to understand blockchain",
  govt_job: "a Government employee who took 6 years of exam prep to get a job where the goal is to do as little as possible, comes in at 10, leaves at 4, and considers 'file pending' a complete project update",
  teacher: "a Teacher who controls 40 students all day but can't control their own screen time, still writes on whiteboards in 2026, and their salary makes engineers feel guilty for complaining",
  doctor: "a Doctor who studied for 10 years, works 36-hour shifts, gets paid less than an Instagram influencer, and the only prescription they need is a good night's sleep and therapy",
  banker: "a Banker who smiles at customers while dying inside, knows 47 financial products but has zero personal savings, and their biggest fear is the RBI audit",
  ca: "a CA who spent 5 years studying for exams with a 5% pass rate, now does other people's taxes while their own finances are a mess, and their social life died somewhere in articleship",
  sales: "a Sales person who hits targets and still gets a 'motivational' speech instead of a raise, smiles through rejection 40 times a day, and their manager says 'the market is tough' every single quarter",
  manager: "a Manager who doesn't actually do anything but attends 8 meetings about the work others do, says 'circle back' and 'let's sync' instead of just emailing, and mistakes a PowerPoint for actual productivity",
  freelancer: "a Freelancer who told everyone they 'escaped the 9-to-5' but actually works 24/7 for less money, chases unpaid invoices like a part-time collection agent, and their LinkedIn says 'entrepreneur'",
  startup: "a Startup founder who calls sleeping on an office couch 'the hustle', has raised 'pre-seed funding' (from parents), and has a brilliant idea that's 'basically Zomato but different'",
  police: "a Police officer who has seen everything humanity has to offer and none of it was good, writes FIRs in handwriting nobody can read, and gets called at 3am for problems Google could solve",
  content: "a Content Creator who films themselves eating food and calls it a career, refreshes analytics every 4 minutes, and has had a full existential crisis over a Reel getting only 200 views",
};

export default function App() {
  const [step, setStep] = useState("form");
  const [mode, setMode] = useState(""); // "student" | "job"
  const [form, setForm] = useState({ name: "", course: "", job: "", year: "", fact1: "", fact2: "" });
  const [roast, setRoast] = useState("");
  const [sparks, setSparks] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const spawnSparks = () => {
    const s = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      delay: Math.random() * 0.7,
      emoji: randomFire(),
    }));
    setSparks(s);
    setTimeout(() => setSparks([]), 2500);
  };

  const getRoast = async () => {
    const isStudent = mode === "student";
    if (!form.name || (isStudent && !form.course) || (!isStudent && !form.job)) return;
    setStep("roasting");

    let context, label, prompt;

    if (isStudent) {
      const courseObj = COURSES.find(c => c.id === form.course);
      context = STUDENT_CONTEXT[form.course] || "a confused student";
      const facts = [form.fact1, form.fact2].filter(Boolean).join(", ");
      const yearLine = form.year ? `They are in year ${form.year}.` : "";
      prompt = `You are a savage dark comedy roast comedian. Roast this student with DARK, witty, brutally funny jokes — like a Netflix dark comedy special. Make it darkly hilarious about their career, future, salary expectations, and life choices. Don't be mean-spirited but go DARK — joke about their suffering, existential dread, and questionable decisions.

Student:
- Name: ${form.name}
- Course: ${courseObj?.label}
- They are: ${context}
${yearLine}
${facts ? `- Extra info: ${facts}` : ""}

Write ONLY 3 jokes. Make them the DARKEST, most brutally funny roast jokes possible — no filler, pure savage dark comedy. Use their name. End the 3rd joke with a dark "career obituary" one-liner. Add dark emojis 💀☠️⚰️. 3 killer jokes only.`;
    } else {
      const jobObj = JOBS.find(j => j.id === form.job);
      context = JOB_CONTEXT[form.job] || "a professional suffering quietly";
      const facts = [form.fact1, form.fact2].filter(Boolean).join(", ");
      prompt = `You are a savage dark comedy roast comedian. Roast this working professional with DARK, brutally funny jokes — like a dark comedy special about corporate suffering. Go dark about their work-life balance, boss, dreams they gave up, and the slow death of their soul at work.

Professional:
- Name: ${form.name}
- Job: ${jobObj?.label}
- They are: ${context}
${facts ? `- Extra ammo: ${facts}` : ""}

Write ONLY 3 jokes. Make them the DARKEST, most brutally funny roast jokes possible — no filler, pure savage dark comedy. Use their name. End the 3rd joke with a dark "retirement prediction" that's more obituary than celebration. Add dark emojis 💀☠️⚰️. 3 killer jokes only.`;
    }

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

  const reset = () => {
    setForm({ name: "", course: "", job: "", year: "", fact1: "", fact2: "" });
    setRoast("");
    setStep("form");
    setMode("");
  };

  const selectedItem = mode === "student"
    ? COURSES.find(c => c.id === form.course)
    : JOBS.find(j => j.id === form.job);

  return (
    <div style={s.page}>
      <style>{css}</style>

      {sparks.map(sp => (
        <div key={sp.id} style={{ ...s.spark, left: `${sp.x}%`, animationDelay: `${sp.delay}s` }}>
          {sp.emoji}
        </div>
      ))}

      <div style={s.container}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.badge}>💀 DARK ROAST BOT 💀</div>
          <h1 style={s.title}>Enter the<span style={s.accent}> Dark Roast Zone</span></h1>
          <p style={s.subtitle}>Students. Professionals. Nobody is safe. ☠️</p>
        </div>

        {step === "form" && (
          <div style={s.card}>
            <div style={s.cardInner}>

              {/* Name */}
              <div style={s.inputGroup}>
                <label style={s.label}>Your Name *</label>
                <input style={s.input} name="name" value={form.name} onChange={handleChange}
                  placeholder="What do people call you (besides a disappointment)?" />
              </div>

              {/* Mode selector */}
              <div style={s.inputGroup}>
                <label style={s.label}>Who are you? *</label>
                <div style={s.modeRow}>
                  <button
                    style={{ ...s.modeBtn, ...(mode === "student" ? s.modeBtnActive : {}) }}
                    onClick={() => { setMode("student"); setForm(f => ({ ...f, job: "" })); }}
                    className="course-btn"
                  >
                    <span style={{ fontSize: "28px" }}>🎓</span>
                    <span style={s.modeLabel}>Student</span>
                    <span style={s.modeDesc}>Still studying, still suffering</span>
                  </button>
                  <button
                    style={{ ...s.modeBtn, ...(mode === "job" ? s.modeBtnActive : {}) }}
                    onClick={() => { setMode("job"); setForm(f => ({ ...f, course: "", year: "" })); }}
                    className="course-btn"
                  >
                    <span style={{ fontSize: "28px" }}>💼</span>
                    <span style={s.modeLabel}>Working</span>
                    <span style={s.modeDesc}>Soul sold, salary deposited</span>
                  </button>
                </div>
              </div>

              {/* Student options */}
              {mode === "student" && (
                <>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Your Course * 🎯</label>
                    <div style={s.courseGrid}>
                      {COURSES.map(c => (
                        <button key={c.id}
                          style={{ ...s.courseBtn, ...(form.course === c.id ? s.courseBtnActive : {}) }}
                          onClick={() => setForm(f => ({ ...f, course: c.id }))}
                          className="course-btn"
                        >
                          <span style={s.courseEmoji}>{c.emoji}</span>
                          <span style={s.courseLabel}>{c.label}</span>
                          <span style={s.courseDesc}>{c.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Year of Study</label>
                    <div style={s.yearRow}>
                      {["1st", "2nd", "3rd", "4th", "5th", "Final (still here lol)"].map(y => (
                        <button key={y}
                          style={{ ...s.yearBtn, ...(form.year === y ? s.yearBtnActive : {}) }}
                          onClick={() => setForm(f => ({ ...f, year: y }))}
                          className="course-btn"
                        >{y}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Job options */}
              {mode === "job" && (
                <>
                  <div style={s.inputGroup}>
                    <label style={s.label}>Your Job * 💼</label>
                    <div style={s.courseGrid}>
                      {JOBS.map(j => (
                        <button key={j.id}
                          style={{ ...s.courseBtn, ...(form.job === j.id ? s.courseBtnActive : {}) }}
                          onClick={() => setForm(f => ({ ...f, job: j.id }))}
                          className="course-btn"
                        >
                          <span style={s.courseEmoji}>{j.emoji}</span>
                          <span style={s.courseLabel}>{j.label}</span>
                          <span style={s.courseDesc}>{j.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </>
              )}

              {/* Extra ammo */}
              {mode && (
                <>
                  <div style={s.divider}><span style={s.dividerText}>☠️ Extra ammo — makes it darker</span></div>
                  {[
                    { key: "fact1", ph: mode === "student" ? "e.g. I haven't attended class in 3 weeks" : "e.g. I haven't taken a vacation in 2 years" },
                    { key: "fact2", ph: mode === "student" ? "e.g. My parents think I'm studying right now" : "e.g. My boss takes credit for all my work" },
                  ].map(({ key, ph }) => (
                    <div key={key} style={s.inputGroup}>
                      <input style={s.input} name={key} value={form[key]} onChange={handleChange} placeholder={ph} />
                    </div>
                  ))}

                  <button
                    style={{ ...s.button, ...(!form.name || (mode === "student" && !form.course) || (mode === "job" && !form.job) ? s.buttonDisabled : {}) }}
                    onClick={getRoast}
                    disabled={!form.name || (mode === "student" && !form.course) || (mode === "job" && !form.job)}
                    className="roast-btn"
                  >
                    💀 ROAST ME (DARK MODE) 💀
                  </button>
                </>
              )}

              {!mode && (
                <div style={s.pickHint}>👆 Pick Student or Working above to get started</div>
              )}

            </div>
          </div>
        )}

        {step === "roasting" && (
          <div style={s.loadingCard}>
            <div style={s.loadingEmoji} className="fire-pulse">☠️</div>
            <p style={s.loadingTitle}>Darkly roasting {form.name}...</p>
            <p style={s.loadingSubtitle}>Digging through your life choices... 📂</p>
            <div style={s.dotsRow}>
              {[0, 1, 2].map(i => <div key={i} style={s.dot} className={`dot dot-${i}`} />)}
            </div>
          </div>
        )}

        {step === "result" && (
          <div style={s.roastCard} className="roast-reveal">
            <div style={s.roastHeader}>
              <span style={s.roastEmoji}>{selectedItem?.emoji || "💀"}</span>
              <div>
                <div style={s.roastBadge}>☠️ {form.name.toUpperCase()}'S DARK ROAST ☠️</div>
                <div style={s.roastCourse}>
                  {mode === "student" ? `${selectedItem?.label} Student` : `${selectedItem?.label}`}
                  {" · "}{mode === "student" ? "Still Surviving" : "Professionally Suffering"}
                </div>
              </div>
            </div>
            <div style={s.roastBody}>
              {roast.split("\n").map((line, i) =>
                line.trim() ? <p key={i} style={s.roastLine}>{line}</p> : null
              )}
            </div>
            <div style={s.roastFooter}>
              <p style={s.disclaimer}>⚠️ Dark jokes only. Your soul is still (probably) intact.</p>
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
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #050505 0%, #100005 50%, #050510 100%)",
    fontFamily: "'Georgia', serif",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "24px 16px", position: "relative", overflow: "hidden",
  },
  spark: {
    position: "fixed", top: "-10%", fontSize: "26px",
    animation: "sparkFall 2s ease-in forwards", zIndex: 999, pointerEvents: "none",
  },
  container: {
    width: "100%", maxWidth: "600px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "24px",
    position: "relative", zIndex: 1,
  },
  header: { textAlign: "center" },
  badge: {
    display: "inline-block",
    background: "linear-gradient(90deg, #8b0000, #cc0000, #8b0000)",
    backgroundSize: "200% auto", animation: "shimmer 2s linear infinite",
    color: "#fff", fontSize: "12px", fontWeight: "bold", letterSpacing: "3px",
    padding: "6px 20px", borderRadius: "20px", marginBottom: "14px",
  },
  title: {
    fontSize: "clamp(1.9rem, 6vw, 3rem)", color: "#fff",
    margin: "0 0 8px", fontWeight: "900", lineHeight: 1.1, letterSpacing: "-1px",
  },
  accent: { color: "#cc0000", display: "block" },
  subtitle: { color: "#666", fontSize: "15px", margin: 0, fontStyle: "italic" },
  card: {
    width: "100%", background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(180,0,0,0.2)", borderRadius: "20px",
    boxShadow: "0 0 40px rgba(150,0,0,0.08)",
  },
  cardInner: { padding: "28px", display: "flex", flexDirection: "column", gap: "18px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { color: "#cc3300", fontSize: "11px", fontWeight: "bold", letterSpacing: "1.5px", textTransform: "uppercase" },
  input: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(180,0,0,0.25)",
    borderRadius: "10px", color: "#fff", fontSize: "14px", padding: "11px 14px",
    outline: "none", fontFamily: "inherit",
  },
  modeRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  modeBtn: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(180,0,0,0.2)",
    borderRadius: "14px", color: "#aaa", cursor: "pointer", padding: "16px 10px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
    transition: "all 0.15s", fontFamily: "inherit",
  },
  modeBtnActive: {
    background: "rgba(160,0,0,0.2)", border: "1px solid #cc0000",
    color: "#fff", boxShadow: "0 0 16px rgba(150,0,0,0.3)",
  },
  modeLabel: { fontSize: "16px", fontWeight: "bold", color: "inherit" },
  modeDesc: { fontSize: "11px", color: "#555", textAlign: "center" },
  courseGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" },
  courseBtn: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(180,0,0,0.18)",
    borderRadius: "10px", color: "#999", cursor: "pointer", padding: "10px 6px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: "2px",
    transition: "all 0.15s", fontFamily: "inherit",
  },
  courseBtnActive: {
    background: "rgba(160,0,0,0.2)", border: "1px solid #cc0000",
    color: "#fff", boxShadow: "0 0 10px rgba(150,0,0,0.25)",
  },
  courseEmoji: { fontSize: "20px" },
  courseLabel: { fontSize: "12px", fontWeight: "bold", color: "inherit" },
  courseDesc: { fontSize: "10px", color: "#555", textAlign: "center" },
  yearRow: { display: "flex", flexWrap: "wrap", gap: "8px" },
  yearBtn: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(180,0,0,0.18)",
    borderRadius: "8px", color: "#999", cursor: "pointer", padding: "7px 13px",
    fontSize: "12px", fontFamily: "inherit", transition: "all 0.15s",
  },
  yearBtnActive: { background: "rgba(160,0,0,0.2)", border: "1px solid #cc0000", color: "#fff" },
  divider: { textAlign: "center", padding: "4px 0" },
  dividerText: { color: "#3a3a3a", fontSize: "12px" },
  button: {
    marginTop: "4px", background: "linear-gradient(135deg, #8b0000, #cc0000)",
    border: "none", borderRadius: "12px", color: "#fff", cursor: "pointer",
    fontSize: "16px", fontWeight: "900", letterSpacing: "1px", padding: "15px",
    width: "100%", boxShadow: "0 4px 20px rgba(150,0,0,0.4)", fontFamily: "inherit",
  },
  buttonDisabled: { opacity: 0.35, cursor: "not-allowed" },
  pickHint: { color: "#333", fontSize: "13px", textAlign: "center", fontStyle: "italic", padding: "8px 0" },
  loadingCard: {
    width: "100%", background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(180,0,0,0.2)", borderRadius: "20px",
    padding: "48px 32px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: "14px",
  },
  loadingEmoji: { fontSize: "52px" },
  loadingTitle: { color: "#fff", fontSize: "20px", fontWeight: "bold", margin: 0 },
  loadingSubtitle: { color: "#555", fontSize: "14px", margin: 0, fontStyle: "italic" },
  dotsRow: { display: "flex", gap: "8px", marginTop: "8px" },
  dot: { width: "10px", height: "10px", borderRadius: "50%", background: "#cc0000" },
  roastCard: {
    width: "100%", background: "rgba(100,0,0,0.06)",
    border: "1px solid rgba(180,0,0,0.3)", borderRadius: "20px",
    boxShadow: "0 0 60px rgba(120,0,0,0.15)", overflow: "hidden",
  },
  roastHeader: {
    background: "linear-gradient(135deg, #3a0000, #8b0000)",
    padding: "18px 24px", display: "flex", alignItems: "center", gap: "14px",
  },
  roastEmoji: { fontSize: "36px" },
  roastBadge: { color: "#fff", fontWeight: "900", fontSize: "13px", letterSpacing: "1.5px" },
  roastCourse: { color: "rgba(255,200,200,0.6)", fontSize: "12px", marginTop: "3px" },
  roastBody: { padding: "24px 28px", display: "flex", flexDirection: "column", gap: "14px" },
  roastLine: { color: "#f0d0d0", fontSize: "16px", lineHeight: 1.75, margin: 0, fontFamily: "'Georgia', serif" },
  roastFooter: {
    padding: "16px 28px 24px", display: "flex", flexDirection: "column",
    gap: "14px", alignItems: "center", borderTop: "1px solid rgba(180,0,0,0.12)",
  },
  disclaimer: { color: "#444", fontSize: "12px", textAlign: "center", fontStyle: "italic", margin: 0 },
  resetBtn: {
    background: "transparent", border: "2px solid #cc0000", borderRadius: "10px",
    color: "#cc0000", cursor: "pointer", fontSize: "14px", fontWeight: "bold",
    padding: "11px 26px", fontFamily: "inherit",
  },
  footer: { color: "#2a2a2a", fontSize: "12px", fontStyle: "italic" },
};

const css = `
  @keyframes sparkFall {
    0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
    100% { transform: translateY(110vh) rotate(360deg) scale(0.2); opacity: 0; }
  }
  @keyframes shimmer {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
  }
  @keyframes roastReveal {
    0% { opacity: 0; transform: scale(0.93) translateY(24px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes firePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  @keyframes dotPop {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
    40% { transform: scale(1.1); opacity: 1; }
  }
  .roast-reveal { animation: roastReveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .fire-pulse { animation: firePulse 0.8s ease-in-out infinite; }
  .dot { animation: dotPop 1.2s infinite; }
  .dot-0 { animation-delay: 0s; }
  .dot-1 { animation-delay: 0.2s; }
  .dot-2 { animation-delay: 0.4s; }
  .roast-btn:hover:not(:disabled) { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 28px rgba(150,0,0,0.45) !important; }
  .roast-btn:active:not(:disabled) { transform: scale(0.98); }
  .course-btn:hover { border-color: rgba(180,0,0,0.5) !important; color: #fff !important; }
  input:focus { border-color: rgba(180,0,0,0.55) !important; background: rgba(255,255,255,0.06) !important; }
`;
