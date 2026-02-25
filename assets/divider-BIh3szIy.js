import{j as e}from"./index-C9AvUW2r.js";import{H as t}from"./heading-D7qJzSVZ.js";import{D as n}from"./divider-DayjcAJQ.js";import{P as r,D as o,a as d,S as s}from"./pdf-preview-rLr0qO0-.js";import{T as i}from"./text-C6j5Jm4z.js";import{C as a}from"./component-page-Ce2pcqep.js";import{u as l}from"./use-document-title-FKNhTRCm.js";import"./resolve-color-BxFvjghR.js";import"./code-block-BtUYxK1y.js";import"./copy-DsPtDBN2.js";import"./package-manager-tabs-ONZ4w3FS.js";import"./table-of-contents-B8-efyUB.js";const p=`import { Document, Page } from '@react-pdf/renderer';
import { Divider } from '@/components/pdfx/divider/pdfx-divider';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Heading level={2}>Section 1</Heading>
        <Text>Content here.</Text>
        <Divider />
        <Heading level={2}>Section 2</Heading>
        <Text>More content.</Text>
      </Page>
    </Document>
  );
}`,c=[{name:"spacing",type:"'none' | 'sm' | 'md' | 'lg'",defaultValue:"'md'",description:"Vertical spacing above and below. Maps to theme spacing scale."},{name:"label",type:"string",description:'Optional text label displayed in the center of the divider. Common for "OR", "Section N", etc.'},{name:"color",type:"string",description:'Line color. Use theme token (e.g. "border", "muted", "primary") or any CSS color.'},{name:"variant",type:"'solid' | 'dashed' | 'dotted'",defaultValue:"'solid'",description:"Line variant style."},{name:"thickness",type:"'thin' | 'medium' | 'thick'",defaultValue:"'thin'",description:"Line thickness."},{name:"width",type:"string | number",description:'Width of the divider line. Use a percentage string (e.g. "60%") or number (pts). Defaults to "100%".'},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults"}],m=s.create({page:{padding:30}}),x=e.jsx(o,{title:"PDFx Divider Preview",children:e.jsxs(d,{size:"A4",style:m.page,children:[e.jsx(t,{level:2,children:"Section 1"}),e.jsx(i,{children:"Content here."}),e.jsx(n,{}),e.jsx(t,{level:2,children:"Section 2"}),e.jsx(i,{children:"More content."}),e.jsx(n,{variant:"dashed"}),e.jsx(t,{level:2,children:"Section 3"}),e.jsx(i,{children:"More content."}),e.jsx(n,{variant:"dotted"}),e.jsx(t,{level:2,children:"Section 4"}),e.jsx(i,{children:"More content."}),e.jsx(n,{label:"Section Divider"}),e.jsx(t,{level:2,children:"Section 5"}),e.jsx(i,{children:"More content."})]})});function b(){return l("Divider Component"),e.jsx(a,{title:"Divider",description:"Horizontal rule with theme-based border color and spacing.",installCommand:"npx @akii09/pdfx-cli add divider",componentName:"divider",preview:e.jsx(r,{title:"Preview",downloadFilename:"divider-preview.pdf",children:x}),usageCode:p,usageFilename:"src/components/pdfx/divider/pdfx-divider.tsx",props:c})}export{b as default};
