import {
  resumeMinimalUsage,
  resumeModernUsage,
  resumeTemplateProps,
  resumeTemplateUsage,
} from '@/constants';
import { PdfxThemeProvider, ResumeTemplate } from '@pdfx/ui';
import type { ResumeVariant } from '@pdfx/ui';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const mockPersonal = {
  name: 'John Doe',
  title: 'Senior Software Engineer',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/johndoe',
  github: 'github.com/johndoe',
};

const mockSummary = {
  content:
    'Experienced software engineer with 8+ years building scalable web applications. Passionate about clean code, system design, and mentoring junior developers.',
};

const mockExperience = [
  {
    company: 'TechCorp Inc',
    role: 'Senior Software Engineer',
    startDate: 'Jan 2020',
    endDate: 'Present',
    highlights: [
      'Led development of microservices architecture serving 10M+ users',
      'Mentored team of 5 junior developers',
    ],
  },
  {
    company: 'StartupXYZ',
    role: 'Software Engineer',
    startDate: 'Jun 2017',
    endDate: 'Dec 2019',
    description: 'Full-stack development using React and Node.js.',
  },
];

const mockEducation = [
  {
    institution: 'Stanford University',
    degree: 'M.S.',
    field: 'Computer Science',
    endDate: '2017',
  },
];

const mockSkills = [
  { category: 'Languages', skills: ['TypeScript', 'Python', 'Go'] },
  { category: 'Frameworks', skills: ['React', 'Node.js', 'Next.js'] },
];

const renderPreviewDocument = (variant: ResumeVariant) => (
  <PdfxThemeProvider>
    <ResumeTemplate
      variant={variant}
      personal={mockPersonal}
      summary={mockSummary}
      experience={mockExperience}
      education={mockEducation}
      skills={mockSkills}
    />
  </PdfxThemeProvider>
);

const variantOptions = [
  { value: 'professional' as ResumeVariant, label: 'Professional' },
  { value: 'modern' as ResumeVariant, label: 'Modern' },
  { value: 'minimal' as ResumeVariant, label: 'Minimal' },
];

export default function ResumeTemplatePage() {
  useDocumentTitle('Resume Template');

  return (
    <ComponentPage
      title="ResumeTemplate"
      description={`Data-driven resume/CV PDF generator with three visual variants. 
Pass structured data (personal info, experience, education, skills) and get a 
professional, theme-aware resume PDF.`}
      installCommand="npx @akii09/pdfx-cli add resume-template"
      componentName="resume-template"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="resume-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'professional' as ResumeVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={resumeTemplateUsage}
      usageFilename="src/templates/my-resume.tsx"
      props={resumeTemplateProps}
      additionalInfo={
        <div className="space-y-6">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-3">Variant Guide</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">professional</strong> — Traditional
                  single-column layout with accent-colored section headers. Best for corporate and
                  formal applications.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">modern</strong> — Two-column design with
                  colored sidebar for skills and contact info. Great for creative roles and tech
                  positions.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">minimal</strong> — Clean, minimal
                  single-column design with centered header. Ideal for academic CVs and simple
                  applications.
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-3">Data Types</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border">
                  ResumePersonal
                </code>
                <p className="mt-1">
                  name, title?, email?, phone?, location?, linkedin?, github?, website?
                </p>
              </div>
              <div>
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border">
                  ResumeExperience
                </code>
                <p className="mt-1">
                  company, role, startDate, endDate?, location?, highlights?, description?
                </p>
              </div>
              <div>
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border">
                  ResumeEducation
                </code>
                <p className="mt-1">institution, degree, field?, startDate?, endDate?, gpa?</p>
              </div>
              <div>
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border">
                  ResumeSkillCategory
                </code>
                <p className="mt-1">category (label), skills (string[])</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Modern Variant Example</h3>
            <pre className="p-4 rounded-lg bg-muted text-xs overflow-x-auto">
              <code>{resumeModernUsage}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Minimal Variant Example</h3>
            <pre className="p-4 rounded-lg bg-muted text-xs overflow-x-auto">
              <code>{resumeMinimalUsage}</code>
            </pre>
          </div>
        </div>
      }
    />
  );
}
