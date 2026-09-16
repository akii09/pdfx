import{j as e,D as i,P as n,S as o}from"./vendor-react-pdf-Cjwg34TF.js";import{H as a}from"./heading-D0q6S1dE.js";import{D as s}from"./divider-Ce3sTKV5.js";import{P as p}from"./pdf-preview-DA37LMCS.js";import{T as t}from"./text-BqUr7wVB.js";import{S as r}from"./stack-BXyUsIlO.js";import"./vendor-router-_WzAYxGW.js";import{C as c}from"./component-page-KLkix7R7.js";import{u as m}from"./use-document-title-BkRAt5aO.js";import"./resolve-color-BxFvjghR.js";import"./professional-Dv-KvI3m.js";import"./index-D_bZbbGJ.js";import"./minus-CTYSO38O.js";import"./external-link-FJnr3WBf.js";import"./package-manager-tabs-Dy0B9dxf.js";import"./copy-button-BpRcxuVg.js";import"./check-DZ0XotAw.js";import"./code-block-BV-E2tv-.js";import"./table-of-contents-vGfO9rSD.js";const d=`import { Document, Page } from '@react-pdf/renderer';
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
