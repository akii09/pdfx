import{j as e}from"./index-DpQFaQKQ.js";import{H as t}from"./heading-CCjC3neV.js";import{V as n,P as o,D as p,a as i,S as s}from"./pdf-preview-71eu4G9w.js";import{T as a}from"./text-DgXG2BPm.js";import{C as m}from"./component-page-DS5diFqS.js";import{u as d}from"./use-document-title-CD_00GQo.js";import"./resolve-color-BxFvjghR.js";import"./code-block-DnaITY1z.js";import"./package-manager-tabs-BPdYVnF2.js";import"./table-of-contents-BlFC3156.js";const g=`import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { PageBreak } from '@/components/pdfx/page-break/pdfx-page-break';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Heading level={1}>Section 1</Heading>
        <Text>Content on first page.</Text>
        <PageBreak />
        <Heading level={1}>Section 2</Heading>
        <Text>Content on second page.</Text>
      </Page>
    </Document>
  );
}`,c=[{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults"}];function l({style:r}){return e.jsx(n,{break:!0,style:r})}const x=s.create({page:{padding:30}}),f=e.jsx(p,{title:"PDFx PageBreak Preview",children:e.jsxs(i,{size:"A4",style:x.page,children:[e.jsx(t,{level:1,children:"Section 1"}),e.jsx(a,{children:"Content on first page."}),e.jsx(l,{}),e.jsx(t,{level:1,children:"Section 2"}),e.jsx(a,{children:"Content on second page."})]})});function y(){return d("PageBreak Component"),e.jsx(m,{title:"PageBreak",description:"Forces content after it to start on a new page. Wraps @react-pdf View with break prop.",installCommand:"npx @akii09/pdfx-cli add page-break",componentName:"page-break",preview:e.jsx(o,{title:"Preview",downloadFilename:"page-break-preview.pdf",children:f}),usageCode:g,usageFilename:"src/components/pdfx/page-break/pdfx-page-break.tsx",props:c})}export{y as default};
