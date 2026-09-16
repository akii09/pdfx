import{j as e,V as n,D as a,P as i,S as p}from"./vendor-react-pdf-Cjwg34TF.js";import{H as t}from"./heading-we0QgSEj.js";import{P as s}from"./pdf-preview-Dfzh7wTN.js";import{T as r}from"./text-BiXY7svX.js";import"./vendor-router-_WzAYxGW.js";import{C as m}from"./component-page-CiNJWZS4.js";import{u as d}from"./use-document-title-BkRAt5aO.js";import"./resolve-color-BxFvjghR.js";import"./professional-bF8UWTv_.js";import"./index-BDlxSB_S.js";import"./minus-BCCJyqK0.js";import"./external-link-CwamyJEB.js";import"./package-manager-tabs-BiuBxNKv.js";import"./copy-button-ELSTVhQL.js";import"./check-CKGB0JmE.js";import"./code-block-Dhynpy3z.js";import"./table-of-contents-DszSyZ_o.js";const c=`import { Document, Page } from '@react-pdf/renderer';
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
