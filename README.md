# PDFx

![Beta](https://img.shields.io/badge/status-beta-blue?style=flat-square)
![npm](https://img.shields.io/npm/v/pdfx-cli?style=flat-square&label=cli)

Pre-built PDF components for React. Copy them into your project, own them completely. Built on [@react-pdf/renderer](https://react-pdf.org/). No runtime dependency on PDFx.

[![PDFx Demo](https://pdfx.akashpise.dev/og-image.png)](https://pdfx.akashpise.dev/)

## Get started

```bash
npx pdfx-cli init
npx pdfx-cli add heading text badge
```

```tsx
import { Document, Page } from '@react-pdf/renderer';
import { Heading, Text, Badge } from './components/pdfx';

export default () => (
  <Document>
    <Page>
      <Heading level={1}>Invoice #1042</Heading>
      <Badge label="Paid" variant="success" />
      <Text>Thank you for your business.</Text>
    </Page>
  </Document>
);
```

## Documentation

Visit [pdfx.akashpise.dev](https://pdfx.akashpise.dev/docs) for the full docs, component previews, and block templates.

## Contributing

Please read the [contributing guide](./CONTRIBUTING.md) before opening a PR.

## License

MIT © [Akii](https://github.com/akii09)
