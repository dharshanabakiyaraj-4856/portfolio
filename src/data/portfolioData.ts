import nptelCertificate from '../assets/nptel.png'
import certWorkshop from '../assets/certificates/cert1.jpg'
import certConvergence from '../assets/certificates/cert2.jpg'
import certInternship from '../assets/certificates/cert3.jpg'
import certPaper from '../assets/certificates/cert4.jpg'

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Project {
  title: string
  type: string
  description: string
  technologies: string[]
  features: string[]
  githubUrl?: string
  liveUrl?: string
  metric?: string
}

export interface ExperienceItem {
  imageUrl?: string

  type: string
  date: string
  title: string
  description?: string
  company?: string
  responsibilities?: string[]
  technologies?: string[]
}

export interface Certification {
  name: string
  issuer: string
  imageUrl: string
  status: string
  percentage: string
  certificateUrl?: string
}

export interface Achievement {
  imageUrl?: string

  title: string
  event: string
  organization: string
  date: string
  description: string
  icon: 'award' | 'paper' | 'workshop'
}

export const portfolioData = {
  name: 'Dharsana B',
  title: 'AI & ML Student | Aspiring Software Developer',
  location: 'Tiruppur, Tamil Nadu, India',
  introduction: 'I am an Artificial Intelligence and Machine Learning student building a practical foundation in software development, data analysis, and intelligent systems.',
  email: 'dharshanabakiyaraj@gmail.com',
  githubUrl: 'https://github.com/dharshanabakiyaraj-4856',
  linkedinUrl: 'https://www.linkedin.com/in/dharshana-bakiyaraj-715b54315/',
  resumeUrl: '/resume.pdf',
  skills: [
    { category: 'Programming Languages', items: ['C', 'C++', 'Java', 'Python', 'JavaScript'] },
    { category: 'Frontend', items: ['HTML', 'CSS', 'React'] },
    { category: 'Database', items: ['SQL'] },
    { category: 'Tools', items: ['GitHub', 'VS Code'] },
    { category: 'Strengths', items: ['Problem Solving', 'Debugging', 'Logical Thinking', 'Data Analysis', 'Quick Learning', 'Building Practical Projects'] },
  ] satisfies SkillGroup[],
  projects: [
    {
      title: 'Bank Loan Approval Prediction System',
      type: 'Mini Project',
      description: 'Built an ML model to predict loan approval using applicant financial data.',
      technologies: ['Python', 'Machine Learning', 'CatBoost', 'Pandas', 'SQL'],
      features: ['Applied data preprocessing.', 'Used CatBoost classification.', 'Applied SHAP explainability to understand model predictions.'],
      githubUrl: 'https://github.com/dharshanabakiyaraj-4856/MACHINE-LEARNING-BASED-LOAN-APPROVAL-SYSTEM-WITH-FAIRNESS-AUDITING-',
      liveUrl: undefined,
      metric: '85.37% Accuracy',
    },
    {
      title: 'E-Commerce Web Application',
      type: 'MERN Stack Project',
      description: 'Built and deployed a full-stack e-commerce application with frontend, backend, and admin modules.',
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      features: ['Implemented authentication.', 'Implemented product management.', 'Implemented order processing.', 'Used a scalable full-stack architecture.'],
      githubUrl: undefined,
      liveUrl: undefined,
    },
  ] satisfies Project[],
  experience: [
    { type: 'Internship', date: '15-Day Internship', title: 'AI & Machine Learning Intern', company: 'Litz Tech', imageUrl: certInternship, description: undefined, responsibilities: ['Worked on Python-based AI/ML tasks including data preprocessing and model development.', 'Learned ML workflow, evaluation techniques, and basic data analysis.'], technologies: undefined },
    { type: 'Trainer', date: '6 Months', title: 'C & C++ Programming Trainer', company: 'TCDS', description: undefined, responsibilities: ['Delivered C/C++ programming training.', 'Guided students in coding fundamentals.', 'Improved learners\' problem-solving and debugging skills through practical exercises.'], technologies: ['C', 'C++'] },
  ] satisfies ExperienceItem[],
  achievements: [
    { title: '1st Prize – Web Development', event: 'CONVERGENCE 2K26', organization: 'NIT', date: '21/03/2026', description: 'Won 1st Prize in Web Development at CONVERGENCE 2K26, NIT.', icon: 'award', imageUrl: certConvergence },
    { title: 'Paper Presented – Advanced Food Logistics and Delivery System Using Neural Stack', event: "ICRTCSDA'25", organization: 'KPRCAS', date: '2025', description: 'Presented a paper titled "Advanced Food Logistics and Delivery System Using Neural Stack" at ICRTCSDA\'25, KPRCAS.', icon: 'paper', imageUrl: certPaper },
    { title: 'Participant – AI Toolbox: Low Machines Learn, See and Talk', event: 'Pre-Conference Workshop', organization: 'Dr. N.G.P. Arts & Science College, Curtin University', date: '03/02/2026', description: 'Participated in the Pre-Conference Workshop on AI Toolbox organized by the Faculty of Computer Science in collaboration with Curtin University.', icon: 'workshop', imageUrl: certWorkshop },
  ] satisfies Achievement[],
  education: { degree: 'B.Sc. Artificial Intelligence and Machine Learning', institution: 'Dr. N.G.P. Arts and Science College', details: 'Graduation year: 2027 · Tiruppur, Tamil Nadu, India' },
  certifications: [
    { name: 'Joy of Computing Using Python', issuer: 'NPTEL', imageUrl: nptelCertificate, status: 'ELITE', percentage: '69%', certificateUrl: undefined },
  ] satisfies Certification[],
}
export const newCertificates = { internships: [{ title: 'Artificial Intelligence Internship', organization: 'Litz Tech', date: '2025-05-13 to 2025-05-29', description: 'Completed Artificial Intelligence Internship.', imageUrl: certInternship }], paperPresentations: [{ title: 'Advanced Food Logistics and Delivery using Travel Stack', organization: 'KPR College of Arts Science and Research', event: 'ICRTCSDA 2025', date: 'February 13, 2025', imageUrl: certPaper }], conferences: [{ title: 'Pre-Conference Workshop on AI Toolbox: Low Machines Learn, See and Talk', organization: 'Dr. N.G.P. Arts and Science College and Curtin University', date: '3rd February 2026', participationType: 'Participant', imageUrl: certWorkshop }], achievements: [{ title: 'II Place in Web Development', event: 'CONVERGENCE 2K26', organization: 'Nehru Institute of Technology', date: 'March 12th, 2026', prize: 'II Place', imageUrl: certConvergence }] };
