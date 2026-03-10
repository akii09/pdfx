import { renderToBuffer } from '@react-pdf/renderer';
import { describe, expect, it } from 'vitest';
import { PdfxThemeProvider } from '../../lib/pdfx-theme-context';
import { ResumeTemplate } from './resume';
import type {
  ResumeCertification,
  ResumeEducation,
  ResumeExperience,
  ResumeLanguage,
  ResumePersonal,
  ResumeProject,
  ResumeSkillCategory,
  ResumeSummary,
} from './resume.types';

const mockPersonal: ResumePersonal = {
  name: 'John Doe',
  title: 'Senior Software Engineer',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/johndoe',
  github: 'github.com/johndoe',
  website: 'johndoe.dev',
};

const mockSummary: ResumeSummary = {
  content:
    'Experienced software engineer with 8+ years building scalable web applications. Passionate about clean code, system design, and mentoring junior developers.',
};

const mockExperience: ResumeExperience[] = [
  {
    company: 'TechCorp Inc',
    role: 'Senior Software Engineer',
    startDate: 'Jan 2020',
    endDate: 'Present',
    location: 'San Francisco, CA',
    highlights: [
      'Led development of microservices architecture serving 10M+ users',
      'Mentored team of 5 junior developers',
      'Reduced API response time by 40% through optimization',
    ],
  },
  {
    company: 'StartupXYZ',
    role: 'Software Engineer',
    startDate: 'Jun 2017',
    endDate: 'Dec 2019',
    location: 'New York, NY',
    description: 'Full-stack development using React, Node.js, and PostgreSQL.',
  },
];

const mockEducation: ResumeEducation[] = [
  {
    institution: 'Stanford University',
    degree: 'M.S.',
    field: 'Computer Science',
    startDate: '2015',
    endDate: '2017',
    gpa: '3.9/4.0',
  },
  {
    institution: 'UC Berkeley',
    degree: 'B.S.',
    field: 'Computer Science',
    endDate: '2015',
  },
];

const mockSkills: ResumeSkillCategory[] = [
  { category: 'Languages', skills: ['TypeScript', 'Python', 'Go', 'Rust'] },
  { category: 'Frameworks', skills: ['React', 'Node.js', 'Next.js', 'FastAPI'] },
  { category: 'Tools', skills: ['Docker', 'Kubernetes', 'AWS', 'PostgreSQL'] },
];

const mockProjects: ResumeProject[] = [
  {
    name: 'Open Source CMS',
    description: 'A headless CMS built with TypeScript and GraphQL',
    technologies: ['TypeScript', 'GraphQL', 'PostgreSQL'],
    url: 'github.com/johndoe/cms',
  },
];

const mockCertifications: ResumeCertification[] = [
  {
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
  },
];

const mockLanguages: ResumeLanguage[] = [
  { language: 'English', proficiency: 'Native' },
  { language: 'Spanish', proficiency: 'Fluent' },
];

const baseProps = {
  personal: mockPersonal,
  summary: mockSummary,
  experience: mockExperience,
  education: mockEducation,
  skills: mockSkills,
};

describe('ResumeTemplate', () => {
  it('renders professional variant without crashing', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate {...baseProps} variant="professional" />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders modern variant without crashing', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate {...baseProps} variant="modern" />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders minimal variant without crashing', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate {...baseProps} variant="minimal" />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('defaults to professional variant when not specified', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate {...baseProps} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with minimal personal info only', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate personal={{ name: 'Jane Doe' }} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with projects section', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate {...baseProps} projects={mockProjects} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with certifications section', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate {...baseProps} certifications={mockCertifications} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with languages section', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate {...baseProps} languages={mockLanguages} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with custom accent color', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate {...baseProps} variant="modern" accentColor="#2563eb" />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('sets custom PDF title', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate {...baseProps} title="John Doe - CV 2026" />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('applies custom page style', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate {...baseProps} style={{ padding: 30 }} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders all sections in modern variant', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate
          variant="modern"
          personal={mockPersonal}
          summary={mockSummary}
          experience={mockExperience}
          education={mockEducation}
          skills={mockSkills}
          projects={mockProjects}
          certifications={mockCertifications}
          languages={mockLanguages}
        />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders with empty arrays gracefully', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate personal={mockPersonal} experience={[]} education={[]} skills={[]} />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('renders experience with description instead of highlights', async () => {
    const buffer = await renderToBuffer(
      <PdfxThemeProvider>
        <ResumeTemplate
          personal={mockPersonal}
          experience={[
            {
              company: 'Test Corp',
              role: 'Developer',
              startDate: '2020',
              description: 'Worked on various projects using modern technologies.',
            },
          ]}
        />
      </PdfxThemeProvider>
    );
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });
});
