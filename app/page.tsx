'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Box,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  Film,
  Layers3,
  MapPin,
  Pause,
  Play,
  RotateCcw,
  Search,
  Shield,
  Sparkles,
  Volume2,
  WandSparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DURATION = 108;
const BEATS = [
  { start: 0, end: 9, scene: 'hook-reach', label: 'The reach' },
  { start: 9, end: 17, scene: 'hook-gap', label: 'The gap' },
  { start: 17, end: 24, scene: 'intro', label: 'The View' },
  { start: 24, end: 31, scene: 'product-select', label: 'Select verses' },
  { start: 31, end: 41, scene: 'product-pipeline', label: 'Build the story' },
  { start: 41, end: 51, scene: 'product-output', label: 'Watch the View' },
  { start: 51, end: 61, scene: 'film-context', label: 'Go deeper' },
  { start: 61, end: 70, scene: 'explore-intro', label: 'Tap the world' },
  { start: 70, end: 80, scene: 'explore-tabernacle', label: 'Noah’s Ark' },
  { start: 80, end: 90, scene: 'explore-material', label: 'Tap a word' },
  { start: 90, end: 99, scene: 'evidence', label: 'Trust the lens' },
  { start: 99, end: 108, scene: 'outro', label: 'The View' },
] as const;

const entities = {
  ark: {
    type: 'OBJECT · RESCUE', title: 'Noah’s Ark',
    body: 'A huge wooden vessel God told Noah to build before the flood.',
    detail: 'It carried Noah’s family and the animals safely through the water.', source: 'Primary text · Genesis 6–9',
  },
  wood: {
    type: 'MATERIAL · BUILDING', title: 'Ark wood',
    body: 'Genesis says the ark was made from wood. Large beams and wooden pegs could hold the vessel together.',
    detail: 'The exact kind of wood is uncertain, so the image shows one reasonable idea.', source: 'Primary text · Genesis 6:14',
  },
  pitch: {
    type: 'MATERIAL · WATERPROOFING', title: 'Pitch',
    body: 'Pitch was a thick, sticky seal spread over the wood.',
    detail: 'It filled the gaps between boards and helped keep water out.', source: 'Primary text · Genesis 6:14',
  },
};

type EntityKey = keyof typeof entities;

function ViewMark({ hero = false }: { hero?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 72 72" className={hero ? 'view-mark hero-view-mark' : 'view-mark'}>
      <path d="M8 15.5 35.8 57 64 15.5" /><path d="M19 15.5 35.9 41 53 15.5" /><circle cx="36" cy="23.5" r="5.2" />
    </svg>
  );
}

function formatTime(value: number) {
  return `${Math.floor(value / 60)}:${Math.floor(value % 60).toString().padStart(2, '0')}`;
}

function MotionField() {
  return <div className="motion-field" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <span key={index} />)}</div>;
}

function HookScene({ mode, onStart }: { mode: 'reach' | 'gap'; onStart: () => void }) {
  const reach = mode === 'reach';
  return (
    <section className={`hook-scene scene hook-${mode}`}>
      <div className="hook-grid" /><div className="hook-glow" />
      <header className="intro-nav"><div className="wordmark"><ViewMark /><span>THE VIEW</span></div><span className="demo-label">THE OPPORTUNITY</span></header>
      {reach ? <>
        <p className="section-kicker">THE WORLD’S BEST-SELLING BOOK</p>
        <div className="hook-number"><span>80</span><small>MILLION</small></div>
        <h1>Bibles printed<br /><em>every year.</em></h1>
        <p className="hook-support"><strong>5–7 billion</strong> copies in circulation—and unmatched cultural influence.</p>
        <Button className="enter-button hook-start" onClick={onStart}><span><Play size={15} fill="currentColor" /></span>Start the pitch</Button>
        <a className="hook-source" href="https://www.guinnessworldrecords.com/world-records/best-selling-book-of-non-fiction" target="_blank" rel="noreferrer">SOURCE · GUINNESS WORLD RECORDS · 2021 ESTIMATE</a>
      </> : <>
        <p className="section-kicker">BUT REACH ISN’T ENGAGEMENT</p>
        <div className="gap-stat"><span>51%</span><small>OF U.S. ADULTS</small></div>
        <h1>wish they read<br />the Bible <em>more.</em></h1>
        <p className="hook-thesis">The Bible doesn’t have an awareness problem.<br /><strong>It has an attention problem.</strong></p>
        <div className="gap-line"><span>OWNED</span><i /><span>OPENED</span><i /><span>UNDERSTOOD</span></div>
        <a className="hook-source" href="https://www.americanbible.org/news/press-releases/articles/sotb-2025-release/" target="_blank" rel="noreferrer">SOURCE · AMERICAN BIBLE SOCIETY · STATE OF THE BIBLE 2025</a>
      </>}
    </section>
  );
}

