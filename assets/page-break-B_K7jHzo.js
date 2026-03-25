import{j as e,V as o,D as n,P as p,S as i}from"./vendor-react-pdf-BZRS4xaB.js";import{H as t}from"./heading-ezXuyu8N.js";import{P as s}from"./pdf-preview-4aabFIBH.js";import{T as a}from"./text-DezJmATW.js";import"./vendor-router-DN-v89qs.js";import{C as m}from"./component-page-aVtV9oVW.js";import{u as d}from"./use-document-title-NYaeU_iE.js";import"./resolve-color-BxFvjghR.js";import"./index-B_o5uybQ.js";import"./code-block-BcojrypW.js";import"./package-manager-tabs-BLTKzQ-v.js";import"./table-of-contents-BXvD2Kw8.js";const g=`import { Document, Page } from '@react-pdf/renderer';
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
}`,c=[{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults"}];function l({style:r}){return e.jsx(o,{break:!0,style:r})}const x=i.create({page:{padding:30}}),f=e.jsx(n,{title:"PDFx PageBreak Preview",children:e.jsxs(p,{size:"A4",style:x.page,children:[e.jsx(t,{level:1,children:"Section 1"}),e.jsx(a,{children:"Content on first page."}),e.jsx(l,{}),e.jsx(t,{level:1,children:"Section 2"}),e.jsx(a,{children:"Content on second page."})]})});function S(){return d("PageBreak Component"),e.jsx(m,{title:"PageBreak",description:"Forces content after it to start on a new page. Wraps @react-pdf View with break prop.",installCommand:"npx @akii09/pdfx-cli add page-break",componentName:"page-break",preview:e.jsx(s,{title:"Preview",downloadFilename:"page-break-preview.pdf",children:f}),usageCode:g,usageFilename:"src/components/pdfx/page-break/pdfx-page-break.tsx",props:c})}export{S as default};
