import{j as e,D as i,P as r,S as s}from"./vendor-react-pdf-Cjwg34TF.js";import{H as t}from"./heading-we0QgSEj.js";import{P as a}from"./pdf-preview-Dfzh7wTN.js";import{T as n}from"./text-BiXY7svX.js";import{S as o}from"./section-OmAuJ-cs.js";import"./vendor-router-_WzAYxGW.js";import{C as c}from"./component-page-CiNJWZS4.js";import{u as p}from"./use-document-title-BkRAt5aO.js";import"./resolve-color-BxFvjghR.js";import"./professional-bF8UWTv_.js";import"./index-BDlxSB_S.js";import"./minus-BCCJyqK0.js";import"./external-link-CwamyJEB.js";import"./package-manager-tabs-BiuBxNKv.js";import"./copy-button-ELSTVhQL.js";import"./check-CKGB0JmE.js";import"./code-block-Dhynpy3z.js";import"./table-of-contents-DszSyZ_o.js";const d=`import { Document, Page } from '@react-pdf/renderer';
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
