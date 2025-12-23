---

# 👁️ THE CHAOS BROWSER

> **WARNING:** This simulation contains flashing lights, sudden audio distortions, and existential dread. Proceed with caution.

The **Chaos Browser** (`Netscape_Ghost.exe`) is a liminal web simulation built with React. It mimics a desktop environment containing a web browser that doesn't access the internet—instead, it "hallucinates" websites based on user prompts using AI image generation and chaos logic.

As the user browses, the system's **Entropy** increases, causing visual decay, audio distortion, and UI hostility.

---

## 💀 Features

### 1. The Chaos Engine

* **Generative Content:** Type anything into the address bar. The browser constructs a fake website (Hero section, Articles, Marquees) based on your prompt.
* **Pollinations.AI Integration:** Generates surreal, dream-like images dynamically without an API key.
* **The Trap:** Text inside generated pages becomes hyperlinked. Clicking them leads to deeper, more corrupted hallucinations. **You can never go back.**

### 2. The Entropy System (Levels 0 - 10)

* **Visual Decay:** As you navigate, the screen blurs, hues rotate, and CSS skews.
* **Audio Distortion:** A background drone pitch-shifts downwards. Glitch sound effects trigger on interactions.
* **Level 10 (Ascension):** If you survive to Level 10, the chaos stops. The interface turns white and gold, and the simulation "Resets."

### 3. Hostile UI

* **Fleeing Buttons:** At high entropy, the "Go Back" button physically runs away from your mouse cursor.
* **Text Corruption:** Normal text randomly swaps with words like `HELP`, `VOID`, and `WATCHING`.
* **Reality Failure:** The marquee text changes to warnings about "Reality Failure" at high stress levels.

### 4. The Haunted Desktop

* **Panic Button:** The "Start" button refuses to open. Clicking it triggers panic states (`STOP`, `NO`, `RUN`) and spawns system error popups.
* **The Hungry Trash:** Clicking the trash icon inverts the screen colors. It claims to be **HUNGRY**.
* **Lost Memories:** A persistent sidebar logs your journey. Clicking previous entries results in errors—time only moves forward.

---

## 🛠️ Tech Stack

| Component | Technology |
| --- | --- |
| **Core** | React (Vite / CRA) |
| **Styling** | Tailwind CSS (Glassmorphism & Glitch Animations) |
| **State** | React Context API (`VibeContext`) |
| **Audio** | Web Audio API (Oscillators & Noise Buffers) |
| **AI Generation** | [Pollinations.ai](https://pollinations.ai/) |

---

## 💿 Installation & Usage

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/hallucinated-browser.git
cd hallucinated-browser

```


2. **Install Dependencies**
```bash
npm install

```


3. **Add Assets**
* Place a background image named `bg.png` in the `public/` folder.
* *(Optional)* Add custom glitch font files to `src/assets/fonts/`.


4. **Run the Simulation**
```bash
npm start

```


Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view it in the browser.

---

## 📂 Project Structure

```plaintext
src/
├── components/
│   ├── BookOfNothingness.jsx   # The "Manual" modal
│   ├── HallucinatedBrowser.jsx # Main browser logic & rendering
│   ├── DesktopEnvironment.jsx  # The OS wrapper (Taskbar, Icons)
│   ├── useDraggable.js         # Hook for moving windows
│   └── VibeContext.js          # Global mood state
├── utils/
│   ├── audioEngine.js          # Web Audio API oscillators/glitches
│   └── chaosEngine.js          # Generates fake JSON data for pages
├── App.js                      # Entry point
└── index.css                   # Tailwind directives & custom animations

```

---

## 🕹️ Controls

* **Address Bar:** Type a concept (e.g., *"The end of the world"*, *"A quiet forest"*) and hit Enter.
* **Hover:** Move your mouse over the background to reveal the color shift (**Vibe Check**).
* **Trash Can:** Click to feed the void.
* **Download:** Hover over a generated image to save the artifact to your local machine.

---

## 📝 License

**MIT License (with a disclaimer).**

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. THE CREATOR IS NOT RESPONSIBLE IF YOUR BROWSER ACTUALLY STARTS HALLUCINATING OR IF YOU DREAM OF STATIC AFTER USING THIS.

<div align="center">





<em>“It watches from the pixels.”</em>
</div>

---