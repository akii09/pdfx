import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Copy,
  FileText,
  Palette,
  Shield,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Intro() {
  return (
    <article aria-label="PDFx documentation introduction">
      {/* ── Hero ── */}
      <header className="mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Welcome to PDFx</h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
          A professional React PDF component library that you truly own. Stop manually styling PDFs
          — copy, paste, and customize beautiful document components built on{' '}
          <a
            href="https://react-pdf.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            @react-pdf/renderer
          </a>
          .
        </p>
        <nav className="flex flex-wrap gap-3" aria-label="Quick links">
          <Link
            to="/installation"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Get Started
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            to="/components"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg font-medium text-sm hover:bg-accent transition-colors"
          >
            Browse Components
          </Link>
        </nav>
      </header>

      {/* ── What makes it different ── */}
      <section className="mb-14 p-5 rounded-xl border bg-muted/30" aria-labelledby="diff-heading">
        <h2 id="diff-heading" className="text-base font-semibold mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4 shrink-0" aria-hidden="true" />
          What Makes PDFx Different?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Unlike traditional npm packages that lock you into their implementation, PDFx is inspired
          by{' '}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            shadcn/ui
          </a>
          's copy-paste model. Components are{' '}
          <strong className="text-foreground font-semibold">
            copied directly into your project
          </strong>
          , giving you complete control to modify, extend, and customize them without restrictions.
        </p>
      </section>

      {/* ── Core Philosophy ── */}
      <section className="mb-14" aria-labelledby="philosophy-heading">
        <h2 id="philosophy-heading" className="text-xl font-bold tracking-tight mb-6">
          Core Philosophy
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Copy className="w-4 h-4" aria-hidden="true" />,
              title: 'You Own the Code',
              body: (
                <>
                  Components live in{' '}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                    src/components/pdfx/
                  </code>
                  , not in{' '}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                    node_modules/
                  </code>
                  . Edit them freely without forking or patching.
                </>
              ),
            },
            {
              icon: <Palette className="w-4 h-4" aria-hidden="true" />,
              title: 'Fully Customizable',
              body: 'Match your brand by modifying styles, adding props, or completely rewriting components. No limits, no restrictions.',
            },
            {
              icon: <Shield className="w-4 h-4" aria-hidden="true" />,
              title: 'Type Safe',
              body: 'Built with TypeScript from the ground up. Full IntelliSense, type checking, and compile-time safety across all components.',
            },
            {
              icon: <Zap className="w-4 h-4" aria-hidden="true" />,
              title: 'Zero Runtime Overhead',
              body: 'No runtime dependency on PDFx. Only bundle the components you use — nothing more, nothing less.',
            },
            {
              icon: <Code2 className="w-4 h-4" aria-hidden="true" />,
              title: 'Open Source',
              body: 'MIT licensed and free forever. Use in personal projects, commercial applications, or anywhere else.',
            },
            {
              icon: <FileText className="w-4 h-4" aria-hidden="true" />,
              title: 'PDF Native',
              body: (
                <>
                  Built on{' '}
                  <a
                    href="https://react-pdf.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:opacity-80 transition-opacity"
                  >
                    @react-pdf/renderer
                  </a>
                  . Professional, high-quality PDF output with full rendering control.
                </>
              ),
            },
          ].map(({ icon, title, body }) => (
            <div
              key={title}
              className="p-5 rounded-xl border bg-card hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-foreground/8 flex items-center justify-center mb-3 text-foreground">
                {icon}
              </div>
              <h3 className="font-semibold text-sm mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="mb-14" aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-xl font-bold tracking-tight mb-2">
          How It Works
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          A simple three-step workflow that gives you complete ownership over your PDF components.
        </p>
        <ol className="space-y-3">
          {[
            {
              n: '1',
              title: 'Initialize PDFx',
              desc: 'Run the CLI to scaffold your config, theme file, and component directory.',
              code: 'npx @pdfx/cli init',
            },
            {
              n: '2',
              title: 'Add Components',
              desc: 'Copy any component from the registry directly into your project.',
              code: 'npx @pdfx/cli add heading text table graph',
            },
            {
              n: '3',
              title: 'Use & Customize',
              desc: 'Import and use components in your PDFs. Edit the source freely.',
              code: "import { Heading } from '@/components/pdfx/heading/pdfx-heading';",
            },
          ].map(({ n, title, desc, code }) => (
            <li key={n} className="flex gap-4 p-4 rounded-xl border bg-card">
              <div
                className="flex-shrink-0 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs"
                aria-hidden="true"
              >
                {n}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{desc}</p>
                <pre className="bg-muted/60 px-3 py-2 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
                  <code>{code}</code>
                </pre>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Perfect For ── */}
      <section className="mb-14" aria-labelledby="usecases-heading">
        <h2 id="usecases-heading" className="text-xl font-bold tracking-tight mb-4">
          Perfect For
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              title: 'Business Documents',
              desc: 'Invoices, receipts, contracts, proposals, and formal correspondence with professional layouts.',
            },
            {
              title: 'Reports & Analytics',
              desc: 'Monthly reports, data visualizations, financial statements, and performance dashboards.',
            },
            {
              title: 'Certificates & Credentials',
              desc: 'Course certificates, awards, diplomas, and official credentials with custom branding.',
            },
            {
              title: 'Resumes & Portfolios',
              desc: 'Professional CVs, cover letters, portfolios, and personal branding documents.',
            },
          ].map(({ title, desc }) => (
            <div key={title} className="p-4 rounded-xl border bg-card">
              <h3 className="font-semibold text-sm mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why not just use react-pdf directly ── */}
      <section className="mb-14 p-5 rounded-xl border bg-muted/20" aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-base font-bold tracking-tight mb-3">
          Why not just use @react-pdf/renderer directly?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          You absolutely can — PDFx is built{' '}
          <strong className="text-foreground font-semibold">on top of</strong> @react-pdf/renderer,
          not replacing it. Raw usage requires manually creating{' '}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">StyleSheet</code>{' '}
          definitions for every component, leading to repetitive code and inconsistent styling.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          PDFx provides pre-built, theme-aware components that eliminate boilerplate while keeping
          full flexibility. Think of it as a design system for PDFs — professionally designed
          components you can adapt to any brand or requirement.
        </p>
      </section>

      {/* ── Key Features ── */}
      <section className="mb-14" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-xl font-bold tracking-tight mb-4">
          Key Features
        </h2>
        <ul className="space-y-2.5">
          {[
            {
              title: 'Theme System',
              desc: 'Consistent typography, spacing, and colors across all components via a single theme configuration file.',
            },
            {
              title: 'Theme Presets',
              desc: 'Professional, Modern, and Minimal presets out of the box. Switch themes instantly with the CLI.',
            },
            {
              title: 'Powerful CLI',
              desc: 'Commands like pdfx add, pdfx theme switch, and pdfx list make setup and maintenance effortless.',
            },
            {
              title: 'No Dependency Hell',
              desc: 'Since components are copied into your project, you avoid peer dependency conflicts and version lock-in.',
            },
            {
              title: 'Framework Agnostic',
              desc: 'Works with Next.js, Vite, Remix, or any React setup that supports @react-pdf/renderer.',
            },
            {
              title: 'Zod Validation',
              desc: 'Theme files are validated with Zod schemas, catching configuration errors before they reach runtime.',
            },
          ].map(({ title, desc }) => (
            <li
              key={title}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/40 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-sm leading-relaxed">
                <strong className="text-foreground font-semibold">{title}:</strong>{' '}
                <span className="text-muted-foreground">{desc}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── CTA ── */}
      <div className="p-6 rounded-xl border bg-muted/20">
        <h2 className="text-lg font-bold tracking-tight mb-2">Ready to build?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Get started in under a minute. No account required, no credit card needed.
        </p>
        <Link
          to="/installation"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
        >
          View Installation Guide
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
