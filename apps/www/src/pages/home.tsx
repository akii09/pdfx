import { ArrowRight, Code2, Copy, FileText, Palette, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PackageManagerTabs } from '../components/package-manager-tabs';
import { useDocumentTitle } from '../hooks/use-document-title';

const features = [
  {
    icon: Copy,
    title: 'Copy & Paste',
    description: 'Components are copied directly into your project. You own the code.',
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description: 'Edit components to match your brand. No limits, no restrictions.',
  },
  {
    icon: Shield,
    title: 'Type Safe',
    description: 'Built with TypeScript. Full type safety and IntelliSense support.',
  },
  {
    icon: Zap,
    title: 'Lightweight',
    description: 'Zero runtime overhead. Only the code you need, nothing more.',
  },
  {
    icon: Code2,
    title: 'Open Source',
    description: 'MIT licensed. Free to use in personal and commercial projects.',
  },
  {
    icon: FileText,
    title: 'PDF Native',
    description: 'Built on @react-pdf/renderer. Professional PDF output guaranteed.',
  },
];

export default function HomePage() {
  useDocumentTitle('Home');

  return (
    <div className="py-16 lg:py-24">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-4 mb-20">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm text-muted-foreground mb-8">
          <span className="mr-2">🚀</span> Open Source PDF Component Library
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-foreground">
          Beautiful PDF{' '}
          <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            Components
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Professional PDF components for React. Copy, paste, and customize. Built on
          @react-pdf/renderer.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/docs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/components"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-accent transition-colors"
          >
            Browse Components
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-10">
          Everything you need to build PDFs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-border hover:bg-accent/30 hover:shadow-md"
            >
              <div className="rounded-lg bg-muted/60 p-2.5 w-fit mb-4">
                <feature.icon className="h-5 w-5 text-foreground/70 group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
