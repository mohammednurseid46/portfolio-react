import { Injectable } from '@nestjs/common';
const profile = {
  name: 'Mohammednur Seid',
  tagline: 'Code, Learn, Innovate.',
  email: 'mohammednurseid46@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/mohammednur-seid-97873a3aa',
    github: 'https://github.com/mohammednurseid46',
  },
  roles: ['Full Stack Developer', '4th Year Student at Bahir Dar University', 'IT Professional', 'UI/UX Designer'],
};
@Injectable()
export class ProfileService { get() { return profile; } }
