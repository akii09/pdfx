import type { Style } from '@react-pdf/types';

/**
 * Resume template variants.
 * - professional: Traditional single-column professional layout
 * - modern: Two-column design with sidebar for skills/contact
 * - minimal: Clean minimalist single-column design
 */
export type ResumeVariant = 'professional' | 'modern' | 'minimal';

/**
 * Personal/contact information.
 */
export interface ResumePersonal {
  /** Full name */
  name: string;
  /** Professional title or headline */
  title?: string;
  /** Email address */
  email?: string;
  /** Phone number */
  phone?: string;
  /** Location (city, country) */
  location?: string;
  /** LinkedIn URL or handle */
  linkedin?: string;
  /** GitHub URL or handle */
  github?: string;
  /** Personal website URL */
  website?: string;
  /** Profile photo URL (optional) */
  photo?: string;
}

/**
 * Professional summary/objective section.
 */
export interface ResumeSummary {
  /** Section title (defaults to "Summary" or "Professional Summary") */
  title?: string;
  /** Summary content - 2-4 sentences */
  content: string;
}

/**
 * Single work experience entry.
 */
export interface ResumeExperience {
  /** Company or organization name */
  company: string;
  /** Job title/role */
  role: string;
  /** Start date (e.g., "Jan 2022" or "2022") */
  startDate: string;
  /** End date (e.g., "Dec 2024" or "Present") */
  endDate?: string;
  /** Location (optional) */
  location?: string;
  /** List of achievements/responsibilities */
  highlights?: string[];
  /** Brief description (alternative to highlights) */
  description?: string;
}

/**
 * Single education entry.
 */
export interface ResumeEducation {
  /** Institution name */
  institution: string;
  /** Degree or certification */
  degree: string;
  /** Field of study */
  field?: string;
  /** Start date */
  startDate?: string;
  /** End date or expected graduation */
  endDate?: string;
  /** GPA or honors (optional) */
  gpa?: string;
  /** Additional details */
  highlights?: string[];
}

/**
 * Skill category with items.
 */
export interface ResumeSkillCategory {
  /** Category name (e.g., "Languages", "Frameworks", "Tools") */
  category: string;
  /** Skills in this category */
  skills: string[];
}

/**
 * Single project entry.
 */
export interface ResumeProject {
  /** Project name */
  name: string;
  /** Brief description */
  description?: string;
  /** Technologies used */
  technologies?: string[];
  /** Project URL (optional) */
  url?: string;
  /** Key achievements */
  highlights?: string[];
}

/**
 * Single certification entry.
 */
export interface ResumeCertification {
  /** Certification name */
  name: string;
  /** Issuing organization */
  issuer: string;
  /** Date obtained */
  date?: string;
  /** Credential ID or URL */
  credentialId?: string;
}

/**
 * Language proficiency entry.
 */
export interface ResumeLanguage {
  /** Language name */
  language: string;
  /** Proficiency level */
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic' | string;
}

/**
 * Props for the ResumeTemplate component.
 */
export interface ResumeTemplateProps {
  /**
   * Visual variant of the resume.
   * @default "professional"
   */
  variant?: ResumeVariant;

  /**
   * Personal/contact information (required).
   */
  personal: ResumePersonal;

  /**
   * Professional summary or objective.
   */
  summary?: ResumeSummary;

  /**
   * Work experience entries (most recent first).
   */
  experience?: ResumeExperience[];

  /**
   * Education entries.
   */
  education?: ResumeEducation[];

  /**
   * Skills organized by category.
   */
  skills?: ResumeSkillCategory[];

  /**
   * Projects or portfolio items.
   */
  projects?: ResumeProject[];

  /**
   * Certifications.
   */
  certifications?: ResumeCertification[];

  /**
   * Languages spoken.
   */
  languages?: ResumeLanguage[];

  /**
   * Accent color for modern variant.
   * Uses theme primary color by default.
   */
  accentColor?: string;

  /**
   * Custom styles for the page.
   */
  style?: Style;

  /**
   * Document title for PDF metadata.
   */
  title?: string;
}
