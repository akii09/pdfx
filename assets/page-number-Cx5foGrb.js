import{j as e}from"./index-DahAt_nO.js";import{H as b}from"./heading-CFn4MW_2.js";import{u as y,b as P,V as s,T as S,S as d,P as z,D as j,a as v}from"./pdf-preview-QyTIboFd.js";import{T as l}from"./text-_lwYOMCx.js";import{C as N}from"./component-page-2X7CQGM1.js";import{u as T}from"./use-document-title-B38_EAXs.js";import"./resolve-color-BxFvjghR.js";import"./code-block-BAoyawpP.js";import"./package-manager-tabs-D6hTRKhP.js";import"./table-of-contents-CGaz3YgJ.js";const w=`import { Document, Page } from '@react-pdf/renderer';
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
}`,F=[{name:"format",type:"string",defaultValue:"'Page {page} of {total}'",description:"Format string for the page number. Use {page} for current page and {total} for total pages."},{name:"align",type:"'left' | 'center' | 'right'",defaultValue:"'center'",description:"Text alignment for the page number."},{name:"size",type:"'xs' | 'sm' | 'md'",defaultValue:"'sm'",description:"Size preset for the text. xs ≈ 9pt, sm ≈ 10pt, md ≈ 11pt."},{name:"fixed",type:"boolean",defaultValue:"false",description:"Whether the page number should be fixed (appear on every page). Use with absolute positioning."},{name:"muted",type:"boolean",defaultValue:"true",description:"Use muted color (mutedForeground) instead of foreground."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles to merge with defaults."}];function D(r){const{typography:a,colors:o,primitives:n}=r;return d.create({container:{width:"100%"},text:{fontFamily:a.body.fontFamily},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right"},sizeXs:{fontSize:n.typography.xs},sizeSm:{fontSize:n.typography.sm},sizeMd:{fontSize:n.typography.base},colorForeground:{color:o.foreground},colorMuted:{color:o.mutedForeground}})}function C(r,a,o){return r.replace("{page}",String(a)).replace("{total}",String(o))}function M({format:r="Page {page} of {total}",align:a="center",size:o="sm",fixed:n=!1,muted:u=!0,style:p}){const m=y(),t=P(()=>D(m),[m]),f={left:t.alignLeft,center:t.alignCenter,right:t.alignRight},c={xs:t.sizeXs,sm:t.sizeSm,md:t.sizeMd},g=[t.text,f[a],c[o],u?t.colorMuted:t.colorForeground];return p&&g.push(...[p].flat()),e.jsx(s,{style:t.container,fixed:n,children:e.jsx(S,{style:g,render:({pageNumber:x,totalPages:h})=>C(r,x,h)})})}const i=d.create({page:{padding:40,position:"relative"},content:{marginBottom:60},footer:{position:"absolute",bottom:30,left:40,right:40}}),V=e.jsx(j,{title:"PDFx PageNumber Preview",children:e.jsxs(v,{size:"A4",style:i.page,children:[e.jsxs(s,{style:i.content,children:[e.jsx(b,{level:1,children:"Multi-Page Report"}),e.jsx(l,{children:"This demonstrates the PdfPageNumber component."}),e.jsx(l,{children:"The page number appears at the bottom of the page."})]}),e.jsx(s,{style:i.footer,children:e.jsx(M,{format:"Page {page} of {total}",align:"center"})})]})});function Y(){return T("PageNumber Component"),e.jsx(N,{title:"PdfPageNumber",description:"Displays page numbers with customizable format like 'Page X of Y'. Uses react-pdf's render prop internally to access dynamic page information. Supports the fixed prop for repeating on every page.",installCommand:"npx @akii09/pdfx-cli add page-number",componentName:"page-number",preview:e.jsx(z,{title:"Preview",downloadFilename:"page-number-preview.pdf",children:V}),usageCode:w,usageFilename:"src/components/pdfx/page-number/pdfx-page-number.tsx",props:F})}export{Y as default};