function ProductDemoScene({ mode, onAdvance }: { mode: 'select' | 'pipeline' | 'output'; onAdvance: () => void }) {
  const copy = {
    select: ['01 · CHOOSE THE MOMENT', 'Start with the Word.', 'Select the passage you want to see.'],
    pipeline: ['02 · THE VIEW ENGINE', 'Watch the passage come to life', 'through an animated short film.'],
    output: ['03 · YOUR VIEW IS READY', 'From passage', 'to cinematic experience.'],
  }[mode];

  return (
    <section className={`product-demo-scene scene product-${mode}`}>
      <div className="product-demo-copy"><p className="section-kicker">{copy[0]}</p><h2>{copy[1]}<br /><em>{copy[2]}</em></h2>
        {mode === 'select' && <p>Open any passage. Highlight the verses. Tap <strong>Create a View.</strong></p>}
        {mode === 'pipeline' && <p>The text is mapped, the period is grounded, and each moment becomes a cinematic shot.</p>}
        {mode === 'output' && <p>In 60–90 seconds, the passage becomes a film designed to send you back to Scripture.</p>}
        <div className="walkthrough-steps"><span className={mode === 'select' ? 'active' : 'done'}>1</span><i /><span className={mode === 'pipeline' ? 'active' : mode === 'output' ? 'done' : ''}>2</span><i /><span className={mode === 'output' ? 'active' : ''}>3</span></div>
      </div>

      <div className={`product-window product-window-${mode}`}>
        <div className="product-window-bar"><div className="mini-brand"><ViewMark /><span>THE VIEW</span></div><div className="window-context">{mode === 'select' ? 'BIBLE' : mode === 'pipeline' ? 'VIEW ENGINE' : 'CINEMA'}</div><div className="window-avatar">JE</div></div>

        {mode === 'select' && <div className="select-product-state">
          <aside className="select-books"><small>OLD TESTAMENT</small>{['Genesis', 'Exodus', 'Joshua', '1 Samuel', 'Psalms'].map(book => <span className={book === '1 Samuel' ? 'active' : ''} key={book}>{book}</span>)}</aside>
          <article className="select-reader"><div className="select-reader-head"><span>1 SAMUEL</span><strong>17</strong><button><Search /> Find</button></div><h3>David and Goliath</h3>
            <p><sup>38</sup> Then Saul dressed David in his own tunic. He put a coat of armor on him and a bronze helmet on his head.</p>
            <div className="verse-selection"><span className="selection-handle top" /><p><sup>40</sup> Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the Philistine.</p><p><sup>45</sup> David said to the Philistine, “You come against me with sword and spear and javelin, but I come against you in the name of the LORD Almighty...”</p><span className="selection-handle bottom" /></div>
            <div className="selection-toolbar"><span><strong>Verses 40–45</strong> · 6 verses selected</span><button onClick={onAdvance}><WandSparkles /> Create a View</button></div>
          </article><div className="demo-cursor"><span /></div><div className="demo-click-ring" />
        </div>}

        {mode === 'pipeline' && <div className="pipeline-product-state">
          <div className="pipeline-head"><span><Sparkles /> CREATING YOUR VIEW</span><strong>1 Samuel 17:40–45</strong><small>Processing biblical text into a 1:24 cinematic story</small></div>
          <div className="pipeline-flow">
            <div className="pipeline-node input"><BookOpen /><span><small>SOURCE</small><strong>6 verses</strong><em>Scripture locked</em></span></div><i className="pipeline-link one" />
            <div className="pipeline-core"><ViewMark /><span className="core-orbit" /></div><i className="pipeline-link two" />
            <div className="pipeline-branches"><div><Check /><span><small>TEXT MAP</small><strong>8 story beats</strong></span></div><div><MapPin /><span><small>HISTORICAL LENS</small><strong>Iron Age Levant</strong></span></div><div><Box /><span><small>ENTITY MODEL</small><strong>David · Goliath · sling</strong></span></div></div><i className="pipeline-link three" />
            <div className="pipeline-node output"><Film /><span><small>STORYBOARD</small><strong>24 shots</strong><em>Rendering now</em></span></div>
          </div>
          <div className="pipeline-log"><span>SCENE 18/24</span><p>Matching Valley of Elah terrain...</p><div><i /><i /><i /><i /><i /></div><strong>72%</strong></div>
        </div>}

        {mode === 'output' && <div className="output-product-state">
          <div className="output-film battle-film"><div className="battle-shot battle-aim" /><div className="battle-shot battle-release"><span className="flying-stone" /></div><div className="battle-shot battle-fall"><span className="falling-goliath" /></div><div className="battle-dust" /><div className="output-film-shade" /><span className="ready-badge"><span className="live-dot" /> PLAYING · 1 SAMUEL 17</span><div className="battle-caption"><span>DAVID RELEASES THE STONE</span><span>THE GIANT FALLS</span><span>THE VALLEY ERUPTS</span></div><div className="output-controls"><button><Pause fill="currentColor" /></button><span className="output-progress"><i /></span><small>0:18 / 1:24</small></div></div>
          <div className="output-actions"><button><BookOpen /> Read the passage</button><button><Eye /> Explore David</button><button><MapPin /> Valley of Elah</button></div>
        </div>}
      </div>
    </section>
  );
}

