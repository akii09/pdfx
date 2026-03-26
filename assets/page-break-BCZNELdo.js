import{j as e,V as a,D as n,P as p,S as i}from"./vendor-react-pdf-BZRS4xaB.js";import{H as t}from"./heading-BnnpjKEB.js";import{P as s}from"./pdf-preview-CLFj3N2n.js";import{T as r}from"./text-DHq8gCw6.js";import"./vendor-router-DN-v89qs.js";import{C as m}from"./component-page-COoUQNeF.js";import{u as d}from"./use-document-title-NYaeU_iE.js";import"./resolve-color-BxFvjghR.js";import"./index-MaI1d3bB.js";import"./minus-8-Z6V1_O.js";import"./code-block-B2HziCou.js";import"./copy-button-CA6nVdfU.js";import"./package-manager-tabs-BA3NuNPV.js";import"./table-of-contents-CEMxqYPS.js";const g=`import { Document, Page } from '@react-pdf/renderer';
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
}`,c=[{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults"}];function l({style:o}){return e.jsx(a,{break:!0,style:o})}const x=i.create({page:{padding:30}}),f=e.jsx(n,{title:"PDFx PageBreak Preview",children:e.jsxs(p,{size:"A4",style:x.page,children:[e.jsx(t,{level:1,children:"Section 1"}),e.jsx(r,{children:"Content on first page."}),e.jsx(l,{}),e.jsx(t,{level:1,children:"Section 2"}),e.jsx(r,{children:"Content on second page."})]})});function H(){return d("PageBreak Component"),e.jsx(m,{title:"PageBreak",description:"Forces content after it to start on a new page. Wraps @react-pdf View with break prop.",installCommand:"npx @akii09/pdfx-cli add page-break",componentName:"page-break",preview:e.jsx(s,{title:"Preview",downloadFilename:"page-break-preview.pdf",children:f}),usageCode:g,usageFilename:"src/components/pdfx/page-break/pdfx-page-break.tsx",props:c})}export{H as default};
