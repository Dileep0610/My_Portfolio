'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import {
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useClientTheme } from '../hooks/useClientTheme';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const totalProjects = projects.length;
  const { resolvedTheme, mounted } = useClientTheme();

  const getImageUrl = useCallback(
    (image: string | { dark: string; light: string }) => {
      if (typeof image === 'string') return image;
      return !mounted ? image.light : resolvedTheme === 'dark' ? image.dark : image.light;
    },
    [mounted, resolvedTheme]
  );

  // Jump smoothly to a specific project
  const goToProject = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(totalProjects - 1, index));
      setActiveIndex(clampedIndex);

      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

      if (isDesktop) {
        const st = ScrollTrigger.getById('projects-horizontal-scroll');
        if (st) {
          const scrollDistance = st.end - st.start;
          const targetScroll = st.start + (clampedIndex / (totalProjects - 1)) * scrollDistance;
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      } else {
        const track = trackRef.current;
        if (track && track.children[clampedIndex]) {
          const card = track.children[clampedIndex] as HTMLElement;
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    },
    [totalProjects]
  );

  const handlePrev = () => {
    if (activeIndex > 0) {
      goToProject(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < totalProjects - 1) {
      goToProject(activeIndex + 1);
    }
  };

  // GSAP ScrollTrigger Pinned Horizontal Translation for Desktop
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const track = trackRef.current;

      if (!section || !container || !track) return;

      const mm = gsap.matchMedia();

      // Desktop (>= 768px): Pin the section and horizontally translate the single track along X
      mm.add('(min-width: 768px)', () => {
        const getScrollDistance = () => track.scrollWidth - container.clientWidth;

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            id: 'projects-horizontal-scroll',
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const idx = Math.min(
                totalProjects - 1,
                Math.round(progress * (totalProjects - 1))
              );
              setActiveIndex(idx);
            },
          },
        });
      });

      return () => mm.revert();
    }, sectionRef);

    // Refresh ScrollTrigger once fonts/images are ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [totalProjects]);

  // Touch scroll listener for mobile swipe
  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) return;
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.82;
    const newIdx = Math.min(
      totalProjects - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setActiveIndex(newIdx);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="FeaturedProjectsSection relative w-full md:h-screen md:max-h-screen py-12 md:py-8 flex flex-col justify-between overflow-hidden"
    >
      {/* 1. Header & Navigation Controls Container */}
      <div className="relative w-full px-4 md:px-12 mb-4 md:mb-6 flex-shrink-0">
        {/* Full-width horizontally centered heading & subtitle relative to viewport */}
        <div className="w-full text-center flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold gradient-text">
            Featured Projects
          </h2>
          <p className="text-sm md:text-base text-[#B8B3C5] mt-1.5 font-medium max-w-xl mx-auto">
            Explore my work through an interactive, horizontal 3D project showcase.
          </p>
        </div>

        {/* Independent Right-Aligned Navigation Controls */}
        <div className="mt-4 md:mt-0 md:absolute md:right-8 lg:md:right-12 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center md:justify-end gap-3.5 z-20">
          {/* Stage Counter */}
          <div className="px-3 py-1.5 rounded-full bg-[#111116] border border-[#393344] font-mono text-xs font-bold text-[#9875FF] shadow-inner">
            {String(activeIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
          </div>

          {/* Quick-Jump Progress Indicator Dots */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#111116] border border-[#393344]">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goToProject(i)}
                aria-label={`Jump to project ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? 'w-6 bg-gradient-to-r from-[#9875FF] to-[#657BFF] shadow-[0_0_8px_#9875FF]'
                    : 'w-2 bg-[#393344] hover:bg-[#9875FF]/50'
                }`}
              />
            ))}
          </div>

          {/* Previous & Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className={`p-2 rounded-full border border-[#393344] bg-[#111116] text-white transition-all duration-300 shadow-md ${
                activeIndex === 0
                  ? 'opacity-35 cursor-not-allowed'
                  : 'hover:border-[#9875FF] hover:bg-[#201830] hover:shadow-[0_0_15px_rgba(152,117,255,0.3)] hover:scale-105 active:scale-95'
              }`}
            >
              <ChevronLeftIcon className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === totalProjects - 1}
              aria-label="Next project"
              className={`p-2 rounded-full border border-[#393344] bg-[#111116] text-white transition-all duration-300 shadow-md ${
                activeIndex === totalProjects - 1
                  ? 'opacity-35 cursor-not-allowed'
                  : 'hover:border-[#9875FF] hover:bg-[#201830] hover:shadow-[0_0_15px_rgba(152,117,255,0.3)] hover:scale-105 active:scale-95'
              }`}
            >
              <ChevronRightIcon className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. HorizontalScrollContainer */}
      <div
        ref={containerRef}
        onScroll={handleMobileScroll}
        className="HorizontalScrollContainer relative w-full flex-1 flex items-center overflow-x-auto md:overflow-hidden snap-x snap-mandatory md:snap-none scroll-smooth py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* 3. HorizontalProjectTrack: All projects in one continuous row */}
        <div
          ref={trackRef}
          className="HorizontalProjectTrack flex flex-row flex-nowrap w-max gap-6 md:gap-8 lg:gap-10 px-4 md:px-12 items-center"
          style={{ willChange: 'transform' }}
        >
          {projects.map((project, index) => {
            const stageNumber = String(index + 1).padStart(2, '0');
            const totalStages = String(totalProjects).padStart(2, '0');
            const hasLiveDemo = project.demo && project.demo !== '#';

            return (
              <div
                key={project.name}
                className="flex-shrink-0 w-[86vw] sm:w-[80vw] lg:w-[76vw] max-w-[1020px] snap-center"
              >
                {/* 3D Glass Project Card - Consistent Two-Column Layout */}
                <div className="relative group w-full max-h-[64vh] rounded-3xl overflow-hidden border border-[#393344] bg-gradient-to-b from-[#18181f]/90 via-[#111116]/90 to-[#0b0b0e]/95 backdrop-blur-xl p-5 sm:p-7 lg:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_20px_45px_-15px_rgba(0,0,0,0.85)] hover:border-[#9875FF]/40 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_25px_50px_-15px_rgba(0,0,0,0.9),0_0_25px_rgba(152,117,255,0.15)] transition-all duration-300">
                  {/* Subtle Ambient Hover Glow */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#9875FF]/15 via-[#657BFF]/10 to-[#9875FF]/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Top Glass Rim Specular Highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                  {/* Two-Column Internal Layout: Left Image, Right Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Left Side: Preview Image */}
                    <div className="lg:col-span-7 w-full">
                      <div className="relative group/preview w-full rounded-2xl overflow-hidden border border-[#393344] bg-[#0c0c10] shadow-xl">
                        {/* Glow backdrop behind image */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#9875FF]/20 to-[#657BFF]/20 rounded-2xl blur-lg opacity-25 group-hover/preview:opacity-60 transition-opacity duration-500 pointer-events-none" />

                        {/* Aspect Ratio Screenshot Container */}
                        <div className="relative w-full h-48 sm:h-60 lg:h-[290px] xl:h-[310px] overflow-hidden">
                          <Image
                            src={getImageUrl(project.image)}
                            alt={project.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover/preview:scale-105"
                          />

                          {/* Soft Vignette Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e]/80 via-transparent to-transparent pointer-events-none" />

                          {/* Stage Status Tag on Screenshot */}
                          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#393344]/80 text-[#C3B5DC] text-[11px] font-mono shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9875FF] animate-pulse" />
                            <span>Project {stageNumber}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Information Panel */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full">
                      <div>
                        {/* 1. Stage Number Pill */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-[#201830]/90 text-[#9875FF] border border-[#393344] shadow-sm">
                            {stageNumber} / {totalStages}
                          </span>
                          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#393344] via-[#9875FF]/20 to-transparent" />
                        </div>

                        {/* 2. Prominent Project Title (#FFFFFF) */}
                        <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight group-hover:text-white transition-colors">
                          {project.name}
                        </h3>

                        {/* 3. Description (#B8B3C5) */}
                        <p className="text-xs sm:text-sm text-[#B8B3C5] mt-2 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>

                        {/* 4. Technology Stack Pills (#C3B5DC) */}
                        <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                          {project.tags.slice(0, 6).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#16161e]/80 text-[#C3B5DC] border border-[#393344] hover:border-[#9875FF]/50 hover:text-white transition-all duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 6 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#16161e]/80 text-[#C3B5DC] border border-[#393344]">
                              +{project.tags.length - 6}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 5. Consistently Aligned Bottom Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#393344]/30">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-heading text-xs sm:text-sm font-semibold bg-[#16161e] border border-[#393344] text-white hover:border-[#9875FF]/60 hover:bg-[#201830] hover:shadow-[0_0_15px_rgba(152,117,255,0.2)] hover:scale-105 active:scale-95 transition-all duration-300"
                          title="View Source Code"
                        >
                          <FaGithub className="w-3.5 h-3.5 text-[#9875FF]" />
                          <span>Source Code</span>
                        </a>

                        {hasLiveDemo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-heading text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#9875FF] to-[#657BFF] text-white shadow-[0_0_15px_rgba(152,117,255,0.25)] hover:shadow-[0_0_24px_rgba(152,117,255,0.45)] hover:scale-105 active:scale-95 transition-all duration-300"
                            title="Open Live Application"
                          >
                            <span>Live Demo</span>
                            <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
