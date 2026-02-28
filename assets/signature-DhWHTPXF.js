import{j as e}from"./index-gxNVmCa4.js";import{S as g,u as x,b as S,V as i,T as l,P as j,D as w,a as F}from"./pdf-preview-CuKAGfS8.js";import{C as v}from"./component-page-BeUio_wO.js";import{u as C}from"./use-document-title-DooqJWF8.js";import"./code-block-C6Fi1gnR.js";import"./copy-alp8Mrhl.js";import"./package-manager-tabs-BW2GZ4Yz.js";import"./table-of-contents-D6ZBJUyE.js";const D=`import { Document, Page } from '@react-pdf/renderer';
import { PdfSignatureBlock } from '@/components/pdfx/signature/pdfx-signature';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        {/* Single signature */}
        <PdfSignatureBlock
          variant="single"
          label="Authorized By"
          name="John Doe"
          title="CEO, Acme Corp"
          date="15 February 2026"
        />

        {/* Double signature side by side */}
        <PdfSignatureBlock
          variant="double"
          signers={[
            { label: 'Authorized By', name: 'John Doe', title: 'CEO' },
            { label: 'Approved By', name: 'Jane Smith', title: 'CFO' },
          ]}
        />

        {/* Inline compact signature */}
        <PdfSignatureBlock
          variant="inline"
          label="Signed by"
          name="John Doe"
          date="15 February 2026"
        />
      </Page>
    </Document>
  );
}`,B=[{name:"variant",type:"'single' | 'double' | 'inline'",defaultValue:"'single'",description:"Layout variant. single = one signature block with line, name, title, date. double = two blocks side by side. inline = compact horizontal row."},{name:"label",type:"string",defaultValue:"'Signature'",description:"Label text shown above the signature line (single and inline variants)."},{name:"name",type:"string",defaultValue:"-",description:"Signer name displayed below the signature line."},{name:"title",type:"string",defaultValue:"-",description:"Signer title or role displayed below the name (single variant)."},{name:"date",type:"string",defaultValue:"-",description:"Date string displayed below the signature area."},{name:"signers",type:"[SignatureSigner, SignatureSigner]",defaultValue:"-",description:"Array of exactly 2 signers for the double variant. Each has label, name, and optional title."},{name:"style",type:"Style",defaultValue:"-",description:"Custom @react-pdf/renderer styles applied to the outer container."}];function P(n){const{spacing:t,fontWeights:r,typography:a}=n.primitives;return g.create({container:{marginTop:n.spacing.sectionGap,marginBottom:n.spacing.componentGap},block:{flex:1,minWidth:140},label:{fontFamily:n.typography.body.fontFamily,fontSize:a.sm,color:n.colors.mutedForeground,marginBottom:t[1]},line:{borderBottomWidth:1,borderBottomColor:n.colors.foreground,borderBottomStyle:"solid",minHeight:t[6],marginBottom:t[1]},name:{fontFamily:n.typography.body.fontFamily,fontSize:n.typography.body.fontSize,color:n.colors.foreground,fontWeight:r.semibold},titleText:{fontFamily:n.typography.body.fontFamily,fontSize:a.sm,color:n.colors.mutedForeground},dateText:{fontFamily:n.typography.body.fontFamily,fontSize:a.xs,color:n.colors.mutedForeground,marginTop:1},doubleRow:{flexDirection:"row",justifyContent:"space-between",gap:t[8]},inlineRow:{flexDirection:"row",alignItems:"center",gap:t[3],flexWrap:"wrap"},inlineLabel:{fontFamily:n.typography.body.fontFamily,fontSize:a.sm,color:n.colors.mutedForeground},inlineLine:{borderBottomWidth:1,borderBottomColor:n.colors.foreground,borderBottomStyle:"solid",minWidth:120,height:t[5],paddingHorizontal:t[2]},inlineName:{fontFamily:n.typography.body.fontFamily,fontSize:n.typography.body.fontSize,color:n.colors.foreground}})}function d(n,t){return e.jsxs(i,{style:t.block,children:[n.label?e.jsx(l,{style:t.label,children:n.label}):null,e.jsx(i,{style:t.line}),n.name?e.jsx(l,{style:t.name,children:n.name}):null,n.title?e.jsx(l,{style:t.titleText,children:n.title}):null,n.date?e.jsx(l,{style:t.dateText,children:n.date}):null]})}const z=[{label:"Authorized by",name:"",title:"",date:""},{label:"Approved by",name:"",title:"",date:""}];function p({variant:n="single",label:t="Signature",name:r,title:a,date:y,signers:f,style:c}){const u=x(),o=S(()=>P(u),[u]),m=[o.container],s=c?[...m,c]:m;if(n==="inline")return e.jsx(i,{wrap:!1,style:s,children:e.jsxs(i,{style:o.inlineRow,children:[e.jsx(l,{style:o.inlineLabel,children:`${t}:`}),e.jsx(i,{style:o.inlineLine}),r?e.jsx(l,{style:o.inlineName,children:r}):null]})});if(n==="double"){const[h,b]=f??z;return e.jsx(i,{wrap:!1,style:s,children:e.jsxs(i,{style:o.doubleRow,children:[d(h,o),d(b,o)]})})}return e.jsx(i,{wrap:!1,style:s,children:d({label:t,name:r,title:a,date:y},o)})}const A=g.create({page:{padding:40}}),N=n=>e.jsx(w,{title:"PDFx Signature Preview",children:e.jsx(F,{size:"A4",style:A.page,children:n==="double"?e.jsx(p,{variant:"double",signers:[{label:"Authorized By",name:"John Doe",title:"CEO, Acme Corp"},{label:"Approved By",name:"Jane Smith",title:"CFO, Acme Corp"}]}):e.jsx(p,{variant:n,label:n==="inline"?"Signed by":"Authorized By",name:"John Doe",title:"CEO, Acme Corp",date:"15 February 2026"})})}),k=[{value:"single",label:"Single"},{value:"double",label:"Double"},{value:"inline",label:"Inline"}];function R(){return C("Signature Component"),e.jsx(v,{title:"Signature",description:"A PDF signature block component with three layout variants: single, double (side-by-side), and inline.",installCommand:"npx @akii09/pdfx-cli add signature",componentName:"signature",preview:e.jsx(j,{title:"Preview",downloadFilename:"signature-preview.pdf",variants:{options:k,defaultValue:"single",label:"Variant"},children:N}),usageCode:D,usageFilename:"src/components/pdfx/signature/pdfx-signature.tsx",props:B,additionalInfo:e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"rounded-lg border bg-muted/40 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-2",children:"Variant Guide"}),e.jsxs("ul",{className:"space-y-2 text-sm text-muted-foreground",children:[e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"single"})," — One signature block with a label, dotted signature line, name, title, and date. Standard for contracts and authorizations."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"double"})," — Two signature blocks placed side by side. Use the"," ",e.jsx("code",{className:"text-xs bg-muted px-1 rounded",children:"signers"})," prop with exactly 2 signer objects. Ideal for approval workflows."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"inline"})," — Compact horizontal signature row with a label, signature line, and optional name. Use at the bottom of short documents."]})]})]})]})})})}export{R as default};
