'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';
import { GlowingEffect } from './ui/glowing-effect';


const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-12">
        <div className="flex flex-col gap-2 mb-10 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold gradient-text">
            Key Achievements
          </h2>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Milestones that define my professional and academic growth.
          </p>
        </div>
        <div>
          {/* Certificates CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative group p-8 rounded-2xl bg-black/40 dark:bg-black/60 backdrop-blur-xl border border-white/5 dark:border-white/10 overflow-hidden shadow-xl">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.2} />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-shrink-0 text-white dark:text-gray-300">
                  <FaCertificate size={64} />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-heading text-2xl font-bold text-light-text-primary dark:text-text-primary">
                    Collection of Certificates
                  </h3>
                  <p className="mt-2 text-light-text-secondary dark:text-text-secondary">
                    Gallery of my certifications and official recognitions.
                  </p>
                </div>
                <div className="flex-shrink-0 mt-6 md:mt-0">
                  <a
                    href="/certificates"
                    className="inline-block px-8 py-3 rounded-lg font-heading bg-gradient-to-r from-black via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-100 text-white dark:text-black text-lg shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    View All
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection; 