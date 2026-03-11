import { Document, Text as PDFText, Page, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createResumeStyles } from './resume.styles';
import type {
  ResumeCertification,
  ResumeEducation,
  ResumeExperience,
  ResumeLanguage,
  ResumeProject,
  ResumeSkillCategory,
  ResumeTemplateProps,
  ResumeVariant,
} from './resume.types';

// ─── Helper Components ───────────────────────────────────────────────────────

function ContactInfo({
  personal,
  styles,
  separator = ' • ',
}: {
  personal: ResumeTemplateProps['personal'];
  styles: ReturnType<typeof createResumeStyles>;
  separator?: string;
}) {
  const items: string[] = [];
  if (personal.email) items.push(personal.email);
  if (personal.phone) items.push(personal.phone);
  if (personal.location) items.push(personal.location);
  if (personal.linkedin) items.push(personal.linkedin);
  if (personal.github) items.push(personal.github);
  if (personal.website) items.push(personal.website);

  return (
    <View style={styles.professionalContact}>
      {items.map((item, index) => (
        <PDFText key={`contact-${item}`} style={styles.professionalContactItem}>
          {item}
          {index < items.length - 1 ? separator : ''}
        </PDFText>
      ))}
    </View>
  );
}

function SectionTitle({
  title,
  styles,
}: {
  title: string;
  styles: ReturnType<typeof createResumeStyles>;
}) {
  return <PDFText style={styles.sectionTitle}>{title}</PDFText>;
}

