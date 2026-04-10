import{j as e,D as i,P as r,S as s}from"./vendor-react-pdf-D5yotT0u.js";import{H as t}from"./heading-Dt-iZ78I.js";import{P as a}from"./pdf-preview-CWwu9ZQW.js";import{T as n}from"./text-C1MptY6K.js";import{S as o}from"./section-BBXa7QXb.js";import"./vendor-router-CswRncel.js";import{C as c}from"./component-page-B6ftvf8X.js";import{u as p}from"./use-document-title-OpN4jE9d.js";import"./resolve-color-BxFvjghR.js";import"./professional-D9NYJ_w5.js";import"./index-Bn4o9oUI.js";import"./minus-B1rlrawW.js";import"./external-link-DwXF5_Ms.js";import"./code-block-CBHX0lsO.js";import"./copy-button-CSRl7ESY.js";import"./check-Bj2KPsR4.js";import"./package-manager-tabs-CcKfyfYU.js";import"./table-of-contents-By8xTA8x.js";const d=`import { Document, Page } from '@react-pdf/renderer';
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
}`,l=[{name:"spacing",type:"'none' | 'sm' | 'md' | 'lg' | 'xl'",defaultValue:"'md'",description:"Vertical spacing (margin) around the section. Maps to theme."},{name:"padding",type:"'none' | 'sm' | 'md' | 'lg'",description:"Inner padding scale for the section."},{name:"background",type:"string",description:"Background color token or raw CSS color."},{name:"border",type:"boolean",defaultValue:"false",description:"Adds a standard border around default variant sections."},{name:"variant",type:"'default' | 'callout' | 'highlight' | 'card'",defaultValue:"'default'",description:"Visual section variant with predefined styling."},{name:"accentColor",type:"string",description:"Accent color for callout/highlight left border."},{name:"noWrap",type:"boolean",defaultValue:"false",description:"Prevent section content from splitting across pages."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults"}],m=s.create({page:{padding:30}}),g=e.jsx(i,{title:"PDFx Section Preview",children:e.jsxs(r,{size:"A4",style:m.page,children:[e.jsxs(o,{spacing:"lg",children:[e.jsx(t,{level:2,children:"Introduction"}),e.jsx(n,{children:"This is the intro section with larger spacing."})]}),e.jsxs(o,{spacing:"md",children:[e.jsx(t,{level:2,children:"Details"}),e.jsx(n,{children:"This section uses default section gap."})]})]})});function k(){return p("Section Component"),e.jsx(c,{title:"Section",description:"Logical section with theme-based vertical spacing.",installCommand:"npx pdfx-cli add section",componentName:"section",preview:e.jsx(a,{title:"Preview",downloadFilename:"section-preview.pdf",children:g}),usageCode:d,usageFilename:"src/components/pdfx/section/pdfx-section.tsx",props:l})}export{k as default};
