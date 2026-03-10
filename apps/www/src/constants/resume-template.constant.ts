export const resumeTemplateProps = [
  {
    name: 'variant',
    type: '"professional" | "modern" | "minimal"',
    defaultValue: '"professional"',
    description: 'Visual variant of the resume',
  },
  {
    name: 'personal',
    type: 'ResumePersonal',
    description:
      'Personal/contact info (name, title, email, phone, location, linkedin, github, website)',
    required: true,
  },
  {
    name: 'summary',
    type: 'ResumeSummary',
    description: 'Professional summary or objective section',
  },
  {
    name: 'experience',
    type: 'ResumeExperience[]',
    description: 'Work experience entries (company, role, dates, highlights)',
  },
  {
    name: 'education',
    type: 'ResumeEducation[]',
    description: 'Education entries (institution, degree, field, dates)',
  },
  {
    name: 'skills',
    type: 'ResumeSkillCategory[]',
    description: 'Skills organized by category (category name + skills array)',
  },
  {
    name: 'projects',
    type: 'ResumeProject[]',
    description: 'Project/portfolio items (name, description, technologies)',
  },
  {
    name: 'certifications',
    type: 'ResumeCertification[]',
    description: 'Certifications (name, issuer, date)',
  },
  {
    name: 'languages',
    type: 'ResumeLanguage[]',
    description: 'Languages spoken (language, proficiency level)',
  },
  {
    name: 'accentColor',
    type: 'string',
    defaultValue: 'theme.colors.primary',
    description: 'Accent color for modern variant',
  },
  {
    name: 'title',
    type: 'string',
    defaultValue: '"{name} - Resume"',
    description: 'Document title for PDF metadata',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom styles for the page',
  },
];

export const resumeTemplateUsage = `import { ResumeTemplate, PdfxThemeProvider } from '@pdfx/ui';
import { PDFViewer } from '@react-pdf/renderer';

function MyResume() {
  return (
    <PDFViewer width="100%" height={600}>
      <PdfxThemeProvider>
        <ResumeTemplate
          personal={{
            name: 'John Doe',
            title: 'Senior Software Engineer',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            linkedin: 'linkedin.com/in/johndoe',
            github: 'github.com/johndoe',
          }}
          summary={{
            content: 'Experienced software engineer with 8+ years building scalable web applications.',
          }}
          experience={[
            {
              company: 'TechCorp',
              role: 'Senior Engineer',
              startDate: 'Jan 2020',
              endDate: 'Present',
              highlights: [
                'Led development of microservices architecture',
                'Mentored team of 5 junior developers',
              ],
            },
          ]}
          education={[
            {
              institution: 'Stanford University',
              degree: 'M.S.',
              field: 'Computer Science',
              endDate: '2019',
            },
          ]}
          skills={[
            { category: 'Languages', skills: ['TypeScript', 'Python', 'Go'] },
            { category: 'Frameworks', skills: ['React', 'Node.js', 'Next.js'] },
          ]}
        />
      </PdfxThemeProvider>
    </PDFViewer>
  );
}`;

export const resumeModernUsage = `<ResumeTemplate
  variant="modern"
  personal={{
    name: 'Jane Smith',
    title: 'Product Designer',
    email: 'jane@design.co',
    location: 'New York, NY',
    website: 'janesmith.design',
  }}
  summary={{
    content: 'Creative product designer with a passion for user-centered design.',
  }}
  experience={[...]}
  skills={[
    { category: 'Design', skills: ['Figma', 'Sketch', 'Adobe XD'] },
    { category: 'Research', skills: ['User Testing', 'A/B Testing', 'Analytics'] },
  ]}
  accentColor="#6366f1"
/>`;

export const resumeMinimalUsage = `<ResumeTemplate
  variant="minimal"
  personal={{
    name: 'Alex Johnson',
    title: 'Data Scientist',
    email: 'alex@data.io',
    phone: '+1 555-9876',
    location: 'Seattle, WA',
  }}
  experience={[...]}
  education={[...]}
  skills={[
    { category: 'ML', skills: ['TensorFlow', 'PyTorch', 'scikit-learn'] },
    { category: 'Languages', skills: ['Python', 'R', 'SQL'] },
  ]}
/>`;
