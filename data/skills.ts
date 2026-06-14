import { FaHtml5, FaCss3Alt, FaJs, FaGit, FaJava } from 'react-icons/fa';
import { SiMysql, SiPython } from 'react-icons/si';
import { MdBarChart } from 'react-icons/md';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import { IconType } from 'react-icons';

export interface Skill {
  name: string;
  icon: IconType;
  proficiency: number; // 0-100
  experience: string;
  description: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Language' | 'Tools';
}

export const skills: Skill[] = [
  {
    name: 'HTML',
    icon: FaHtml5,
    proficiency: 95,
    experience: '3+ years',
    description: 'Semantic markup, accessibility, and modern HTML5 features',
    category: 'Frontend'
  },
  {
    name: 'CSS',
    icon: FaCss3Alt,
    proficiency: 90,
    experience: '3+ years',
    description: 'Advanced layouts, animations, and responsive design',
    category: 'Frontend'
  },
  {
    name: 'JavaScript',
    icon: FaJs,
    proficiency: 92,
    experience: '3+ years',
    description: 'ES6+, async programming, and modern JavaScript patterns',
    category: 'Language'
  },
  {
    name: 'MySQL',
    icon: SiMysql,
    proficiency: 80,
    experience: '2+ years',
    description: 'Relational databases, complex queries, and optimization',
    category: 'Database'
  },
  {
    name: 'Python',
    icon: SiPython,
    proficiency: 86,
    experience: '2+ years',
    description: 'Data structures, algorithms, and backend development',
    category: 'Language'
  },
  {
    name: 'Java',
    icon: FaJava,
    proficiency: 83,
    experience: '2+ years',
    description: 'OOP principles, data structures, and application development',
    category: 'Language'
  },
  {
    name: 'Power BI',
    icon: MdBarChart,
    proficiency: 90,
    experience: '2+ years',
    description: 'Data modeling, DAX expressions, interactive dashboards, and Power Query ETL pipelines',
    category: 'Tools'
  },
  {
    name: 'Excel',
    icon: PiMicrosoftExcelLogo,
    proficiency: 89,
    experience: '2+ years',
    description: 'Advanced data analysis, pivot tables, VLOOKUP/XLOOKUP, macros, and data visualization',
    category: 'Tools'
  },
  
  {
    name: 'Git',
    icon: FaGit,
    proficiency: 89,
    experience: '3+ years',
    description: 'Version control, branching strategies, and collaboration',
    category: 'Tools'
  },
]; 