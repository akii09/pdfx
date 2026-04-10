import{j as e,D as r,P as i,V as n,S as l}from"./vendor-react-pdf-D5yotT0u.js";import{P as o}from"./pdf-preview-C-dWRMCZ.js";import"./vendor-router-CswRncel.js";import{B as t}from"./badge-BwL44Sq6.js";import{C as d}from"./component-page-Cm516MBd.js";import{u as c}from"./use-document-title-OpN4jE9d.js";import"./professional-_J-B-WF7.js";import"./index-CHLpfW64.js";import"./minus-h6BPzzA6.js";import"./external-link-Bg6-X6zn.js";import"./resolve-color-BxFvjghR.js";import"./code-block-Ps7jp7f5.js";import"./copy-button-DFNZ7yLf.js";import"./check-DZr3SI8S.js";import"./package-manager-tabs-Dsp9bzl_.js";import"./table-of-contents-B2BUYLVy.js";const m=`import { Document, Page } from '@react-pdf/renderer';
import { Badge } from '@/components/pdfx/badge/pdfx-badge';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        {/* Status badges */}
        <Badge label="Paid" variant="success" />
        <Badge label="Pending" variant="warning" />
        <Badge label="Overdue" variant="destructive" />

        {/* Informational badges */}
        <Badge label="Draft" variant="default" />
        <Badge label="New" variant="primary" />
        <Badge label="Info" variant="info" />
        <Badge label="Outline" variant="outline" />

        {/* Size variants */}
        <Badge label="Small" size="sm" />
        <Badge label="Medium" size="md" />
        <Badge label="Large" size="lg" />
      </Page>
    </Document>
  );
}`,u=[{name:"label",type:"string",required:!0,description:"The text displayed inside the badge."},{name:"variant",type:"'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'info' | 'outline'",defaultValue:"'default'",description:"Visual color variant. default = neutral muted, primary = brand color, success/warning/destructive/info = semantic status colors, outline = transparent with border."},{name:"size",type:"'sm' | 'md' | 'lg'",defaultValue:"'md'",description:"Badge size. Controls padding and font size. sm ≈ 9pt, md = 10pt, lg = 12pt."},{name:"background",type:"string",description:'Custom background color override. Use a theme token (e.g. "muted", "primary") or any CSS color.'},{name:"color",type:"string",description:"Custom text color override. Use a theme token or any CSS color."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles applied to the badge container."}],s=l.create({page:{padding:40},row:{flexDirection:"row",flexWrap:"wrap",gap:6,marginBottom:12}}),g=a=>e.jsx(r,{title:"PDFx Badge Preview",children:e.jsx(i,{size:{width:595,height:200},style:s.page,children:e.jsxs(n,{style:s.row,children:[e.jsx(t,{label:"Small",variant:a,size:"sm"}),e.jsx(t,{label:"Medium",variant:a,size:"md"}),e.jsx(t,{label:"Large",variant:a,size:"lg"})]})})}),p=[{value:"default",label:"Default"},{value:"primary",label:"Primary"},{value:"success",label:"Success"},{value:"warning",label:"Warning"},{value:"destructive",label:"Destructive"},{value:"info",label:"Info"},{value:"outline",label:"Outline"}];function U(){return c("Badge Component"),e.jsx(d,{title:"Badge",description:"Compact status label with seven semantic color variants and three sizes. Use badges to indicate status, categories, or metadata inline within PDF documents.",installCommand:"npx pdfx-cli add badge",componentName:"badge",preview:e.jsx(o,{title:"Preview",downloadFilename:"badge-preview.pdf",variants:{options:p,defaultValue:"default",label:"Variant"},children:g}),usageCode:m,usageFilename:"src/components/pdfx/badge/pdfx-badge.tsx",props:u,additionalInfo:e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"rounded-lg border bg-muted/40 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-2",children:"Variant Guide"}),e.jsxs("ul",{className:"space-y-2 text-sm text-muted-foreground",children:[e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"default"})," — Neutral muted background with border. Use for general labels and categories."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"primary"})," — Brand-colored fill. Use for highlighted or featured items."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"success / warning / destructive / info"})," ","— Semantic status colors. Use for Paid / Pending / Overdue / Notice states."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"outline"})," — Transparent fill with border. Minimal visual weight."]})]})]})]})})})}export{U as default};
