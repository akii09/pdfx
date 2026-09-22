import{j as e,V as n,D as a,P as i,S as p}from"./vendor-react-pdf-Cjwg34TF.js";import{H as t}from"./heading-CImmPPRs.js";import{P as s}from"./pdf-preview-BHrJ3dP1.js";import{T as r}from"./text-CVN4IYyJ.js";import"./vendor-router-_WzAYxGW.js";import{C as m}from"./component-page-Dsb9HSsg.js";import{u as d}from"./use-document-title-BkRAt5aO.js";import"./resolve-color-BxFvjghR.js";import"./professional-zmWMFPaq.js";import"./index-aVRymTQf.js";import"./minus-D8TtrHr7.js";import"./external-link-B6iGm3bG.js";import"./package-manager-tabs-B3LEkUjj.js";import"./copy-button-B0mzVDKO.js";import"./check-BToVZ96k.js";import"./code-block-D3TI_xMW.js";import"./table-of-contents-Du6yPds2.js";const c=`import { Document, Page } from '@react-pdf/renderer';
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
}`,g=[{name:"children",type:"ReactNode",description:"Optional elements to render before executing the break."},{name:"style",type:"Style",description:"Additional @react-pdf/renderer styles mapped to the invisible break block."}];function l({style:o}){return e.jsx(n,{break:!0,style:o})}const x=p.create({page:{padding:30}}),f=e.jsx(a,{title:"PDFx PageBreak Preview",children:e.jsxs(i,{size:"A4",style:x.page,children:[e.jsx(t,{level:1,children:"Section 1"}),e.jsx(r,{children:"Content on first page."}),e.jsx(l,{}),e.jsx(t,{level:1,children:"Section 2"}),e.jsx(r,{children:"Content on second page."})]})});function V(){return d("PageBreak Component"),e.jsx(m,{title:"PageBreak",description:"Forces content after it to start on a new page. Wraps @react-pdf View with break prop.",installCommand:"npx pdfx-cli add page-break",componentName:"page-break",preview:e.jsx(s,{title:"Preview",downloadFilename:"page-break-preview.pdf",children:f}),usageCode:c,usageFilename:"src/components/pdfx/page-break/pdfx-page-break.tsx",props:g})}export{V as default};
