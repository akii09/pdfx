import { ArrowRight, CheckCircle2, Code2, Copy, FileText, Palette, Shield, Zap } from 'lucide-react';

export default function Intro() {
  return (
    <>
      <div className="mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          Welcome to PDFx
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
          A professional React PDF component library that you truly own. Stop manually styling PDFs—copy, paste, and customize beautiful document components built on{' '}
          <a
            href="https://react-pdf.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline hover:text-primary transition-colors"
          >
            @react-pdf/renderer
          </a>
          .
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="/installation"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/components"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Browse Components
          </a>
        </div>
      </div>

      <div className="mb-16 p-6 rounded-lg border bg-accent/30">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          What Makes PDFx Different?
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Unlike traditional npm packages that lock you into their implementation, PDFx is inspired by{' '}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline hover:text-primary transition-colors"
          >
            shadcn/ui
          </a>
          's revolutionary approach. Components are <strong className="text-foreground">copied directly into your project</strong>, giving you complete control to modify, extend, and customize them without restrictions.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Core Philosophy</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-5 rounded-lg border bg-card hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Copy className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">You Own the Code</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Components live in <code className="text-xs bg-muted px-1.5 py-0.5 rounded">your/src/</code> folder, not in{' '}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">node_modules/</code>. Edit them freely without forking or patching.
            </p>
          </div>

          <div className="p-5 rounded-lg border bg-card hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Fully Customizable</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Match your brand identity by modifying styles, adding props, or completely rewriting components. No limits, no restrictions.
            </p>
          </div>

          <div className="p-5 rounded-lg border bg-card hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Type Safe</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built with TypeScript from the ground up. Enjoy full IntelliSense support, type checking, and compile-time safety.
            </p>
          </div>

          <div className="p-5 rounded-lg border bg-card hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Zero Runtime Overhead</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No runtime dependency on PDFx. Only bundle the components you use - nothing more, nothing less.
            </p>
          </div>

          <div className="p-5 rounded-lg border bg-card hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Open Source</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              MIT licensed and free forever. Use in personal projects, commercial applications, or anywhere else.
            </p>
          </div>

          <div className="p-5 rounded-lg border bg-card hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">PDF Native</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built on the proven <a href="https://react-pdf.org" target="_blank" rel="noopener noreferrer" className='text-foreground underline hover:text-primary transition-colors'>@react-pdf/renderer</a> foundation. Generate professional, high-quality PDF documents.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-4">How It Works</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          PDFx uses a simple three-step workflow that gives you complete control over your PDF components:
        </p>

        <div className="space-y-4">
          <div className="flex gap-4 p-4 rounded-lg border bg-card">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Initialize PDFx</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Run <code className="text-xs bg-muted px-1.5 py-0.5 rounded">pdfx init</code> to create a configuration file in your project.
              </p>
              <div className="bg-muted/50 p-3 rounded font-mono text-xs">
                npx @pdfx/cli init
              </div>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg border bg-card">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">Add Components</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Copy any component from the registry directly into your project.
              </p>
              <div className="bg-muted/50 p-3 rounded font-mono text-xs">
                npx @pdfx/cli add heading text table
              </div>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg border bg-card">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Use & Customize</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Import components and use them in your PDF documents. Edit the source code to fit your needs.
              </p>
              <div className="bg-muted/50 p-3 rounded font-mono text-xs overflow-x-auto">
                <div>import &#123; Heading, Text &#125; from './components/pdfx';</div>
                <div className="mt-2">&lt;Heading level=&#123;1&#125;&gt;Invoice&lt;/Heading&gt;</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Perfect For</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Business Documents
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Invoices, receipts, contracts, proposals, and formal correspondence with professional layouts.
            </p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Reports & Analytics
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Monthly reports, data visualizations, financial statements, and performance dashboards.
            </p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Certificates & Credentials
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Course certificates, awards, diplomas, and official credentials with custom branding.
            </p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Resumes & Portfolios
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional CVs, cover letters, portfolios, and personal branding documents.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16 p-6 rounded-lg border-2 border-primary/20 bg-primary/5">
        <h2 className="text-xl font-bold tracking-tight mb-3">Why Not Just Use @react-pdf/renderer Directly?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You absolutely can! PDFx is built <strong className="text-foreground">on top of</strong> @react-pdf/renderer, we don't replace it. However, raw @react-pdf/renderer requires you to manually create StyleSheet definitions for every component, leading to repetitive code and inconsistent styling.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          PDFx provides pre-built, theme-aware components that eliminate boilerplate while giving you the flexibility to customize everything. Think of it as a design system for PDFs—professionally designed components that you can adapt to your needs.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Key Features</h2>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-foreground">Theme System:</strong>{' '}
              <span className="text-muted-foreground">
                Consistent typography, spacing, and colors across all components via a single theme configuration file.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-foreground">Theme Presets:</strong>{' '}
              <span className="text-muted-foreground">
                Professional, Modern, and Minimal presets out of the box. Switch themes instantly with the CLI.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-foreground">Powerful CLI:</strong>{' '}
              <span className="text-muted-foreground">
                Commands like <code className="text-xs bg-muted px-1.5 py-0.5 rounded">pdfx add</code>,{' '}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">pdfx theme switch</code>, and{' '}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">pdfx list</code> make setup effortless.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-foreground">No Dependency Hell:</strong>{' '}
              <span className="text-muted-foreground">
                Since components are copied into your project, you avoid peer dependency conflicts and version lock-in.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-foreground">Framework Agnostic:</strong>{' '}
              <span className="text-muted-foreground">
                Works with Next.js, Vite, Remix, Create React App, or any React setup that supports @react-pdf/renderer.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-foreground">Zod Validation:</strong>{' '}
              <span className="text-muted-foreground">
                Theme files are validated with Zod schemas, catching configuration errors before runtime.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg border bg-gradient-to-br from-accent/50 to-accent/20">
        <h2 className="text-xl font-bold tracking-tight mb-3">Ready to Build Beautiful PDFs?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Get started in less than a minute. No account required, no credit card needed—just install and start building.
        </p>
        <a
          href="/installation"
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          View Installation Guide
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </>
  );
}