import { CodeBlock } from '@/components/code-block';
import { cliCommands, usageExample } from '@/constants/docs.constant';

export default function usageAndCli() {
  return (
    <>
      <section id="usage" className="mb-14 scroll-mt-20">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          Usage
        </h2>
        <p className="text-muted-foreground mb-4">
          Import components from your local pdfx directory and use them inside a
          @react-pdf/renderer Document:
        </p>
        <CodeBlock
          code={usageExample}
          language="tsx"
          filename="my-document.tsx"
        />
      </section>

      <section id="cli-commands" className="mb-14 scroll-mt-20">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          CLI Commands
        </h2>
        <CodeBlock code={cliCommands} language="bash" filename="terminal" />
      </section>
    </>
  );
}
