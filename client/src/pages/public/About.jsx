import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  Laptop, 
  Code2, 
  Briefcase,
  Lightbulb,
  Cpu,
  ShieldCheck,
  Rocket,
  Sparkles,
  GraduationCap,
  Users,
  Terminal,
  Layers,
  TrendingUp,
  Headphones
} from 'lucide-react';
import { peopleAPI } from '../../services/api';

const learningSteps = [
  {
    num: "01",
    phase: "ধাপ ০১",
    title: "বেসিক লার্নিং",
    desc: "শেখার প্রয়োজনীয় মৌলিক জ্ঞান ও ভিত্তি তৈরি।",
    icon: BookOpen,
    accent: "emerald",
    delay: "0.0s",
    nextLabel: "পরবর্তী ধাপ: ০২"
  },
  {
    num: "02",
    phase: "ধাপ ০২",
    title: "কনসেপ্ট বিল্ডিং",
    desc: "বিষয়গুলোর core concept পরিষ্কারভাবে বোঝা।",
    icon: Lightbulb,
    accent: "amber",
    delay: "0.5s",
    nextLabel: "পরবর্তী ধাপ: ০৩"
  },
  {
    num: "03",
    phase: "ধাপ ০৩",
    title: "স্কিল ডেভেলপমেন্ট",
    desc: "প্রয়োজনীয় technical skill ধাপে ধাপে তৈরি করা।",
    icon: Cpu,
    accent: "teal",
    delay: "1.0s",
    nextLabel: "পরবর্তী ধাপ: ০৪"
  },
  {
    num: "04",
    phase: "ধাপ ০৪",
    title: "প্র্যাকটিক্যাল অ্যাপ্লিকেশন",
    desc: "শেখা বিষয়গুলো hands-on কাজের মাধ্যমে প্রয়োগ করা।",
    icon: Laptop,
    accent: "indigo",
    delay: "1.5s",
    nextLabel: "পরবর্তী ধাপ: ০৫"
  },
  {
    num: "05",
    phase: "ধাপ ০৫",
    title: "প্রজেক্ট ডেভেলপমেন্ট",
    desc: "বাস্তব সমস্যার সমাধানে নিজের project তৈরি করা।",
    icon: Code2,
    accent: "rose",
    delay: "2.0s",
    nextLabel: "পরবর্তী ধাপ: ০৬"
  },
  {
    num: "06",
    phase: "ধাপ ০৬",
    title: "টেস্টিং & ইমপ্রুভমেন্ট",
    desc: "কাজ যাচাই, ভুল খুঁজে বের করা এবং আরও উন্নত করা।",
    icon: ShieldCheck,
    accent: "cyan",
    delay: "2.5s",
    nextLabel: "পরবর্তী ধাপ: ০৭"
  },
  {
    num: "07",
    phase: "ধাপ ০৭",
    title: "পোর্টফোলিও বিল্ডিং",
    desc: "নিজের skill ও project দিয়ে professional portfolio তৈরি করা।",
    icon: Briefcase,
    accent: "blue",
    delay: "3.0s",
    nextLabel: "পরবর্তী ধাপ: ০৮"
  },
  {
    num: "08",
    phase: "ধাপ ০৮",
    title: "ক্যারিয়ার রেডিনেস",
    desc: "চাকরি, internship, freelancing ও career-এর জন্য প্রস্তুত হওয়া।",
    icon: Rocket,
    accent: "gold",
    delay: "3.5s",
    isFinal: true,
    nextLabel: "চূড়ান্ত লক্ষ্য অর্জিত"
  }
];

