/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail,
  Users,
  Compass,
  LockOpen,
  ChevronLeft,
  ChevronRight,
  X,
  Plus
} from 'lucide-react';
import React, { useState, useEffect, useRef, ReactNode } from 'react';

const FUNDRAISING_URL = "https://fundraising.fracturedatlas.org/the-luminaria-imagineerium/general_support";

// --- Custom Animation Wrapper ---

const FadeIn = ({ children, delay = 0, direction = 'up', distance = 20, duration = 0.8, className = "" }: { 
  children: ReactNode; 
  delay?: number; 
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  key?: React.Key;
  className?: string;
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Components ---

const TopBanner = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      id="top-banner"
      className="w-full py-[8px] sm:py-[10px] px-3 sm:px-4 text-center sticky top-0 z-[1100] border-b border-[#E7DFD0] transition-shadow duration-200"
      style={{
        backgroundColor: '#FBF8F1',
        color: '#2A1830',
        boxShadow: isScrolled ? '0 1px 6px rgba(42, 24, 48, 0.08)' : 'none'
      }}
    >
      <div 
        className="max-w-7xl mx-auto flex items-center justify-center text-center flex-wrap leading-[1.35] sm:leading-normal"
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontStyle: 'normal',
          color: '#2A1830'
        }}
      >
        <span className="text-[13px] sm:text-[14px]">
          <span style={{ fontWeight: 600, color: '#2A1830' }}>
            Dec 7–11 · Help us unlock $1,000 →{' '}
          </span>
          <a 
            href={FUNDRAISING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 decoration-1 hover:decoration-2 transition-colors inline-block"
            style={{ 
              fontWeight: 700,
              color: '#C22E5C',
              fontStyle: 'normal'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#A02047';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#C22E5C';
            }}
          >
            Donate to bring the gallery to life
          </a>
        </span>
      </div>
    </div>
  );
};


