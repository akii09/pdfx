import{j as e}from"./index-DahAt_nO.js";import{H as a}from"./heading-CFn4MW_2.js";import{D as r}from"./divider-_9DsGqCW.js";import{P as i,D as o,a as s,S as p}from"./pdf-preview-QyTIboFd.js";import{T as t}from"./text-_lwYOMCx.js";import{S as n}from"./stack-Dqiq81Yz.js";import{C as c}from"./component-page-2X7CQGM1.js";import{u as d}from"./use-document-title-B38_EAXs.js";import"./resolve-color-BxFvjghR.js";import"./code-block-BAoyawpP.js";import"./package-manager-tabs-D6hTRKhP.js";import"./table-of-contents-CGaz3YgJ.js";const m=`import { Document, Page } from '@react-pdf/renderer';
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
