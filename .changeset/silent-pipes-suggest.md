---
'pdfx-cli': patch
---

Fix EPIPE crashes when CLI output is piped to a command that exits early or an MCP
client disconnects, which accounted for 88% of all reported CLI errors. Registry
misses now suggest similar names — including across blocks and components, so
`pdfx add invoice` points at the `invoice-*` blocks. PostHog flush timeouts are no
longer reported as CLI failures.