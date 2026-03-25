import{j as e,V as s,T as b,S as l,D as y,P}from"./vendor-react-pdf-BZRS4xaB.js";import{H as S}from"./heading-ezXuyu8N.js";import{u as z,a as j,P as v}from"./pdf-preview-4aabFIBH.js";import{T as g}from"./text-DezJmATW.js";import"./vendor-router-DN-v89qs.js";import{C as N}from"./component-page-aVtV9oVW.js";import{u as T}from"./use-document-title-NYaeU_iE.js";import"./resolve-color-BxFvjghR.js";import"./index-B_o5uybQ.js";import"./code-block-BcojrypW.js";import"./package-manager-tabs-BLTKzQ-v.js";import"./table-of-contents-BXvD2Kw8.js";const w=`import { Document, Page } from '@react-pdf/renderer';
import { PdfPageNumber } from '@/components/pdfx/page-number/pdfx-page-number';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Heading level={1}>Multi-Page Report</Heading>
        <Text>This is page content...</Text>

        {/* Fixed page number at bottom - repeats on every page */}
        <PdfPageNumber
          format="Page {page} of {total}"
          align="center"
          fixed
          style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}
        />
      </Page>
    </Document>
  );
}`,F=[{name:"format",type:"string",defaultValue:"'Page {page} of {total}'",description:"Format string for the page number. Use {page} for current page and {total} for total pages."},{name:"align",type:"'left' | 'center' | 'right'",defaultValue:"'center'",description:"Text alignment for the page number."},{name:"size",type:"'xs' | 'sm' | 'md'",defaultValue:"'sm'",description:"Size preset for the text. xs ≈ 9pt, sm ≈ 10pt, md ≈ 11pt."},{name:"fixed",type:"boolean",defaultValue:"false",description:"Whether the page number should be fixed (appear on every page). Use with absolute positioning."},{name:"muted",type:"boolean",defaultValue:"true",description:"Use muted color (mutedForeground) instead of foreground."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults."}];function D(r){const{typography:a,colors:o,primitives:n}=r;return l.create({container:{width:"100%"},text:{fontFamily:a.body.fontFamily},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right"},sizeXs:{fontSize:n.typography.xs},sizeSm:{fontSize:n.typography.sm},sizeMd:{fontSize:n.typography.base},colorForeground:{color:o.foreground},colorMuted:{color:o.mutedForeground}})}function C(r,a,o){return r.replace("{page}",String(a)).replace("{total}",String(o))}function M({format:r="Page {page} of {total}",align:a="center",size:o="sm",fixed:n=!1,muted:d=!0,style:p}){const u=z(),t=j(()=>D(u)),f={left:t.alignLeft,center:t.alignCenter,right:t.alignRight},c={xs:t.sizeXs,sm:t.sizeSm,md:t.sizeMd},m=[t.text,f[a],c[o],d?t.colorMuted:t.colorForeground];return p&&m.push(...[p].flat()),e.jsx(s,{style:t.container,fixed:n,children:e.jsx(b,{style:m,render:({pageNumber:x,totalPages:h})=>C(r,x,h)})})}const i=l.create({page:{padding:40,position:"relative"},content:{marginBottom:60},footer:{position:"absolute",bottom:30,left:40,right:40}}),V=e.jsx(y,{title:"PDFx PageNumber Preview",children:e.jsxs(P,{size:"A4",style:i.page,children:[e.jsxs(s,{style:i.content,children:[e.jsx(S,{level:1,children:"Multi-Page Report"}),e.jsx(g,{children:"This demonstrates the PdfPageNumber component."}),e.jsx(g,{children:"The page number appears at the bottom of the page."})]}),e.jsx(s,{style:i.footer,children:e.jsx(M,{format:"Page {page} of {total}",align:"center"})})]})});function q(){return T("PageNumber Component"),e.jsx(N,{title:"PdfPageNumber",description:"Displays page numbers with customizable format like 'Page X of Y'. Uses react-pdf's render prop internally to access dynamic page information. Supports the fixed prop for repeating on every page.",installCommand:"npx @akii09/pdfx-cli add page-number",componentName:"page-number",preview:e.jsx(v,{title:"Preview",downloadFilename:"page-number-preview.pdf",children:V}),usageCode:w,usageFilename:"src/components/pdfx/page-number/pdfx-page-number.tsx",props:F})}export{q as default};
