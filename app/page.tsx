'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  Clock3,
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

const DURATION = 148;
const chapters = [
  { label: 'The beginning', ref: 'Genesis 1', time: '72 sec', tone: 'creation' },
  { label: 'The shepherd king', ref: '1 Samuel 17', time: '84 sec', tone: 'david' },
  { label: 'Peace, be still', ref: 'Mark 4:35–41', time: '68 sec', tone: 'sea' },
];
const entities = {
  tabernacle: {
    type: 'PLACE · SACRED SPACE',
    title: 'The Tabernacle',
    hebrew: 'מִשְׁכָּן · mishkan · “dwelling place”',
    body: 'A portable sanctuary at the center of Israel’s wilderness worship. Exodus describes an outer courtyard, the Holy Place, and the Most Holy Place—each moving inward toward the symbolic presence of God.',
    detail: 'Used for sacrifice, priestly service, worship, and as the meeting place between God and his people.',
    source: 'Primary text: Exodus 25–40',
  },
  acacia: {
    type: 'MATERIAL · CONSTRUCTION',
    title: 'Acacia Wood',
    hebrew: 'עֲצֵי שִׁטִּים · atzei shittim',
    body: 'A durable desert hardwood named throughout the tabernacle instructions. It formed the structural frames and sacred furnishings, often overlaid with gold or bronze depending on their use.',
    detail: 'Its availability in arid regions made it a plausible, resilient material for a portable sanctuary.',
    source: 'Primary text: Exodus 25:5, 10–15',
  },
  altar: {
    type: 'OBJECT · WORSHIP',
    title: 'Bronze Altar',
    hebrew: 'מִזְבֵּחַ · mizbeach · “place of sacrifice”',
    body: 'A large, portable altar positioned in the courtyard. Its acacia-wood frame was overlaid with bronze and fitted with rings and poles so it could travel with the camp.',
    detail: 'It was the principal place for burnt offerings and stood before entry into the sanctuary tent.',
    source: 'Primary text: Exodus 27:1–8',
  },
};

function ViewMark({ hero = false }: { hero?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 72 72" className={hero ? 'view-mark hero-view-mark' : 'view-mark'}>
      <path d="M8 15.5 35.8 57 64 15.5" />
      <path d="M19 15.5 35.9 41 53 15.5" />
      <circle cx="36" cy="23.5" r="5.2" />
    </svg>
  );
}

