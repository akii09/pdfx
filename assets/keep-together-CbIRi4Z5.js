import{j as e}from"./index-BVFh2AD0.js";import{H as t}from"./heading-DGDvsETl.js";import{V as i,P as d,D as p,a as c,S as h}from"./pdf-preview-B-SOP6ZJ.js";import{T as a}from"./text-DwTaQg4z.js";import{S as s}from"./section-DGyVyfMJ.js";import{C as m}from"./component-page-GS5dkn21.js";import{u as g}from"./use-document-title-V-BiQsgU.js";import"./resolve-color-BxFvjghR.js";import"./code-block-MMyd8R4U.js";import"./copy-LVkApIKL.js";import"./package-manager-tabs-BqfAVd2q.js";import"./table-of-contents-B_FJiNHG.js";const x=`import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/pdfx/table/pdfx-table';
import { KeepTogether } from '@/components/pdfx/keep-together/pdfx-keep-together';

const styles = StyleSheet.create({ page: { padding: 40 } });

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Heading + Table will never be separated by a page break */}
        <KeepTogether>
          <Heading level={2}>Quarterly Financials</Heading>
          <Table variant="line">
            <TableHeader>
              <TableRow header>
                <TableCell header>Quarter</TableCell>
                <TableCell header align="right">Revenue</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Q1</TableCell>
                <TableCell align="right">$42,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </KeepTogether>

        {/* Softer version: only moves to next page if < 100pt remain */}
        <KeepTogether minPresenceAhead={100}>
          <Heading level={3}>Notes</Heading>
        </KeepTogether>
      </Page>
    </Document>
  );
}`,f=[{name:"children",type:"ReactNode",description:"Content to keep on one page. Treated as atomic by the layout engine."},{name:"minPresenceAhead",type:"number",description:"Move the block to the next page if fewer than this many PDF points remain. Use as a softer alternative to wrap={false}."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer style applied to the wrapping View."}];function r({children:n,minPresenceAhead:o,style:l}){return e.jsx(i,{wrap:!1,minPresenceAhead:o,style:l,children:n})}const b=h.create({page:{padding:40}}),u=()=>e.jsx(p,{title:"PDFx KeepTogether Preview",children:e.jsxs(c,{size:"A4",style:b.page,children:[e.jsxs(r,{children:[e.jsx(t,{level:2,children:"Section Title"}),e.jsx(s,{variant:"callout",padding:"sm",children:e.jsx(a,{children:"This heading and callout section are wrapped in KeepTogether — they will never be separated by a page break. The layout engine treats them as a single atomic block."})})]}),e.jsxs(r,{minPresenceAhead:80,children:[e.jsx(t,{level:3,children:"Subsection Heading"}),e.jsxs(a,{children:["This heading uses minPresenceAhead=",80,". If fewer than 80pt remain on the current page, the heading moves to the next page — but it does not prevent the content below from wrapping normally."]})]}),e.jsxs(r,{children:[e.jsx(t,{level:4,children:"Signature Block"}),e.jsx(s,{variant:"card",padding:"sm",children:e.jsx(a,{children:"Content that must always stay with its heading."})})]})]})});function D(){return g("KeepTogether Component"),e.jsx(m,{title:"KeepTogether",description:"Utility wrapper that prevents its children from being split across page boundaries. Wraps content in a react-pdf wrap={false} View — treating the subtree as an atomic block that either fits on the current page or moves entirely to the next.",installCommand:"npx @akii09/pdfx-cli add keep-together",componentName:"keep-together",preview:e.jsx(d,{title:"Preview",downloadFilename:"keep-together-preview.pdf",children:u}),usageCode:x,usageFilename:"src/components/pdfx/keep-together/pdfx-keep-together.tsx",props:f,additionalInfo:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"rounded-lg border bg-muted/40 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-2",children:"When to use KeepTogether"}),e.jsxs("ul",{className:"space-y-2 text-sm text-muted-foreground",children:[e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"Heading + first paragraph"})," — Prevents an orphaned heading at the bottom of a page."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"Heading + small table"})," — Keeps a section title together with its data table."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"Callout / highlight sections"})," — Keeps visually bordered blocks from splitting across pages."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"Signature blocks"})," — Ensures signers are never split across pages."]})]})]})]}),e.jsxs("div",{className:"rounded-lg border bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-1 text-amber-900 dark:text-amber-200",children:"⚠️ Content larger than one page"}),e.jsx("p",{className:"text-sm text-amber-800 dark:text-amber-300",children:"If the wrapped content is taller than a full page, it will overflow rather than split. Only use KeepTogether for content that is guaranteed to fit on a single page."})]}),e.jsxs("div",{className:"rounded-lg border bg-muted/40 p-4",children:[e.jsxs("h3",{className:"text-sm font-semibold mb-2",children:["wrap=","{false}"," vs minPresenceAhead"]}),e.jsxs("ul",{className:"space-y-1 text-sm text-muted-foreground",children:[e.jsxs("li",{children:[e.jsxs("strong",{className:"text-foreground",children:["wrap=","{false}"]})," (KeepTogether default) — Block is fully atomic. Moves entirely to next page if it doesn't fit."]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-foreground",children:"minPresenceAhead"})," — Softer guard. Moves to next page only when fewer than N points remain. Content inside can still wrap."]})]})]})]})})}export{D as default};
