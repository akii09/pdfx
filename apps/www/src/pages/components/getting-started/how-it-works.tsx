export default function HowItWorks() {
  return (
    <>
         <section id="how-it-works" className="mb-14 scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
            <span className="flex h-6 w-1 rounded-full bg-primary" />
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
              <h3 className="font-semibold mb-1.5">1. Initialize</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Run{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">pdfx init</code>{' '}
                to create a pdfx.json config file with your registry URL and component directory.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
              <h3 className="font-semibold mb-1.5">2. Choose a Theme</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Select a theme preset during init. A self-contained theme file is scaffolded into
                your project with all design tokens (colors, typography, spacing, page settings).
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
              <h3 className="font-semibold mb-1.5">3. Add Components</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Use{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">pdfx add</code>{' '}
                to fetch components from the registry. Theme imports are automatically resolved to
                your theme file.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
              <h3 className="font-semibold mb-1.5">4. Customize</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The code is yours. Edit the theme file, tweak component styles, add props, compose
                components together.
              </p>
            </div>
          </div>
        </section>
    </>
  )
}
