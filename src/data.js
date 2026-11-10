export const profile = {
  name: 'Mohammednur Seid',
  role: 'Full-Stack Developer',
  school: 'Bahir Dar University',
  studyLevel: '4th-year Information Technology student',
  photoFilename: 'mohammednur.jpg',
  email: 'mohammednurseid46@gmail.com',
  phone: '+251 945 733 006',
  phoneLink: '+251945733006',
  linkedin: 'https://www.linkedin.com/in/mohammednur-seid-97873a3aa',
  github: 'https://github.com/mohammednurseid46',
};

export const typedWords = [
  'modern web apps.',
  'mobile experiences.',
  'desktop software.',
  'scalable backends.',
  'geospatial systems.',
];

// [label, short, color, category]
export const skills = [
  ['JavaScript', 'JS', '#f7c600', 'frontend'],
  ['TypeScript', 'TS', '#3178c6', 'frontend'],
  ['React', 'Re', '#0ea5c9', 'frontend'],
  ['Next.js', 'Nx', '#111827', 'frontend'],
  ['Tailwind CSS', 'Tw', '#14b8a6', 'frontend'],
  ['UI/UX Design', 'UX', '#ec4899', 'frontend'],
  ['Node.js', 'No', '#3f9b3f', 'backend'],
  ['Python', 'Py', '#3b78b5', 'backend'],
  ['FastAPI', 'FA', '#059985', 'backend'],
  ['Flask', 'Fl', '#4b5563', 'backend'],
  ['C# and .NET', 'C#', '#7c3aed', 'backend'],
  ['SQL', 'SQ', '#f97316', 'data'],
  ['PostgreSQL', 'Pg', '#336791', 'data'],
  ['PostGIS', 'PG', '#0d9488', 'data'],
  ['SQLite', 'SL', '#0f80cc', 'data'],
  ['SQL Server', 'MS', '#cc2927', 'data'],
  ['Java and JavaFX', 'Jv', '#e11d48', 'mobile'],
  ['Flutter and Dart', 'Fu', '#2196f3', 'mobile'],
  ['Networking Fundamentals', 'NF', '#2563eb', 'networking'],
  ['TCP/IP and Subnetting', 'IP', '#0891b2', 'networking'],
  ['LAN/WAN and VLANs', 'NW', '#0d9488', 'networking'],
  ['Cisco Packet Tracer', 'PT', '#1d4ed8', 'networking'],
];

export const projects = [
  {
    name: 'DRM Transport System',
    type: 'web',
    desc: 'A transport management platform with geospatial data and routing support, built on a modern full-stack architecture.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'PostGIS'],
    image: 'transport.png',
    live: 'https://drm-transport-system.vercel.app/',
    grad: 'linear-gradient(135deg,#0ea5e9,#6d5efc)',
    abbr: 'DRM',
  },
  {
    name: 'FlutterQuickhelp',
    type: 'mobile',
    desc: 'A mobile app built with Flutter and Dart that delivers quick help and answers in a clean, native-feeling interface.',
    tags: ['Flutter', 'Dart', 'Mobile'],
    image: 'flutter.jpg',
    code: 'https://github.com/mohammednurseid46/FlutterQuickhelp',
    grad: 'linear-gradient(135deg,#06b6d4,#3b82f6)',
    abbr: 'FQ',
  },
  {
    name: 'JavaUI',
    type: 'desktop',
    desc: 'A desktop application focused on building a clear, usable graphical interface with Java.',
    tags: ['Java', 'UI', 'Desktop'],
    code: 'https://github.com/mohammednurseid46/JavaUI',
    grad: 'linear-gradient(135deg,#f43f5e,#f97316)',
    abbr: 'JUI',
  },
  {
    name: 'Portfolio 1',
    type: 'web',
    desc: 'An earlier personal portfolio built with plain HTML, CSS and JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: 'port1.png',
    live: 'https://mohammednurseid46.github.io/my-portfolio-2/',
    grad: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
    abbr: 'P1',
  },
  {
    name: 'Portfolio 2',
    type: 'web',
    desc: 'A second portfolio iteration exploring layout, visual design and presentation.',
    tags: ['Web', 'Design', 'Portfolio'],
    image: 'port2.png',
    live: 'https://mohammednurseid46.github.io/MyPortfolio/',
    grad: 'linear-gradient(135deg,#10b981,#06b6d4)',
    abbr: 'P2',
  },
];

export const skillFilters = [
  ['all', 'All'],
  ['frontend', 'Frontend'],
  ['backend', 'Backend'],
  ['data', 'Databases'],
  ['mobile', 'Mobile & Desktop'],
  ['networking', 'Networking'],
];

export const projectFilters = [
  ['all', 'All'],
  ['web', 'Web'],
  ['mobile', 'Mobile'],
  ['desktop', 'Desktop'],
];