function FilmScene() {
  const captions = ['THE STORY CONTINUES', 'WATCH. THEN GO DEEPER.', 'Every frame leads back to Scripture.'];
  return (
    <section className="film-scene scene film-context">
      <div className="film-image" /><div className="film-shade" /><div className="film-flare" />
      <div className="film-meta"><span>THE VIEW ORIGINAL</span><span>ARTISTIC RECONSTRUCTION · 1 SAMUEL 17</span></div>
      <div className="film-title">
        <p className="section-kicker">{captions[0]}</p><h2>{captions[1]}</h2><p>{captions[2]}</p>
      </div>
      <>
        <aside className="accuracy-card"><div><Shield size={14} /> ACCURACY LENS</div><strong>Philistine scale armor</strong><p>Period-informed reconstruction from the biblical description and regional material culture.</p><span>Interpretive details are clearly labeled</span></aside>
        <div className="after-film"><button>Explore David <ChevronRight /></button><button>Valley of Elah <ChevronRight /></button><button>The sling <ChevronRight /></button></div>
      </>
    </section>
  );
}

function KnowledgeCard({ entity }: { entity: EntityKey }) {
  const item = entities[entity];
  return (
    <aside className="knowledge-card" key={entity}>
      <div className="knowledge-top"><span>{item.type}</span><Layers3 size={16} /></div><h3>{item.title}</h3>
      <div className="knowledge-divider" /><p>{item.body}</p><h4>What was it used for?</h4><p>{item.detail}</p>
      <div className="source-row"><Shield size={14} /><span><strong>Grounded view</strong>{item.source}</span></div><button className="deep-dive">Explore full entry <ChevronRight /></button>
    </aside>
  );
}

