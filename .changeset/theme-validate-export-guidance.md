---
'pdfx-cli': patch
---

Make `theme validate` actionable when a theme file has no supported named `theme`
export. The error replaces "No exported `theme` object found." with the file it
inspected, the required `export const theme = { ... }` form, and an explicit note that
default exports, differently named exports, and separate `export { theme }`
declarations are not supported. Static-parsing failures explain why dynamic
expressions cannot be evaluated.

Theme paths are reported as configured in `pdfx.json` rather than resolved, so an
absolute configured path no longer puts the user's home directory into an error
message that is sent to exception telemetry.

Validation still uses TypeScript AST parsing and never executes the theme module.
