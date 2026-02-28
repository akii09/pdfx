import{j as e}from"./index-gxNVmCa4.js";import{H as t}from"./heading-Cwps6TPu.js";import{P as i,D as s,a,S as r}from"./pdf-preview-CuKAGfS8.js";import{T as n}from"./text-BI7uRLsX.js";import{S as o}from"./section-CcfaRtbW.js";import{C as c}from"./component-page-BeUio_wO.js";import{u as d}from"./use-document-title-DooqJWF8.js";import"./resolve-color-BxFvjghR.js";import"./code-block-C6Fi1gnR.js";import"./copy-alp8Mrhl.js";import"./package-manager-tabs-BW2GZ4Yz.js";import"./table-of-contents-D6ZBJUyE.js";const p=`import { Document, Page } from '@react-pdf/renderer';
import { Section } from '@/components/pdfx/section/pdfx-section';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Section spacing="lg">
          <Heading level={2}>Introduction</Heading>
          <Text>This is the intro section.</Text>
        </Section>
        <Section spacing="md">
          <Heading level={2}>Details</Heading>
          <Text>More content here.</Text>
        </Section>
      </Page>
    </Document>
  );
}`,l=[{name:"spacing",type:"'none' | 'sm' | 'md' | 'lg' | 'xl'",defaultValue:"'md'",description:"Vertical spacing (margin) around the section. Maps to theme."},{name:"padding",type:"'none' | 'sm' | 'md' | 'lg'",description:"Inner padding scale for the section."},{name:"background",type:"string",description:"Background color token or raw CSS color."},{name:"border",type:"boolean",defaultValue:"false",description:"Adds a standard border around default variant sections."},{name:"variant",type:"'default' | 'callout' | 'highlight' | 'card'",defaultValue:"'default'",description:"Visual section variant with predefined styling."},{name:"accentColor",type:"string",description:"Accent color for callout/highlight left border."},{name:"noWrap",type:"boolean",defaultValue:"false",description:"Prevent section content from splitting across pages."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults"}],m=r.create({page:{padding:30}}),g=e.jsx(s,{title:"PDFx Section Preview",children:e.jsxs(a,{size:"A4",style:m.page,children:[e.jsxs(o,{spacing:"lg",children:[e.jsx(t,{level:2,children:"Introduction"}),e.jsx(n,{children:"This is the intro section with larger spacing."})]}),e.jsxs(o,{spacing:"md",children:[e.jsx(t,{level:2,children:"Details"}),e.jsx(n,{children:"This section uses default section gap."})]})]})});function C(){return d("Section Component"),e.jsx(c,{title:"Section",description:"Logical section with theme-based vertical spacing.",installCommand:"npx @akii09/pdfx-cli add section",componentName:"section",preview:e.jsx(i,{title:"Preview",downloadFilename:"section-preview.pdf",children:g}),usageCode:p,usageFilename:"src/components/pdfx/section/pdfx-section.tsx",props:l})}export{C as default};