function LearningJourneySection() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [pathD, setPathD] = useState('');
  const [isDesktop, setIsDesktop] = useState(true);

  const updatePath = () => {
    if (!containerRef.current || cardRefs.current.length < 8) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    if (containerRect.width === 0) return;

    const desktop = window.innerWidth >= 1024;
    setIsDesktop(desktop);

    if (!desktop) {
      setPathD('');
      return;
    }

    const cards = [];
    for (let i = 0; i < 8; i++) {
      const el = cardRefs.current[i];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      cards.push({
        left: rect.left - containerRect.left,
        right: rect.right - containerRect.left,
        centerX: rect.left - containerRect.left + rect.width / 2,
        centerY: rect.top - containerRect.top + rect.height / 2,
      });
    }

    const c0 = cards[0];
    const c3 = cards[3];
    const c4 = cards[4];
    const c7 = cards[7];

    const yRow1 = c0.centerY;
    const yRow2 = c4.centerY;
    const yMid = (yRow1 + yRow2) / 2;

    const rightMargin = 42;
    const leftMargin = 42;

    const xRight = c3.right + rightMargin;
    const xLeft = c4.left - leftMargin;

    // Smooth horizontal bridge across the middle with circular loops at both ends:
    const d = [
      `M ${c0.centerX} ${yRow1}`,
      `L ${c3.right} ${yRow1}`,
      `C ${xRight} ${yRow1}, ${xRight} ${yMid}, ${c3.centerX} ${yMid}`,
      `L ${c4.centerX} ${yMid}`,
      `C ${xLeft} ${yMid}, ${xLeft} ${yRow2}, ${c4.left} ${yRow2}`,
      `L ${c7.centerX} ${yRow2}`,
    ].join(' ');

    setPathD(d);
  };

  useEffect(() => {
    updatePath();
    const handleResize = () => updatePath();
    window.addEventListener('resize', handleResize);

    let ro;
    if (containerRef.current && window.ResizeObserver) {
      ro = new ResizeObserver(() => updatePath());
      ro.observe(containerRef.current);
    }
    const timer = setTimeout(updatePath, 80);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bait-journey-track-wrap" ref={containerRef}>
      {/* Continuous Connected SVG Journey Track (01 -> 02 -> 03 -> 04 -> curved loop -> 05 -> 06 -> 07 -> 08) */}
      {isDesktop && pathD && (
        <svg className="bait-journey-svg-track" aria-hidden="true" style={{ overflow: 'visible' }}>
          <defs>
            {/* Multi-color gradient: BAIT Green, Vibrant Emerald, and BAIT Red (No white) */}
            <linearGradient id="journeyColorTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#006A4E" />
              <stop offset="25%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#F42A41" />
              <stop offset="75%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#006A4E" />
            </linearGradient>

            <linearGradient id="journeyBeamFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#006A4E" />
              <stop offset="30%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#F42A41" />
              <stop offset="70%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#006A4E" />
            </linearGradient>
          </defs>

          {/* Base Colorful Track */}
          <path className="bait-journey-path-base" d={pathD} />
          {/* Animated Flowing Multi-color Beam */}
          <path className="bait-journey-path-beam" d={pathD} />
        </svg>
      )}

      {/* Row 1: Steps 01 - 04 */}
      <div className="bait-journey-grid-row bait-journey-row-top">
        {learningSteps.slice(0, 4).map((step, idx) => (
          <div 
            key={step.num}
            ref={el => (cardRefs.current[idx] = el)}
            className={`bait-journey-card bait-journey-accent-${step.accent}`}
            style={{ animationDelay: step.delay }}
          >
            <div className="bait-journey-card-inner">
              <div className="bait-journey-card-top">
                <div className="bait-journey-number-wrap">
                  <span className="bait-journey-num">{step.num}</span>
                  <span className="bait-journey-phase-tag">{step.phase}</span>
                </div>
                <div className={`bait-journey-icon-wrap bait-icon-${step.accent}`}>
                  <step.icon size={20} />
                </div>
              </div>

              <div className="bait-journey-accent-line"></div>

              <h3 className="bait-journey-step-heading">{step.title}</h3>
              <p className="bait-journey-step-description">{step.desc}</p>

              {idx < 3 && (
                <div className="bait-journey-flow-arrow" title="পরবর্তী ধাপে প্রবাহ">
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Steps 05 - 08 (Directly following Row 1 with smooth curved bridge, middle pill REMOVED) */}
      <div className="bait-journey-grid-row bait-journey-row-bottom">
        {learningSteps.slice(4, 8).map((step, idx) => (
          <div 
            key={step.num}
            ref={el => (cardRefs.current[idx + 4] = el)}
            className={`bait-journey-card bait-journey-accent-${step.accent}`}
            style={{ animationDelay: step.delay }}
          >
            <div className="bait-journey-card-inner">
              <div className="bait-journey-card-top">
                <div className="bait-journey-number-wrap">
                  <span className="bait-journey-num">{step.num}</span>
                  <span className="bait-journey-phase-tag">{step.phase}</span>
                </div>
                <div className={`bait-journey-icon-wrap bait-icon-${step.accent}`}>
                  <step.icon size={20} />
                </div>
              </div>

              <div className="bait-journey-accent-line"></div>

              <h3 className="bait-journey-step-heading">{step.title}</h3>
              <p className="bait-journey-step-description">{step.desc}</p>

              {idx < 3 && (
                <div className="bait-journey-flow-arrow" title="পরবর্তী ধাপে প্রবাহ">
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const whyBaitPoints = [
  {
    num: "01",
    title: "বাস্তবমুখী শিক্ষা",
    desc: "তত্ত্বীয় পড়াশোনার গণ্ডি পেরিয়ে সরাসরি ইন্ডাস্ট্রির প্র্যাকটিক্যাল সমস্যার সমাধান ও হাতে-কলমে কাজের দক্ষতা অর্জন।",
    icon: GraduationCap,
  },
  {
    num: "02",
    title: "অভিজ্ঞ প্রশিক্ষক",
    desc: "সফটওয়্যার ইন্ডাস্ট্রি ও প্রযুক্তি খাতের অভিজ্ঞ প্রফেশনালদের প্রত্যক্ষ দিকনির্দেশনা ও সার্বক্ষণিক মেন্টরশিপ সহায়তা।",
    icon: Users,
  },
  {
    num: "03",
    title: "প্র্যাকটিক্যাল লার্নিং",
    desc: "প্রতিটি বিষয়ের সাথে নিবিড় প্র্যাকটিক্যাল কোডিং সেশন, হ্যান্ডস-অন ল্যাব টাস্ক ও তাৎক্ষণিক ফিডব্যাক নিশ্চিতকরণ।",
    icon: Terminal,
  },
  {
    num: "04",
    title: "প্রজেক্টভিত্তিক শেখা",
    desc: "কোর্স চলাকালীন একাধিক পূর্ণাঙ্গ রিয়েল-লাইফ প্রজেক্ট তৈরি করে আত্মবিশ্বাস অর্জন ও আন্তর্জাতিক মানের পোর্টফোলিও গঠন।",
    icon: Layers,
  },
  {
    num: "05",
    title: "জব প্লেসমেন্ট",
    desc: "সিভি রিভিউ, গিটহাব ও লিংকডইন অপটিমাইজেশন, মক ইন্টারভিউ সেশন ও আন্তর্জাতিক মার্কেটপ্লেসে সফল ক্যারিয়ার রোডম্যাপ।",
    icon: Briefcase,
  },
  {
    num: "06",
    title: "শিক্ষার্থী সাপোর্ট",
    desc: "ক্লাসের বাইরে সার্বক্ষণিক টেকনিক্যাল সাপোর্ট, ওয়ান-অন-ওয়ান ডাউট সলভিং ও সক্রিয় লার্নার কমিউনিটি হেল্প।",
    icon: Headphones,
  },
];

function WhyBaitJourney() {
  const containerRef = useRef(null);
  const activePathRef = useRef(null);
  const nodeRefs = useRef([]);
  const [pathD, setPathD] = useState('');
  const [totalLength, setTotalLength] = useState(0);
  const [dashOffset, setDashOffset] = useState(0);
  const [milestones, setMilestones] = useState([0, 0, 0, 0, 0, 0]);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [traveledDist, setTraveledDist] = useState(0);
  const [headPoint, setHeadPoint] = useState(null);

  const updateGeometry = () => {
    if (!containerRef.current || nodeRefs.current.length < 6) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    if (containerRect.width === 0) return;

    const points = [];
    for (let i = 0; i < 6; i++) {
      const el = nodeRefs.current[i];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      points.push({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    }

    const mobile = window.innerWidth < 768;

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const pA = points[i];
      const pB = points[i + 1];
      const dx = pB.x - pA.x;
      const dy = pB.y - pA.y;

      if (mobile) {
        // Smooth organic vertical wave on mobile
        const cp1x = pA.x + dx * 0.15;
        const cp1y = pA.y + dy * 0.5;
        const cp2x = pB.x - dx * 0.15;
        const cp2y = pB.y - dy * 0.5;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pB.x} ${pB.y}`;
      } else {
        // Flatter, wider horizontal curve ("chepta" / less steep)
        const cp1x = pA.x + dx * 0.42;
        const cp1y = pA.y + dy * 0.22;
        const cp2x = pB.x - dx * 0.42;
        const cp2y = pB.y - dy * 0.22;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pB.x} ${pB.y}`;
      }
    }

    setPathD(d);
  };

  useEffect(() => {
    updateGeometry();
    const handleResize = () => updateGeometry();
    window.addEventListener('resize', handleResize);

    let ro;
    if (containerRef.current && window.ResizeObserver) {
      ro = new ResizeObserver(() => updateGeometry());
      ro.observe(containerRef.current);
    }
    const timer = setTimeout(updateGeometry, 80);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!activePathRef.current || !pathD || !containerRef.current) return;
    const len = activePathRef.current.getTotalLength();
    if (!len || len === 0) return;
    setTotalLength(len);

    // Calculate milestone distances along the path for each of the 6 nodes:
    const ms = [0];
    const containerRect = containerRef.current.getBoundingClientRect();
    for (let i = 1; i < 6; i++) {
      const el = nodeRefs.current[i];
      if (!el) {
        ms.push((i / 5) * len);
        continue;
      }
      const rect = el.getBoundingClientRect();
      const target = {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      };
      let bestDist = (i / 5) * len;
      let minErr = Infinity;
      for (let s = 0; s <= 200; s++) {
        const testDist = (s / 200) * len;
        const pt = activePathRef.current.getPointAtLength(testDist);
        const err = Math.hypot(pt.x - target.x, pt.y - target.y);
        if (err < minErr) {
          minErr = err;
          bestDist = testDist;
        }
      }
      ms.push(bestDist);
    }
    setMilestones(ms);

    let reqId;
    let currentProg = 0;
    let targetProg = 0;
    let isInitialized = false;

    const handleScroll = () => {
      if (!nodeRefs.current[0] || !nodeRefs.current[5]) return;
      const n0 = nodeRefs.current[0].getBoundingClientRect();
      const n5 = nodeRefs.current[5].getBoundingClientRect();
      const windowH = window.innerHeight;

      // The point reaches Node 0 when Node 0 is near 55% of viewport
      // The point reaches Node 5 when Node 5 is near 55% of viewport
      const triggerY = windowH * 0.55;
      const startScroll = n0.top + window.scrollY - triggerY;
      const endScroll = n5.top + window.scrollY - triggerY;
      const scrollRange = Math.max(120, endScroll - startScroll);

      const raw = (window.scrollY - startScroll) / scrollRange;
      targetProg = Math.max(0, Math.min(1, raw));

      if (!isInitialized) {
        currentProg = targetProg;
        isInitialized = true;
      }
    };

    const updateFrame = () => {
      // Responsive smooth lerp for fluid tracking on scroll up and down
      const diff = targetProg - currentProg;
      if (Math.abs(diff) > 0.0004) {
        currentProg += diff * 0.24;
      } else {
        currentProg = targetProg;
      }

      const currentDist = Math.max(0, Math.min(currentProg * len, len));
      setTraveledDist(currentDist);
      setDashOffset(len - currentDist);

      if (activePathRef.current) {
        try {
          const pt = activePathRef.current.getPointAtLength(currentDist);
          setHeadPoint({ x: pt.x, y: pt.y });
        } catch (e) {
          // fallback
        }
      }

      // Determine proximity to each step node
      const stepSpan = len / 5;
      let closestIdx = -1;
      let minDiff = Infinity;
      for (let i = 0; i < 6; i++) {
        const d = Math.abs(currentDist - ms[i]);
        if (d < minDiff) {
          minDiff = d;
          closestIdx = i;
        }
      }

      // Float the box when the point is near the node
      if (minDiff < stepSpan * 0.46) {
        setActiveStepIndex(closestIdx);
      } else {
        setActiveStepIndex(-1);
      }

      reqId = requestAnimationFrame(updateFrame);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    reqId = requestAnimationFrame(updateFrame);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, [pathD]);

  return (
    <div className="why-organic-journey" ref={containerRef}>
      <svg className="why-organic-svg" aria-hidden="true" style={{ overflow: 'visible' }}>
        {pathD && (
          <>
            {/* Inactive subtle green path: #1D5E4E */}
            <path className="why-organic-path-base" d={pathD} />
            {/* Active drawing stroke: #F42A41 */}
            <path
              ref={activePathRef}
              className="why-organic-path-active"
              d={pathD}
              style={{
                strokeDasharray: totalLength ? `${totalLength}` : 'none',
                strokeDashoffset: dashOffset,
              }}
            />
            {/* Glowing Traveling Energy Head */}
            {headPoint && totalLength > 0 && (
              <g
                className="why-organic-head-glow"
                style={{
                  transform: `translate(${headPoint.x}px, ${headPoint.y}px)`,
                }}
              >
                <circle r="18" fill="rgba(244, 42, 65, 0.3)" className="head-pulse-outer" />
                <circle r="8.5" fill="rgba(244, 42, 65, 0.9)" />
                <circle r="4" fill="#FFFFFF" />
              </g>
            )}
          </>
        )}
      </svg>

      <div className="why-organic-steps-list">
        {whyBaitPoints.map((item, idx) => {
          const IconComp = item.icon;
          const isRightStep = idx % 2 === 0;
          const isCurrentActive = activeStepIndex === idx;
          const isVisited = traveledDist >= (milestones[idx] || 0) - 8;

          return (
            <div
              key={item.num}
              className={`why-organic-step-row ${isRightStep ? 'step-align-right' : 'step-align-left'} ${
                isCurrentActive ? 'is-current-active' : ''
              } ${isVisited ? 'is-visited' : ''}`}
            >
              <div className="why-organic-step-box-wrapper">
                {/* For Left steps (02, 04, 06): Square Box on LEFT, Circle on RIGHT */}
                {!isRightStep ? (
                  <>
                    <div className="why-organic-square-card">
                      <div className="why-organic-card-meta">
                        <span className="why-organic-num">{item.num}</span>
                      </div>
                      <h3 className="why-organic-title">{item.title}</h3>
                      <div className="why-organic-accent-line"></div>
                      <p className="why-organic-desc">{item.desc}</p>
                    </div>

                    <div className="why-organic-node-connector"></div>

                    <div
                      ref={el => (nodeRefs.current[idx] = el)}
                      className="why-organic-node-dot"
                      title={`${item.num} - ${item.title}`}
                    >
                      <IconComp size={22} />
                    </div>
                  </>
                ) : (
                  /* For Right steps (01, 03, 05): Circle on LEFT, Square Box on RIGHT */
                  <>
                    <div
                      ref={el => (nodeRefs.current[idx] = el)}
                      className="why-organic-node-dot"
                      title={`${item.num} - ${item.title}`}
                    >
                      <IconComp size={22} />
                    </div>

                    <div className="why-organic-node-connector"></div>

                    <div className="why-organic-square-card">
                      <div className="why-organic-card-meta">
                        <span className="why-organic-num">{item.num}</span>
                      </div>
                      <h3 className="why-organic-title">{item.title}</h3>
                      <div className="why-organic-accent-line"></div>
                      <p className="why-organic-desc">{item.desc}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper to ensure portrait photos fill and fit the card frame perfectly without facial cropping
const getFittedPhoto = (url) => {
  if (!url) return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&q=85';
  if (url.includes('images.unsplash.com')) {
    const base = url.split('?')[0];
    return `${base}?w=800&auto=format&q=85`;
  }
  return url;
};

export default function About() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Load real instructors from API / mock fallback
    peopleAPI.getByCategory('instructor')
      .then(data => {
        if (Array.isArray(data)) {
          setInstructors(data.slice(0, 3));
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className="bait-about-manifesto">
      {/* =========================================================================
          SECTION 01 — HERO
          Wide spacious editorial hero. No small hero card on the right.
          ========================================================================= */}
      <section className="bait-hero-section">
        <div className="container">
          <div className="bait-hero-layout">
            {/* Left Content */}
            <div>
              <span className="bait-hero-label">আমাদের সম্পর্কে</span>
              <h1 className="bait-hero-title">বাংলার আলো আইটি</h1>
              <div className="bait-hero-statement">
                প্রযুক্তিনির্ভর শিক্ষা, বাস্তব দক্ষতা এবং উজ্জ্বল ভবিষ্যতের পথে।
              </div>
              <p className="bait-hero-desc">
                বাংলার আলো আইটি (BAIT) একটি আধুনিক IT Training &amp; Technology Academy, যেখানে প্রযুক্তি শিক্ষাকে বাস্তব দক্ষতার সাথে যুক্ত করার লক্ষ্য নিয়ে কাজ করা হয়।
              </p>
              <div className="bait-hero-ctas">
                <Link to="/course" className="slider-float-btn slider-float-green">
                  <span className="btn-inner-content">
                    <span>আমাদের কোর্সসমূহ</span>
                    <ArrowRight size={18} className="icon-arrow" />
                  </span>
                </Link>
                <Link to="/contact" className="slider-float-btn slider-float-secondary">
                  <span className="btn-inner-content">
                    <span>যোগাযোগ করুন</span>
                    <ChevronRight size={18} className="icon-arrow" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Side: Large BAIT Branded Visual Composition (NOT a card) */}
            <div className="bait-hero-visual-frame">
              <div className="bait-hero-visual-watermark">
                <span>BAIT</span>
                <span className="bait-hero-visual-red-accent" title="Bangladesh Red Accent"></span>
              </div>
              <div className="bait-hero-visual-subline">
                IT Training &amp; Technology Academy
              </div>
              <p className="bait-hero-visual-manifesto-text">
                জ্ঞান, প্রযুক্তি ও বাস্তবমুখী দক্ষতার সমন্বয়ে আগামীর ডিজিটাল প্রজন্মের আত্মনির্ভরশীল পথচলা।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02 — BAIT STORY
          The strongest section of the page. Large editorial statement.
          ========================================================================= */}
      <section className="bait-story-section">
        <div className="container">
          <h2 className="bait-story-grand-heading">
            “শিক্ষা থেকে দক্ষতা, দক্ষতা থেকে সম্ভাবনা।”
          </h2>

          <div className="editorial-brand-divider">
            <div className="brand-divider-green"></div>
            <div className="brand-divider-red"></div>
            <div className="brand-divider-gray"></div>
          </div>

          <div className="bait-story-body-grid">
            <div className="bait-story-sublabel">
              এক নজরে BAIT
            </div>
            <div className="bait-story-text-column">
              <p>
                বাংলার আলো আইটি (BAIT) একটি জাতীয় পর্যায়ের অগ্রগামী কারিগরি প্রশিক্ষণ, সফটওয়্যার ও প্রযুক্তি গবেষণা প্রতিষ্ঠান। চতুর্থ শিল্পবিপ্লবের এই যুগে আধুনিক তথ্যপ্রযুক্তি ও ডিজিটাল রূপান্তরের সুফল যাতে দেশের প্রতিটি প্রান্তের সাধারণ মানুষের কাছে পৌঁছে যায়—এই লক্ষ্য নিয়েই BAIT প্রতিষ্ঠিত হয়েছে।
              </p>
              <p>
                আমরা বিশ্বাস করি, কেবল বইয়ের পাতায় সীমাবদ্ধ তত্ত্বীয় শিক্ষা দিয়ে দ্রুত পরিবর্তনশীল প্রযুক্তির বিশ্বে টিকে থাকা সম্ভব নয়। তাই আমাদের প্রতিটি উদ্যোগ শিক্ষার্থীদের বাস্তব অভিজ্ঞতা, প্রজেক্ট সমাধান এবং লাইভ ল্যাব অনুশীলনের মাধ্যমে একজন আত্মবিশ্বাসী পেশাজীবী হিসেবে গড়ে তুলতে নিবেদিত।
              </p>
              <p>
                দেশের প্রত্যন্ত অঞ্চল থেকে শুরু করে কেন্দ্র পর্যন্ত সকল তরুণকে আন্তর্জাতিক মানের প্রযুক্তি শিক্ষায় সমৃদ্ধ করে বিশ্বমানের দক্ষ মানবসম্পদে রূপান্তর করাই আমাদের মূল আদর্শ।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03 — WHO WE ARE
          Asymmetric layout. Left: Large Visual Block. Right: Content.
          ========================================================================= */}
      <section className="bait-who-section">
        <div className="container">
          <div className="bait-who-asymmetric-grid">
            {/* Left: Visual Block */}
            <div className="bait-who-visual-block">
              <h3>বাস্তবমুখী প্রযুক্তি শিক্ষা ও প্রাতিষ্ঠানিক উৎকর্ষ</h3>
              <p>
                প্রযুক্তির তাত্ত্বিক ধারণাকে বাস্তব কোড ও অ্যাপ্লিকেশনে রূপান্তরের জন্য BAIT একটি নিবিড় ও সহযোগিতাপূর্ণ পরিবেশ নিশ্চিত করে।
              </p>
              <div className="bait-who-features-inline">
                <div className="bait-who-feature-item">
                  <span className="bait-who-feature-bullet"></span>
                  <span>হাতে-কলমে ল্যাব প্রশিক্ষণ</span>
                </div>
                <div className="bait-who-feature-item">
                  <span className="bait-who-feature-bullet"></span>
                  <span>ইন্ডাস্ট্রি-স্ট্যান্ডার্ড প্রজেক্ট সমাধান</span>
                </div>
                <div className="bait-who-feature-item">
                  <span className="bait-who-feature-bullet"></span>
                  <span>সার্বক্ষণিক পেশাদার মেন্টরশিপ</span>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="bait-who-content-text">
              <h2 className="bait-who-content-heading">
                বাংলার আলো আইটি সম্পর্কে
              </h2>
              <p>
                BAIT একটি প্রযুক্তিনির্ভর শিক্ষাদান প্ল্যাটফর্ম, যেখানে ওয়েব ডেভেলপমেন্ট, সফটওয়্যার ইঞ্জিনিয়ারিং, ডেটা সায়েন্স ও ডিজিটাল মিডিয়ার বাস্তব চাহিদাসম্পন্ন দক্ষতা শেখানো হয়।
              </p>
              <p>
                আমরা প্রতিটি শিক্ষার্থীর মৌলিক চিন্তাশক্তি, সমস্যা সমাধানের ক্ষমতা এবং কোডিং দক্ষতা বিকাশে অগ্রাধিকার দিই। এখানে শেখা মানে কেবল একটি কোর্স সম্পন্ন করা নয়, বরং নিজেকে কর্মক্ষেত্রের যোগ্য করে প্রস্তুত করা।
              </p>
              <div className="bait-who-manifesto-quote">
                “শেখা শুধু একটি কোর্স শেষ করার বিষয় নয়; শেখা হলো বাস্তবে প্রয়োগ করার সক্ষমতা তৈরি করা।”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04 — VISION & MISSION
          Full-width deep green section (#003D2E). No cards.
          ========================================================================= */}
      <section className="bait-vm-section">
        <div className="container">
          <div className="bait-vm-layout">
            <div className="bait-vm-divider-center"></div>

            {/* 01 Vision */}
            <div className="bait-vm-entry">
              <span className="bait-vm-number">01</span>
              <h2 className="bait-vm-title">আমাদের Vision</h2>
              <p className="bait-vm-statement">
                প্রযুক্তি শিক্ষাকে সহজলভ্য করে দক্ষ, আত্মনির্ভরশীল ও ভবিষ্যৎ-প্রস্তুত প্রজন্ম তৈরি করা।
              </p>
            </div>

            {/* 02 Mission */}
            <div className="bait-vm-entry" style={{ paddingLeft: '20px', paddingRight: 0 }}>
              <span className="bait-vm-number">02</span>
              <h2 className="bait-vm-title">আমাদের Mission</h2>
              <p className="bait-vm-statement">
                মানসম্মত প্রশিক্ষণ, বাস্তবমুখী শিক্ষা এবং প্রয়োজনীয় career guidance-এর মাধ্যমে শিক্ষার্থীদের industry-ready করে তোলা।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05 — HOW WE TEACH
          8-Step Continuous Learning Journey with Connected SVG Stroke
          Row 1: Steps 01–04 ➔ Curved Bridge ➔ Row 2: Steps 05–08
          ========================================================================= */}
      <section className="bait-journey-section">
        <div className="container">
          <div className="bait-journey-header">
            <div className="bait-journey-badge-pill">
              <span className="bait-journey-pill-dot"></span>
              <span>রোডম্যাপ ও শিক্ষণ দর্শন</span>
            </div>
            <h2 className="bait-journey-title">
              আমাদের শেখার পদ্ধতি
            </h2>
            <div className="bait-journey-subtitle">
              শেখা থেকে দক্ষতা, দক্ষতা থেকে ক্যারিয়ার—একটি ধারাবাহিক যাত্রা।
            </div>
          </div>

          <LearningJourneySection />
        </div>
      </section>

      {/* =========================================================================
          SECTION 06 — WHY BAIT (CONNECTED VISUAL JOURNEY)
          01 → 02 ↘ curved return → 03 → 04 ↘ curved return → 05 → 06
          ========================================================================= */}
      <section className="bait-manifesto-section">
        <div className="container">
          <div className="bait-section-title-wrap">
            <div className="why-bait-header-badge">
              <span className="why-bait-badge-dot"></span>
              <span>আমাদের স্বাতন্ত্র্য ও অঙ্গীকার</span>
            </div>
            <h2 className="bait-section-editorial-title">
              কেন BAIT?
            </h2>
            <p className="why-bait-section-lead">
              শেখার শুরু থেকে পেশাদার ক্যারিয়ার—একটি সুপরিকল্পিত, নিয়মানুবর্তী ও বাস্তবমুখী শিক্ষার যাত্রা।
            </p>
          </div>

          <WhyBaitJourney />
        </div>
      </section>

      {/* =========================================================================
          SECTION 07 — OUR TEAM (PREMIUM REDESIGN)
          ========================================================================= */}
      <section className="bait-team-section">
        <div className="container">
          <div className="bait-section-title-wrap">
            <h2 className="bait-section-editorial-title">
              আমাদের টিম
            </h2>
            <p className="bait-team-section-lead">
              অভিজ্ঞ প্রশিক্ষক ও প্রযুক্তি পেশাজীবীদের সমন্বয়ে BAIT-এর শিক্ষা কার্যক্রম পরিচালিত হয়।
            </p>
          </div>

          <div className="bait-team-grid">
            {(instructors.length > 0 ? instructors : [
              { 
                id: 1, 
                name_bn: 'ইমরান নাজির', 
                slug: 'imran-nazir', 
                designation: 'প্রশিক্ষক (ডিজিটাল মিডিয়া ও এসইও)', 
                photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80' 
              },
              { 
                id: 2, 
                name_bn: 'শফিকুল ইসলাম', 
                slug: 'shafiqul-islam-rangpur', 
                designation: 'প্রশিক্ষক (অ্যাপ্লিকেশন ডেভেলপমেন্ট)', 
                photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80' 
              },
              { 
                id: 3, 
                name_bn: 'তানিয়া সুলতানা', 
                slug: 'tania-sultana', 
                designation: 'প্রশিক্ষক (ইউআই/ইউএক্স ও গ্রাফিক ডিজাইন)', 
                photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80' 
              }
            ]).map(inst => (
              <div key={inst.id} className="bait-team-reference-card">
                {/* Top Photo */}
                <div className="bait-team-card-image-wrap">
                  <Link to={`/instructor/${inst.slug}`} className="bait-team-img-anchor">
                    <img 
                      src={getFittedPhoto(inst.photo_url)} 
                      alt={inst.name_bn}
                      className="bait-team-card-img"
                    />
                  </Link>
                </div>

                {/* Accent Divider Line */}
                <div className="bait-team-card-accent-line"></div>

                {/* Card Body */}
                <div className="bait-team-card-body">
                  <Link to={`/instructor/${inst.slug}`} className="bait-team-card-name-link">
                    <h3 className="bait-team-card-name">{inst.name_bn}</h3>
                  </Link>

                  <div className="bait-team-card-role">
                    {inst.designation || 'আইসিটি প্রশিক্ষক'}
                  </div>

                  {/* Single Button: বিস্তারিত প্রোফাইল */}
                  <div className="bait-team-card-footer">
                    <Link to={`/instructor/${inst.slug}`} className="slider-float-btn slider-float-primary" style={{ width: '100%' }}>
                      <span className="btn-inner-content" style={{ padding: '10px 18px', fontSize: '0.94rem' }}>
                        <span>বিস্তারিত প্রোফাইল</span>
                        <ArrowRight size={15} className="icon-arrow" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bait-team-cta-wrap">
            <Link to="/team" className="slider-float-btn slider-float-green">
              <span className="btn-inner-content" style={{ padding: '13px 32px' }}>
                <span>সকল টিম মেম্বার দেখুন</span>
                <ArrowRight size={18} className="icon-arrow" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 08 — FINAL STATEMENT / CTA
          Deep green background. Strong statement. Compact.
          ========================================================================= */}
      <section className="bait-cta-statement-section">
        <div className="container">
          <h2 className="bait-cta-statement-title">
            “আপনার শেখার যাত্রা শুরু হোক আজ।”
          </h2>
          <p className="bait-cta-statement-subtitle">
            প্রযুক্তিনির্ভর দক্ষতা অর্জন করে আপনার আগামীর ক্যারিয়ারকে এক ধাপ এগিয়ে নিন।
          </p>

          <div className="bait-cta-buttons-wrap">
            <Link to="/course" className="slider-float-btn slider-float-secondary">
              <span className="btn-inner-content" style={{ padding: '13px 32px' }}>
                <span>কোর্স দেখুন</span>
                <ArrowRight size={18} className="icon-arrow" />
              </span>
            </Link>
            <Link to="/contact" className="slider-float-btn slider-float-green">
              <span className="btn-inner-content" style={{ padding: '13px 30px' }}>
                <span>যোগাযোগ করুন</span>
                <ChevronRight size={18} className="icon-arrow" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
