import{j as e,D as n,P as i,S as o}from"./vendor-react-pdf-BZRS4xaB.js";import{H as a}from"./heading-BWO371oX.js";import{D as s}from"./divider-D016Z7aD.js";import{P as p}from"./pdf-preview-DVWa4Czf.js";import{T as t}from"./text-Bha3kMvi.js";import{S as r}from"./stack-pFZHb-s5.js";import"./vendor-router-DN-v89qs.js";import{C as c}from"./component-page-B6kMKj7Q.js";import{u as d}from"./use-document-title-NYaeU_iE.js";import"./resolve-color-BxFvjghR.js";import"./index-CVsEOSGs.js";import"./code-block-X1Fq5lu6.js";import"./package-manager-tabs-JCERlw-f.js";import"./table-of-contents-CKwC6e72.js";const m=`import { Document, Page } from '@react-pdf/renderer';
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
}`,l=[{name:"gap",type:"'none' | 'sm' | 'md' | 'lg' | 'xl'",defaultValue:"'md'",description:"Gap between children. Maps to theme spacing scale."},{name:"direction",type:"'vertical' | 'horizontal'",defaultValue:"'vertical'",description:"Stack direction."},{name:"align",type:"'start' | 'center' | 'end' | 'stretch'",description:"Cross-axis alignment."},{name:"justify",type:"'start' | 'center' | 'end' | 'between' | 'around'",description:"Main-axis distribution."},{name:"wrap",type:"boolean",defaultValue:"false",description:"Enable flex-wrap for horizontal stacks."},{name:"noWrap",type:"boolean",defaultValue:"false",description:"Prevent stack from splitting across pages."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults"}],g=o.create({page:{padding:30}}),x=e.jsx(n,{title:"PDFx Stack Preview",children:e.jsxs(i,{size:"A4",style:g.page,children:[e.jsxs(r,{gap:"md",children:[e.jsx(a,{level:2,children:"Section"}),e.jsx(t,{children:"First paragraph."}),e.jsx(t,{children:"Second paragraph."})]}),e.jsx(s,{spacing:"lg"}),e.jsxs(r,{gap:"lg",children:[e.jsx(a,{level:3,children:"Wider gap"}),e.jsx(t,{children:"Content with larger spacing."})]})]})});function F(){return d("Stack Component"),e.jsx(c,{title:"Stack",description:"Vertical layout with theme-based gap between children.",installCommand:"npx @akii09/pdfx-cli add stack",componentName:"stack",preview:e.jsx(p,{title:"Preview",downloadFilename:"stack-preview.pdf",children:x}),usageCode:m,usageFilename:"src/components/pdfx/stack/pdfx-stack.tsx",props:l})}export{F as default};
