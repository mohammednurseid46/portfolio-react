import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient, Category } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be set before seeding`);
  }
  return value;
}

const skillsData = [
  { title: 'JavaScript', icon: 'javascript', desc: '', position: 1 },
  { title: 'TypeScript', icon: 'typescript', desc: '', position: 2 },
  { title: 'React', icon: 'react', desc: '', position: 3 },
  { title: 'Next.js', icon: 'next', desc: '', position: 4 },
  { title: 'Tailwind CSS', icon: 'tailwind', desc: '', position: 5 },
  { title: 'UI/UX Design', icon: 'design', desc: '', position: 6 },
  { title: 'Node.js', icon: 'node', desc: '', position: 7 },
  { title: 'Python', icon: 'python', desc: '', position: 8 },
  { title: 'FastAPI', icon: 'fastapi', desc: '', position: 9 },
  { title: 'Flask', icon: 'flask', desc: '', position: 10 },
  { title: 'C# and .NET', icon: 'csharp', desc: '', position: 11 },
  { title: 'SQL', icon: 'sql', desc: '', position: 12 },
  { title: 'PostgreSQL', icon: 'postgres', desc: '', position: 13 },
  { title: 'PostGIS', icon: 'postgis', desc: '', position: 14 },
  { title: 'SQLite', icon: 'sqlite', desc: '', position: 15 },
  { title: 'SQL Server', icon: 'sqlserver', desc: '', position: 16 },
  { title: 'Java and JavaFX', icon: 'java', desc: '', position: 17 },
  { title: 'Flutter and Dart', icon: 'flutter', desc: '', position: 18 },
  { title: 'Networking Fundamentals', icon: 'networking', desc: '', position: 19 },
  { title: 'TCP/IP and Subnetting', icon: 'tcpip', desc: '', position: 20 },
  { title: 'LAN/WAN and VLANs', icon: 'lan', desc: '', position: 21 },
  { title: 'Cisco Packet Tracer', icon: 'cisco', desc: '', position: 22 },
];

const servicesData = [
  {
    title: 'Web Development',
    desc: 'Responsive, high-performance websites built with the latest frameworks and best practices.',
    icon: 'globe',
    position: 1,
  },
  {
    title: 'UI/UX Design',
    desc: 'Intuitive, aesthetically pleasing interfaces that give users a seamless journey.',
    icon: 'pen',
    position: 2,
  },
  {
    title: 'Frontend Development',
    desc: 'Interactive, responsive experiences using React, Tailwind CSS, and modern JavaScript.',
    icon: 'layout',
    position: 3,
  },
  {
    title: 'Backend Development',
    desc: 'Scalable server-side applications, secure APIs, and efficient database management.',
    icon: 'server',
    position: 4,
  },
  {
    title: 'Frameworks & Tools',
    desc: 'FastAPI, Next.js, and Node.js to build fast, maintainable solutions.',
    icon: 'wrench',
    position: 5,
  },
  {
    title: 'Tech Support',
    desc: 'Technical assistance and troubleshooting for software and hardware systems.',
    icon: 'life',
    position: 6,
  },
];

const projectsData = [
  {
    title: 'DRM Transport System',
    desc: 'A full-stack transportation and logistics platform featuring spatial distance calculations, driver tracking, and route management.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'PostGIS'],
    category: Category.Web,
    link: 'https://drm-transport-system.vercel.app/',
    image: 'drm.jpg',
    features: [],
    featured: true,
    position: 1,
  },
  {
    title: 'FlutterQuickhelp',
    desc: 'A Flutter-based quick help application providing fast and efficient assistance with a clean mobile UI.',
    tags: ['Flutter', 'Dart', 'Mobile'],
    category: Category.Mobile,
    link: 'https://github.com/mohammednurseid46/FlutterQuickhelp',
    image: 'flutter.jpg',
    features: [],
    featured: false,
    position: 2,
  },
  {
    title: 'JavaUI',
    desc: 'A Java-based user interface project showcasing desktop application design with modern UI components.',
    tags: ['Java', 'UI', 'Desktop'],
    category: Category.Desktop,
    link: 'https://github.com/mohammednurseid46/JavaUI',
    image: null,
    features: [],
    featured: false,
    position: 3,
  },
  {
    title: 'Portfolio 1',
    desc: 'A personal portfolio website highlighting my skills and projects.',
    tags: ['HTML', 'CSS', 'JS'],
    category: Category.Web,
    link: 'https://mohammednurseid46.github.io/my-portfolio-2/',
    image: 'port1.jpg',
    features: ['Responsive Design', 'Custom CSS Styling', 'Project Showcase'],
    featured: false,
    position: 4,
  },
  {
    title: 'Portfolio 2',
    desc: 'Another portfolio iteration with different design aesthetics, themes and interactive backgrounds.',
    tags: ['Web', 'Design', 'Portfolio'],
    category: Category.Web,
    link: 'https://mohammednurseid46.github.io/MyPortfolio/',
    image: 'port2.jpg',
    features: ['Modern UI', 'Interactive Elements', 'Clean Layout'],
    featured: false,
    position: 5,
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Admin Seed
  const adminUsername = requiredEnv('ADMIN_USERNAME');
  const adminPassword = requiredEnv('ADMIN_PASSWORD');

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const existingAdmin = await prisma.admin.findFirst();
  const admin = existingAdmin
    ? existingAdmin
    : await prisma.admin.create({ data: { username: adminUsername, passwordHash } });
  console.log(`✅ Admin account synchronized (username: "${admin.username}")`);

  // 2. Skills Seed (Upsert)
  for (const skill of skillsData) {
    await prisma.skill.upsert({
      where: { title: skill.title },
      update: {
        desc: skill.desc,
        icon: skill.icon,
        position: skill.position,
      },
      create: skill,
    });
  }
  console.log(`✅ ${skillsData.length} skills seeded.`);

  // 3. Services Seed (Upsert)
  for (const service of servicesData) {
    await prisma.service.upsert({
      where: { title: service.title },
      update: {
        desc: service.desc,
        icon: service.icon,
        position: service.position,
      },
      create: service,
    });
  }
  console.log(`✅ ${servicesData.length} services seeded.`);

  // 4. Projects Seed (Upsert)
  for (const project of projectsData) {
    await prisma.project.upsert({
      where: { title: project.title },
      update: {
        desc: project.desc,
        tags: project.tags,
        category: project.category,
        link: project.link,
        image: project.image,
        features: project.features,
        featured: project.featured,
        position: project.position,
      },
      create: project,
    });
  }
  console.log(`✅ ${projectsData.length} projects seeded.`);

  console.log('✨ Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
