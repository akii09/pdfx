import{j as e}from"./index-C9AvUW2r.js";import{P as o,D as r,a as n,S as a}from"./pdf-preview-rLr0qO0-.js";import{T as t}from"./text-C6j5Jm4z.js";import{C as i}from"./component-page-Ce2pcqep.js";import{u as s}from"./use-document-title-FKNhTRCm.js";import"./resolve-color-BxFvjghR.js";import"./code-block-BtUYxK1y.js";import"./copy-DsPtDBN2.js";import"./package-manager-tabs-ONZ4w3FS.js";import"./table-of-contents-B8-efyUB.js";const p=`import { Document, Page } from '@react-pdf/renderer';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Text>A paragraph of body text in your PDF document.</Text>
        <Text variant="xs" color="mutedForeground">Caption text</Text>
        <Text variant="lg" weight="semibold">Lead paragraph</Text>
        <Text italic decoration="underline">Styled inline text</Text>
        <Text transform="uppercase" variant="sm">Section label</Text>
      </Page>
    </Document>
  );
}`,d=[{name:"variant",type:"'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'",description:"Typography scale. Default (undefined) uses typography.body. Maps to primitives.typography."},{name:"align",type:"'left' | 'center' | 'right'",description:"Text alignment. Maps to textAlign."},{name:"color",type:"string",description:"Text color. Use a theme token ('primary', 'mutedForeground', 'accent', etc.) or any CSS color string."},{name:"weight",type:"'normal' | 'medium' | 'semibold' | 'bold'",description:"Font weight override. Defaults to the body font weight from the active theme."},{name:"italic",type:"boolean",description:"Renders text in italic style."},{name:"decoration",type:"'underline' | 'line-through' | 'none'",description:"Text decoration. Use underline for links or emphasis, line-through for strikethrough."},{name:"transform",type:"'uppercase' | 'lowercase' | 'capitalize' | 'none'",description:"Text transform. Useful for section labels and all-caps styling."},{name:"noMargin",type:"boolean",description:"Removes the default bottom margin added between text blocks."},{name:"children",type:"React.ReactNode",description:"The text content to render",required:!0},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults. Applied last, so it overrides everything."}],l=a.create({page:{padding:30}}),m=e.jsx(r,{title:"PDFx Text Preview",children:e.jsxs(n,{size:"A4",style:l.page,children:[e.jsx(t,{children:"A paragraph of body text in your PDF document."}),e.jsx(t,{variant:"xs",color:"mutedForeground",children:"Caption text"}),e.jsx(t,{variant:"lg",children:"Lead paragraph"})]})});function P(){return s("Text Component"),e.jsx(i,{title:"Text",description:"Theme-aware PDF text component for body paragraphs, labels, and display text. Typography, spacing, and colors come from the active PDFx theme.",installCommand:"npx @akii09/pdfx-cli add text",componentName:"text",preview:e.jsx(o,{title:"Preview",downloadFilename:"text-preview.pdf",children:m}),usageCode:p,usageFilename:"src/components/pdfx/text/pdfx-text.tsx",props:d})}export{P as default};
