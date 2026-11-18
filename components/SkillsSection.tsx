'use client';
import React, { useRef, useState, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { skills, Skill } from '../data/skills';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

// Brand colors for recognizable technology logos
const skillBrandColors: Record<string, string> = {
  HTML: '#E34F26',
  CSS: '#1572B6',
  JavaScript: '#F7DF1E',
  MySQL: '#4479A1',
  Python: '#3776AB',
  Java: '#EA2D42',
  'Power BI': '#F2C811',
  Excel: '#217346',
  Git: '#F05032',
};

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for natural elastic damping
  const springConfig = { stiffness: 240, damping: 22 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Perspective tilt angles (max 10 degrees for refined elegance)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || shouldReduceMotion) return;

      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates (-0.5 to 0.5)
      const xPct = clientX / width - 0.5;
      const yPct = clientY / height - 0.5;

      mouseX.set(xPct);
      mouseY.set(yPct);
      setSpotlightPos({ x: clientX, y: clientY });
    },
    [mouseX, mouseY, shouldReduceMotion]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Subtle floating vertical animation parameters staggered per card
  const floatDuration = 4 + (index % 4) * 0.6;
  const floatDelay = (index * 0.2) % 1.6;

  const brandColor = skillBrandColors[skill.name] || '#9875FF';

  return (
    <motion.div
      // Continuous ambient float on the outer wrapper
      animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: floatDelay,
      }}
      className="w-full"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.06 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        tabIndex={0}
        aria-label={`${skill.name} - ${skill.category} skill`}
        className="relative group w-full cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#9875FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {/* Subtle violet ambient glow on hover */}
        <div
          className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#9875FF]/20 via-[#657BFF]/15 to-[#9875FF]/20 blur-xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-50' : 'opacity-0'
          }`}
        />

        {/* 3D Glass Card Container - Deep Charcoal (#111116 base) */}
        <div
          className="relative w-full h-full rounded-2xl p-5 md:p-6 flex flex-col justify-between overflow-hidden border border-[#393344] bg-gradient-to-b from-[#18181f]/85 via-[#111116]/85 to-[#0b0b0e]/90 backdrop-blur-xl transition-all duration-300 group-hover:border-[#9875FF]/40 group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_16px_36px_-12px_rgba(0,0,0,0.9),0_0_24px_rgba(152,117,255,0.18)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Dynamic Interactive Mouse Specular Light (Soft violet glare on glass) */}
          {isHovered && !shouldReduceMotion && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(280px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(152, 117, 255, 0.08), transparent 70%)`,
              }}
            />
          )}

          {/* Top Glass Rim Specular Highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

          {/* Card Top Row: Category Badge & Experience Pill */}
          <div
            className="flex items-center justify-between gap-2 mb-5"
            style={{ transform: 'translateZ(30px)' }}
          >
            {/* Category: subtle dark-purple background (#201830) + light lavender text (#C3B5DC) */}
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#201830]/85 text-[#C3B5DC] border border-[#393344] backdrop-blur-md shadow-sm">
              {skill.category}
            </span>
            {/* Muted label for experience (#C3B5DC) */}
            <span className="text-[11px] text-[#C3B5DC] font-medium tracking-wide">
              {skill.experience}
            </span>
          </div>

          {/* Card Center: Floating 3D Technology Icon */}
          <div
            className="flex items-center justify-center my-3 relative"
            style={{ transform: 'translateZ(55px)' }}
          >
            {/* Glowing orb backdrop behind icon */}
            <div className="absolute w-16 h-16 rounded-full bg-[#9875FF]/10 blur-md group-hover:bg-[#9875FF]/25 group-hover:scale-125 transition-all duration-500" />

            {/* Dark translucent icon container with subtle violet border */}
            <div className="relative z-10 w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-[#16161e]/70 border border-[#393344] backdrop-blur-md flex items-center justify-center shadow-inner group-hover:border-[#9875FF]/50 group-hover:scale-110 group-hover:-rotate-2 transition-all duration-300">
              <skill.icon
                size={36}
                style={{ color: brandColor }}
                className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_4px_14px_rgba(152,117,255,0.45)] transition-all duration-300 md:!w-10 md:!h-10"
              />
            </div>
          </div>

          {/* Card Content: Title & Description */}
          <div
            className="text-center mt-3 mb-4"
            style={{ transform: 'translateZ(40px)' }}
          >
            {/* Main Text: #FFFFFF */}
            <h3 className="text-lg md:text-xl font-heading font-bold text-white tracking-tight group-hover:text-white transition-colors duration-200">
              {skill.name}
            </h3>
            {/* Secondary Text: #B8B3C5 */}
            <p className="text-xs text-[#B8B3C5] mt-1.5 leading-relaxed line-clamp-2 px-1">
              {skill.description}
            </p>
          </div>

          {/* Card Footer: Proficiency Metric & Refined Gradient Bar */}
          <div
            className="pt-3 border-t border-[#393344]/40 mt-auto"
            style={{ transform: 'translateZ(25px)' }}
          >
            <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
              <span className="text-[#B8B3C5]">Proficiency</span>
              <span className="text-[#9875FF] font-semibold">{skill.proficiency}%</span>
            </div>
            {/* Empty track: dark charcoal (#16161e) with subtle border */}
            <div className="w-full h-1.5 bg-[#16161e] rounded-full overflow-hidden p-[1px] border border-[#26222d]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
                // Refined gradient from violet (#9875FF) to blue (#657BFF)
                className="h-full rounded-full bg-gradient-to-r from-[#9875FF] to-[#657BFF] shadow-[0_0_8px_rgba(152,117,255,0.35)]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-12">
        <div className="flex flex-col gap-2 mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-bold gradient-text"
          >
            Technical Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-[#B8B3C5] font-medium max-w-2xl mx-auto"
          >
            The tools and technologies I use to bring digital ideas to life.
          </motion.p>
        </div>

        {/* 3D Glass Cards Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
