# Grounded Research Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the promotional portfolio homepage with a restrained, evidence-led research page that explains S2M-Inject and AMEND using paper figures, reported metrics, and playable audio examples.

**Architecture:** Keep the project dependency-free and static. The homepage owns the narrative and semantic markup; `projects.js` owns structured demo metadata; `site.js` renders audio rows and provides progressive disclosure, mutually exclusive playback, and figure dialogs. Paper crops and copied WAV files live under focused asset directories.

**Tech Stack:** Semantic HTML5, CSS, vanilla JavaScript, Python structural checks, static WAV/PNG assets.

---

### Task 1: Lock the required research-page behavior

**Files:**
- Modify: `scripts/check_site.py`

- [ ] **Step 1: Add failing homepage assertions**

Add constants for the required section IDs `about`, `s2m`, `amend`, `publications`, and `contact`; required paper images under `assets/img/papers/`; required AMEND audio paths; and required S2M audio paths. Add checks that `index.html` contains two `[data-audio-project]` containers, a `dialog` for enlarged figures, and none of the phrases `研究不只停在论文`, `从研究问题到可用能力`, or `让结果自己说话`.

- [ ] **Step 2: Run the structural check and verify RED**

Run: `python scripts/check_site.py`

Expected: FAIL because the new section IDs, paper assets, local audio assets, and figure dialog do not exist yet.

### Task 2: Import verifiable paper and demo assets

**Files:**
- Create: `assets/img/papers/s2m-method.png`
- Create: `assets/img/papers/s2m-results.png`
- Create: `assets/img/papers/s2m-ablation.png`
- Create: `assets/img/papers/amend-method.png`
- Create: `assets/img/papers/amend-results.png`
- Create: `assets/audio/s2m/*.wav`
- Create: `assets/audio/amend/*.wav`

- [ ] **Step 1: Render and crop figures/tables from the submitted PDFs**

Use `pdftoppm -f 3 -singlefile -png -r 180` for the S2M method page, pages 6–7 for S2M tables, page 4 for the AMEND method, and page 7 for AMEND results. Use ImageMagick `convert -crop` only after checking the rendered page dimensions so each output includes the full figure/table and its caption or table header.

- [ ] **Step 2: Copy audio into project-specific directories**

Copy six representative S2M pairs (three English and three Chinese) plus all five AMEND reference/result pairs. Preserve WAV encoding and use descriptive destination names such as `en-hiphop-reference.wav`, `en-hiphop-generated.wav`, `replacement-en-reference.wav`, and `replacement-en-amend.wav`.

- [ ] **Step 3: Verify imported assets**

Run: `file assets/img/papers/*.png assets/audio/s2m/*.wav assets/audio/amend/*.wav`

Expected: five readable PNG images and twenty-two readable WAV files.

### Task 3: Define complete demo metadata

**Files:**
- Modify: `assets/data/projects.js`

- [ ] **Step 1: Add structured S2M examples**

Define six samples with language, lyric text, concise genre/instrument/mood instruction, and two tracks labelled `参考语音` and `生成音乐`. Use only the selected copied asset paths.

- [ ] **Step 2: Add structured AMEND examples**

Define all five samples with operation, language, source text, target text, instruction, and two tracks labelled `原始语音` and `编辑结果`. Match every value to the supplied `metadata.txt` files.

- [ ] **Step 3: Verify JavaScript syntax**

Run: `node --check assets/data/projects.js`

Expected: exit code 0 with no output.

### Task 4: Build the restrained single-page research narrative

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the promotional hero**

Use one natural introduction: 马腾 currently works on audio generation, speech editing, and multimodal modeling, with recent work focused on transferring reference-speech timbre into music and building a unified controllable speech-editing interface. Keep only email, publications, and research anchors.

- [ ] **Step 2: Add the S2M research section**

Explain the problem, the Qwen2.5-7B instruction encoder, Zipformer lyric/phoneme encoder, CAM++ 192-dimensional timbre embedding, Mel-VAE, 1.34B MM-DiT, and two-stage singing/speech-timbre training. Display the S2M method crop, reported main-results crop, and ablation crop. Summarize the reported values SIM 0.60, WER 1.56, SIM-MOS 3.32±0.34 and the Stage-1-only comparison.

- [ ] **Step 3: Add the S2M listening section**

Render three examples initially, provide a button to reveal all six, and link to the repository for the full twenty-example set. Add a short limitations note for high-pitch timbre drift and sustained-vowel instability without embedding failure audio on the homepage.

- [ ] **Step 4: Add the AMEND research section**

Explain the shared 1.5B flow model, frozen caption/VAE encoders, Text and Index addressing, local and full-utterance editing, and the two-stage curriculum. Display the AMEND method and results crops. Summarize the reported internal-set values WER 1.66, CER 1.96, SIM 0.840 and SpeechEditBench success 78.17.

- [ ] **Step 5: Add all AMEND listening examples and a compact footer**

Render all five supplied cases and retain a restrained publications/contact area. Add one native `dialog` that can enlarge any paper crop.

### Task 5: Implement interaction behavior test-first

**Files:**
- Modify: `assets/js/site.js`

- [ ] **Step 1: Extend the structural test to require interaction hooks**

Require `data-demo-toggle`, `data-figure-open`, `data-figure-dialog`, and `data-figure-close` in `index.html`, plus `aria-expanded="false"` on the S2M toggle.

- [ ] **Step 2: Run the check and verify RED**

Run: `python scripts/check_site.py`

Expected: FAIL until the interaction hooks and asset references exist.

- [ ] **Step 3: Implement minimal progressive enhancement**

Keep navigation closing and one-audio-at-a-time playback. Render semantic sample cards from `PORTFOLIO_PROJECTS`, hide S2M examples after the third behind the toggle, update `aria-expanded` and label text, and open/close the figure dialog through native dialog methods.

- [ ] **Step 4: Verify JavaScript syntax**

Run: `node --check assets/js/site.js`

Expected: exit code 0 with no output.

### Task 6: Replace the visual system

**Files:**
- Modify: `assets/css/styles.css`

- [ ] **Step 1: Implement the light academic layout**

Use an off-white page, near-black text, muted blue accents, a maximum text width around 1080px, simple rules, modest border radii, and no ambient gradients, floating orbs, animated reveal effects, or slogan cards.

- [ ] **Step 2: Style research figures, tables, and audio comparison rows**

Make paper images readable with click-to-enlarge affordances, keep audio controls full-width, present source/result players side by side on desktop and stacked on mobile, and keep source/target text legible.

- [ ] **Step 3: Add responsive and reduced-motion rules**

At widths below 760px, stack navigation, method facts, result summaries, and audio tracks. Honor `prefers-reduced-motion` and keep keyboard focus visible.

### Task 7: Update documentation and verify the finished page

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Document the new asset and content structure**

Describe the single-page research layout, paper crop sources, local audio directories, the six S2M examples, all five AMEND cases, and GitHub Pages deployment.

- [ ] **Step 2: Run all automated checks**

Run: `python scripts/check_site.py`

Run: `node --check assets/data/projects.js`

Run: `node --check assets/js/site.js`

Expected: all commands exit 0; the Python command prints `All site checks passed.`

- [ ] **Step 3: Serve and inspect the static site**

Run: `python -m http.server 8000`

Inspect desktop and mobile layouts, verify every local image/audio request succeeds, confirm the S2M expansion button, figure dialog, navigation, and mutually exclusive playback behavior.

- [ ] **Step 4: Review the diff**

Run: `git diff --check`

Run: `git status --short`

Expected: no whitespace errors; only the planned source, documentation, paper image, and demo audio files are changed or added.