const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'vision', 'donate', 'contact'];
      const banner = document.getElementById('top-banner');
      const bannerHeight = banner ? banner.getBoundingClientRect().height : 42;
      const scrollPosition = window.scrollY + bannerHeight + 40;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Vision', id: 'vision' },
    { name: 'Donate', id: 'donate' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const banner = document.getElementById('top-banner');
      const offset = banner ? banner.getBoundingClientRect().height : 42;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = Math.max(0, elementPosition + window.pageYOffset - offset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Add global scroll handler for internal links
    const handleInternalLinks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = link.getAttribute('href')?.substring(1);
        if (id) scrollToSection(id);
      }
    };

    document.addEventListener('click', handleInternalLinks);
    return () => document.removeEventListener('click', handleInternalLinks);
  }, []);

  return (
    <nav 
      className="relative z-[1000] py-1.5 md:py-2 border-b border-[#4A3552]/40 bg-[#2A1830]"
      style={{ backgroundColor: '#2A1830' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="flex items-center cursor-pointer group"
        >
          <div className="flex flex-col">
            <span 
              className="text-lg md:text-xl tracking-tight leading-none"
              style={{
                fontFamily: '"Newsreader", Georgia, serif',
                fontWeight: 600,
                color: '#FBF8F1'
              }}
            >
              Luminaria
            </span>
            <span 
              className="text-[10px] uppercase transition-colors duration-300"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: '#FBF8F1'
              }}
            >
              Imagineerium
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              onMouseEnter={() => setHoveredNav(link.id)}
              onMouseLeave={() => setHoveredNav(null)}
              className="relative transition-all duration-300 py-1"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: activeSection === link.id || hoveredNav === link.id ? '#FBF8F1' : 'rgba(251, 248, 241, 0.8)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {link.name}
              {activeSection === link.id ? (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: '#F4A62A' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : hoveredNav === link.id ? (
                <div 
                  className="absolute -bottom-1 left-0 right-0 h-[2px]" 
                  style={{ backgroundColor: '#FF5C8A' }} 
                />
              ) : null}
            </button>
          ))}
        </div>

        {/* Mobile Nav Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden transition-colors relative z-[110]"
          style={{ color: '#FBF8F1' }}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
            <motion.span 
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-current rounded-full" 
            />
          </div>
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Click-away backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 z-[90] md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10, transformOrigin: 'top right' }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 w-64 md:hidden z-[1001] mt-2 px-4"
              >
                <div 
                  className="border border-[#4A3552] rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-1"
                  style={{ backgroundColor: '#2A1830' }}
                >
                  {navLinks.map((link, idx) => (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => scrollToSection(link.id)}
                      className={`w-full px-5 py-4 text-left rounded-xl flex items-center justify-between hover:bg-white/5 transition-all duration-300 ${
                        activeSection === link.id ? 'text-[#FBF8F1]' : 'text-[#FBF8F1]/80 hover:text-[#FBF8F1]'
                      }`}
                      style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {link.name}
                      {activeSection === link.id && (
                        <div 
                          className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(244,166,42,1)]" 
                          style={{ backgroundColor: '#F4A62A' }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};


// --- Reusable River Pebble Button Component ---

interface RiverPebbleButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'main' | 'secondary';
  bgTheme?: 'dark' | 'light';
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidthOnMobile?: boolean;
}

const RiverPebbleButton = ({
  href,
  onClick,
  variant = 'main',
  bgTheme = 'dark',
  children,
  className = '',
  target,
  rel,
  type = 'button',
  fullWidthOnMobile = false
}: RiverPebbleButtonProps) => {
  const isMain = variant === 'main';
  const isDark = bgTheme === 'dark';

  // Exact styles per specification and attachment:
  // On DARK backgrounds:
  //   Main: fill #FF5C8A, text #2A1830. (hover #FF759E)
  //   Secondary: fill none, stroke #FBF8F1 1.5px, text #FBF8F1. (hover stroke white)
  // On LIGHT backgrounds:
  //   Main: fill #C22E5C, text #FFFFFF. (hover #D83D6D)
  //   Secondary: fill none, stroke #2A1830 1.5px, text #2A1830. (hover stroke black)
  const pathFill = isMain ? (isDark ? '#FF5C8A' : '#C22E5C') : 'none';
  const pathStroke = isMain ? 'none' : (isDark ? '#FBF8F1' : '#2A1830');
  const textColor = isMain ? (isDark ? '#2A1830' : '#FFFFFF') : (isDark ? '#FBF8F1' : '#2A1830');
  const hoverFillClass = isMain 
    ? (isDark ? 'group-hover:fill-[#FF759E]' : 'group-hover:fill-[#D83D6D]')
    : '';
  const hoverStrokeClass = !isMain
    ? (isDark ? 'group-hover:stroke-white' : 'group-hover:stroke-[#000000]')
    : '';

  const commonStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '56px',
    padding: '0 36px',
    border: 'none',
    background: 'transparent',
    textDecoration: 'none',
    cursor: 'pointer'
  };

  const innerContent = (
    <>
      {/* SVG Background Path stretched to fill the button */}
      <svg
        viewBox="0 0 200 58"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <path
          d="M30 6 C80 2 130 3 172 7 C194 10 199 30 193 42 C187 53 168 54 140 53 C100 52 60 55 28 52 C8 50 2 38 4 27 C6 14 14 7 30 6 Z"
          fill={pathFill}
          stroke={pathStroke}
          strokeWidth={isMain ? undefined : 1.5}
          vectorEffect={isMain ? undefined : 'non-scaling-stroke'}
          className={`transition-colors duration-200 ${hoverFillClass} ${hoverStrokeClass}`}
        />
      </svg>
      {/* Text on one line */}
      <span
        style={{
          position: 'relative',
          zIndex: 10,
          whiteSpace: 'nowrap',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          fontStyle: 'normal',
          color: textColor
        }}
      >
        {children}
      </span>
    </>
  );

  const buttonClasses = `group relative inline-flex items-center justify-center text-center min-w-[220px] sm:min-w-0 transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0 focus:outline-none focus-visible:outline focus-visible:outline-2 ${isDark ? 'focus-visible:outline-[#F4A62A]' : 'focus-visible:outline-[#2A1830]'} focus-visible:outline-offset-2 ${fullWidthOnMobile ? 'w-full sm:w-auto' : ''} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        style={commonStyle}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      style={commonStyle}
    >
      {innerContent}
    </button>
  );
};


const Hero = () => {
  const heroContent = {
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop"
  };

  return (
    <section id="hero" className="relative min-h-[500px] md:min-h-[580px] overflow-hidden flex items-center bg-[#2A1830]">
      {/* Colorful Ink Background with single 60% #2A1830 overlay */}
      <div className="absolute inset-0 z-0 bg-[#2A1830] overflow-hidden pointer-events-none">
        <img 
          src={heroContent.src} 
          alt="Luminaria Vision" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Single solid #2A1830 overlay at 70% opacity */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: '#2A1830', opacity: 0.7 }} 
        />
        {/* Mobile-only soft radial gradient behind hero text block */}
        <div 
          className="absolute inset-0 sm:hidden pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 88% 62% at 50% 38%, rgba(42, 24, 48, 0.55) 0%, rgba(42, 24, 48, 0.25) 48%, rgba(42, 24, 48, 0) 82%)'
          }}
        />
      </div>

      {/* Main UI Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-6 pb-12 md:pt-10 md:pb-16 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center md:items-start text-center md:text-left w-full max-w-[700px]"
        >
          {/* Headline */}
          <h1 
            className="text-[clamp(30px,8.6vw,34px)] sm:text-[34px] md:text-[52px] mb-[18px] sm:mb-6 not-italic font-semibold"
            style={{
              fontFamily: '"Newsreader", Georgia, serif',
              fontWeight: 600,
              fontStyle: 'normal',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: '#FBF8F1'
            }}
          >
            <span className="whitespace-nowrap">Everyone&nbsp;has&nbsp;a&nbsp;dream</span>
            <br />
            <span className="whitespace-nowrap">
              for{' '}
              <span 
                style={{ 
                  color: '#FF5C8A', 
                  fontStyle: 'normal',
                  whiteSpace: 'nowrap',
                  display: 'inline-block'
                }}
              >
                a better world.
              </span>
            </span>
          </h1>
          
          {/* 3. Supporting text */}
          <div className="mb-[28px] sm:mb-8 md:mb-10 w-full max-w-full sm:max-w-[600px]">
            <p
              className="text-[16px] sm:text-[18px] leading-[1.5] sm:leading-[1.6] text-[#FBF8F1]/85 sm:text-[#FBF8F1] not-italic font-normal"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 400,
                fontStyle: 'normal'
              }}
            >
              We're building the online gallery where those dreams can live. Share yours and discover what people around the world&nbsp;imagine.
            </p>
            <p
              className="mt-4 text-[19px] sm:text-[22px] leading-[1.35] not-italic font-medium"
              style={{
                fontFamily: '"Newsreader", Georgia, serif',
                fontWeight: 500,
                fontStyle: 'normal',
                color: '#FBF8F1'
              }}
            >
              A place where inspiration and connection can <span className="whitespace-nowrap">spark&nbsp;change.</span>
            </p>
          </div>

          {/* 4. Main CTA button */}
          <div className="w-fit mx-auto md:mx-0">
            <RiverPebbleButton 
              href={FUNDRAISING_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="main"
              bgTheme="dark"
            >
              Help build the gallery
            </RiverPebbleButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  return (
    <section id="problem" className="relative overflow-hidden bg-[#FBF8F1]" style={{ backgroundColor: '#FBF8F1' }}>
      {/* Warm Cream Artist Paper Texture Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundColor: '#FBF8F1' }}>
        <img 
          src="https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=2000&auto=format&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{
            opacity: 0.4,
            mixBlendMode: 'multiply'
          }}
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10 px-6 py-12 md:py-20">
        <FadeIn direction="up">
          <h2 
            className="text-[32px] md:text-[44px] font-medium leading-[1.15] mb-8"
            style={{
              fontFamily: '"Newsreader", Georgia, serif',
              fontWeight: 500,
              fontStyle: 'normal',
              color: '#2A1830'
            }}
          >
            You care about this world.
          </h2>

          <div 
            className="space-y-[20px] max-w-[640px] text-[18px] font-normal leading-[1.65]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              color: '#262624'
            }}
          >
            <p>
              You've watched. You've hoped. Maybe you've donated or spoken out. And still, the headlines keep coming. It can be hard to know what to do with all that care.
            </p>
            <p>
              Many of the things we rely on today began with someone imagining a better way. Imagining what could be is often where change begins.
            </p>
            <p>
              That's why we're building the Imagineerium—a home for visions of a better world. A place to share what you hope for and see what others dream of, with the hope that these dreams can inspire action and help bring about real change.
            </p>
            <p>
              You don't need a big idea or a finished plan. A thought, a wish, or a picture is enough to begin.
            </p>
          </div>

          <p 
            className="text-[21px] md:text-[24px] font-medium leading-[1.3] mt-[32px]"
            style={{
              fontFamily: '"Newsreader", Georgia, serif',
              fontWeight: 500,
              fontStyle: 'normal',
              color: '#2A1830'
            }}
          >
            One spark on its own is small. Together, they light the way.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};


const CollectiveVisionSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const sections = [
    {
      id: "who-we-are",
      title: "Who We Are",
      content: (
        <div className="space-y-16">
          {[
            {
              label: "The Ecosystem",
              title: "Our Ecosystem: The Luminaria",
              content: "The Imagineerium is the creative heart of The Luminaria—a broader changemaker ecosystem dedicated to a single, uncompromising vision: A Thriving World For All with Exploitation of None. We believe that a future where humanity lives in sustainable and just balance with the planet is not just a dream, but a necessity. The Luminaria serves this vision by building the social and creative \"scaffolding\" that makes these futures thinkable, reachable, and real.",
              image: "/images/hub.png",
              alt: "The Luminaria Ecosystem"
            },
            {
              label: "The Foundation",
              title: "Our Foundation: Arts & Innovation",
              content: "We operate as a nonprofit arts and innovation project. To ensure our mission is supported by the highest standards of transparency and accountability, the Luminaria Imagineerium is a fiscally sponsored project of Fractured Atlas, a registered 501(c)(3) nonprofit organization. This allows us to bridge the gap between radical imagination and professional excellence.",
              image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60",
              alt: "Diverse creative group working on art"
            },
            {
              label: "The Spark",
              title: "The Spark: Meet the Founder",
              content: (
                <div className="space-y-4">
                  <p>The Luminaria Imagineerium was founded by Amber Jade—an artist, musician, applied human behavior design specialist, and social innovator.</p>
                  <p>Amber’s Jade's work is rooted in a simple but powerful truth found in neuroscience, psychology and history: the world doesn't change until people can imagine it differently.</p>
                  <p>By combining her background in behavior science with her passion for the arts, she created the Imagineerium to be a \"sanctuary for the imagination\"—a place where we move from being victims of the current world to being the architects of the next one.</p>
                </div>
              ),
              image: "/images/who_we_are_main.jpg",
              alt: "Amber Jade, Founder of Luminaria",
              reverse: true
            },
            {
              label: "The Collective",
              title: "The Luminaria Collective: Our Team",
              content: (
                <div className="space-y-6">
                  <p>Great visions are never built in isolation. The Imagineerium is a living project currently powered by the energy and expertise of:</p>
                  <ul className="space-y-4 border-l-2 pl-4" style={{ borderColor: '#F4A62A' }}>
                    <li><strong className="block" style={{ color: '#FBF8F1' }}>The Luminaria Collective</strong> Core team members who provide strategic and creative direction.</li>
                    <li><strong className="block" style={{ color: '#FBF8F1' }}>Our Volunteers</strong> A global community of "Imagineers"—tinkerers, thinkers, and doers—who contribute their skills to help the gallery grow.</li>
                    <li><strong className="block" style={{ color: '#FBF8F1' }}>You</strong> Because this is a collaborative space, every visitor who shares a vision or supports the mission becomes a foundational part of our origin story.</li>
                  </ul>
                  <div 
                    className="pt-4 border-t border-[#FBF8F1]/15"
                    style={{
                      fontFamily: '"Newsreader", Georgia, serif',
                      fontSize: '18px',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      color: '#FBF8F1'
                    }}
                  >
                    "Before anything changes in the world, it is imagined. And imagination is not private—it is built together. That’s what we’re building here. And you’re part of how it begins."
                  </div>
                </div>
              ),
              image: "/images/vision_action.png",
              alt: "The Luminaria Collective"
            }
          ].map((subsection, idx) => (
            <div key={idx} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className={`lg:col-span-5 relative ${subsection.reverse ? 'lg:order-2' : ''}`}>
                <div className="relative group/img">
                  <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-xl border border-white/10 bg-slate-900 transition-transform duration-500 group-hover/img:-translate-y-2">
                     <img 
                       src={subsection.image} 
                       alt={subsection.alt} 
                       className="w-full h-full object-cover transition-transform duration-2000 group-hover/img:scale-105"
                       referrerPolicy="no-referrer"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover/img:opacity-20 transition-opacity duration-1000" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 rounded-tl-[20px]" style={{ borderColor: '#F4A62A' }} />
                </div>
              </div>

              <div className={`lg:col-span-7 space-y-4 ${subsection.reverse ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-[2px]" style={{ backgroundColor: '#F4A62A' }} />
                  <span 
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#FF5C8A'
                    }}
                  >
                    {subsection.label}
                  </span>
                </div>
                <h3 
                  className="text-[22px] font-medium"
                  style={{
                    fontFamily: '"Newsreader", Georgia, serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    color: '#FBF8F1'
                  }}
                >
                  {subsection.title}
                </h3>
                <div 
                  className="leading-relaxed"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: '16px',
                    color: 'rgba(251, 248, 241, 0.85)'
                  }}
                >
                  {subsection.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: "mission-vision",
      title: "Mission & Vision",
      content: (
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1 h-auto border-l-2 rounded-full" style={{ borderColor: '#F4A62A' }} />
              <p 
                className="text-[16px] font-medium"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  color: 'rgba(251, 248, 241, 0.85)'
                }}
              >
                Our mission is to help bring a more sustainable, just, and thriving world to life — through art, creativity, and collective imagination.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-1 h-auto border-l-2 rounded-full" style={{ borderColor: '#F4A62A' }} />
              <p 
                className="text-[16px] font-medium"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  color: 'rgba(251, 248, 241, 0.85)'
                }}
              >
                Our vision is A Thriving World For All, With Exploitation of None: Living in sustainable and just balance with people and planet. A world where people and the planet thrive together — not in opposition, but in collaboration, care, and shared responsibility.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#FBF8F1]/15">
            <p 
              className="text-[16px] mb-4"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: 'rgba(251, 248, 241, 0.85)'
              }}
            >
              To us, thriving means living well in balance with each other and with the Earth.
            </p>
            <div className="space-y-2 border-l-2 ml-1 pl-5" style={{ borderColor: '#F4A62A' }}>
              <p 
                style={{
                  fontFamily: '"Newsreader", Georgia, serif',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  color: '#FBF8F1'
                }}
              >
                Not as sacrifice.
              </p>
              <p 
                style={{
                  fontFamily: '"Newsreader", Georgia, serif',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  color: '#FBF8F1'
                }}
              >
                Not as something distant or out of reach.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p 
              className="text-[16px]"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: 'rgba(251, 248, 241, 0.85)'
              }}
            >
              But as a shift in how we live and relate to the world around us —
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { from: "extraction", to: "care" },
                { from: "consumption", to: "creation" },
                { from: "isolation", to: "connection" }
              ].map((shift, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 group transition-colors">
                  <span 
                    className="block text-[12px] uppercase tracking-widest line-through mb-1"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      color: 'rgba(251, 248, 241, 0.5)'
                    }}
                  >
                    {shift.from}
                  </span>
                  <span 
                    className="block text-[22px] font-medium"
                    style={{
                      fontFamily: '"Newsreader", Georgia, serif',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      color: '#FF5C8A'
                    }}
                  >
                    {shift.to}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="pt-6 mt-8 rounded-[32px] p-8 border border-white/10 relative overflow-hidden group bg-white/5"
          >
            <p 
              className="mb-4 block"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#F4A62A'
              }}
            >
              This is what we’re building:
            </p>
            <p 
              className="text-[22px] font-medium mb-6 tracking-tight"
              style={{
                fontFamily: '"Newsreader", Georgia, serif',
                fontWeight: 500,
                fontStyle: 'normal',
                color: '#FBF8F1'
              }}
            >
              A global gallery of visions —
            </p>
            <div 
              className="space-y-3"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '16px',
                color: 'rgba(251, 248, 241, 0.85)'
              }}
            >
              {[
                "a space where people can share their ideas for a better world,",
                "find others who believe in them,",
                "and begin bringing those visions to life together."
              ].map((text, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: '#F4A62A' }} />
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="donate" className="relative overflow-hidden bg-[#2A1830] pt-8 md:pt-12 pb-24 px-6" style={{ backgroundColor: '#2A1830' }}>
      {/* Torn-paper edge at top */}
      <div className="absolute top-0 left-0 right-0 h-[20px] pointer-events-none z-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 24"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ fill: '#FBF8F1' }}
          aria-hidden="true"
        >
          <path d="M0,0 L1440,0 L1440,10 L1425,18 L1410,12 L1395,19 L1380,8 L1362,17 L1345,11 L1330,21 L1312,13 L1295,19 L1278,9 L1260,17 L1242,12 L1225,20 L1210,11 L1192,18 L1175,8 L1158,16 L1140,10 L1125,22 L1108,13 L1090,19 L1072,9 L1055,17 L1038,11 L1020,20 L1005,12 L988,18 L970,8 L952,16 L935,10 L920,21 L902,12 L885,19 L868,9 L850,17 L832,11 L815,20 L800,12 L782,18 L765,8 L748,16 L730,10 L715,22 L698,12 L680,19 L662,9 L645,17 L628,11 L610,20 L595,12 L578,18 L560,8 L542,16 L525,10 L510,21 L492,12 L475,19 L458,9 L440,17 L422,11 L405,20 L390,12 L372,18 L355,8 L338,16 L320,10 L305,22 L288,12 L270,19 L252,9 L235,17 L218,11 L200,20 L185,12 L168,18 L150,8 L132,16 L115,10 L100,21 L82,12 L65,19 L48,9 L30,17 L15,11 L0,18 Z" />
        </svg>
      </div>

      {/* Subtle Gold Dust Dots in side areas */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute rounded-full" style={{ left: '7%', top: '55%', width: '3.5px', height: '3.5px', backgroundColor: '#F4A62A', opacity: 0.55 }} />
        <div className="absolute rounded-full" style={{ left: '14%', top: '78%', width: '4px', height: '4px', backgroundColor: '#F4A62A', opacity: 0.5 }} />
        <div className="absolute rounded-full" style={{ left: '4%', top: '35%', width: '3px', height: '3px', backgroundColor: '#F4A62A', opacity: 0.35 }} />
        <div className="absolute rounded-full" style={{ right: '9%', top: '52%', width: '3.5px', height: '3.5px', backgroundColor: '#F4A62A', opacity: 0.55 }} />
        <div className="absolute rounded-full" style={{ right: '15%', top: '72%', width: '4.5px', height: '4.5px', backgroundColor: '#F4A62A', opacity: 0.45 }} />
        <div className="absolute rounded-full" style={{ right: '6%', top: '28%', width: '3px', height: '3px', backgroundColor: '#F4A62A', opacity: 0.35 }} />
      </div>

      {/* Collapsibles Container (Further reduced size) */}
      <div className="max-w-[580px] md:max-w-[620px] mx-auto relative z-10 border-t border-[#FBF8F1]/[0.18]">
        {sections.map((section, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={section.id}
              id={section.id}
              className="border-b border-[#FBF8F1]/[0.18] transition-colors"
            >
              <button 
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full py-2.5 md:py-3.5 flex items-center justify-between text-left group gap-3 cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#F4A62A]"
              >
                <div className="flex flex-col">
                  <span 
                    className="text-[17px] md:text-[19px] font-medium tracking-tight"
                    style={{
                      fontFamily: '"Newsreader", Georgia, serif',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      color: '#FBF8F1'
                    }}
                  >
                    {section.title}
                  </span>
                </div>

                {/* Arrowhead chevron */}
                <svg
                  viewBox="0 0 22 14"
                  fill="none"
                  aria-hidden="true"
                  className="w-[15px] h-[10px] shrink-0 transition-transform duration-300 ease-out"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  <path
                    d="M2 2 L11 11 L20 2"
                    stroke="#FBF8F1"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="pb-4 pt-1 leading-relaxed text-[14px]"
                      style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontSize: '14px',
                        color: 'rgba(251, 248, 241, 0.85)'
                      }}
                    >
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* NEW CONTENT BELOW THE COLLAPSIBLES */}
      <div className="mt-10 md:mt-12 max-w-[720px] mx-auto text-center relative z-10">
        <FadeIn direction="up">
          {/* 1. Label */}
          <div 
            className="uppercase tracking-[0.14em] mb-4"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#F4A62A',
              fontStyle: 'normal'
            }}
          >
            BEFORE THE GALLERY OPENS
          </div>

          {/* 2. Heading */}
          <h2 
            className="text-[34px] md:text-[50px] mb-8 leading-[1.12]"
            style={{
              fontFamily: '"Newsreader", Georgia, serif',
              fontWeight: 500,
              fontStyle: 'normal',
              color: '#FBF8F1'
            }}
          >
            Your dream{' '}
            <span style={{ color: '#FF5C8A', fontStyle: 'normal' }}>
              doesn't have to wait.
            </span>
          </h2>

          {/* 3. Body */}
          <div 
            className="space-y-6 text-[18px] leading-[1.65] mb-8"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              color: '#FBF8F1'
            }}
          >
            <p>
              While we build the gallery, our dreams are gathering on the Lantern Sky. Light a lantern with your dream for a better world, and see what others are dreaming too.
            </p>
            <p>
              Every lantern lit now is a dream waiting for its home.
            </p>
          </div>

          {/* 4. Second line */}
          <p 
            className="text-[18px] leading-[1.65] max-w-[560px] mx-auto mt-10 mb-10"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              color: 'rgba(251, 248, 241, 0.82)'
            }}
          >
            Want to help the gallery open sooner? Your gift helps build it and keep it open to&nbsp;everyone.
          </p>

          {/* 5. TWO BUTTONS */}
          <div className="grid grid-cols-1 w-fit mx-auto gap-[14px] sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-[18px] sm:w-full sm:max-w-none">
            {/* Button 1 (main) */}
            <a
              href="[LANTERN PAGE URL]"
              className="group relative inline-flex items-center justify-center min-w-[220px] sm:min-w-0 transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4A62A] focus-visible:outline-offset-2"
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '18px 38px',
                border: 'none',
                background: 'transparent',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              <svg
                viewBox="0 0 200 58"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <path
                  d="M30 6 C80 2 130 3 172 7 C194 10 199 30 193 42 C187 53 168 54 140 53 C100 52 60 55 28 52 C8 50 2 38 4 27 C6 14 14 7 30 6 Z"
                  fill="#FF5C8A"
                  className="transition-all duration-200 group-hover:brightness-110"
                />
              </svg>
              <span
                style={{
                  position: 'relative',
                  zIndex: 10,
                  whiteSpace: 'nowrap',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  color: '#2A1830'
                }}
              >
                Share your dream
              </span>
            </a>

            {/* Button 2 (secondary) */}
            <a
              href={FUNDRAISING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center min-w-[220px] sm:min-w-0 transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4A62A] focus-visible:outline-offset-2"
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '18px 38px',
                border: 'none',
                background: 'transparent',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              <svg
                viewBox="0 0 200 58"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <path
                  d="M30 6 C80 2 130 3 172 7 C194 10 199 30 193 42 C187 53 168 54 140 53 C100 52 60 55 28 52 C8 50 2 38 4 27 C6 14 14 7 30 6 Z"
                  fill="none"
                  stroke="#FBF8F1"
                  strokeWidth={2.4}
                  vectorEffect="non-scaling-stroke"
                  className="transition-all duration-200 group-hover:brightness-110 group-hover:stroke-white"
                />
              </svg>
              <span
                style={{
                  position: 'relative',
                  zIndex: 10,
                  whiteSpace: 'nowrap',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  color: '#FBF8F1'
                }}
              >
                Help build the gallery
              </span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const GuideSection = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  const guideItems = [
    {
      title: "WHO",
      subtitle: "You are the \"Imagineers\"",
      content: "This is a home for the dreamers, tinkerers, and do-ers who refuse to believe that the world’s problems are \"just the way it is.\"\n\nYou aren’t here as a consumer; you are here as a creator and a steward. Here you can join a global collective of people - from artists to engineers - who are all bringing their piece of the thriving world puzzle to the table.",
      color: "#FF5C8A",
    },
    {
      title: "WHAT",
      subtitle: "A Blueprint for Thriving",
      content: "The Imagineerium is a living digital gallery of possibilities. It’s where we bridge the \"imagination gap\" by giving form to the future. You’ll find tangible visions - art, models, and ideas - that show exactly what a world in sustainable, just balance looks like, giving us all the language and examples we need to make that future real.",
      color: "#F4A62A",
    },
    {
      title: "WHY",
      subtitle: "To Reclaim Your Agency",
      content: "You care about the world, but \"scrolling through headlines\" leaves you feeling powerless. This space exists to turn that quiet despair into creative energy. You should care because your imagination is the most powerful tool for change; by participating, you stop surviving the future and start designing it.",
      color: "#FF5C8A",
    },
    {
      title: "WHERE",
      subtitle: "A Digital Sanctuary",
      content: "This is global, open-access hub—a \"sanctuary for the imagination\" reachable from anywhere. It is a centralized space designed to gather the disparate sparks of hope from across the planet and connect them, creating a massive, shared landscape of what is possible.",
      color: "#F4A62A",
    },
    {
      title: "WHEN",
      subtitle: "Starting Right Now",
      content: "Transformation doesn't wait. While the gallery is a living project, we are currently in a critical \"Founding\" phase. From Dec 7-11 2026, your participation is amplified by our Match Campaign—giving you a unique window to help build the very tools that will host these visions for years to come.",
      color: "#FF5C8A",
    },
    {
      title: "HOW",
      subtitle: "Explore, Share, and Build",
      content: "You use this space by following your curiosity.\n\nExplore the gallery to find inspiration that resonates;\nVote on the visions you want to see come to life; and\nShare your own thoughts or expressions to add to the map.\n\nIf you’re ready to lay the foundation, you can Donate during our campaign to help us build the digital infrastructure that makes this collaboration possible.",
      color: "#F4A62A",
    }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section 
      id="vision"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => { setIsInside(false); setActiveItem(null); setHoveredTab(null); }}
      className="relative py-2 md:py-2.5 overflow-hidden bg-[#05050f] border-b border-white/5"
    >
      {/* Hero-matched Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop" 
          alt="" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Magic Cursor Glow */}
      <AnimatePresence>
        {isInside && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute z-10 pointer-events-none w-[200px] h-[200px] rounded-full"
            style={{
              background: `radial-gradient(circle at center, rgba(244, 166, 42, 0.08) 0%, transparent 70%)`,
              left: mousePos.x - 100,
              top: mousePos.y - 100,
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Tabs Row (Compact) */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-5 pb-0.5">
          {guideItems.map((item, idx) => (
            <div key={idx} className="relative">
              <button
                onClick={() => setActiveItem(activeItem === idx ? null : idx)}
                onMouseEnter={() => setHoveredTab(idx)}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative py-1.5 px-2.5 text-center transition-all duration-200 cursor-pointer flex items-center gap-1 focus:outline-none"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#FBF8F1',
                  background: 'transparent',
                  border: 'none'
                }}
              >
                <span>{item.title}</span>
                <ChevronDown 
                  className="w-2.5 h-2.5 transition-transform duration-300" 
                  style={{ 
                    transform: activeItem === idx ? 'rotate(180deg)' : 'none',
                    color: activeItem === idx ? '#F4A62A' : '#FBF8F1'
                  }} 
                />
                {activeItem === idx ? (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[2px]" 
                    style={{ backgroundColor: '#F4A62A' }} 
                  />
                ) : hoveredTab === idx ? (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[2px]" 
                    style={{ backgroundColor: '#FF5C8A' }} 
                  />
                ) : null}
              </button>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {activeItem !== null && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0, y: -4 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -4 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="mt-3.5 overflow-hidden"
            >
              <div 
                className="border border-white/10 rounded-xl p-4 md:p-6 shadow-xl relative overflow-hidden text-center max-w-2xl mx-auto"
                style={{ backgroundColor: '#2A1830' }}
              >
                <div 
                  className="absolute top-0 left-0 w-full h-[2.5px]" 
                  style={{ backgroundColor: '#F4A62A' }} 
                />
                <div className="flex flex-col items-center gap-2 mb-2.5">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: '#F4A62A' }} 
                  />
                  <h3 
                    className="text-[17px] md:text-[19px] font-medium leading-tight"
                    style={{
                      fontFamily: '"Newsreader", Georgia, serif',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      color: '#FBF8F1'
                    }}
                  >
                    {guideItems[activeItem].subtitle}
                  </h3>
                </div>
                <p 
                  className="text-[13.5px] md:text-[14px] leading-relaxed whitespace-pre-line"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    color: '#FBF8F1'
                  }}
                >
                  {guideItems[activeItem].content}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const images = [
    { src: "https://i.imgur.com/KT8VPOG.jpg", title: "Visionary Modeling", x: "12%", y: "15%", rotate: -6, size: "w-56 h-40" },
    { src: "/images/hub.png", title: "The Imagineerium Hub", x: "78%", y: "10%", rotate: 8, size: "w-48 h-48" },
    { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000", title: "Mechanical Integrity", x: "45%", y: "22%", rotate: -3, size: "w-60 h-60" },
    { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000", title: "Walnut Sanctuary", x: "10%", y: "55%", rotate: 5, size: "w-44 h-64" },
    { src: "https://i.imgur.com/82w50Gk.jpg", title: "Humble Beginnings", x: "85%", y: "45%", rotate: -10, size: "w-52 h-36" },
    { src: "https://i.imgur.com/W5X7gg3.jpg", title: "Harmonious Urbanism", x: "42%", y: "60%", rotate: 4, size: "w-72 h-48" },
    { src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1000", title: "Collective Spirit", x: "20%", y: "82%", rotate: -12, size: "w-56 h-36" },
    { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000", title: "The Long View", x: "65%", y: "78%", rotate: 10, size: "w-64 h-36" },
    { src: "https://i.imgur.com/DLF26Qy.jpg", title: "Imagineerium Concept", x: "5%", y: "8%", rotate: 7, size: "w-52 h-52" },
    { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000", title: "Cosmic Connection", x: "88%", y: "80%", rotate: -5, size: "w-56 h-56" },
  ];

  const goldParticles = [
    { top: '10%', left: '18%', size: 3, delay: 0, duration: 4 },
    { top: '15%', left: '42%', size: 2, delay: 1, duration: 5 },
    { top: '22%', left: '74%', size: 3.5, delay: 2, duration: 4.5 },
    { top: '28%', left: '88%', size: 2, delay: 0.5, duration: 6 },
    { top: '35%', left: '8%', size: 2.5, delay: 1.5, duration: 5.5 },
    { top: '40%', left: '32%', size: 2, delay: 2.5, duration: 4 },
    { top: '48%', left: '60%', size: 3, delay: 0.8, duration: 5.2 },
    { top: '55%', left: '82%', size: 2, delay: 1.8, duration: 6.2 },
    { top: '62%', left: '25%', size: 3, delay: 0.2, duration: 4.8 },
    { top: '68%', left: '50%', size: 2, delay: 2.2, duration: 5.8 },
    { top: '75%', left: '15%', size: 2.5, delay: 1.1, duration: 4.2 },
    { top: '80%', left: '70%', size: 3, delay: 2.8, duration: 5.1 },
    { top: '85%', left: '38%', size: 2, delay: 0.7, duration: 6.5 },
    { top: '90%', left: '85%', size: 2.5, delay: 1.9, duration: 4.7 },
    { top: '12%', left: '62%', size: 2, delay: 3.1, duration: 5.3 },
    { top: '30%', left: '22%', size: 3, delay: 1.3, duration: 4.9 },
    { top: '65%', left: '92%', size: 2, delay: 2.4, duration: 5.7 },
    { top: '82%', left: '5%', size: 2.5, delay: 0.4, duration: 6.1 },
    { top: '50%', left: '4%', size: 2, delay: 1.6, duration: 4.4 },
    { top: '95%', left: '55%', size: 3, delay: 2.1, duration: 5.6 }
  ];

  return (
    <section id="gallery" className="relative min-h-[100vh] overflow-hidden flex items-center justify-center py-24" style={{ backgroundColor: '#2A1830' }}>
      {/* Solid Deep Plum Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundColor: '#2A1830' }} />

      {/* Tiny Gold Dust Particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {goldParticles.map((p, i) => (
          <motion.div
            key={`gold-dust-${i}`}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: '#F4A62A',
              boxShadow: '0 0 6px 1px rgba(244, 166, 42, 0.6)'
            }}
            animate={{
              y: [0, -14, 0],
              x: [0, 6, -6, 0],
              opacity: [0.35, 0.9, 0.35],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Text Container - Always sits above floating images with soft Deep Plum glow */}
      <div className="container mx-auto px-6 relative z-30 text-center flex flex-col items-center pointer-events-auto">
        <div 
          className="relative max-w-3xl mx-auto py-8 px-6 sm:px-10 rounded-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(42, 24, 48, 0.92) 0%, rgba(42, 24, 48, 0.75) 55%, transparent 85%)',
            boxShadow: '0 0 100px 50px rgba(42, 24, 48, 0.85)'
          }}
        >
          <FadeIn>
            <h2 
              className="text-[40px] md:text-[64px] leading-[1.1] font-medium mb-6 not-italic"
              style={{
                fontFamily: '"Newsreader", Georgia, serif',
                fontWeight: 500,
                fontStyle: 'normal',
                color: '#FBF8F1'
              }}
            >
              Dreams of a <br /> 
              <span style={{ color: '#FF5C8A', fontStyle: 'normal' }}>
                better world.
              </span>
            </h2>
            <p 
              className="text-[18px] mb-10 max-w-2xl mx-auto not-italic"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                color: '#FBF8F1'
              }}
            >
              We're building a place where these dreams can live and grow.
            </p>
            <div className="inline-block pointer-events-auto">
              <RiverPebbleButton 
                href="[LANTERN PAGE URL]"
                variant="main"
                bgTheme="dark"
              >
                Share your dream
              </RiverPebbleButton>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Floating Images Container - REAR LAYER (Always below z-30 text block) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {images.map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute cursor-pointer pointer-events-auto"
            style={{
              left: item.x,
              top: item.y,
              zIndex: activeImage === idx ? 100 : 10,
            }}
            initial={{ opacity: 0, scale: 0.9, rotate: item.rotate }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, zIndex: 20, transition: { duration: 0.4, ease: "easeOut" } }}
            onClick={() => setActiveImage(idx)}
            animate={{
              x: [0, 15, -15, 0],
              y: [0, -20, 20, 0],
              rotate: [item.rotate, item.rotate + 1.5, item.rotate - 1.5, item.rotate]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div 
              layoutId={`gallery-item-${idx}`}
              className={`relative ${item.size} group shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]`}
            >
              <img 
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg border border-white/10 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-black/20 via-transparent to-white/5 opacity-40 group-hover:opacity-0 transition-opacity" />
              {/* Hover label */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px] rounded-lg">
                <span 
                  className="px-3 py-1 rounded-full bg-black/60 border border-white/30"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#FBF8F1'
                  }}
                >
                  View
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* FIXED Lightbox Modal */}
      <AnimatePresence>
        {activeImage !== null && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              onClick={() => setActiveImage(null)}
            />
            
            <motion.div
              layoutId={`gallery-item-${activeImage}`}
              className="relative z-10 w-full max-w-5xl aspect-[16/10] bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img 
                src={images[activeImage].src}
                alt={images[activeImage].title}
                className="w-full h-full object-contain md:object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-16">
                <div className="max-w-2xl">
                  <span 
                    className="mb-4 block"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#F4A62A'
                    }}
                  >
                    Visualized by Imagineers
                  </span>
                  <h3 
                    className="text-3xl md:text-5xl font-medium tracking-tight mb-4"
                    style={{
                      fontFamily: '"Newsreader", Georgia, serif',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      color: '#FBF8F1'
                    }}
                  >
                    {images[activeImage].title}
                  </h3>
                  <p 
                    className="text-[16px] md:text-[18px]"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontStyle: 'normal',
                      color: '#FBF8F1'
                    }}
                  >
                    A glimpse into the thriving world where balance is the default and creativity is the currency.
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setActiveImage(null)}
                className="absolute top-8 right-8 p-3 bg-white/10 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all hover:rotate-90 z-20"
                style={{ color: '#FBF8F1' }}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const VisionGallery = () => {
  const visions = [
    {
      title: "Atmospheric Restoration",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      size: "large"
    },
    {
      title: "Collective Dreaming",
      category: "Art & Culture",
      image: "/images/vision_action.png",
      size: "small"
    },
    {
      title: "Solar Kinetic Sculptures",
      category: "Energy",
      image: "https://images.unsplash.com/photo-1509391366360-fe58f9df77e5?auto=format&fit=crop&w=800&q=80",
      size: "small"
    },
    {
      title: "Bioluminescent Cities",
      category: "Urban Future",
      image: "https://images.unsplash.com/photo-1444703686981-a3abb997c7e8?auto=format&fit=crop&w=1200&q=80",
      size: "wide"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="left">
            <h2 
              className="text-[28px] md:text-[36px] font-medium leading-tight"
              style={{
                fontFamily: '"Newsreader", Georgia, serif',
                fontWeight: 500,
                fontStyle: 'normal',
                color: '#2A1830'
              }}
            >
              What changes because of <br />
              <span style={{ color: '#C22E5C', fontStyle: 'normal' }}>
                your support.
              </span>
            </h2>
          </FadeIn>

          <div className="space-y-12">
            {[
              { emoji: '✨', text: 'Visions that once had nowhere to go finally have a place to grow' },
              { emoji: '🌍', text: 'People who carry the same dream find each other and start building together' },
              { emoji: '💡', text: 'Ideas that would have faded begin to take shape in the real world' }
            ].map((item, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.2}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-warm-light flex items-center justify-center text-2xl shadow-sm border border-black/5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {item.emoji}
                  </div>
                  <p 
                    className="text-[18px] leading-relaxed pt-1"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      color: '#262624'
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={0.8} direction="up">
              <div className="pt-6 flex justify-center sm:block">
                <RiverPebbleButton 
                  href={FUNDRAISING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="main"
                  bgTheme="light"
                >
                  Donate to bring the gallery to life
                </RiverPebbleButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const SupportBuildingSection = () => {
  const items = [
    {
      title: "The Thriving World Gallery",
      description: "A digital space where visions of a better future can be shared, explored, and celebrated, making visible what's possible when imagination has room to breathe.",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800"
    },
    {
      title: "A Hub for Visionaries",
      description: "A place where people and creators can find each other, collaborate across borders and disciplines, and shape ideas into something real.",
      image: "/images/hub.png"
    },
    {
      title: "A Stepping Stone to Reality",
      description: "A bridge from isolated sparks of imagination to a shared, living blueprint for a more sustainable, just, and thriving world.",
      image: "https://images.unsplash.com/photo-1449156001931-158bb26162e7?auto=format&fit=crop&w=800"
    }
  ];

  return (
    <section id="support" className="py-12 md:py-20 px-6 bg-warm-light overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn direction="up">
          <div className="mb-10">
            <h2 
              className="text-[28px] md:text-[36px] font-medium leading-tight"
              style={{
                fontFamily: '"Newsreader", Georgia, serif',
                fontWeight: 500,
                fontStyle: 'normal',
                color: '#2A1830'
              }}
            >
              What your support <br />
              <span style={{ color: '#C22E5C', fontStyle: 'normal' }}>
                is building.
              </span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {items.map((item, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 0.2} className="h-full">
              <div className="group h-full flex flex-col">
                {/* Image Container */}
                <div className="aspect-video w-full bg-black/5 rounded-2xl border border-black/10 mb-8 overflow-hidden relative group-hover:border-[#C22E5C]/30 transition-colors duration-500">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  
                  {/* Fallback Placeholder UI */}
                  <div className="hidden absolute inset-0 flex items-center justify-center text-center p-8 bg-black/5">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-[#F4A62A]" />
                      </div>
                      <span 
                        className="text-[11px] font-bold uppercase tracking-[0.3em]"
                        style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          color: '#262624'
                        }}
                      >
                        Upload {item.image.split('/').pop()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-12 h-[2px] mb-8 group-hover:w-24 transition-all duration-500" style={{ backgroundColor: '#F4A62A' }} />
                <h3 
                  className="text-[22px] font-medium mb-4"
                  style={{
                    fontFamily: '"Newsreader", Georgia, serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    color: '#2A1830'
                  }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-[16px] leading-relaxed font-normal"
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    color: '#262624'
                  }}
                >
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="none" distance={0}>
          <div className="pt-12 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p 
              className="text-[13px] font-normal max-w-2xl"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: '#262624'
              }}
            >
              Luminaria Imagineerium is fiscally sponsored by Fractured Atlas, a registered 501(c)(3) nonprofit, ensuring your donation is secure and tax-deductible.
            </p>
            <div 
              className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em]"
              style={{ color: '#C22E5C' }}
            >
              <Heart className="w-3.5 h-3.5 fill-current" style={{ color: '#F4A62A' }} /> Verified Non-Profit Project
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F4A62A]/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

const HelpGiveDreamsAHomeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      const tabletOrDesktop = window.innerWidth >= 640;
      setIsDesktop(desktop);
      setIsTabletOrDesktop(tabletOrDesktop);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      } else {
        setContainerWidth(Math.min(window.innerWidth - 48, 948));
      }
      setCurrentIndex(prev => {
        const max = desktop ? 3 : 5;
        return Math.min(prev, max);
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = isDesktop ? 3 : 5;

  const dreams = [
    {
      quote: "“I dream of a world where every child has a safe place to learn.”",
      blobColor: "#FF5C8A",
      textColor: "#2A1830",
      path: "M40 22 C90 6 170 10 214 26 C246 38 252 78 244 110 C238 140 250 168 222 182 C186 198 120 190 76 188 C36 186 12 168 10 132 C8 104 22 92 14 66 C8 40 20 28 40 22 Z",
      stagger: "-translate-y-2 md:-translate-y-4"
    },
    {
      quote: "“Clean water in every village.”",
      blobColor: "#2A1830",
      textColor: "#FBF8F1",
      path: "M36 24 C86 8 168 14 216 28 C248 40 254 82 242 114 C236 142 248 172 220 184 C184 196 122 192 74 186 C34 184 12 166 10 130 C8 102 24 90 16 64 C10 38 22 28 36 24 Z",
      stagger: "translate-y-2 md:translate-y-4"
    },
    {
      quote: "“A world where no one feels alone.”",
      blobColor: "#F4A62A",
      textColor: "#2A1830",
      path: "M44 20 C94 10 172 8 212 24 C244 38 250 74 246 106 C240 138 252 166 224 180 C188 194 118 188 78 190 C38 188 14 170 12 134 C10 106 20 94 12 68 C8 42 20 30 44 20 Z",
      stagger: "-translate-y-1 md:-translate-y-3"
    },
    {
      quote: "“I dream that every person has a safe place to call home.”",
      blobColor: "#FF5C8A",
      textColor: "#2A1830",
      path: "M38 26 C88 12 166 12 218 24 C246 36 254 78 244 108 C238 138 248 168 222 184 C186 198 122 188 74 186 C34 184 10 168 10 130 C10 100 24 90 16 64 C10 38 20 26 38 26 Z",
      stagger: "translate-y-3 md:translate-y-5"
    },
    {
      quote: "“A world where no one has to go to bed hungry.”",
      blobColor: "#2A1830",
      textColor: "#FBF8F1",
      path: "M42 18 C92 8 174 14 214 28 C244 40 250 76 246 112 C240 142 250 170 224 182 C188 194 120 192 76 188 C36 186 14 168 12 132 C10 104 22 92 14 66 C8 40 22 28 42 18 Z",
      stagger: "-translate-y-2 md:-translate-y-4"
    },
    {
      quote: "“I dream of a world filled with peace and happiness.”",
      blobColor: "#F4A62A",
      textColor: "#2A1830",
      path: "M40 22 C90 6 170 10 214 26 C246 38 252 78 244 110 C238 140 250 168 222 182 C186 198 120 190 76 188 C36 186 12 168 10 132 C8 104 22 92 14 66 C8 40 20 28 40 22 Z",
      stagger: "translate-y-2 md:translate-y-3"
    }
  ];

  const supportCards = [
    {
      title: "A place to share your dream",
      text: "The online gallery where anyone can add a dream for the world, in words, a picture or a piece of art.",
      icon: Sparkles
    },
    {
      title: "A gallery worth exploring",
      text: "Thoughtful, artistic design that makes discovering other people's dreams a joy.",
      icon: Compass
    },
    {
      title: "A community that keeps growing",
      text: "A space where people from everywhere can connect over shared dreams, and maybe start something together.",
      icon: Users
    }
  ];

  const cardWidth = isDesktop 
    ? (containerWidth > 0 ? Math.min(300, (containerWidth - 48) / 3) : 300)
    : isTabletOrDesktop
      ? 300
      : (containerWidth > 0 ? Math.min(containerWidth * 0.82, 340) : 300);

  const stepDistance = isTabletOrDesktop
    ? cardWidth + 24
    : cardWidth + 16;

  return (
    <section id="dreams-home" className="relative overflow-hidden bg-[#FBF8F1] py-16 md:py-24" style={{ backgroundColor: '#FBF8F1' }}>
      {/* Textured vellum background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundColor: '#FBF8F1' }}>
        <img 
          src="https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=2000&auto=format&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{
            opacity: 0.4,
            mixBlendMode: 'multiply'
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn direction="up">
          {/* Heading */}
          <h2 
            className="text-[32px] md:text-[44px] mb-6"
            style={{
              fontFamily: '"Newsreader", Georgia, serif',
              fontWeight: 500,
              fontStyle: 'normal',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: '#2A1830'
            }}
          >
            Help give these dreams a home.
          </h2>

          {/* 3. Intro text */}
          <div 
            className="space-y-4 max-w-[640px] text-[16px] leading-[1.65] mb-4 md:mb-6"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              color: '#262624'
            }}
          >
            <p>
              Imagine opening a gallery filled with what people everywhere hope for.
            </p>
            <p>
              That's what we're building. More than a collection, a place where one person's dream can inspire another to act.
            </p>
          </div>
        </FadeIn>

        {/* 4. DREAM CARDS (swipeable row) */}
        <div ref={containerRef} className="relative w-full lg:max-w-[948px] mx-auto overflow-hidden py-6">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const swipeThreshold = 40;
              if ((info.offset.x < -swipeThreshold || info.velocity.x < -250) && currentIndex < maxIndex) {
                setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
              } else if ((info.offset.x > swipeThreshold || info.velocity.x > 250) && currentIndex > 0) {
                setCurrentIndex(prev => Math.max(prev - 1, 0));
              }
            }}
            animate={{
              x: -currentIndex * stepDistance
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28
            }}
            className="flex items-center gap-4 sm:gap-6 cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'pan-y' }}
          >
            {dreams.map((dream, idx) => (
              <div
                key={idx}
                style={{
                  width: `${cardWidth}px`,
                  minWidth: `${cardWidth}px`
                }}
                className="shrink-0 py-1.5"
              >
                <div 
                  className={`relative w-full aspect-[300/230] flex items-center justify-center p-6 sm:p-[36px] transition-transform duration-300 ${dream.stagger}`}
                >
                  <svg
                    viewBox="0 0 260 200"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                  >
                    <path
                      d={dream.path}
                      fill={dream.blobColor}
                    />
                  </svg>
                  <p 
                    className="relative z-10 text-center text-[18px] sm:text-[21px] font-medium leading-[1.35] select-none"
                    style={{
                      fontFamily: '"Newsreader", Georgia, serif',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      color: dream.textColor
                    }}
                  >
                    {dream.quote}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Navigation: Arrows & Dots */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-2 md:mt-3 mb-8 md:mb-12">
          <button
            type="button"
            onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
            aria-label="Previous dream"
            className="w-10 h-10 rounded-full border border-[#2A1830] flex items-center justify-center text-[#2A1830] hover:bg-[#2A1830] hover:text-[#FBF8F1] transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[#2A1830] disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to dream slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-6 bg-[#2A1830]' 
                    : 'w-2 bg-[#2A1830]/30 hover:bg-[#2A1830]/60'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentIndex(prev => Math.min(prev + 1, maxIndex))}
            disabled={currentIndex >= maxIndex}
            aria-label="Next dream"
            className="w-10 h-10 rounded-full border border-[#2A1830] flex items-center justify-center text-[#2A1830] hover:bg-[#2A1830] hover:text-[#FBF8F1] transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[#2A1830] disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 5. SUBHEADING with short thin gold line beside it */}
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <h3 
              className="text-[22px] md:text-[26px]"
              style={{
                fontFamily: '"Newsreader", Georgia, serif',
                fontSize: '26px',
                fontWeight: 500,
                fontStyle: 'normal',
                color: '#2A1830',
                lineHeight: 1.2
              }}
            >
              What your support helps build
            </h3>
            <div 
              className="h-[1.5px] w-12 md:w-20 shrink-0" 
              style={{ backgroundColor: '#F4A62A' }} 
            />
          </div>

          {/* 6. THREE SUPPORT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
            {supportCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FBF8F1] flex flex-col justify-start"
                  style={{
                    backgroundColor: '#FBF8F1',
                    border: '1px solid #E7DFD0',
                    borderRadius: '18px',
                    padding: '30px',
                    boxShadow: '0 2px 10px rgba(42, 24, 48, 0.06)'
                  }}
                >
                  {/* Icon replacing gold accent line */}
                  <div className="mb-4">
                    <Icon className="w-6 h-6" style={{ color: '#F4A62A' }} strokeWidth={2} />
                  </div>
                  <h4 
                    className="text-[21px] mb-3"
                    style={{
                      fontFamily: '"Newsreader", Georgia, serif',
                      fontSize: '21px',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      color: '#2A1830',
                      lineHeight: 1.3
                    }}
                  >
                    {card.title}
                  </h4>
                  <p 
                    className="text-[16px] leading-[1.6]"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      color: '#262624'
                    }}
                  >
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 7. CLOSING TEXT */}
          <div 
            className="max-w-[600px] mx-auto text-center space-y-2 mb-8 md:mb-10 text-[16px] leading-[1.6]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              color: '#262624'
            }}
          >
            <p>
              The gallery doesn't exist yet. Your gift helps build it and keep it open to everyone.
            </p>
            <p>
              $5 counts. $25 counts. $100 counts.
            </p>
            <p>
              And sharing with one person who cares counts too.
            </p>
          </div>

          {/* 8. BUTTON (centered) */}
          <div className="flex justify-center mb-4">
            <a
              href={FUNDRAISING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center min-w-[220px] sm:min-w-0 transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2A1830] focus-visible:outline-offset-2"
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '18px 36px',
                border: 'none',
                background: 'transparent',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              <svg
                viewBox="0 0 200 58"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <path
                  d="M30 6 C80 2 130 3 172 7 C194 10 199 30 193 42 C187 53 168 54 140 53 C100 52 60 55 28 52 C8 50 2 38 4 27 C6 14 14 7 30 6 Z"
                  fill="#C22E5C"
                  className="transition-colors duration-200 group-hover:fill-[#9E2047]"
                />
              </svg>
              <span
                style={{
                  position: 'relative',
                  zIndex: 10,
                  whiteSpace: 'nowrap',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                Help build the gallery
              </span>
            </a>
          </div>

          {/* 9. SMALL PRINT */}
          <p 
            className="max-w-[620px] mx-auto text-center text-[13px] leading-[1.5]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              fontStyle: 'normal',
              color: '#262624',
              opacity: 0.7
            }}
          >
            Donations are made through Fractured Atlas. Tax-deductible to the extent permitted by law.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};


