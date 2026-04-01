import{j as e,V as s,T as y,S as g,D as b,P}from"./vendor-react-pdf-D5yotT0u.js";import{H as S}from"./heading-DatJGODw.js";import{u as z,a as j,P as N}from"./pdf-preview-BhhkHE99.js";import{T as l}from"./text-D7LDpgp9.js";import"./vendor-router-CswRncel.js";import{C as v}from"./component-page-CKFYBr5j.js";import{u as T}from"./use-document-title-OpN4jE9d.js";import"./resolve-color-BxFvjghR.js";import"./professional-DXuP3l6s.js";import"./index-I6Bgo7YV.js";import"./minus-Cmo7qOV2.js";import"./external-link-BaHQEKkJ.js";import"./code-block-BwEgw_WR.js";import"./copy-button-DpTwZmz3.js";import"./check-bUT-wbKf.js";import"./package-manager-tabs-DeGxF0U7.js";import"./table-of-contents-wzNpuEF3.js";const w=`import { Document, Page } from '@react-pdf/renderer';
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
}`,F=[{name:"format",type:"string",defaultValue:"'Page {page} of {total}'",description:"Format string for the page number. Use {page} for current page and {total} for total pages."},{name:"align",type:"'left' | 'center' | 'right'",defaultValue:"'center'",description:"Text alignment for the page number."},{name:"size",type:"'xs' | 'sm' | 'md'",defaultValue:"'sm'",description:"Size preset for the text. xs ≈ 9pt, sm ≈ 10pt, md ≈ 11pt."},{name:"fixed",type:"boolean",defaultValue:"false",description:"Whether the page number should be fixed (appear on every page). Use with absolute positioning."},{name:"muted",type:"boolean",defaultValue:"true",description:"Use muted color (mutedForeground) instead of foreground."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults."},{name:"children",type:"ReactNode",description:"Custom child elements mapping internal structure."}];function C(r){const{typography:n,colors:o,primitives:a}=r;return g.create({container:{width:"100%"},text:{fontFamily:n.body.fontFamily},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right"},sizeXs:{fontSize:a.typography.xs},sizeSm:{fontSize:a.typography.sm},sizeMd:{fontSize:a.typography.base},colorForeground:{color:o.foreground},colorMuted:{color:o.mutedForeground}})}function D(r,n,o){return r.replace("{page}",String(n)).replace("{total}",String(o))}function M({format:r="Page {page} of {total}",align:n="center",size:o="sm",fixed:a=!1,muted:d=!0,style:p}){const u=z(),t=j(()=>C(u)),f={left:t.alignLeft,center:t.alignCenter,right:t.alignRight},c={xs:t.sizeXs,sm:t.sizeSm,md:t.sizeMd},m=[t.text,f[n],c[o],d?t.colorMuted:t.colorForeground];return p&&m.push(...[p].flat()),e.jsx(s,{style:t.container,fixed:a,children:e.jsx(y,{style:m,render:({pageNumber:x,totalPages:h})=>D(r,x,h)})})}const i=g.create({page:{padding:40,position:"relative"},content:{marginBottom:60},footer:{position:"absolute",bottom:30,left:40,right:40}}),V=e.jsx(b,{title:"PDFx PageNumber Preview",children:e.jsxs(P,{size:"A4",style:i.page,children:[e.jsxs(s,{style:i.content,children:[e.jsx(S,{level:1,children:"Multi-Page Report"}),e.jsx(l,{children:"This demonstrates the PdfPageNumber component."}),e.jsx(l,{children:"The page number appears at the bottom of the page."})]}),e.jsx(s,{style:i.footer,children:e.jsx(M,{format:"Page {page} of {total}",align:"center"})})]})});function O(){return T("PageNumber Component"),e.jsx(v,{title:"PdfPageNumber",description:"Displays page numbers with customizable format like 'Page X of Y'. Uses react-pdf's render prop internally to access dynamic page information. Supports the fixed prop for repeating on every page.",installCommand:"npx pdfx-cli add page-number",componentName:"page-number",preview:e.jsx(N,{title:"Preview",downloadFilename:"page-number-preview.pdf",children:V}),usageCode:w,usageFilename:"src/components/pdfx/page-number/pdfx-page-number.tsx",props:F})}export{O as default};
