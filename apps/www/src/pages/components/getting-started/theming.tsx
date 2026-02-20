import { CodeBlock } from '@/components/code-block';
import { themeCommands, themeCustomization } from '@/constants/docs.constant';

export default function Theming() {
  return (
    <>
      <section id="theming" className="mb-14 scroll-mt-20">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          Theming
        </h2>
        <p className="text-muted-foreground mb-6">
          PDFx includes a comprehensive theme system. During{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">pdfx init</code>, you
          choose from three preset themes:
        </p>
        <div className="grid gap-4 mb-8">
          <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
            <h3 className="font-semibold mb-1.5">Professional</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Serif headings (Times-Roman), navy primary color, generous margins. Ideal for formal
              documents, reports, and business correspondence.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
            <h3 className="font-semibold mb-1.5">Modern</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sans-serif throughout (Helvetica), vibrant purple accent, tight spacing. Perfect for
              startups, marketing materials, and contemporary designs.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
            <h3 className="font-semibold mb-1.5">Minimal</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Monospace headings (Courier), stark black palette, maximum whitespace. Great for
              technical documentation, developer-facing content, and clean aesthetics.
            </p>
          </div>
        </div>

        <h3 id="theme-cli" className="text-lg font-semibold mb-3 scroll-mt-20">
          Theme CLI Commands
        </h3>
        <CodeBlock code={themeCommands} language="bash" filename="terminal" />

        <h3 id="customizing" className="text-lg font-semibold mb-3 mt-8 scroll-mt-20">
          Customizing Your Theme
        </h3>
        <p className="text-muted-foreground mb-4">
          The theme file is scaffolded into your project — you own it. Edit colors, fonts, spacing,
          and page settings to match your brand:
        </p>
        <CodeBlock code={themeCustomization} language="tsx" filename="src/lib/pdfx-theme.ts" />
      </section>
    </>
  );
}
