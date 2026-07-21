/**
 * Guards against EPIPE errors on the process output streams.
 *
 * When the CLI writes to a pipe whose reader has already closed — `pdfx list | head`,
 * `pdfx add card > /dev/null`, or an MCP client disconnecting mid-response — Node emits
 * an `EPIPE` error on the stream. With no listener attached this becomes an uncaught
 * exception, which is both noise for the user and a false error report in telemetry.
 *
 * There is nothing left to write to and nothing the user can act on, so the correct
 * behavior is a silent, successful exit. Non-EPIPE stream errors are left to bubble as
 * before, since those are real failures worth surfacing.
 */
export function handleStreamError(err: NodeJS.ErrnoException): void {
  if (err.code === 'EPIPE') {
    process.exit(0);
  }
  throw err;
}

export function installEpipeGuards(
  streams: NodeJS.EventEmitter[] = [process.stdout, process.stderr]
): void {
  for (const stream of streams) {
    stream.on('error', handleStreamError);
  }
}