const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I use it?",
      answer: (
        <p>
          It’s simple: Start by entering the Thriving World Gallery to explore visions that resonate with you. You can vote on ideas to show what matters, share your own simple thoughts or expressions of a better world to add to the collective map, and connect with others to help their ideas grow.
        </p>
      )
    },
    {
      question: "What’s it for?",
      answer: (
        <p>
          The Imagineerium is designed to bridge the &ldquo;imagination gap&rdquo; - the distance between seeing the world we have and visualizing the world we want well enough to actually BUILD it. It is a dedicated space where the &ldquo;art of imagineering a thriving world&rdquo; is practiced by many people like you, providing you with visual models, language, and social scaffolding to help support your natural creativity, and connecting you with others who you can be inspired by, support, and collaborate with.
        </p>
      )
    },
    {
      question: "Who needs it?",
      answer: (
        <p>
          This is for the people who are tired of just &ldquo;scrolling through the headlines&rdquo; and feeling a quiet despair. If you have ever felt that your hope for a better world has nowhere to grow, or if you’re a &ldquo;tinkerer, creative, or do-er&rdquo; working on a piece of the puzzle but feeling isolated, this space is built specifically to give your energy a home.
        </p>
      )
    },
    {
      question: "Why should I care?",
      answer: (
        <p>
          Your imagination is the most powerful &ldquo;infrastructure&rdquo; you possess for change. By participating, you move from being a victim of happenstance to becoming an architect of global solutions; you aren’t just looking at art - you are helping to create the blueprints for a world where you and the people you love can actually thrive in balance with the planet.
        </p>
      )
    },
    {
      question: "What kind of people are here?",
      answer: (
        <p>
          You will find a global collective of &ldquo;Imagineers&rdquo;—artists, engineers, architects, and everyday visionaries who refuse to accept &ldquo;the way it is&rdquo; as the only way. This is a community that sees your &ldquo;childish&rdquo; hope as a sophisticated tool for a better tomorrow, and offers a diverse, inclusive sanctuary for people from all walks of life to collaborate without the weight of entrenched systems holding them back.
        </p>
      )
    },
    {
      question: "Where does my donation go?",
      answer: (
        <div className="space-y-4">
          <p>Every donation supports building the first version of the Thriving World Gallery — the platform, design, tools, and early community.</p>
          <p>We’re in the foundation phase. Your support shapes what this becomes.</p>
        </div>
      )
    },
    {
      question: "Do I need to be an artist or have credentials to contribute my vision to the gallery?",
      answer: (
        <p>
          Nope! Your credentials are your hopes and dreams and willingness to share them in whatever format works for you, subject to our Terms and Conditions.
        </p>
      )
    },
    {
      question: "Is this project legitimate?",
      answer: (
        <p>
          Yes. We are fiscally sponsored by Fractured Atlas, a registered 501(c)(3) nonprofit. Donations are secure and tax-deductible.
        </p>
      )
    },
    {
      question: "Can I participate without donating?",
      answer: (
        <p>
          Yes. When the gallery launches, anyone can share a vision — for free. Donating now helps us build the space where that becomes possible. Want to thelp us build it by volunteering or donating skills? Email us at{' '}
          <a
            href="mailto:imagineerium@theluminaria.com"
            className="underline transition-opacity hover:opacity-80"
            style={{ color: '#C22E5C' }}
          >
            imagineerium@theluminaria.com
          </a>
          .
        </p>
      )
    },
    {
      question: "How long until the gallery is finished?",
      answer: (
        <p>
          Once we reach our financial goal, we will be able to launch the gallery within 2-3 months. All funds donated will go toward making that vision a reality.
        </p>
      )
    }
  ];

  const [isSectionOpen, setIsSectionOpen] = useState(false);

  return (
    <section 
      id="faq" 
      className={`relative overflow-hidden bg-[#FBF8F1] px-6 transition-all duration-300 ${
        isSectionOpen ? 'pt-8 md:pt-12 pb-12 md:pb-16' : 'py-5 md:py-6'
      }`} 
      style={{ backgroundColor: '#FBF8F1' }}
    >
      {/* Textured vellum background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundColor: '#FBF8F1' }}>
        <img 
          src="https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=2000&auto=format&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{
            opacity: 0.4,
            mixBlendMode: 'multiply'
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-[780px] mx-auto relative z-10">
        <FadeIn direction="up">
          {/* Main Collapsible FAQ Section Trigger */}
          <button
            type="button"
            onClick={() => setIsSectionOpen(!isSectionOpen)}
            aria-expanded={isSectionOpen}
            className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C22E5C] focus-visible:outline-offset-2 transition-colors py-1"
          >
            <div className="flex flex-col text-left">
              {/* Section Heading */}
              <h2 
                className="text-[24px] md:text-[30px] font-medium leading-[1.15]"
                style={{
                  fontFamily: '"Newsreader", Georgia, serif',
                  fontWeight: 500,
                  fontStyle: 'normal',
                  color: '#2A1830'
                }}
              >
                FAQ
              </h2>
            </div>

            {/* Section-level Arrowhead Chevron */}
            <div className="flex items-center gap-3">
              <span 
                className="hidden sm:inline-block text-[13px] font-medium opacity-60 group-hover:opacity-100 transition-opacity"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  color: '#2A1830'
                }}
              >
                {isSectionOpen ? 'Hide questions' : 'View questions'}
              </span>
              <svg
                viewBox="0 0 22 14"
                fill="none"
                aria-hidden="true"
                className="w-[18px] h-[12px] shrink-0 transition-transform duration-300 ease-out"
                style={{
                  transform: isSectionOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              >
                <path
                  d="M2 2 L11 11 L20 2"
                  stroke="#2A1830"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </FadeIn>

        {/* Collapsible Questions List */}
        <AnimatePresence initial={false}>
          {isSectionOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden mt-6 md:mt-8"
            >
              <div className="border-t border-[#E7DFD0]">
                {faqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border-b border-[#E7DFD0]"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full py-5 md:py-6 flex items-center justify-between text-left gap-6 cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C22E5C] focus-visible:outline-offset-2 transition-colors group"
                      >
                        <span 
                          className="text-[18px] md:text-[21px] font-medium leading-snug"
                          style={{
                            fontFamily: '"Newsreader", Georgia, serif',
                            fontWeight: 500,
                            fontStyle: 'normal',
                            color: '#2A1830'
                          }}
                        >
                          {faq.question}
                        </span>

                        <svg
                          viewBox="0 0 22 14"
                          fill="none"
                          aria-hidden="true"
                          className="w-[18px] md:w-[20px] h-[12px] md:h-[13px] shrink-0 transition-transform duration-300 ease-out"
                          style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                        >
                          <path
                            d="M2 2 L11 11 L20 2"
                            stroke="#2A1830"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden"
                          >
                            <div 
                              className="pt-2 pb-6 text-left"
                              style={{
                                fontFamily: '"Plus Jakarta Sans", sans-serif',
                                fontSize: '16px',
                                lineHeight: 1.65,
                                color: '#262624',
                                fontStyle: 'normal'
                              }}
                            >
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#2A1830] pt-16 pb-12 px-6 relative" style={{ backgroundColor: '#2A1830', color: '#FBF8F1' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Left Column: Logo, Description, Social Icons */}
          <div className="max-w-md">
            <div className="flex flex-col mb-6">
              <span 
                className="text-[30px] leading-none"
                style={{
                  fontFamily: '"Newsreader", Georgia, serif',
                  fontWeight: 500,
                  color: '#FBF8F1'
                }}
              >
                Luminaria
              </span>
              <span 
                className="text-[12px] font-semibold uppercase mt-1 tracking-[0.25em]"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  color: 'rgba(251, 248, 241, 0.6)'
                }}
              >
                IMAGINEERIUM
              </span>
            </div>
            
            <p 
              className="text-[17px] font-normal leading-[1.6] mb-8"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: 'rgba(251, 248, 241, 0.85)'
              }}
            >
              Luminaria Imagineerium is an arts and innovation project building a space for collective imagination and creative action.
            </p>

            {/* Social icons: Email, Facebook, and Instagram */}
            <div className="flex items-center gap-3">
              <a 
                href="mailto:Imagineerium@theluminaria.com" 
                aria-label="Send email to Imagineerium"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  backgroundColor: 'rgba(251, 248, 241, 0.08)',
                  color: '#FBF8F1'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF5C8A';
                  e.currentTarget.style.color = '#2A1830';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(251, 248, 241, 0.08)';
                  e.currentTarget.style.color = '#FBF8F1';
                }}
              >
                <Mail className="w-[18px] h-[18px]" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook: The Luminaria"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  backgroundColor: 'rgba(251, 248, 241, 0.08)',
                  color: '#FBF8F1'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF5C8A';
                  e.currentTarget.style.color = '#2A1830';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(251, 248, 241, 0.08)';
                  e.currentTarget.style.color = '#FBF8F1';
                }}
              >
                <Facebook className="w-[18px] h-[18px]" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram: The Luminaria"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  backgroundColor: 'rgba(251, 248, 241, 0.08)',
                  color: '#FBF8F1'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF5C8A';
                  e.currentTarget.style.color = '#2A1830';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(251, 248, 241, 0.08)';
                  e.currentTarget.style.color = '#FBF8F1';
                }}
              >
                <Instagram className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact */}
          <div className="w-full md:w-auto md:min-w-[280px]">
            <h4 
              className="text-[13px] font-bold uppercase tracking-[0.14em] mb-4"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: '#F4A62A'
              }}
            >
              CONTACT
            </h4>
            <div 
              className="space-y-4 text-[15px]"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: 'rgba(251, 248, 241, 0.85)'
              }}
            >
              <p>
                Questions? Contact us at{" "}
                <a 
                  href="mailto:Imagineerium@theluminaria.com" 
                  className="transition-colors hover:text-[#FF5C8A]"
                  style={{ color: 'rgba(251, 248, 241, 0.85)' }}
                >
                  Imagineerium@theluminaria.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Divider line above legal text: 1px, Vellum at 15% opacity */}
        <div className="pt-8 border-t border-[#FBF8F1]/15 space-y-5">
          <div className="max-w-4xl space-y-3">
            <p 
              className="text-[13px] font-normal leading-[1.6]"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: 'rgba(251, 248, 241, 0.6)'
              }}
            >
              Luminaria Imagineerium is a sponsored project of Fractured Atlas, a non-profit arts service organization. Contributions for the charitable purposes of Luminaria Imagineerium must be made payable to “Fractured Atlas” only and are tax-deductible to the extent permitted by law.
            </p>
            <p 
              className="text-[13px] font-normal leading-[1.6]"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                color: 'rgba(251, 248, 241, 0.6)'
              }}
            >
              You can view the{" "}
              <a 
                href="https://identity.fracturedatlas.org/privacy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline transition-colors hover:text-[#FF5C8A]"
                style={{ color: 'rgba(251, 248, 241, 0.8)' }}
              >
                Fractured Atlas Privacy Policy
              </a>{" "}
              to learn how your donor data is protected.
            </p>
          </div>
          <p 
            className="text-[12px] font-semibold uppercase tracking-[0.1em] pt-2"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: 'rgba(244, 166, 42, 0.8)'
            }}
          >
            &copy; 2026 Luminaria Imagineerium. Built with wonder.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-[#FF5C8A] selection:text-[#2A1830] bg-warm-light">
      <TopBanner />
      <Navbar />
      <main>
        {/* 1 */} <Hero />
        {/* 2 */} <GuideSection />
        {/* 3 */} <ProblemSection />
        {/* 4 */} <GallerySection />
        {/* 5 */} <HelpGiveDreamsAHomeSection />
        {/* 6 */} <CollectiveVisionSection />
        {/* 7 */} <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
