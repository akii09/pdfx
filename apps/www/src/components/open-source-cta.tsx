import { Github, MessageCircle, Star } from 'lucide-react';

const REPO_URL = 'https://github.com/akii09/pdfx';
const DISCORD_URL = 'https://discord.gg/MuRtnU5B';

export function OpenSourceCta() {
  return (
    <div className="rounded-xl border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Like what you see? <span className="font-medium text-foreground">PDFX is open source.</span>
      </p>
      <div className="flex items-center gap-2.5 shrink-0">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
          Star on GitHub
          <Github className="h-3.5 w-3.5 text-muted-foreground" />
        </a>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          <MessageCircle className="h-3.5 w-3.5 text-[#5865F2]" />
          Join Discord
        </a>
      </div>
    </div>
  );
}
