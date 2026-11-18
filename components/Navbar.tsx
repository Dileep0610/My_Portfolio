'use client';

import React, { useState } from 'react';
import {
  IconHome,
  IconUser,
  IconCode,
  IconBriefcase,
  IconTrophy,
  IconMail,
  IconFileText
} from '@tabler/icons-react';
import { useRouter, usePathname } from 'next/navigation';
import ResumeModal from './ResumeModal';
import { FloatingDock } from './ui/floating-dock';


const Navbar = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (section: string) => {
    if (section === 'resume') {
      setIsResumeModalOpen(true);
      return;
    }

    if (pathname !== '/') {
      router.push(`/#${section}`);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { title: 'Home', icon: <IconHome className="h-full w-full" />, href: '#home', onClick: (e: React.MouseEvent) => { e.preventDefault(); handleNavigation('home'); } },
    { title: 'About', icon: <IconUser className="h-full w-full" />, href: '#about', onClick: (e: React.MouseEvent) => { e.preventDefault(); handleNavigation('about'); } },
    { title: 'Skills', icon: <IconCode className="h-full w-full" />, href: '#skills', onClick: (e: React.MouseEvent) => { e.preventDefault(); handleNavigation('skills'); } },
    { title: 'Projects', icon: <IconBriefcase className="h-full w-full" />, href: '#projects', onClick: (e: React.MouseEvent) => { e.preventDefault(); handleNavigation('projects'); } },
    { title: 'Certificates', icon: <IconTrophy className="h-full w-full" />, href: '#achievements', onClick: (e: React.MouseEvent) => { e.preventDefault(); handleNavigation('achievements'); } },
    { title: 'Contact', icon: <IconMail className="h-full w-full" />, href: '#contact', onClick: (e: React.MouseEvent) => { e.preventDefault(); handleNavigation('contact'); } },
    { title: 'Resume', icon: <IconFileText className="h-full w-full" />, href: '#resume', onClick: (e: React.MouseEvent) => { e.preventDefault(); handleNavigation('resume'); } },
  ];

  return (
    <>
      <div className="fixed top-1/2 right-10 -translate-y-1/2 z-50">
        <FloatingDock
          items={navItems}
          orientation="vertical"
          desktopClassName="bg-surface/60 backdrop-blur-xl border-border/50"
          mobileClassName="fixed top-6 right-6"
        />
      </div>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  );
};

export default Navbar;