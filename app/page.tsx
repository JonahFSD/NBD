'use client';

import { useEffect, useMemo, useState } from 'react';
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
  Quote,
  RotateCcw,
  Search,
  Shield,
  Sparkles,
  Volume2,
  WandSparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DURATION = 148;
const BEATS = [
  { start: 0, end: 9, scene: 'hook-reach', label: 'The reach' },
  { start: 9, end: 17, scene: 'hook-gap', label: 'The gap' },
  { start: 17, end: 24, scene: 'intro', label: 'The View' },
  { start: 24, end: 34, scene: 'product-select', label: 'Select verses' },
  { start: 34, end: 44, scene: 'product-pipeline', label: 'Build the story' },
  { start: 44, end: 54, scene: 'product-output', label: 'Watch the View' },
  { start: 54, end: 62, scene: 'film-title', label: 'The story' },
  { start: 62, end: 71, scene: 'film-threat', label: 'The challenge' },
  { start: 71, end: 81, scene: 'film-david', label: 'The shepherd' },
  { start: 81, end: 91, scene: 'film-faith', label: 'Faith' },
  { start: 91, end: 101, scene: 'film-context', label: 'More than film' },
  { start: 101, end: 110, scene: 'explore-intro', label: 'Tap the world' },
  { start: 110, end: 120, scene: 'explore-tabernacle', label: 'Tabernacle' },
  { start: 120, end: 130, scene: 'explore-material', label: 'Every detail' },
  { start: 130, end: 139, scene: 'evidence', label: 'Trust the lens' },
  { start: 139, end: 148, scene: 'outro', label: 'The View' },
] as const;

