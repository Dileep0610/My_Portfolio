'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { GlowingEffect } from './ui/glowing-effect';

const contactLinks = [
  {
    label: 'Email',
    value: 'kottakotadileepkumar5@gmail.com',
    href: 'mailto:kottakotadileepkumar5@gmail.com',
    icon: <FaEnvelope className="h-5 w-5" />,
  },
  {
    label: 'GitHub',
    value: 'Dileep0610',
    href: 'https://github.com/Dileep0610',
    icon: <FaGithub className="h-5 w-5" />,
  },
  {
    label: 'LinkedIn',
    value: 'dileep0610',
    href: 'https://www.linkedin.com/in/dileep0610/',
    icon: <FaLinkedin className="h-5 w-5" />,
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-12">
        <div className="flex flex-col gap-2 mb-10 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold gradient-text">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Open to internships, full-time roles, and collaborations. Let&apos;s build something impactful.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-black/40 dark:bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 shadow-xl"
        >
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.2} />

          <div className="flex items-center justify-center gap-2 text-slate-300 mb-8">
            <FaMapMarkerAlt className="text-light-text-primary dark:text-text-primary" />
            <span className="font-medium">Srikakulam, Andhra Pradesh, India</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-white/5 hover:border-white/30 transition-all duration-300 text-center"
              >
                <div className="text-light-text-primary dark:text-text-primary group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
                <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">{link.label}</span>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors duration-300">{link.value}</span>
              </motion.a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://wa.me/917993798232"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-heading bg-gradient-to-r from-black via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-100 text-white dark:text-black shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-base"
            >
              <FaWhatsapp /> Send a Message
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