function ExperienceSection({
  experience,
  styles,
}: {
  experience: ResumeExperience[];
  styles: ReturnType<typeof createResumeStyles>;
}) {
  if (!experience.length) return null;

  return (
    <View style={styles.section}>
      <SectionTitle title="Experience" styles={styles} />
      {experience.map((exp) => (
        <View key={`exp-${exp.company}-${exp.role}`} style={styles.experienceEntry}>
          <View style={styles.experienceHeader}>
            <View>
              <PDFText style={styles.experienceRole}>{exp.role}</PDFText>
              <PDFText style={styles.experienceCompany}>{exp.company}</PDFText>
            </View>
            <View>
              <PDFText style={styles.experienceDates}>
                {exp.startDate} – {exp.endDate || 'Present'}
              </PDFText>
              {exp.location && <PDFText style={styles.experienceLocation}>{exp.location}</PDFText>}
            </View>
          </View>
          {exp.description && (
            <PDFText style={styles.experienceDescription}>{exp.description}</PDFText>
          )}
          {exp.highlights?.map((highlight) => (
            <View key={`hl-${highlight.slice(0, 20)}`} style={styles.bulletRow}>
              <PDFText style={styles.bullet}>•</PDFText>
              <PDFText style={styles.experienceHighlight}>{highlight}</PDFText>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function EducationSection({
  education,
  styles,
}: {
  education: ResumeEducation[];
  styles: ReturnType<typeof createResumeStyles>;
}) {
  if (!education.length) return null;

  return (
    <View style={styles.section}>
      <SectionTitle title="Education" styles={styles} />
      {education.map((edu) => (
        <View key={`edu-${edu.institution}-${edu.degree}`} style={styles.educationEntry}>
          <View style={styles.educationHeader}>
            <View>
              <PDFText style={styles.educationDegree}>
                {edu.degree}
                {edu.field ? ` in ${edu.field}` : ''}
              </PDFText>
              <PDFText style={styles.educationInstitution}>{edu.institution}</PDFText>
            </View>
            <View>
              {(edu.startDate || edu.endDate) && (
                <PDFText style={styles.educationDates}>
                  {edu.startDate && edu.endDate
                    ? `${edu.startDate} – ${edu.endDate}`
                    : edu.endDate || edu.startDate}
                </PDFText>
              )}
            </View>
          </View>
          {edu.gpa && <PDFText style={styles.educationGpa}>GPA: {edu.gpa}</PDFText>}
        </View>
      ))}
    </View>
  );
}

function SkillsSection({
  skills,
  styles,
  compact = false,
}: {
  skills: ResumeSkillCategory[];
  styles: ReturnType<typeof createResumeStyles>;
  compact?: boolean;
}) {
  if (!skills.length) return null;

  if (compact) {
    return (
      <View style={styles.section}>
        {skills.map((cat) => (
          <View key={`skill-${cat.category}`} style={styles.skillCategory}>
            <PDFText style={styles.skillCategoryLabel}>{cat.category}</PDFText>
            <PDFText style={styles.skillText}>{cat.skills.join(', ')}</PDFText>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <SectionTitle title="Skills" styles={styles} />
      {skills.map((cat) => (
        <View key={`skill-${cat.category}`} style={styles.skillCategory}>
          <PDFText style={styles.skillCategoryLabel}>{cat.category}</PDFText>
          <View style={styles.skillsContainer}>
            {cat.skills.map((skill) => (
              <PDFText key={`s-${skill}`} style={styles.skillBadge}>
                {skill}
              </PDFText>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

function ProjectsSection({
  projects,
  styles,
}: {
  projects: ResumeProject[];
  styles: ReturnType<typeof createResumeStyles>;
}) {
  if (!projects.length) return null;

  return (
    <View style={styles.section}>
      <SectionTitle title="Projects" styles={styles} />
      {projects.map((project) => (
        <View key={`proj-${project.name}`} style={styles.projectEntry}>
          <PDFText style={styles.projectName}>{project.name}</PDFText>
          {project.description && (
            <PDFText style={styles.projectDescription}>{project.description}</PDFText>
          )}
          {project.technologies && (
            <PDFText style={styles.projectTech}>{project.technologies.join(' • ')}</PDFText>
          )}
        </View>
      ))}
    </View>
  );
}

function CertificationsSection({
  certifications,
  styles,
}: {
  certifications: ResumeCertification[];
  styles: ReturnType<typeof createResumeStyles>;
}) {
  if (!certifications.length) return null;

  return (
    <View style={styles.section}>
      <SectionTitle title="Certifications" styles={styles} />
      {certifications.map((cert) => (
        <View key={`cert-${cert.name}`} style={styles.certEntry}>
          <PDFText style={styles.certName}>{cert.name}</PDFText>
          <PDFText style={styles.certIssuer}>
            {cert.issuer}
            {cert.date ? ` • ${cert.date}` : ''}
          </PDFText>
        </View>
      ))}
    </View>
  );
}

function LanguagesSection({
  languages,
  styles,
}: {
  languages: ResumeLanguage[];
  styles: ReturnType<typeof createResumeStyles>;
}) {
  if (!languages.length) return null;

  return (
    <View style={styles.section}>
      <SectionTitle title="Languages" styles={styles} />
      {languages.map((lang) => (
        <View key={`lang-${lang.language}`} style={styles.languageEntry}>
          <PDFText style={styles.languageName}>{lang.language}</PDFText>
          <PDFText style={styles.languageProficiency}>{lang.proficiency}</PDFText>
        </View>
      ))}
    </View>
  );
}

// ─── Variant Components ──────────────────────────────────────────────────────

function ProfessionalVariant({
  props,
  styles,
}: {
  props: ResumeTemplateProps;
  styles: ReturnType<typeof createResumeStyles>;
}) {
  const {
    personal,
    summary,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
  } = props;

  return (
    <>
      {/* Header */}
      <View style={styles.professionalHeader}>
        <PDFText style={styles.professionalName}>{personal.name}</PDFText>
        {personal.title && <PDFText style={styles.professionalTitle}>{personal.title}</PDFText>}
        <ContactInfo personal={personal} styles={styles} separator="" />
      </View>

      {/* Summary */}
      {summary && (
        <View style={styles.section}>
          <SectionTitle title={summary.title || 'Professional Summary'} styles={styles} />
          <PDFText style={styles.summaryText}>{summary.content}</PDFText>
        </View>
      )}

      <ExperienceSection experience={experience} styles={styles} />
      <EducationSection education={education} styles={styles} />
      <SkillsSection skills={skills} styles={styles} />
      <ProjectsSection projects={projects} styles={styles} />
      <CertificationsSection certifications={certifications} styles={styles} />
      <LanguagesSection languages={languages} styles={styles} />
    </>
  );
}

function ModernVariant({
  props,
  styles,
}: {
  props: ResumeTemplateProps;
  styles: ReturnType<typeof createResumeStyles>;
}) {
  const {
    personal,
    summary,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
  } = props;

  return (
    <View style={styles.modernContainer}>
      {/* Sidebar */}
      <View style={styles.modernSidebar}>
        <PDFText style={styles.modernSidebarName}>{personal.name}</PDFText>
        {personal.title && <PDFText style={styles.modernSidebarTitle}>{personal.title}</PDFText>}

        {/* Contact */}
        <View style={styles.modernSidebarSection}>
          <PDFText style={styles.modernSidebarLabel}>Contact</PDFText>
          {personal.email && <PDFText style={styles.modernSidebarText}>{personal.email}</PDFText>}
          {personal.phone && <PDFText style={styles.modernSidebarText}>{personal.phone}</PDFText>}
          {personal.location && (
            <PDFText style={styles.modernSidebarText}>{personal.location}</PDFText>
          )}
          {personal.linkedin && (
            <PDFText style={styles.modernSidebarText}>{personal.linkedin}</PDFText>
          )}
          {personal.github && <PDFText style={styles.modernSidebarText}>{personal.github}</PDFText>}
          {personal.website && (
            <PDFText style={styles.modernSidebarText}>{personal.website}</PDFText>
          )}
        </View>

        {/* Skills in sidebar */}
        {skills.length > 0 && (
          <View style={styles.modernSidebarSection}>
            <PDFText style={styles.modernSidebarLabel}>Skills</PDFText>
            {skills.map((cat) => (
              <View key={`side-skill-${cat.category}`} style={{ marginBottom: 8 }}>
                <PDFText
                  style={{
                    ...styles.modernSidebarText,
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  {cat.category}
                </PDFText>
                <PDFText style={styles.modernSidebarText}>{cat.skills.join(', ')}</PDFText>
              </View>
            ))}
          </View>
        )}

        {/* Languages in sidebar */}
        {languages.length > 0 && (
          <View style={styles.modernSidebarSection}>
            <PDFText style={styles.modernSidebarLabel}>Languages</PDFText>
            {languages.map((lang) => (
              <PDFText key={`side-lang-${lang.language}`} style={styles.modernSidebarText}>
                {lang.language} – {lang.proficiency}
              </PDFText>
            ))}
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.modernMain}>
        {summary && (
          <View style={styles.section}>
            <SectionTitle title={summary.title || 'Summary'} styles={styles} />
            <PDFText style={styles.summaryText}>{summary.content}</PDFText>
          </View>
        )}

        <ExperienceSection experience={experience} styles={styles} />
        <EducationSection education={education} styles={styles} />
        <ProjectsSection projects={projects} styles={styles} />
        <CertificationsSection certifications={certifications} styles={styles} />
      </View>
    </View>
  );
}

function MinimalVariant({
  props,
  styles,
}: {
  props: ResumeTemplateProps;
  styles: ReturnType<typeof createResumeStyles>;
}) {
  const {
    personal,
    summary,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
  } = props;

  return (
    <>
      {/* Centered Header */}
      <View style={styles.minimalHeader}>
        <PDFText style={styles.minimalName}>{personal.name}</PDFText>
        {personal.title && <PDFText style={styles.minimalTitle}>{personal.title}</PDFText>}
        <View style={styles.minimalContact}>
          {personal.email && <PDFText style={styles.minimalContactItem}>{personal.email}</PDFText>}
          {personal.email && personal.phone && <PDFText style={styles.minimalDivider}>|</PDFText>}
          {personal.phone && <PDFText style={styles.minimalContactItem}>{personal.phone}</PDFText>}
          {personal.phone && personal.location && (
            <PDFText style={styles.minimalDivider}>|</PDFText>
          )}
          {personal.location && (
            <PDFText style={styles.minimalContactItem}>{personal.location}</PDFText>
          )}
        </View>
      </View>

      {/* Summary */}
      {summary && (
        <View style={styles.section}>
          <SectionTitle title={summary.title || 'Summary'} styles={styles} />
          <PDFText style={styles.summaryText}>{summary.content}</PDFText>
        </View>
      )}

      <ExperienceSection experience={experience} styles={styles} />
      <EducationSection education={education} styles={styles} />
      <SkillsSection skills={skills} styles={styles} compact />
      <ProjectsSection projects={projects} styles={styles} />
      <CertificationsSection certifications={certifications} styles={styles} />
      <LanguagesSection languages={languages} styles={styles} />
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * ResumeTemplate — A data-driven resume/CV PDF generator.
 *
 * Supports three visual variants: professional, modern, and minimal.
 * Pass structured data (personal info, experience, education, skills)
 * and get a professional resume PDF.
 *
 * @example Basic usage
 * ```tsx
 * <ResumeTemplate
 *   personal={{
 *     name: 'John Doe',
 *     title: 'Senior Software Engineer',
 *     email: 'john@example.com',
 *     phone: '+1 555-1234',
 *     location: 'San Francisco, CA',
 *   }}
 *   experience={[
 *     {
 *       company: 'TechCorp',
 *       role: 'Senior Engineer',
 *       startDate: 'Jan 2020',
 *       endDate: 'Present',
 *       highlights: ['Led team of 5', 'Shipped key features'],
 *     },
 *   ]}
 *   education={[
 *     {
 *       institution: 'MIT',
 *       degree: 'B.S.',
 *       field: 'Computer Science',
 *       endDate: '2019',
 *     },
 *   ]}
 *   skills={[
 *     { category: 'Languages', skills: ['TypeScript', 'Python', 'Go'] },
 *   ]}
 * />
 * ```
 */
export function ResumeTemplate(props: ResumeTemplateProps) {
  const { variant = 'professional', personal, accentColor, style, title } = props;

  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createResumeStyles(theme, accentColor), [theme, accentColor]);

  const pageStyles: Style[] = [styles.page];
  if (style) {
    pageStyles.push(style);
  }

  const variantMap: Record<ResumeVariant, React.ReactNode> = {
    professional: <ProfessionalVariant props={props} styles={styles} />,
    modern: <ModernVariant props={props} styles={styles} />,
    minimal: <MinimalVariant props={props} styles={styles} />,
  };

  return (
    <Document title={title || `${personal.name} - Resume`}>
      <Page size="A4" style={pageStyles}>
        {variantMap[variant]}
      </Page>
    </Document>
  );
}
