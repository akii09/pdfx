"pdfx-cli": minor

Improve the theming workflow in `pdfx-cli`.

- harden generated theme files by safely escaping string values in the emitted TypeScript
- expose the expanded built-in preset set through shared theme preset support in `pdfx theme switch`
- align the CLI release with the newer Theme Builder and shared theme model
