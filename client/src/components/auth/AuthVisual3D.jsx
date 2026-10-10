import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Check, 
  Code2, 
  Laptop, 
  Globe, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  Briefcase, 
  Headphones,
  Award,
  Video,
  Sparkles
} from 'lucide-react';

import studentLoginImg from '../../assets/auth/student-login-3d.jpg';
import studentSignupImg from '../../assets/auth/student-signup-3d.jpg';
import clientLoginImg from '../../assets/auth/client-login-3d.jpg';
import clientSignupImg from '../../assets/auth/client-signup-3d.jpg';

/**
 * Premium 3D Animated Visual Stage for BAIT Authentication
 * Features:
 * - Animated person (breathing, posture shift, typing hand motion, laptop screen light reflection)
 * - True CSS 3D rotating neon code cube with 6 faces
 * - Floating glassmorphic holographic checklist & service cards
 * - 3D floating typography with glowing red neon swoosh
 * - Mouse parallax 3D perspective depth
 */
export default function AuthVisual3D({ userType = 'student', isSignup = false }) {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Parallax tilt angles (Max +/- 10 degrees)
    setRotate({
      x: -(y - 0.5) * 14,
      y: (x - 0.5) * 14
    });
    setMousePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  };

  const isStudent = userType === 'student';

  // Determine current image & scenario
  let currentBg = studentLoginImg;
  let scenario = 'student-login';
  if (isStudent && isSignup) {
    currentBg = studentSignupImg;
    scenario = 'student-signup';
  } else if (!isStudent && !isSignup) {
    currentBg = clientLoginImg;
    scenario = 'client-login';
  } else if (!isStudent && isSignup) {
    currentBg = clientSignupImg;
    scenario = 'client-signup';
  }

  return (
    <div 
      className="auth-3d-scene-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div 
        className="auth-3d-spotlight-overlay"
        style={{
          background: `radial-gradient(circle 320px at ${mousePos.x}% ${mousePos.y}%, rgba(52, 211, 153, 0.18), transparent 75%)`
        }}
      />

      {/* 3D Transform Stage */}
      <div 
        className="auth-3d-interactive-stage"
        style={{
          transform: prefersReducedMotion 
            ? 'none' 
            : `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
        }}
      >
        {/* Cinematic 3D Backdrop Image */}
        <div className="auth-3d-image-frame">
          <img 
            src={currentBg} 
            alt="BAIT 3D Visual" 
            className="auth-3d-photo-backdrop" 
          />
          <div className="auth-3d-photo-vignette" />
        </div>

        {/* ==========================================================
            SCENARIO 1: STUDENT LOGIN — ANIMATED PERSON & 3D ELEMENTS
            ========================================================== */}
        {scenario === 'student-login' && (
          <div className="auth-3d-overlay-layer student-login-layer">
            {/* 1. Animated Person Life Layer (Breathing, Posture, Typing) */}
            <div className="person-animated-zone">
              {/* Dynamic laptop screen glow reflecting onto face/hoodie */}
              <div className="person-screen-reflection-glow" />
              
              {/* Keyboard typing finger animation & glow pulses */}
              <div className="person-typing-keyboard-glow" />

              {/* Floating code particles emitting from laptop */}
              <div className="code-sparkle-stream">
                <span className="code-sparkle s1">&lt;/&gt;</span>
                <span className="code-sparkle s2">&#123;&#125;</span>
                <span className="code-sparkle s3">npm run</span>
                <span className="code-sparkle s4">const bait</span>
                <span className="code-sparkle s5">&#9733;</span>
              </div>
            </div>

            {/* 2. Real CSS 3D Rotating Holographic Neon Cube (< / >) */}
            <div className="cube-3d-wrapper">
              <div className="cube-3d-box">
                <div className="cube-face face-front">
                  <span className="cube-code-text">&lt;/&gt;</span>
                </div>
                <div className="cube-face face-back">
                  <span className="cube-code-text">&lt;/&gt;</span>
                </div>
                <div className="cube-face face-right">
                  <span className="cube-code-text">&#123;&#125;</span>
                </div>
                <div className="cube-face face-left">
                  <span className="cube-code-text">&#123;&#125;</span>
                </div>
                <div className="cube-face face-top">
                  <span className="cube-code-dot" />
                </div>
                <div className="cube-face face-bottom">
                  <span className="cube-code-dot" />
                </div>
              </div>
            </div>

            {/* 3. Floating 3D "Learn Build Grow" Interactive Button */}
            <div className="learn-build-grow-pill-3d">
              <div className="pill-play-circle">
                <Play size={12} fill="#ffffff" color="#ffffff" />
              </div>
              <div className="pill-text-col">
                <span className="pill-title">Learn</span>
                <span className="pill-mid">Build</span>
                <span className="pill-sub">Grow</span>
              </div>
            </div>

            {/* 4. Floating 3D Holographic Checklist Card */}
            <div className="holographic-card-3d student-checklist-card">
              <div className="holo-card-glow-bar" />
              <ul className="holo-checklist-items">
                <li className="holo-item">
                  <div className="holo-check-icon">
                    <Check size={14} />
                  </div>
                  <span>দক্ষ প্রশিক্ষক</span>
                </li>
                <li className="holo-item">
                  <div className="holo-check-icon">
                    <Check size={14} />
                  </div>
                  <span>প্র্যাকটিক্যাল প্রজেক্ট</span>
                </li>
                <li className="holo-item">
                  <div className="holo-check-icon">
                    <Check size={14} />
                  </div>
                  <span>সার্টিফিকেট</span>
                </li>
                <li className="holo-item">
                  <div className="holo-check-icon">
                    <Check size={14} />
                  </div>
                  <span>ক্যারিয়ার গাইডলাইন</span>
                </li>
              </ul>
            </div>

            {/* 5. Floating 3D Bengali Typography with Red Neon Swoosh */}
            <div className="typography-3d-block title-student-login">
              <h3 className="holo-headline">দক্ষতার নতুন ধারা</h3>
              <div className="holo-red-swoosh-line" />
            </div>
          </div>
        )}

        {/* ==========================================================
            SCENARIO 2: STUDENT SIGNUP — ACADEMY WORKSTATION 3D
            ========================================================== */}
        {scenario === 'student-signup' && (
          <div className="auth-3d-overlay-layer student-signup-layer">
            {/* Animated Warm Desk Lamp Light Cone */}
            <div className="desk-lamp-ambient-glow" />

            {/* Animated Person Life Layer (Screen reflection, typing light, floating code) */}
            <div className="person-animated-zone student-signup-person-zone">
              <div className="person-screen-reflection-glow" />
              <div className="person-typing-keyboard-glow" />
              <div className="code-sparkle-stream student-signup-code-stream">
                <span className="code-sparkle s1">&lt;/&gt;</span>
                <span className="code-sparkle s2">&#123;&#125;</span>
                <span className="code-sparkle s3">git commit</span>
                <span className="code-sparkle s4">React.js</span>
              </div>
            </div>

            {/* Floating 3D Holographic Checklist Card */}
            <div className="holographic-card-3d student-signup-checklist">
              <div className="holo-card-glow-bar" />
              <ul className="holo-checklist-items">
                <li className="holo-item">
                  <div className="holo-check-icon">
                    <Check size={14} />
                  </div>
                  <span>লাইভ ক্লাস</span>
                </li>
                <li className="holo-item">
                  <div className="holo-check-icon">
                    <Check size={14} />
                  </div>
                  <span>প্র্যাকটিক্যাল প্রজেক্ট</span>
                </li>
                <li className="holo-item">
                  <div className="holo-check-icon">
                    <Check size={14} />
                  </div>
                  <span>সার্টিফিকেট</span>
                </li>
                <li className="holo-item">
                  <div className="holo-check-icon">
                    <Check size={14} />
                  </div>
                  <span>ক্যারিয়ার সাপোর্ট</span>
                </li>
              </ul>
            </div>

            {/* Floating 3D Typography */}
            <div className="typography-3d-block title-student-signup">
              <h3 className="holo-headline">বাস্তব দক্ষতায় গড়ুন<br />নিজের ভবিষ্যৎ</h3>
              <div className="holo-red-swoosh-line" />
            </div>

            {/* Floating Live Badge */}
            <div className="holo-floating-badge live-course-badge">
              <span className="live-dot-pulse" />
              <span>লাইভ ব্যাচ অ্যাডমিশন চলমান</span>
            </div>
          </div>
        )}

        {/* ==========================================================
            SCENARIO 3: CLIENT LOGIN — EXECUTIVE BOARDROOM 3D
            ========================================================== */}
        {scenario === 'client-login' && (
          <div className="auth-3d-overlay-layer client-login-layer">
            {/* Animated Dashboard Live Data Glow */}
            <div className="dashboard-live-data-glow">
              <div className="data-bar b1" />
              <div className="data-bar b2" />
              <div className="data-bar b3" />
              <div className="data-bar b4" />
            </div>

            {/* Floating 3D Holographic Service Cards */}
            <div className="holo-services-stack-3d">
              <div className="holo-service-pill p1">
                <Laptop size={16} className="srv-icon" />
                <span>ওয়েবসাইট ডেভেলপমেন্ট</span>
              </div>
              <div className="holo-service-pill p2">
                <Smartphone size={16} className="srv-icon" />
                <span>মোবাইল অ্যাপ ডেভেলপমেন্ট</span>
              </div>
              <div className="holo-service-pill p3">
                <TrendingUp size={16} className="srv-icon" />
                <span>ডিজিটাল মার্কেটিং</span>
              </div>
              <div className="holo-service-pill p4">
                <Briefcase size={16} className="srv-icon" />
                <span>আইটি পরামর্শ</span>
              </div>
            </div>

            {/* Floating 3D Typography */}
            <div className="typography-3d-block title-client-login">
              <h3 className="holo-headline">আপনার আইডিয়া থেকে<br />বাস্তব সমাধানে</h3>
              <div className="holo-red-swoosh-line" />
            </div>

            {/* Active Enterprise Uptime Chip */}
            <div className="holo-floating-badge uptime-chip">
              <ShieldCheck size={14} className="text-emerald" />
              <span>৯৯.৯% এন্টারপ্রাইজ আপটাইম</span>
            </div>
          </div>
        )}

        {/* ==========================================================
            SCENARIO 4: CLIENT SIGNUP — MODERN AGENCY STUDIO 3D
            ========================================================== */}
        {scenario === 'client-signup' && (
          <div className="auth-3d-overlay-layer client-signup-layer">
            {/* Animated Person Life Layer (Screen reflection, typing light) */}
            <div className="person-animated-zone client-signup-person-zone">
              <div className="person-screen-reflection-glow" />
              <div className="person-typing-keyboard-glow" />
            </div>

            {/* Floating 3D Holographic Solutions Stack */}
            <div className="holo-services-stack-3d client-signup-services">
              <div className="holo-service-pill p1">
                <Globe size={16} className="srv-icon" />
                <span>ওয়েবসাইট সমাধান</span>
              </div>
              <div className="holo-service-pill p2">
                <Smartphone size={16} className="srv-icon" />
                <span>মোবাইল অ্যাপ সমাধান</span>
              </div>
              <div className="holo-service-pill p3">
                <TrendingUp size={16} className="srv-icon" />
                <span>ডিজিটাল মার্কেটিং</span>
              </div>
              <div className="holo-service-pill p4">
                <Briefcase size={16} className="srv-icon" />
                <span>আইটি কনসাল্টিং</span>
              </div>
            </div>

            {/* Floating 3D Typography */}
            <div className="typography-3d-block title-client-signup">
              <h3 className="holo-headline">প্রযুক্তি সমাধান আপনার ব্যবসার অগ্রগতির জন্য</h3>
              <div className="holo-red-swoosh-line" />
            </div>

            {/* Partner in Digital Growth Badge */}
            <div className="holo-floating-badge partner-badge">
              <Sparkles size={14} className="text-emerald" />
              <span>Your Partner in Digital Growth</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating 3D Depth Indicator Bottom Tag */}
      <div className="auth-3d-bottom-tag">
        <span className="depth-dot" />
        <span>BAIT 3D Interactive Ecosystem</span>
      </div>
    </div>
  );
}
