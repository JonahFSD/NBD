'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  AudioLines,
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
  { start: 0, end: 8, scene: 'intro', label: 'The View' },
  { start: 8, end: 16, scene: 'promise', label: 'The promise' },
  { start: 16, end: 25, scene: 'passages', label: 'Any passage' },
  { start: 25, end: 34, scene: 'reader', label: 'Read' },
  { start: 34, end: 43, scene: 'trigger', label: 'Create' },
  { start: 43, end: 50, scene: 'creating-scripture', label: 'Map Scripture' },
  { start: 50, end: 57, scene: 'creating-world', label: 'Build the world' },
  { start: 57, end: 65, scene: 'film-title', label: 'The story' },
  { start: 65, end: 74, scene: 'film-threat', label: 'The challenge' },
  { start: 74, end: 84, scene: 'film-david', label: 'The shepherd' },
  { start: 84, end: 94, scene: 'film-faith', label: 'Faith' },
  { start: 94, end: 104, scene: 'film-context', label: 'More than film' },
  { start: 104, end: 113, scene: 'explore-intro', label: 'Tap the world' },
  { start: 113, end: 123, scene: 'explore-tabernacle', label: 'Tabernacle' },
  { start: 123, end: 132, scene: 'explore-material', label: 'Every detail' },
  { start: 132, end: 140, scene: 'evidence', label: 'Trust the lens' },
  { start: 140, end: 148, scene: 'outro', label: 'The View' },
] as const;

const chapters = [
  { label: 'The beginning', ref: 'Genesis 1', time: '72 sec', tone: 'creation' },
  { label: 'The shepherd king', ref: '1 Samuel 17', time: '84 sec', tone: 'david' },
  { label: 'Peace, be still', ref: 'Mark 4:35–41', time: '68 sec', tone: 'sea' },
];

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

function PassageScene({ mode, selected, onSelect, onCreate }: { mode: 'passages' | 'reader' | 'trigger'; selected: number; onSelect: (index: number) => void; onCreate: () => void }) {
  const copy = {
    passages: ['01 · ANY PASSAGE', 'Choose the story.', 'We’ll build the world.', 'From Genesis to Revelation, every passage is one tap away from a cinematic experience.'],
    reader: ['02 · THE BIBLE, CENTER STAGE', 'Read it clearly.', 'See what matters.', 'People, places, objects, and ideas become doorways into the world behind the words.'],
    trigger: ['03 · FROM TEXT TO CINEMA', 'One passage.', 'A world in motion.', 'Scripture is mapped first. Historical context shapes the scene. AI brings the experience to life.'],
  }[mode];

  return (
    <section className={`passage-scene scene passage-${mode}`}>
      <div className="passage-heading">
        <p className="section-kicker">{copy[0]}</p>
        <h2>{copy[1]}<br /><em>{copy[2]}</em></h2>
        <p>{copy[3]}</p>
        {mode === 'passages' && <div className="micro-stats"><span><strong>66</strong> books</span><span><strong>1</strong> living experience</span><span><strong>60–90s</strong> films</span></div>}
        {mode === 'reader' && <div className="reader-tools"><span><Search /> Search</span><span><BookOpen /> Translation</span><span><AudioLines /> Listen</span></div>}
        {mode === 'trigger' && <div className="story-recipe"><span><Check /> Scripture mapped</span><span><MapPin /> Period located</span><span><Film /> Storyboard ready</span></div>}
      </div>

      <div className="bible-surface">
        <div className="surface-scan" />
        <div className="bible-topbar"><BookOpen size={17} /><span>HOLY BIBLE</span><button><Search size={16} /> Search passage</button></div>
        <div className="bible-grid">
          <aside><p>OLD TESTAMENT</p>{['Genesis', 'Exodus', 'Joshua', '1 Samuel', 'Psalms'].map((book) => <button className={book === '1 Samuel' ? 'active' : ''} key={book}>{book}<span>{book === '1 Samuel' ? '31' : '—'}</span></button>)}</aside>
          <article>
            <div className="chapter-label"><span>1 SAMUEL</span><strong>17</strong></div>
            <h3>David and Goliath</h3>
            <p className="scripture-line"><small>40</small> Then he took his staff in his hand, chose <button className={mode !== 'passages' ? 'word-active' : ''}>five smooth stones</button> from the stream and, with his <button className={mode === 'reader' ? 'word-active' : ''}>sling</button> in his hand, approached the <button className={mode === 'reader' ? 'word-active' : ''}>Philistine</button>.</p>
            <p className="scripture-line muted-line"><small>45</small> David said to the Philistine, “You come against me with sword and spear and javelin, but I come against you in the name of the LORD Almighty...”</p>
            <Button className={`create-film ${mode === 'trigger' ? 'cta-pulse' : ''}`} onClick={onCreate}><WandSparkles /> Create mini film <span>~84 sec</span></Button>
          </article>
        </div>
        {mode === 'reader' && <div className="word-flyout"><span>OBJECT · WEAPON</span><strong>Sling</strong><small>Tap to see how it worked</small></div>}
        {mode === 'trigger' && <div className="film-ready"><Sparkles /><span><small>READY TO CREATE</small><strong>David &amp; Goliath</strong></span></div>}
      </div>

      {mode === 'passages' && <div className="chapter-rail">{chapters.map((item, index) => <button key={item.ref} className={selected === index ? 'chapter-card selected' : 'chapter-card'} onClick={() => onSelect(index)}><span className={`chapter-thumb ${item.tone}`} /><span><small>{item.ref}</small><strong>{item.label}</strong></span><span className="card-time">{item.time}</span></button>)}</div>}
    </section>
  );
}

