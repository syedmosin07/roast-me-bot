# 🔥 Student Roast Bot — by Mosin

A hilarious AI-powered roast bot for Indian college students!
Get roasted based on your course — MBBS, BCA, B.Tech, MBA and more!

---

## 🚀 Deploy to Vercel (100% FREE) — Step by Step

### Step 1 — Get FREE Groq API Key
1. Go to **console.groq.com**
2. Sign up free (just email + password)
3. Click **"API Keys"** → **"Create API Key"**
4. Copy the key (starts with `gsk_...`) — save it!

### Step 2 — Upload to GitHub
1. Go to **github.com** → Sign up free
2. Click **"New Repository"** → name it `roast-me-bot` → Create
3. Upload all files keeping this folder structure:
   ```
   roast-me-bot/
   ├── index.html
   ├── package.json
   ├── vite.config.js
   ├── api/
   │   └── roast.js        ← backend (keeps API key safe)
   └── src/
       ├── main.jsx
       └── App.jsx
   ```

### Step 3 — Deploy on Vercel
1. Go to **vercel.com** → Sign up with GitHub (free)
2. Click **"Add New Project"**
3. Select your `roast-me-bot` repo
4. Click **"Deploy"** — Vercel auto-detects Vite!

### Step 4 — Add your Groq API Key (IMPORTANT!)
1. In Vercel dashboard → your project → **"Settings"**
2. Click **"Environment Variables"**
3. Add:
   - **Name:** `GROQ_API_KEY`
   - **Value:** `gsk_...` (your key from Step 1)
4. Click **Save** → then go to **Deployments** → click **"Redeploy"**

### Step 5 — Share your website! 🎉
Your site is now live at something like:
`https://roast-me-bot.vercel.app`

Share this link with all your friends — it works for everyone for FREE! 🔥

---

## 🔒 Why is it safe?
- Your API key is stored in Vercel's secure environment variables
- It NEVER appears in the browser or frontend code
- The `api/roast.js` file runs on Vercel's server, hidden from users

---

## 💰 Cost?
- Vercel hosting: **FREE forever**
- Groq API: **FREE** (generous free tier, no credit card needed!)

---

Made with 🔥 by Mosin
