import{j as e,D as i,P as n,S as o}from"./vendor-react-pdf-D5yotT0u.js";import{H as a}from"./heading-DatJGODw.js";import{D as s}from"./divider-K1tACb7V.js";import{P as p}from"./pdf-preview-BhhkHE99.js";import{T as t}from"./text-D7LDpgp9.js";import{S as r}from"./stack-B27hHIRS.js";import"./vendor-router-CswRncel.js";import{C as c}from"./component-page-CKFYBr5j.js";import{u as m}from"./use-document-title-OpN4jE9d.js";import"./resolve-color-BxFvjghR.js";import"./professional-DXuP3l6s.js";import"./index-I6Bgo7YV.js";import"./minus-Cmo7qOV2.js";import"./external-link-BaHQEKkJ.js";import"./code-block-BwEgw_WR.js";import"./copy-button-DpTwZmz3.js";import"./check-bUT-wbKf.js";import"./package-manager-tabs-DeGxF0U7.js";import"./table-of-contents-wzNpuEF3.js";const d=`import { Document, Page } from '@react-pdf/renderer';
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
