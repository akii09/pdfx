import{j as e,V as u,T as x,S as g,C as d,d as p,e as h,c as j,D as b,P}from"./vendor-react-pdf-D5yotT0u.js";import{H as v}from"./heading-BjOFqY5B.js";import{u as w,a as k,P as A}from"./pdf-preview-B6x1QgHz.js";import{T as C}from"./text-C-BP8BfV.js";import{S as W}from"./section-DkKrhAza.js";import"./vendor-router-CswRncel.js";import{C as S}from"./component-page-Cw4IR3Su.js";import{u as D}from"./use-document-title-OpN4jE9d.js";import"./resolve-color-BxFvjghR.js";import"./professional-Dt_F7LVl.js";import"./index-BflYHcth.js";import"./minus-CtmC6zxe.js";import"./external-link-DVXZXN0t.js";import"./code-block-DOL0Mn5A.js";import"./copy-button-7c2rIHE-.js";import"./check-BAvChmcA.js";import"./package-manager-tabs-BfwOv8uU.js";import"./table-of-contents-m4DjNjpx.js";const L=`import { Document, Page } from '@react-pdf/renderer';
import { PdfAlert } from '@/components/pdfx/alert/pdfx-alert';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Heading level={1}>Contract Agreement</Heading>

        {/* Info callout */}
        <PdfAlert variant="info" title="Important Notice">
          This document requires a signature before proceeding.
        </PdfAlert>

        {/* Success confirmation */}
        <PdfAlert variant="success" title="Payment Confirmed">
          Your payment of $500.00 has been received.
        </PdfAlert>

        {/* Warning callout */}
        <PdfAlert variant="warning" title="Deadline Approaching">
          Please submit your documents by March 15, 2026.
        </PdfAlert>

        {/* Error alert */}
        <PdfAlert variant="error" title="Action Required">
          Missing required information. Please review and resubmit.
        </PdfAlert>
      </Page>
    </Document>
  );
}`,T=[{name:"variant",type:"'info' | 'success' | 'warning' | 'error'",defaultValue:"'info'",description:"Alert variant determining color scheme and icon. info = blue, success = green, warning = amber, error = red."},{name:"title",type:"string",description:"Optional title displayed prominently at the top."},{name:"children",type:"ReactNode",description:"Description text or content. Can be a string or React nodes."},{name:"showIcon",type:"boolean",defaultValue:"true",description:"Whether to show the variant icon."},{name:"showBorder",type:"boolean",defaultValue:"true",description:"Whether to show the left accent border."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer styles applied to the alert container."}],i=1.5,m=({children:t})=>e.jsx(j,{width:16,height:16,viewBox:"0 0 16 16",children:t}),F={info:({color:t})=>e.jsxs(m,{children:[e.jsx(d,{cx:8,cy:8,r:7,fill:"none",stroke:t,strokeWidth:i}),e.jsx(d,{cx:8,cy:4.5,r:1,fill:t}),e.jsx(p,{x1:8,y1:7,x2:8,y2:11.5,stroke:t,strokeWidth:i,strokeLinecap:"round"})]}),success:({color:t})=>e.jsxs(m,{children:[e.jsx(d,{cx:8,cy:8,r:7,fill:"none",stroke:t,strokeWidth:i}),e.jsx(h,{d:"M5 8 L7 10 L11 6",fill:"none",stroke:t,strokeWidth:i,strokeLinecap:"round",strokeLinejoin:"round"})]}),warning:({color:t})=>e.jsxs(m,{children:[e.jsx(h,{d:"M8 1.5 L15 14.5 L1 14.5 Z",fill:"none",stroke:t,strokeWidth:i,strokeLinejoin:"round"}),e.jsx(p,{x1:8,y1:6,x2:8,y2:10,stroke:t,strokeWidth:i,strokeLinecap:"round"}),e.jsx(d,{cx:8,cy:12.5,r:.75,fill:t})]}),error:({color:t})=>e.jsxs(m,{children:[e.jsx(d,{cx:8,cy:8,r:7,fill:"none",stroke:t,strokeWidth:i}),e.jsx(p,{x1:5.5,y1:5.5,x2:10.5,y2:10.5,stroke:t,strokeWidth:i,strokeLinecap:"round"}),e.jsx(p,{x1:10.5,y1:5.5,x2:5.5,y2:10.5,stroke:t,strokeWidth:i,strokeLinecap:"round"})]})};function I({variant:t,color:o}){const r=F[t];return e.jsx(r,{color:o})}function E(t){const{typography:o,colors:r,primitives:l}=t,s={info:r.info??"#3B82F6",success:r.success??"#22C55E",warning:r.warning??"#F59E0B",error:r.destructive??"#EF4444"},a=n=>({borderLeftColor:n,borderLeftWidth:4}),c=g.create({container:{flexDirection:"row",padding:12,borderRadius:4,marginBottom:t.spacing.componentGap},bg:{backgroundColor:r.muted},borderInfo:a(s.info),borderSuccess:a(s.success),borderWarning:a(s.warning),borderError:a(s.error),iconContainer:{width:20,marginRight:10,alignItems:"center",justifyContent:"flex-start",paddingTop:2},contentContainer:{flex:1},title:{fontFamily:o.heading.fontFamily,fontSize:l.typography.sm,fontWeight:l.fontWeights.semibold,color:r.foreground,marginBottom:4},description:{fontFamily:o.body.fontFamily,fontSize:l.typography.sm,lineHeight:o.body.lineHeight,color:r.mutedForeground}});return{...c,borderMap:{info:c.borderInfo,success:c.borderSuccess,warning:c.borderWarning,error:c.borderError},variantColors:s}}function f({variant:t="info",title:o,children:r,showIcon:l=!0,showBorder:s=!0,style:a}){const c=w(),n=k(()=>E(c));if(!o&&!r)return null;const y=[n.container,n.bg,...s?[n.borderMap[t]]:[],...a?[a].flat():[]];return e.jsxs(u,{wrap:!1,style:y,children:[l&&e.jsx(u,{style:n.iconContainer,children:e.jsx(I,{variant:t,color:n.variantColors[t]})}),e.jsxs(u,{style:n.contentContainer,children:[o&&e.jsx(x,{style:n.title,children:o}),typeof r=="string"?e.jsx(x,{style:n.description,children:r}):r]})]})}const M=g.create({page:{padding:40}}),H=e.jsx(b,{title:"PDFx Alert Preview",children:e.jsxs(P,{size:"A4",style:M.page,children:[e.jsx(v,{level:1,children:"Document Alerts"}),e.jsx(C,{children:"The PdfAlert component displays callout boxes with different severity levels."}),e.jsxs(W,{children:[e.jsx(f,{variant:"info",title:"Information",children:"This document contains important information about your account."}),e.jsx(f,{variant:"success",title:"Success",children:"Your payment has been processed successfully."}),e.jsx(f,{variant:"warning",title:"Warning",children:"Please review the terms and conditions before proceeding."}),e.jsx(f,{variant:"error",title:"Error",children:"Missing required fields. Please complete all sections."})]})]})});function te(){return D("Alert Component"),e.jsx(S,{title:"PdfAlert",description:"Displays info, success, warning, or error callout boxes. Use for important notices, confirmations, cautions, or critical alerts in reports, contracts, and documents. Each variant has a distinct color scheme and icon.",installCommand:"npx pdfx-cli add alert",componentName:"alert",preview:e.jsx(A,{title:"Preview",downloadFilename:"alert-preview.pdf",children:H}),usageCode:L,usageFilename:"src/components/pdfx/alert/pdfx-alert.tsx",props:T})}export{te as default};