const entities = {
  tabernacle: {
    type: 'PLACE · SACRED SPACE', title: 'The Tabernacle', hebrew: 'מִשְׁכָּן · mishkan · “dwelling place”',
    body: 'A portable sanctuary at the center of Israel’s wilderness worship. Exodus describes an outer courtyard, the Holy Place, and the Most Holy Place.',
    detail: 'Used for sacrifice, priestly service, worship, and as the meeting place between God and his people.', source: 'Primary text · Exodus 25–40',
  },
  acacia: {
    type: 'MATERIAL · CONSTRUCTION', title: 'Acacia Wood', hebrew: 'עֲצֵי שִׁטִּים · atzei shittim',
    body: 'A durable desert hardwood named throughout the tabernacle instructions. It formed structural frames and sacred furnishings.',
    detail: 'Its availability in arid regions made it a plausible, resilient material for a portable sanctuary.', source: 'Primary text · Exodus 25:5, 10–15',
  },
  altar: {
    type: 'OBJECT · WORSHIP', title: 'Bronze Altar', hebrew: 'מִזְבֵּחַ · mizbeach · “place of sacrifice”',
    body: 'A large, portable altar positioned in the courtyard. Its acacia-wood frame was overlaid with bronze and fitted with carrying poles.',
    detail: 'It was the principal place for burnt offerings and stood before entry into the sanctuary tent.', source: 'Primary text · Exodus 27:1–8',
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

function ProductDemoScene({ mode }: { mode: 'select' | 'pipeline' | 'output' }) {
  const copy = {
    select: ['01 · CHOOSE THE MOMENT', 'Start with the Word.', 'Select the passage you want to see.'],
    pipeline: ['02 · THE VIEW ENGINE', 'Scripture in.', 'A historically grounded story takes shape.'],
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
            <div className="selection-toolbar"><span><strong>Verses 40–45</strong> · 6 verses selected</span><button><WandSparkles /> Create a View</button></div>
          </article><div className="demo-cursor"><span /></div>
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
          <div className="output-film"><div className="output-film-image" /><div className="output-film-shade" /><span className="ready-badge"><Check /> VIEW READY · 1:24</span><div className="output-title"><small>1 SAMUEL 17</small><strong>DAVID &amp; GOLIATH</strong><span>Artistic reconstruction based on biblical and historical context</span></div><button className="output-play"><Play fill="currentColor" /></button><div className="output-caption">“...with his sling in his hand, he approached the Philistine.”</div><div className="output-controls"><button><Pause fill="currentColor" /></button><span className="output-progress"><i /></span><small>0:18 / 1:24</small></div></div>
          <div className="output-actions"><button><BookOpen /> Read the passage</button><button><Eye /> Explore David</button><button><MapPin /> Valley of Elah</button></div>
        </div>}
      </div>
    </section>
  );
}

function FilmScene({ mode }: { mode: 'film-title' | 'film-threat' | 'film-david' | 'film-faith' | 'film-context' }) {
  const captions = {
    'film-title': ['03 · THE STORY, ALIVE', 'DAVID & GOLIATH', 'The valley holds its breath.'],
    'film-threat': ['DAY 40 · VALLEY OF ELAH', 'FORTY DAYS.', 'The challenge went unanswered.'],
    'film-david': ['1 SAMUEL 17:40', 'FIVE STONES.', 'One sling. One shepherd.'],
    'film-faith': ['1 SAMUEL 17:45', '“I COME IN THE NAME OF THE LORD.”', 'Faith steps into the valley.'],
    'film-context': ['THE STORY CONTINUES', 'WATCH. THEN GO DEEPER.', 'Every frame leads back to Scripture.'],
  }[mode];
  return (
    <section className={`film-scene scene ${mode}`}>
      <div className="film-image" /><div className="film-shade" /><div className="film-flare" />
      <div className="film-meta"><span>THE VIEW ORIGINAL</span><span>ARTISTIC RECONSTRUCTION · 1 SAMUEL 17</span></div>
      <div className="film-title">
        <p className="section-kicker">{captions[0]}</p><h2>{captions[1]}</h2><p>{captions[2]}</p>
      </div>
      {mode === 'film-threat' && <div className="threat-meter"><span /><small>ISRAELITE LINE</small><strong>40</strong><small>DAYS OF DEFIANCE</small></div>}
      {mode === 'film-david' && <div className="story-hotspots"><span style={{ left: '25%', top: '62%' }}><i /> Sling · woven leather</span><span style={{ left: '46%', top: '78%' }}><i /> Five smooth stones</span><span style={{ left: '75%', top: '45%' }}><i /> Philistine armor</span></div>}
      {mode === 'film-faith' && <div className="verse-wave"><Quote /><span /><span /><span /><span /><span /></div>}
      {mode === 'film-context' && <>
        <aside className="accuracy-card"><div><Shield size={14} /> ACCURACY LENS</div><strong>Philistine scale armor</strong><p>Period-informed reconstruction from the biblical description and regional material culture.</p><span>Interpretive details are clearly labeled</span></aside>
        <div className="after-film"><button>Explore David <ChevronRight /></button><button>Valley of Elah <ChevronRight /></button><button>The sling <ChevronRight /></button></div>
      </>}
      {mode !== 'film-title' && mode !== 'film-context' && <div className="film-caption"><span className="caption-line" /><p>{captions[2]}</p></div>}
    </section>
  );
}

function KnowledgeCard({ entity }: { entity: EntityKey }) {
  const item = entities[entity];
  return (
    <aside className="knowledge-card" key={entity}>
      <div className="knowledge-top"><span>{item.type}</span><Layers3 size={16} /></div><h3>{item.title}</h3><p className="hebrew">{item.hebrew}</p>
      <div className="knowledge-divider" /><p>{item.body}</p><h4>What was it used for?</h4><p>{item.detail}</p>
      <div className="source-row"><Shield size={14} /><span><strong>Grounded view</strong>{item.source}</span></div><button className="deep-dive">Explore full entry <ChevronRight /></button>
    </aside>
  );
}

function ExploreScene({ mode, entity, onEntity }: { mode: 'explore-intro' | 'explore-tabernacle' | 'explore-material'; entity: EntityKey; onEntity: (key: EntityKey) => void }) {
  const intro = mode === 'explore-intro';
  return (
    <section className={`explore-scene scene ${mode}`}>
      <div className="explore-image" /><div className="explore-shade" />
      <div className="explore-copy">
        <p className="section-kicker">04 · TAP INTO THE WORLD</p>
        <h2>{intro ? <>Every noun becomes<br /><em>a doorway.</em></> : mode === 'explore-tabernacle' ? <>See the place.<br /><em>Understand its purpose.</em></> : <>From material<br /><em>to meaning.</em></>}</h2>
        <div className="passage-card"><div><BookOpen size={15} /> EXODUS 26:15</div><p>“Make upright frames of <button onClick={() => onEntity('acacia')}>acacia wood</button> for the <button onClick={() => onEntity('tabernacle')}>tabernacle</button>.”</p><span>Tap a highlighted word to open its knowledge layer.</span></div>
        <div className="entity-tabs">{(Object.keys(entities) as EntityKey[]).map((key) => <button key={key} className={entity === key ? 'active' : ''} onClick={() => onEntity(key)}>{key === 'acacia' ? 'Acacia wood' : key === 'altar' ? 'Bronze altar' : 'Tabernacle'}</button>)}</div>
        {intro && <div className="noun-cloud"><span>DAVID</span><span>JERUSALEM</span><span>SLING</span><span>PAUL</span><span>TABERNACLE</span><span>VALLEY OF ELAH</span></div>}
      </div>
      {!intro && <KnowledgeCard entity={entity} />}
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
  const [entity, setEntity] = useState<EntityKey>('tabernacle');

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
    const id = window.setTimeout(() => setEntity(act === 'explore-tabernacle' ? 'tabernacle' : 'acacia'), 0);
    return () => window.clearTimeout(id);
  }, [act]);

  const jump = (time: number) => { setStarted(true); setElapsed(time); setPlaying(true); };
  const restart = () => { setStarted(false); setPlaying(false); setElapsed(0); };
  const hookMode = act === 'hook-reach' ? 'reach' : act === 'hook-gap' ? 'gap' : null;
  const productMode = act === 'product-select' ? 'select' : act === 'product-pipeline' ? 'pipeline' : act === 'product-output' ? 'output' : null;
  const filmMode = act.startsWith('film-') ? act as Parameters<typeof FilmScene>[0]['mode'] : null;
  const exploreMode = act.startsWith('explore-') ? act as Parameters<typeof ExploreScene>[0]['mode'] : null;

  return (
    <main className={`demo-shell act-${act}`}>
      <div className="grain" />{started && <MotionField />}

      {hookMode && <HookScene key={beatIndex} mode={hookMode} onStart={() => { setStarted(true); setPlaying(true); }} />}

      {act === 'intro' && <section key={beatIndex} className="intro-scene scene"><div className="intro-image" /><div className="intro-vignette" /><header className="intro-nav"><button className="wordmark" onClick={restart}><ViewMark /><span>THE VIEW</span></button><span className="demo-label">INTERACTIVE PRODUCT FILM · 02:28</span></header><div className="intro-content"><p className="eyebrow"><span /> SCRIPTURE, SEEN ANEW <span /></p><div className="hero-mark"><ViewMark hero /></div><h1>THE VIEW</h1><p className="tagline">Don’t just read the story. <em>Enter it.</em></p><Button className="enter-button" onClick={() => { setStarted(true); setPlaying(true); }}><span><Play size={15} fill="currentColor" /></span>{started ? 'Continue the experience' : 'Begin the experience'}</Button></div><div className="intro-footer"><span>Historically grounded</span><span className="footer-rule" /><span>AI animated</span><span className="footer-rule" /><span>Every passage, alive</span></div></section>}

      {productMode && <ProductDemoScene key={beatIndex} mode={productMode} />}
      {filmMode && <FilmScene key={beatIndex} mode={filmMode} />}
      {exploreMode && <ExploreScene key={beatIndex} mode={exploreMode} entity={entity} onEntity={setEntity} />}
      {act === 'evidence' && <EvidenceScene key={beatIndex} />}
      {act === 'outro' && <section key={beatIndex} className="outro-scene scene"><div className="outro-glow" /><ViewMark hero /><p className="section-kicker">THE VIEW</p><h2>Read it.<br /><em>See it.</em><br />Understand it.</h2><p>Any passage. Every detail. Scripture brought to life.</p><Button className="enter-button" onClick={restart}><RotateCcw /><span className="no-circle">Watch again</span></Button></section>}

      {act !== 'intro' && act !== 'outro' && !act.startsWith('hook-') && <header className="app-header"><button className="wordmark compact" onClick={restart}><ViewMark /><span>THE VIEW</span></button><div className="act-indicator"><span className="live-dot" /> {beat.label.toUpperCase()}</div><div className="beat-count"><span>{String(beatIndex + 1).padStart(2, '0')}</span> / {BEATS.length}</div><Button variant="ghost" size="sm" className="sound-button"><Volume2 /> Sound on</Button></header>}

      {started && act !== 'outro' && <footer className="playback-bar"><Button variant="ghost" size="icon" aria-label={playing ? 'Pause demo' : 'Play demo'} onClick={() => setPlaying(!playing)}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</Button><button className="timecode" onClick={() => jump(0)}>{formatTime(elapsed)} <span>/ 2:28</span></button><nav className="timeline" aria-label="Demo beats">{BEATS.map((item, index) => { const fill = Math.max(0, Math.min(1, (elapsed - item.start) / (item.end - item.start))); return <button key={item.label + index} style={{ width: `${((item.end - item.start) / DURATION) * 100}%` }} className={`timeline-segment ${index === beatIndex ? 'current' : ''}`} onClick={() => jump(item.start + .1)} aria-label={`Jump to ${item.label}`}><span style={{ transform: `scaleX(${fill})` }} /><small>{item.label}</small></button>; })}</nav><div className="runtime"><Clock3 /> NEXT · {Math.max(0, Math.ceil(beat.end - elapsed))}s</div></footer>}
    </main>
  );
}