function ForgeScene({ mode }: { mode: 'creating-scripture' | 'creating-world' }) {
  const world = mode === 'creating-world';
  return (
    <section className={`forge-scene scene ${world ? 'forge-world' : 'forge-scripture'}`}>
      {world && <div className="forge-world-image" />}
      <div className="forge-rings"><span /><span /><span /></div>
      <div className="forge-sweep" />
      <ViewMark hero />
      <p className="section-kicker">{world ? 'STEP 02 · REBUILD THE WORLD' : 'STEP 01 · STAY TRUE TO THE TEXT'}</p>
      <h2>{world ? <>Iron Age Levant.<br /><em>Grounded in context.</em></> : <>Scripture first.<br /><em>Every time.</em></>}</h2>
      <div className="forge-status">
        <span className="done"><BookOpen /> {world ? '1 Samuel 17' : 'Characters identified'}</span>
        <span className="done"><MapPin /> {world ? 'Valley of Elah' : 'Actions sequenced'}</span>
        <span className={world ? 'done' : ''}><Sparkles /> {world ? 'Material culture' : 'Verses connected'}</span>
      </div>
      {world ? <div className="orbit-labels"><span>BRONZE SCALE ARMOR</span><span>WOOL GARMENTS</span><span>LIMESTONE VALLEY</span></div> : <p className="scholar-note">The Bible remains the source. The View becomes the lens.</p>}
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
  const [passage, setPassage] = useState(1);
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
    if (act === 'explore-tabernacle') setEntity('tabernacle');
    if (act === 'explore-material') setEntity('acacia');
  }, [act]);

  const jump = (time: number) => { setStarted(true); setElapsed(time); setPlaying(true); };
  const restart = () => { setStarted(false); setPlaying(false); setElapsed(0); };
  const passageMode = act === 'passages' || act === 'reader' || act === 'trigger' ? act : null;
  const forgeMode = act === 'creating-scripture' || act === 'creating-world' ? act : null;
  const filmMode = act.startsWith('film-') ? act as Parameters<typeof FilmScene>[0]['mode'] : null;
  const exploreMode = act.startsWith('explore-') ? act as Parameters<typeof ExploreScene>[0]['mode'] : null;

  return (
    <main className={`demo-shell act-${act}`}>
      <div className="grain" />{started && <MotionField />}

      {act === 'intro' && <section key={beatIndex} className="intro-scene scene"><div className="intro-image" /><div className="intro-vignette" /><header className="intro-nav"><button className="wordmark" onClick={restart}><ViewMark /><span>THE VIEW</span></button><span className="demo-label">INTERACTIVE PRODUCT FILM · 02:28</span></header><div className="intro-content"><p className="eyebrow"><span /> SCRIPTURE, SEEN ANEW <span /></p><div className="hero-mark"><ViewMark hero /></div><h1>THE VIEW</h1><p className="tagline">Don’t just read the story. <em>Enter it.</em></p><Button className="enter-button" onClick={() => { setStarted(true); setPlaying(true); }}><span><Play size={15} fill="currentColor" /></span>{started ? 'Continue the experience' : 'Begin the experience'}</Button></div><div className="intro-footer"><span>Historically grounded</span><span className="footer-rule" /><span>AI animated</span><span className="footer-rule" /><span>Every passage, alive</span></div></section>}

      {act === 'promise' && <section key={beatIndex} className="promise-scene scene"><div className="promise-image" /><div className="promise-shade" /><p className="section-kicker">THE VIEW · THE BIG IDEA</p><div className="kinetic-promise"><span>READ IT.</span><span>SEE IT.</span><span>UNDERSTAND IT.</span></div><p>The Bible remains the source. <strong>The View is the lens.</strong></p><div className="promise-symbols"><span><BookOpen /> Scripture</span><i /><span><Film /> Cinema</span><i /><span><Eye /> Understanding</span></div></section>}

      {passageMode && <PassageScene key={beatIndex} mode={passageMode} selected={passage} onSelect={setPassage} onCreate={() => jump(43.1)} />}
      {forgeMode && <ForgeScene key={beatIndex} mode={forgeMode} />}
      {filmMode && <FilmScene key={beatIndex} mode={filmMode} />}
      {exploreMode && <ExploreScene key={beatIndex} mode={exploreMode} entity={entity} onEntity={setEntity} />}
      {act === 'evidence' && <EvidenceScene key={beatIndex} />}
      {act === 'outro' && <section key={beatIndex} className="outro-scene scene"><div className="outro-glow" /><ViewMark hero /><p className="section-kicker">THE VIEW</p><h2>Read it.<br /><em>See it.</em><br />Understand it.</h2><p>Any passage. Every detail. Scripture brought to life.</p><Button className="enter-button" onClick={restart}><RotateCcw /><span className="no-circle">Watch again</span></Button></section>}

      {act !== 'intro' && act !== 'outro' && <header className="app-header"><button className="wordmark compact" onClick={restart}><ViewMark /><span>THE VIEW</span></button><div className="act-indicator"><span className="live-dot" /> {beat.label.toUpperCase()}</div><div className="beat-count"><span>{String(beatIndex + 1).padStart(2, '0')}</span> / {BEATS.length}</div><Button variant="ghost" size="sm" className="sound-button"><Volume2 /> Sound on</Button></header>}

      {started && act !== 'outro' && <footer className="playback-bar"><Button variant="ghost" size="icon" aria-label={playing ? 'Pause demo' : 'Play demo'} onClick={() => setPlaying(!playing)}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</Button><button className="timecode" onClick={() => jump(0)}>{formatTime(elapsed)} <span>/ 2:28</span></button><div className="timeline" role="group" aria-label="Demo beats">{BEATS.map((item, index) => { const fill = Math.max(0, Math.min(1, (elapsed - item.start) / (item.end - item.start))); return <button key={item.label + index} style={{ width: `${((item.end - item.start) / DURATION) * 100}%` }} className={`timeline-segment ${index === beatIndex ? 'current' : ''}`} onClick={() => jump(item.start + .1)} aria-label={`Jump to ${item.label}`}><span style={{ transform: `scaleX(${fill})` }} /><small>{item.label}</small></button>; })}</div><div className="runtime"><Clock3 /> NEXT · {Math.max(0, Math.ceil(beat.end - elapsed))}s</div></footer>}
    </main>
  );
}