function formatTime(value: number) {
  const mins = Math.floor(value / 60);
  const secs = Math.floor(value % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export default function Home() {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [passage, setPassage] = useState(1);
  const [entity, setEntity] = useState<keyof typeof entities>('tabernacle');

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setElapsed((current) => {
        if (current >= DURATION) {
          setPlaying(false);
          return DURATION;
        }
        return Math.min(DURATION, current + 0.1);
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [playing]);

  const act = useMemo(() => {
    if (elapsed < 14) return 'intro';
    if (elapsed < 43) return 'passages';
    if (elapsed < 57) return 'creating';
    if (elapsed < 104) return 'david';
    if (elapsed < 138) return 'explore';
    return 'outro';
  }, [elapsed]);

  const jump = (time: number) => {
    setStarted(true);
    setElapsed(time);
    setPlaying(true);
  };

  const restart = () => {
    setStarted(false);
    setPlaying(false);
    setElapsed(0);
  };

  return (
    <main className={`demo-shell act-${act}`}>
      <div className="grain" />

      {act === 'intro' && (
        <section className="intro-scene scene" aria-labelledby="intro-title">
          <div className="intro-image" />
          <div className="intro-vignette" />
          <header className="intro-nav">
            <a className="wordmark" href="#" onClick={restart} aria-label="The View home"><ViewMark /><span>THE VIEW</span></a>
            <span className="demo-label">INTERACTIVE PRODUCT FILM · 02:28</span>
          </header>
          <div className="intro-content">
            <p className="eyebrow"><span /> SCRIPTURE, SEEN ANEW <span /></p>
            <div className="hero-mark"><ViewMark hero /></div>
            <h1 id="intro-title">THE VIEW</h1>
            <p className="tagline">Don’t just read the story. <em>Enter it.</em></p>
            <Button className="enter-button" onClick={() => { setStarted(true); setPlaying(true); }}>
              <span><Play size={15} fill="currentColor" /></span>
              {started ? 'Continue the experience' : 'Begin the experience'}
            </Button>
          </div>
          <div className="intro-footer"><span>Historically grounded</span><span className="footer-rule" /><span>AI animated</span><span className="footer-rule" /><span>Every passage, alive</span></div>
        </section>
      )}

      {act !== 'intro' && act !== 'outro' && (
        <header className="app-header">
          <button className="wordmark compact" onClick={restart} aria-label="Restart The View demo"><ViewMark /><span>THE VIEW</span></button>
          <div className="act-indicator"><span className="live-dot" /> {act === 'david' ? 'CINEMA MODE' : act === 'explore' ? 'KNOWLEDGE LAYER' : 'SCRIPTURE'}</div>
          <Button variant="ghost" size="sm" className="sound-button"><Volume2 /> Sound on</Button>
        </header>
      )}

      {act === 'passages' && (
        <section className="passage-scene scene">
          <div className="passage-heading">
            <p className="section-kicker">01 · ANY PASSAGE</p>
            <h2>Choose the story.<br /><em>We’ll build the world.</em></h2>
            <p>Every passage becomes a 60–90 second cinematic experience—grounded in Scripture and the material world behind it.</p>
          </div>
          <div className="bible-surface">
            <div className="bible-topbar"><BookOpen size={17} /><span>HOLY BIBLE</span><button><Search size={16} /> Search passage</button></div>
            <div className="bible-grid">
              <aside>
                <p>OLD TESTAMENT</p>
                {['Genesis', 'Exodus', 'Joshua', '1 Samuel', 'Psalms'].map((book) => <button className={book === '1 Samuel' ? 'active' : ''} key={book}>{book}<span>{book === '1 Samuel' ? '31' : '—'}</span></button>)}
              </aside>
              <article>
                <div className="chapter-label"><span>1 SAMUEL</span><strong>17</strong></div>
                <h3>David and Goliath</h3>
                <p className="scripture-line"><small>40</small> Then he took his staff in his hand, chose five smooth stones from the stream, put them in the pouch of his shepherd’s bag and, with his sling in his hand, approached the <button>Philistine</button>.</p>
                <p className="scripture-line muted-line"><small>45</small> David said to the Philistine, “You come against me with sword and spear and javelin, but I come against you in the name of the LORD Almighty...”</p>
                <Button className="create-film" onClick={() => jump(43.2)}><WandSparkles /> Create mini film <span>~84 sec</span></Button>
              </article>
            </div>
          </div>
          <div className="chapter-rail">
            {chapters.map((item, index) => (
              <button key={item.ref} className={passage === index ? 'chapter-card selected' : 'chapter-card'} onClick={() => setPassage(index)}>
                <span className={`chapter-thumb ${item.tone}`} />
                <span><small>{item.ref}</small><strong>{item.label}</strong></span>
                <span className="card-time">{item.time}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {act === 'creating' && (
        <section className="forge-scene scene">
          <div className="forge-rings"><span /><span /><span /></div>
          <ViewMark hero />
          <p className="section-kicker">BUILDING YOUR FILM</p>
          <h2>1 Samuel 17</h2>
          <div className="forge-status">
            <span className="done"><Shield /> Scripture mapped</span>
            <span className={elapsed > 48 ? 'done' : ''}><MapPin /> Historical setting</span>
            <span className={elapsed > 52 ? 'done' : ''}><Sparkles /> Cinematic animation</span>
          </div>
          <p className="scholar-note">Reconstruction lens · Iron Age Levant · Valley of Elah</p>
        </section>
      )}

      {act === 'david' && (
        <section className="film-scene scene">
          <div className="film-image" />
          <div className="film-shade" />
          <div className="film-meta"><span>THE VIEW ORIGINAL</span><span>1 SAMUEL 17 · 03:42 PM</span></div>
          <div className="film-title">
            <p className="section-kicker">03 · THE STORY, ALIVE</p>
            <h2>DAVID<br />&amp; GOLIATH</h2>
            <p>The valley holds its breath.</p>
          </div>
          <div className="film-caption">
            <span className="caption-line" />
            <p>{elapsed < 73 ? 'For forty days, the challenge went unanswered.' : elapsed < 87 ? 'Then a shepherd stepped into the valley—with five stones and a sling.' : 'The battle was never his strength against a giant. It was trust against fear.'}</p>
          </div>
          <aside className="accuracy-card">
            <div><Shield size={14} /> ACCURACY LENS</div>
            <strong>Philistine scale armor</strong>
            <p>Period-informed reconstruction from the textual description and regional material culture.</p>
            <span>Interpretive details are clearly labeled</span>
          </aside>
        </section>
      )}

      {act === 'explore' && (
        <section className="explore-scene scene">
          <div className="explore-image" />
          <div className="explore-shade" />
          <div className="explore-copy">
            <p className="section-kicker">04 · TAP INTO THE WORLD</p>
            <h2>Every name, place<br />and object has a story.</h2>
            <div className="passage-card">
              <div><BookOpen size={15} /> EXODUS 26:15</div>
              <p>“Make upright frames of <button onClick={() => setEntity('acacia')}>acacia wood</button> for the <button onClick={() => setEntity('tabernacle')}>tabernacle</button>.”</p>
              <span>Tap a highlighted word to open its knowledge layer.</span>
            </div>
            <div className="entity-tabs">
              {(Object.keys(entities) as Array<keyof typeof entities>).map((key) => <button key={key} className={entity === key ? 'active' : ''} onClick={() => setEntity(key)}>{key === 'acacia' ? 'Acacia wood' : key === 'altar' ? 'Bronze altar' : 'Tabernacle'}</button>)}
            </div>
          </div>
          <aside className="knowledge-card">
            <div className="knowledge-top"><span>{entities[entity].type}</span><Layers3 size={16} /></div>
            <h3>{entities[entity].title}</h3>
            <p className="hebrew">{entities[entity].hebrew}</p>
            <div className="knowledge-divider" />
            <p>{entities[entity].body}</p>
            <h4>What was it used for?</h4>
            <p>{entities[entity].detail}</p>
            <div className="source-row"><Shield size={14} /><span><strong>Grounded view</strong>{entities[entity].source}</span></div>
            <button className="deep-dive">Explore full entry <ChevronRight /></button>
          </aside>
        </section>
      )}

      {act === 'outro' && (
        <section className="outro-scene scene">
          <div className="outro-glow" />
          <ViewMark hero />
          <p className="section-kicker">THE VIEW</p>
          <h2>Read the Word.<br /><em>See the world.</em></h2>
          <p>Any passage. Every detail. Scripture brought to life.</p>
          <Button className="enter-button" onClick={restart}><RotateCcw /><span className="no-circle">Watch again</span></Button>
        </section>
      )}

      {started && act !== 'outro' && (
        <footer className="playback-bar">
          <Button variant="ghost" size="icon" aria-label={playing ? 'Pause demo' : 'Play demo'} onClick={() => setPlaying(!playing)}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</Button>
          <button className="timecode" onClick={() => jump(0)}>{formatTime(elapsed)} <span>/ 2:28</span></button>
          <div className="timeline" role="group" aria-label="Demo chapters">
            {[
              ['Intro', 0, 14], ['Any passage', 14, 43], ['AI film', 43, 104], ['Explore', 104, 138], ['The View', 138, 148],
            ].map(([label, start, end]) => {
              const width = ((Number(end) - Number(start)) / DURATION) * 100;
              const fill = Math.max(0, Math.min(1, (elapsed - Number(start)) / (Number(end) - Number(start))));
              return <button key={String(label)} style={{ width: `${width}%` }} className="timeline-segment" onClick={() => jump(Number(start) + .2)}><span style={{ transform: `scaleX(${fill})` }} /><small>{label}</small></button>;
            })}
          </div>
          <div className="runtime"><Clock3 /> 2–3 min demo</div>
        </footer>
      )}
    </main>
  );
}
