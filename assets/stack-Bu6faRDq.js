import{j as e}from"./index-DmNijxtX.js";import{H as a}from"./heading-DUzoyavj.js";import{D as r}from"./divider-DGWs62aM.js";import{P as i,D as o,a as s,S as p}from"./pdf-preview-DGXm3Lcf.js";import{T as t}from"./text-BPAvJUDy.js";import{S as n}from"./stack-yNz6AP7y.js";import{C as c}from"./component-page-fGHKvB_q.js";import{u as d}from"./use-document-title-gI8AKaoa.js";import"./resolve-color-BxFvjghR.js";import"./code-block-BFJODRQs.js";import"./package-manager-tabs-CJJSch_d.js";import"./table-of-contents-DfGAEpmx.js";const m=`import { Document, Page } from '@react-pdf/renderer';
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
}`,l=[{name:"gap",type:"'none' | 'sm' | 'md' | 'lg' | 'xl'",defaultValue:"'md'",description:"Gap between children. Maps to theme spacing scale."},{name:"direction",type:"'vertical' | 'horizontal'",defaultValue:"'vertical'",description:"Stack direction."},{name:"align",type:"'start' | 'center' | 'end' | 'stretch'",description:"Cross-axis alignment."},{name:"justify",type:"'start' | 'center' | 'end' | 'between' | 'around'",description:"Main-axis distribution."},{name:"wrap",type:"boolean",defaultValue:"false",description:"Enable flex-wrap for horizontal stacks."},{name:"noWrap",type:"boolean",defaultValue:"false",description:"Prevent stack from splitting across pages."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults"}],g=p.create({page:{padding:30}}),x=e.jsx(o,{title:"PDFx Stack Preview",children:e.jsxs(s,{size:"A4",style:g.page,children:[e.jsxs(n,{gap:"md",children:[e.jsx(a,{level:2,children:"Section"}),e.jsx(t,{children:"First paragraph."}),e.jsx(t,{children:"Second paragraph."})]}),e.jsx(r,{spacing:"lg"}),e.jsxs(n,{gap:"lg",children:[e.jsx(a,{level:3,children:"Wider gap"}),e.jsx(t,{children:"Content with larger spacing."})]})]})});function b(){return d("Stack Component"),e.jsx(c,{title:"Stack",description:"Vertical layout with theme-based gap between children.",installCommand:"npx @akii09/pdfx-cli add stack",componentName:"stack",preview:e.jsx(i,{title:"Preview",downloadFilename:"stack-preview.pdf",children:x}),usageCode:m,usageFilename:"src/components/pdfx/stack/pdfx-stack.tsx",props:l})}export{b as default};
