import{j as e,D as i,P as n,S as o}from"./vendor-react-pdf-D5yotT0u.js";import{H as a}from"./heading-Dt-iZ78I.js";import{D as s}from"./divider-BIPoixlK.js";import{P as p}from"./pdf-preview-CWwu9ZQW.js";import{T as t}from"./text-C1MptY6K.js";import{S as r}from"./stack-CREON_N1.js";import"./vendor-router-CswRncel.js";import{C as c}from"./component-page-B6ftvf8X.js";import{u as m}from"./use-document-title-OpN4jE9d.js";import"./resolve-color-BxFvjghR.js";import"./professional-D9NYJ_w5.js";import"./index-Bn4o9oUI.js";import"./minus-B1rlrawW.js";import"./external-link-DwXF5_Ms.js";import"./code-block-CBHX0lsO.js";import"./copy-button-CSRl7ESY.js";import"./check-Bj2KPsR4.js";import"./package-manager-tabs-CcKfyfYU.js";import"./table-of-contents-By8xTA8x.js";const d=`import { Document, Page } from '@react-pdf/renderer';
import { Stack } from '@/components/pdfx/stack/pdfx-stack';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Stack gap="md">
          <Heading level={2}>Section</Heading>
          <Text>First paragraph.</Text>
          <Text>Second paragraph.</Text>
        </Stack>
      </Page>
    </Document>
  );
}`,l=[{name:"gap",type:"'none' | 'sm' | 'md' | 'lg' | 'xl'",defaultValue:"'md'",description:"Gap between children. Maps to theme spacing scale."},{name:"direction",type:"'vertical' | 'horizontal'",defaultValue:"'vertical'",description:"Stack direction."},{name:"align",type:"'start' | 'center' | 'end' | 'stretch'",description:"Cross-axis alignment."},{name:"justify",type:"'start' | 'center' | 'end' | 'between' | 'around'",description:"Main-axis distribution."},{name:"wrap",type:"boolean",defaultValue:"false",description:"Enable flex-wrap for horizontal stacks."},{name:"noWrap",type:"boolean",defaultValue:"false",description:"Prevent stack from splitting across pages."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults"}],g=o.create({page:{padding:30}}),x=e.jsx(i,{title:"PDFx Stack Preview",children:e.jsxs(n,{size:"A4",style:g.page,children:[e.jsxs(r,{gap:"md",children:[e.jsx(a,{level:2,children:"Section"}),e.jsx(t,{children:"First paragraph."}),e.jsx(t,{children:"Second paragraph."})]}),e.jsx(s,{spacing:"lg"}),e.jsxs(r,{gap:"lg",children:[e.jsx(a,{level:3,children:"Wider gap"}),e.jsx(t,{children:"Content with larger spacing."})]})]})});function A(){return m("Stack Component"),e.jsx(c,{title:"Stack",description:"Vertical layout with theme-based gap between children.",installCommand:"npx pdfx-cli add stack",componentName:"stack",preview:e.jsx(p,{title:"Preview",downloadFilename:"stack-preview.pdf",children:x}),usageCode:d,usageFilename:"src/components/pdfx/stack/pdfx-stack.tsx",props:l})}export{A as default};