function ExploreScene({ mode, entity, onEntity }: { mode: 'explore-intro' | 'explore-tabernacle' | 'explore-material'; entity: EntityKey; onEntity: (key: EntityKey) => void }) {
  const intro = mode === 'explore-intro';
  const noah = mode === 'explore-tabernacle';
  return (
    <section className={`explore-scene scene ${mode}`}>
      <div className="explore-image" /><div className="explore-shade" />
      <div className="explore-copy">
        <p className="section-kicker">04 · TAP INTO THE WORLD</p>
        <h2>{intro ? <>Every noun becomes<br /><em>a doorway.</em></> : noah ? <>The flood ends.<br /><em>The ark rests.</em></> : <>Tap a word.<br /><em>See what it means.</em></>}</h2>
        {intro && <div className="passage-card"><div><BookOpen size={15} /> GENESIS 6:14</div><p>“Make yourself an <button onClick={() => onEntity('ark')}>ark</button> of wood.”</p><span>Tap a highlighted word to learn more.</span></div>}
        {noah && <div className="passage-card"><div><BookOpen size={15} /> GENESIS 8:4</div><p>“The ark came to rest on the mountains of Ararat.”</p><span>The View shows the moment, then explains what the Bible says.</span></div>}
        {mode === 'explore-material' && <div className="passage-card word-demo-passage"><div><BookOpen size={15} /> GENESIS 6:14</div><p>“Make yourself an ark of wood. Cover it inside and out with <button onClick={() => onEntity('pitch')}>pitch</button>.”</p><span>Tap the gold word.</span><div className="word-demo-cursor"><span /></div><div className="word-demo-click" /></div>}
        {intro && <div className="noun-cloud"><span>DAVID</span><span>JERUSALEM</span><span>SLING</span><span>PAUL</span><span>THE ARK</span><span>VALLEY OF ELAH</span></div>}
      </div>
      {noah && <KnowledgeCard entity={entity} />}
      {mode === 'explore-material' && <aside className="simple-word-popover"><div className="simple-word-images"><Image src="/noahs-ark-mountain.png" width={768} height={512} alt="AI view of Noah's Ark on a mountain" /><Image src="/ark-timber-detail.png" width={768} height={512} alt="AI close view of timber and pitch on the ark" /></div><span>MATERIAL</span><h3>Pitch</h3><p>A thick, sticky seal. It filled the gaps in the wood and helped keep water out.</p><small>AI VIEW · BASED ON GENESIS 6:14</small></aside>}
      {intro && <div className="tap-orbit"><Eye /><span>PERSON</span><span>PLACE</span><span>OBJECT</span><span>EVENT</span></div>}
    </section>
  );
}

function EvidenceScene() {
  const layers = [
    ['01', 'What Scripture says', 'Explicitly stated in the biblical text', 'scripture'],
    ['02', 'Historical context', 'Supported by material and textual evidence', 'history'],
    ['03', 'Scholarly possibility', 'Plausible interpretation, clearly marked', 'scholar'],
    ['04', 'Artistic visualization', 'AI-generated reconstruction—not a photograph', 'art'],
  ];
  return (
    <section className="evidence-scene scene"><div className="evidence-glow" /><div className="evidence-copy"><p className="section-kicker">05 · TRUST THE LENS</p><h2>Clarity without<br /><em>claiming certainty.</em></h2><p>AI is the tool. Scripture is the authority.</p></div><div className="evidence-stack">{layers.map(([number, title, body, tone], index) => <div className={`evidence-layer ${tone}`} style={{ animationDelay: `${index * .12}s` }} key={number}><span>{number}</span><div><strong>{title}</strong><small>{body}</small></div><Check /></div>)}</div></section>
  );
}

