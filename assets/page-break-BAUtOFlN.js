import{j as e,V as n,D as a,P as i,S as p}from"./vendor-react-pdf-Bm5uTGBL.js";import{H as t}from"./heading-BBKZCyC7.js";import{P as s}from"./pdf-preview-DSc-rLZU.js";import{T as r}from"./text-CxTvmUEX.js";import"./vendor-router-CswRncel.js";import{C as m}from"./component-page-Dqcfyd6A.js";import{u as d}from"./use-document-title-OpN4jE9d.js";import"./resolve-color-BxFvjghR.js";import"./index-QYM1IGGs.js";import"./minus-CF72a5Zd.js";import"./code-block-C8Zvn9s6.js";import"./copy-button-Dp0nxViQ.js";import"./check-CmG3vaH1.js";import"./package-manager-tabs-Ytw6L93K.js";import"./table-of-contents-Ci6X0sR-.js";const c=`import { Document, Page } from '@react-pdf/renderer';
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
}`,g=[{name:"children",type:"ReactNode",description:"Optional elements to render before executing the break."},{name:"style",type:"Style",description:"Additional @react-pdf/renderer styles mapped to the invisible break block."}];function l({style:o}){return e.jsx(n,{break:!0,style:o})}const x=p.create({page:{padding:30}}),f=e.jsx(a,{title:"PDFx PageBreak Preview",children:e.jsxs(i,{size:"A4",style:x.page,children:[e.jsx(t,{level:1,children:"Section 1"}),e.jsx(r,{children:"Content on first page."}),e.jsx(l,{}),e.jsx(t,{level:1,children:"Section 2"}),e.jsx(r,{children:"Content on second page."})]})});function F(){return d("PageBreak Component"),e.jsx(m,{title:"PageBreak",description:"Forces content after it to start on a new page. Wraps @react-pdf View with break prop.",installCommand:"npx pdfx-cli add page-break",componentName:"page-break",preview:e.jsx(s,{title:"Preview",downloadFilename:"page-break-preview.pdf",children:f}),usageCode:c,usageFilename:"src/components/pdfx/page-break/pdfx-page-break.tsx",props:g})}export{F as default};
