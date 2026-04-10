import{j as e,D as r,P as o,S as d}from"./vendor-react-pdf-D5yotT0u.js";import{H as t}from"./heading-CFSNfoGL.js";import{D as n}from"./divider-DMelwVxP.js";import{P as s}from"./pdf-preview-BzfnhC3i.js";import{T as i}from"./text-D5OIe2NE.js";import"./vendor-router-CswRncel.js";import{C as a}from"./component-page-BCQrGA2N.js";import{u as p}from"./use-document-title-OpN4jE9d.js";import"./resolve-color-BxFvjghR.js";import"./professional-CEP_EpA-.js";import"./index-qneBZpLb.js";import"./minus-DTAE50tf.js";import"./external-link-DmMEow8X.js";import"./code-block-DgotPMTm.js";import"./copy-button-DIlTeL3V.js";import"./check-CBXfw9Qd.js";import"./package-manager-tabs-D1YhkLpp.js";import"./table-of-contents-D90e6chf.js";const m=`import { Document, Page } from '@react-pdf/renderer';
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
}`,l=[{name:"spacing",type:"'none' | 'sm' | 'md' | 'lg'",defaultValue:"'md'",description:"Vertical spacing above and below. Maps to theme spacing scale."},{name:"label",type:"string",description:'Optional text label displayed in the center of the divider. Common for "OR", "Section N", etc.'},{name:"color",type:"string",description:'Line color. Use theme token (e.g. "border", "muted", "primary") or any CSS color.'},{name:"variant",type:"'solid' | 'dashed' | 'dotted'",defaultValue:"'solid'",description:"Line variant style."},{name:"thickness",type:"'thin' | 'medium' | 'thick'",defaultValue:"'thin'",description:"Line thickness."},{name:"width",type:"string | number",description:'Width of the divider line. Use a percentage string (e.g. "60%") or number (pts). Defaults to "100%".'},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults"}],c=d.create({page:{padding:30}}),x=e.jsx(r,{title:"PDFx Divider Preview",children:e.jsxs(o,{size:"A4",style:c.page,children:[e.jsx(t,{level:2,children:"Section 1"}),e.jsx(i,{children:"Content here."}),e.jsx(n,{}),e.jsx(t,{level:2,children:"Section 2"}),e.jsx(i,{children:"More content."}),e.jsx(n,{variant:"dashed"}),e.jsx(t,{level:2,children:"Section 3"}),e.jsx(i,{children:"More content."}),e.jsx(n,{variant:"dotted"}),e.jsx(t,{level:2,children:"Section 4"}),e.jsx(i,{children:"More content."}),e.jsx(n,{label:"Section Divider"}),e.jsx(t,{level:2,children:"Section 5"}),e.jsx(i,{children:"More content."})]})});function V(){return p("Divider Component"),e.jsx(a,{title:"Divider",description:"Horizontal rule with theme-based border color and spacing.",installCommand:"npx pdfx-cli add divider",componentName:"divider",preview:e.jsx(s,{title:"Preview",downloadFilename:"divider-preview.pdf",children:x}),usageCode:m,usageFilename:"src/components/pdfx/divider/pdfx-divider.tsx",props:l})}export{V as default};
