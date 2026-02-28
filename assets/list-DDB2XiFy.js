import{j as e}from"./index-gxNVmCa4.js";import{P as s,D as i,a as l,S as n}from"./pdf-preview-CuKAGfS8.js";import{P as a}from"./list-D4309mbU.js";import{C as r}from"./component-page-BeUio_wO.js";import{u as c}from"./use-document-title-DooqJWF8.js";import"./code-block-C6Fi1gnR.js";import"./copy-alp8Mrhl.js";import"./package-manager-tabs-BW2GZ4Yz.js";import"./table-of-contents-D6ZBJUyE.js";const o=`import { Document, Page } from '@react-pdf/renderer';
import { PdfList } from '@/components/pdfx/list/pdfx-list';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        {/* Bullet list */}
        <PdfList
          variant="bullet"
          items={[
            { text: 'Design system alignment' },
            { text: 'Component implementation' },
            { text: 'Write unit tests' },
          ]}
        />

        {/* Checklist with checked state */}
        <PdfList
          variant="checklist"
          items={[
            { text: 'Task complete', checked: true },
            { text: 'Task pending', checked: false },
          ]}
        />

        {/* Multi-level with nesting */}
        <PdfList
          variant="multi-level"
          items={[
            {
              text: 'Frontend',
              children: [
                { text: 'React components' },
                { text: 'PDF renderer' },
              ],
            },
          ]}
        />
      </Page>
    </Document>
  );
}`,d=[{name:"items",type:"ListItem[]",defaultValue:"-",description:"Array of list items. Each item has text, optional description, checked, and children."},{name:"variant",type:"'bullet' | 'numbered' | 'checklist' | 'icon' | 'multi-level' | 'descriptive'",defaultValue:"'bullet'",description:"Visual style of the list. bullet = •, numbered = 1. 2. 3., checklist = checkbox, icon = star icon, multi-level = nested bullets, descriptive = title + description with accent bar."},{name:"gap",type:"'xs' | 'sm' | 'md'",defaultValue:"'sm'",description:"Spacing between list items."},{name:"style",type:"Style",defaultValue:"-",description:"Custom @react-pdf/renderer styles applied to the outer container."},{name:"ListItem.text",type:"string",defaultValue:"-",description:"Primary text or title of the item."},{name:"ListItem.description",type:"string",defaultValue:"-",description:"Optional secondary description (used by descriptive variant)."},{name:"ListItem.checked",type:"boolean",defaultValue:"true",description:"Checked state for checklist variant. Defaults to true."},{name:"ListItem.children",type:"ListItem[]",defaultValue:"-",description:"Nested child items for bullet and multi-level variants."}],m=n.create({page:{padding:40}}),p=[{text:"Design system alignment",description:"Match all components to the design spec"},{text:"Component implementation",description:"Build PDF-native components"},{text:"Write unit tests",description:"Cover all variants and edge cases"}],u=[{text:"Design system alignment",checked:!0},{text:"Component implementation",checked:!0},{text:"Write unit tests",checked:!1}],x=[{text:"Frontend",children:[{text:"React components"},{text:"PDF renderer"}]},{text:"Backend",children:[{text:"REST API"},{text:"Database"}]}],h=t=>e.jsx(i,{title:"PDFx List Preview",children:e.jsx(l,{size:"A4",style:m.page,children:e.jsx(a,{variant:t,items:t==="checklist"?u:t==="multi-level"?x:p})})}),f=[{value:"bullet",label:"Bullet"},{value:"numbered",label:"Numbered"},{value:"checklist",label:"Checklist"},{value:"icon",label:"Icon"},{value:"multi-level",label:"Multi-Level"},{value:"descriptive",label:"Descriptive"}];function C(){return c("List Component"),e.jsx(r,{title:"List",description:"Flexible PDF list component with 6 visual variants: bullet, numbered, checklist, icon, multi-level, and descriptive.",installCommand:"npx @akii09/pdfx-cli add list",componentName:"list",preview:e.jsx(s,{title:"Preview",downloadFilename:"list-preview.pdf",variants:{options:f,defaultValue:"bullet",label:"Variant"},children:h}),usageCode:o,usageFilename:"src/components/pdfx/list/pdfx-list.tsx",props:d,additionalInfo:e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"rounded-lg border bg-muted/40 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-2",children:"Variant Guide"}),e.jsxs("ul",{className:"space-y-2 text-sm text-muted-foreground",children:[e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"bullet"})," — Classic bullet points using •. Sub-items use ◦ (open circle)."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"numbered"})," — Sequential numbered items (1. 2. 3.) for ordered content."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"checklist"})," — Checkbox squares with optional check marks. Uses"," ",e.jsx("code",{className:"text-xs bg-muted px-1 rounded",children:"checked"})," prop per item."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"icon"})," — Star icon in a primary-color box before each item."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"multi-level"})," — Nested hierarchical list. Top-level items are bold; child items are indented with ◦."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"descriptive"})," — Each item has a bold title and a muted description below, with a colored left accent bar."]})]})]})]})})})}export{C as default};
