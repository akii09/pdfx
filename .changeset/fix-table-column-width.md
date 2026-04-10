---
'pdfx-cli': minor
---

Fix `DataTable`/`Table` fixed-width columns and `PdfList` overlapping rows on wrapped text.

**DataTable / Table — fixed-width columns collapsing to zero (#110)**

Setting a `width` prop on a `TableCell` or `DataTable` column had no effect — the column always rendered at zero width. Root cause: `flex: 0` in the `cellFixed` style is shorthand for `flexGrow:0 + flexShrink:0 + flexBasis:0`. The `flexBasis:0` overrode the explicit `width` in Yoga layout. Fixed by replacing `flex: 0` with the individual `flexGrow: 0` / `flexShrink: 0` properties so `width` is respected.

All accepted formats now work: numbers (pt), percentage strings (`"25%"`), and pixel strings (`"50px"`).

**PdfList — overlapping rows when item text wraps to multiple lines (#103)**

`PdfList` with any variant could render overlapping rows when item text wrapped to 2+ lines. Root cause: `flex: 1` on `Text` nodes sets `flexBasis:0`, causing Yoga to under-estimate multi-line text height — the next row was laid out too high. Fixed by moving `flex: 1` off `Text` and onto a wrapping `View` (`itemTextWrap`) across all variants: `bullet`, `numbered`, `checklist`, `icon`, and `multi-level`.

**Existing installs:** re-run `pdfx add table`, `pdfx add data-table`, and `pdfx add list` to pick up these fixes.