export default function Home() {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [entity, setEntity] = useState<EntityKey>('ark');
  const jump = (time: number) => { setStarted(true); setElapsed(time); setPlaying(true); };
  const restart = () => { setStarted(false); setPlaying(false); setElapsed(0); };

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setElapsed((current) => {
      if (current >= DURATION) { setPlaying(false); return DURATION; }
      return Math.min(DURATION, current + 0.1);
    }), 100);
    return () => window.clearInterval(id);
  }, [playing]);

  const beatIndex = useMemo(() => Math.max(0, BEATS.findIndex((beat) => elapsed >= beat.start && elapsed < beat.end)), [elapsed]);
  const beat = BEATS[beatIndex] ?? BEATS[BEATS.length - 1];
  const act = beat.scene;

  useEffect(() => {
    if (act !== 'explore-tabernacle' && act !== 'explore-material') return;
    const id = window.setTimeout(() => setEntity(act === 'explore-tabernacle' ? 'ark' : 'pitch'), 0);
    return () => window.clearTimeout(id);
  }, [act]);

  useEffect(() => {
    if (act !== 'product-select' || !playing) return;
    const id = window.setTimeout(() => jump(31.1), 4800);
    return () => window.clearTimeout(id);
  }, [act, playing]);

  const hookMode = act === 'hook-reach' ? 'reach' : act === 'hook-gap' ? 'gap' : null;
  const productMode = act === 'product-select' ? 'select' : act === 'product-pipeline' ? 'pipeline' : act === 'product-output' ? 'output' : null;
  const filmMode = act === 'film-context';
  const exploreMode = act.startsWith('explore-') ? act as Parameters<typeof ExploreScene>[0]['mode'] : null;

  return (
    <main className={`demo-shell act-${act}`}>
      <div className="grain" />{started && <MotionField />}

      {hookMode && <HookScene key={beatIndex} mode={hookMode} onStart={() => { setStarted(true); setPlaying(true); }} />}

      {act === 'intro' && <section key={beatIndex} className="intro-scene scene"><div className="intro-image" /><div className="intro-vignette" /><header className="intro-nav"><button className="wordmark" onClick={restart}><ViewMark /><span>THE VIEW</span></button><span className="demo-label">INTERACTIVE PRODUCT FILM · 01:48</span></header><div className="intro-content"><p className="eyebrow"><span /> SCRIPTURE, SEEN ANEW <span /></p><div className="hero-mark"><ViewMark hero /></div><h1>THE VIEW</h1><p className="tagline">Don’t just read the story. <em>Enter it.</em></p></div><div className="intro-footer"><span>Historically grounded</span><span className="footer-rule" /><span>AI animated</span><span className="footer-rule" /><span>Every passage, alive</span></div></section>}

      {productMode && <ProductDemoScene key={beatIndex} mode={productMode} onAdvance={() => jump(31.1)} />}
      {filmMode && <FilmScene key={beatIndex} />}
      {exploreMode && <ExploreScene key={beatIndex} mode={exploreMode} entity={entity} onEntity={setEntity} />}
      {act === 'evidence' && <EvidenceScene key={beatIndex} />}
      {act === 'outro' && <section key={beatIndex} className="outro-scene scene"><div className="outro-glow" /><ViewMark hero /><p className="section-kicker">THE VIEW</p><h2>Read it.<br /><em>See it.</em><br />Understand it.</h2><p>Any passage. Every detail. Scripture brought to life.</p><Button className="enter-button" onClick={restart}><RotateCcw /><span className="no-circle">Watch again</span></Button></section>}

      {act !== 'intro' && act !== 'outro' && !act.startsWith('hook-') && <header className="app-header"><button className="wordmark compact" onClick={restart}><ViewMark /><span>THE VIEW</span></button><div className="act-indicator"><span className="live-dot" /> {beat.label.toUpperCase()}</div><div className="beat-count"><span>{String(beatIndex + 1).padStart(2, '0')}</span> / {BEATS.length}</div><Button variant="ghost" size="sm" className="sound-button"><Volume2 /> Sound on</Button></header>}

      {started && act !== 'outro' && <footer className="playback-bar"><Button variant="ghost" size="icon" aria-label={playing ? 'Pause demo' : 'Play demo'} onClick={() => setPlaying(!playing)}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</Button><button className="timecode" onClick={() => jump(0)}>{formatTime(elapsed)} <span>/ 1:48</span></button><nav className="timeline" aria-label="Demo beats">{BEATS.map((item, index) => { const fill = Math.max(0, Math.min(1, (elapsed - item.start) / (item.end - item.start))); return <button key={item.label + index} style={{ width: `${((item.end - item.start) / DURATION) * 100}%` }} className={`timeline-segment ${index === beatIndex ? 'current' : ''}`} onClick={() => jump(item.start + .1)} aria-label={`Jump to ${item.label}`}><span style={{ transform: `scaleX(${fill})` }} /><small>{item.label}</small></button>; })}</nav><div className="runtime"><Clock3 /> NEXT · {Math.max(0, Math.ceil(beat.end - elapsed))}s</div></footer>}
    </main>
  );
}
