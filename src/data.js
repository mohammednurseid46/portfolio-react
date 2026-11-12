// All site content lives here, so you can edit text without touching components.

export const profile = {
  name: 'Mohammednur Seid',
  email: 'mohammednurseid46@gmail.com',
  phone: '+251945733006',
  phoneLabel: '+251 945 733 006',
  linkedin: 'https://www.linkedin.com/in/mohammednur-seid-97873a3aa',
  github: 'https://github.com/mohammednurseid46',
  tagline: 'Code, Learn, Innovate.',
  intro:
    'I build elegant, high-performance digital solutions, from clean interfaces to the APIs and databases behind them.',
}

export const roles = [
  'Full Stack Developer',
  '4th Year Student at Bahir Dar University',
  'IT Professional',
  'UI/UX Designer',
]

export const aboutSkills = [
  'JavaScript', 'React', 'Node.js', 'Python', 'SQL',
  'Next.js', 'FastAPI', 'Tailwind CSS', 'UI/UX Design',
]

export const stats = [
  { value: 4, suffix: '+', label: 'Years of learning' },
  { value: 5, suffix: '', label: 'Projects shipped' },
  { value: 9, suffix: '+', label: 'Technologies' },
]

// icon names are resolved in components/Skills.jsx
export const skills = [
  { title: 'JavaScript', icon: 'javascript' },
  { title: 'TypeScript', icon: 'typescript' },
  { title: 'React', icon: 'react' },
  { title: 'Next.js', icon: 'next' },
  { title: 'Tailwind CSS', icon: 'tailwind' },
  { title: 'UI/UX Design', icon: 'design' },
  { title: 'Node.js', icon: 'node' },
  { title: 'Python', icon: 'python' },
  { title: 'FastAPI', icon: 'fastapi' },
  { title: 'Flask', icon: 'flask' },
  { title: 'C# and .NET', icon: 'csharp' },
  { title: 'SQL', icon: 'sql' },
  { title: 'PostgreSQL', icon: 'postgres' },
  { title: 'PostGIS', icon: 'postgis' },
  { title: 'SQLite', icon: 'sqlite' },
  { title: 'SQL Server', icon: 'sqlserver' },
  { title: 'Java and JavaFX', icon: 'java' },
  { title: 'Flutter and Dart', icon: 'flutter' },
  { title: 'Networking Fundamentals', icon: 'networking' },
  { title: 'TCP/IP and Subnetting', icon: 'tcpip' },
  { title: 'LAN/WAN and VLANs', icon: 'lan' },
  { title: 'Cisco Packet Tracer', icon: 'cisco' },
]

// from the old site's "Services" section
export const services = [
  { title: 'Web Development', desc: 'Responsive, high-performance websites built with the latest frameworks and best practices.', icon: 'globe' },
  { title: 'UI/UX Design', desc: 'Intuitive, aesthetically pleasing interfaces that give users a seamless journey.', icon: 'pen' },
  { title: 'Frontend Development', desc: 'Interactive, responsive experiences using React, Tailwind CSS, and modern JavaScript.', icon: 'layout' },
  { title: 'Backend Development', desc: 'Scalable server-side applications, secure APIs, and efficient database management.', icon: 'server' },
  { title: 'Frameworks & Tools', desc: 'FastAPI, Next.js, and Node.js to build fast, maintainable solutions.', icon: 'wrench' },
  { title: 'Tech Support', desc: 'Technical assistance and troubleshooting for software and hardware systems.', icon: 'life' },
]

export const projects = [
  {
    title: 'DRM Transport System',
    desc: 'A full-stack transportation and logistics platform featuring spatial distance calculations, driver tracking, and route management.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'PostGIS'],
    category: 'Web',
    link: 'https://drm-transport-system.vercel.app/',
    image: 'drm.jpg',
    featured: true,
  },
  {
    title: 'FlutterQuickhelp',
    desc: 'A Flutter-based quick help application providing fast and efficient assistance with a clean mobile UI.',
    tags: ['Flutter', 'Dart', 'Mobile'],
    category: 'Mobile',
    link: 'https://github.com/mohammednurseid46/FlutterQuickhelp',
    image: 'flutter.jpg',
  },
  {
    title: 'JavaUI',
    desc: 'A Java-based user interface project showcasing desktop application design with modern UI components.',
    tags: ['Java', 'UI', 'Desktop'],
    category: 'Desktop',
    link: 'https://github.com/mohammednurseid46/JavaUI',
  },
  {
    title: 'Portfolio 1',
    desc: 'A personal portfolio website highlighting my skills and projects.',
    tags: ['HTML', 'CSS', 'JS'],
    category: 'Web',
    link: 'https://mohammednurseid46.github.io/my-portfolio-2/',
    image: 'port1.jpg',
    features: ['Responsive Design', 'Custom CSS Styling', 'Project Showcase'],
  },
  {
    title: 'Portfolio 2',
    desc: 'Another portfolio iteration with different design aesthetics, themes and interactive backgrounds.',
    tags: ['Web', 'Design', 'Portfolio'],
    category: 'Web',
    link: 'https://mohammednurseid46.github.io/MyPortfolio/',
    image: 'port2.jpg',
    features: ['Modern UI', 'Interactive Elements', 'Clean Layout'],
  },
]

export const accents = ['cyan', 'violet', 'emerald', 'amber']
export const backgrounds = [
  { id: 'constellation', label: 'Constellation' },
  { id: 'neural', label: 'Neural network' },
  { id: 'minimal', label: 'Minimal' },
]
export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
