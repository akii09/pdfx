import{j as e,V as i,T as l,S as m,D as b,P as x}from"./vendor-react-pdf-BZRS4xaB.js";import{u as S,a as j,P as w}from"./pdf-preview-DVWa4Czf.js";import"./vendor-router-DN-v89qs.js";import{C as v}from"./component-page-B6kMKj7Q.js";import{u as F}from"./use-document-title-NYaeU_iE.js";import"./index-CVsEOSGs.js";import"./code-block-X1Fq5lu6.js";import"./package-manager-tabs-JCERlw-f.js";import"./table-of-contents-CKwC6e72.js";const C=`import { Document, Page } from '@react-pdf/renderer';
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
}`,P=[{name:"variant",type:"'single' | 'double' | 'inline'",defaultValue:"'single'",description:"Layout variant. single = one signature block with line, name, title, date. double = two blocks side by side. inline = compact horizontal row."},{name:"label",type:"string",defaultValue:"'Signature'",description:"Label text shown above the signature line (single and inline variants)."},{name:"name",type:"string",defaultValue:"-",description:"Signer name displayed below the signature line."},{name:"title",type:"string",defaultValue:"-",description:"Signer title or role displayed below the name (single variant)."},{name:"date",type:"string",defaultValue:"-",description:"Date string displayed below the signature area."},{name:"signers",type:"[SignatureSigner, SignatureSigner]",defaultValue:"-",description:"Array of exactly 2 signers for the double variant. Each has label, name, and optional title."},{name:"style",type:"Style",defaultValue:"-",description:"Custom @react-pdf/renderer styles applied to the outer container."}];function B(n){const{spacing:t,fontWeights:r,typography:a}=n.primitives;return m.create({container:{marginTop:n.spacing.sectionGap,marginBottom:n.spacing.componentGap},block:{flex:1,minWidth:140},label:{fontFamily:n.typography.body.fontFamily,fontSize:a.sm,color:n.colors.mutedForeground,marginBottom:t[1]},line:{borderBottomWidth:1,borderBottomColor:n.colors.foreground,borderBottomStyle:"solid",minHeight:t[6],marginBottom:t[1]},name:{fontFamily:n.typography.body.fontFamily,fontSize:n.typography.body.fontSize,color:n.colors.foreground,fontWeight:r.semibold},titleText:{fontFamily:n.typography.body.fontFamily,fontSize:a.sm,color:n.colors.mutedForeground},dateText:{fontFamily:n.typography.body.fontFamily,fontSize:a.xs,color:n.colors.mutedForeground,marginTop:1},doubleRow:{flexDirection:"row",justifyContent:"space-between",gap:t[8]},inlineRow:{flexDirection:"row",alignItems:"center",gap:t[3],flexWrap:"wrap"},inlineLabel:{fontFamily:n.typography.body.fontFamily,fontSize:a.sm,color:n.colors.mutedForeground},inlineLine:{borderBottomWidth:1,borderBottomColor:n.colors.foreground,borderBottomStyle:"solid",minWidth:120,height:t[5],paddingHorizontal:t[2]},inlineName:{fontFamily:n.typography.body.fontFamily,fontSize:n.typography.body.fontSize,color:n.colors.foreground}})}function d(n,t){return e.jsxs(i,{style:t.block,children:[n.label?e.jsx(l,{style:t.label,children:n.label}):null,e.jsx(i,{style:t.line}),n.name?e.jsx(l,{style:t.name,children:n.name}):null,n.title?e.jsx(l,{style:t.titleText,children:n.title}):null,n.date?e.jsx(l,{style:t.dateText,children:n.date}):null]})}function u({variant:n="single",label:t="Signature",name:r,title:a,date:p,signers:g,style:c}){const y=S(),o=j(()=>B(y)),s=[o.container];if(c&&s.push(c),n==="inline")return e.jsx(i,{wrap:!1,style:s,children:e.jsxs(i,{style:o.inlineRow,children:[e.jsx(l,{style:o.inlineLabel,children:`${t}:`}),e.jsx(i,{style:o.inlineLine}),r?e.jsx(l,{style:o.inlineName,children:r}):null]})});if(n==="double"){const[f,h]=g??[{label:"Authorized by",name:"",title:"",date:""},{label:"Approved by",name:"",title:"",date:""}];return e.jsx(i,{wrap:!1,style:s,children:e.jsxs(i,{style:o.doubleRow,children:[d(f,o),d(h,o)]})})}return e.jsx(i,{wrap:!1,style:s,children:d({label:t,name:r,title:a,date:p},o)})}const D=m.create({page:{padding:40}}),z=n=>e.jsx(b,{title:"PDFx Signature Preview",children:e.jsx(x,{size:"A4",style:D.page,children:n==="double"?e.jsx(u,{variant:"double",signers:[{label:"Authorized By",name:"John Doe",title:"CEO, Acme Corp"},{label:"Approved By",name:"Jane Smith",title:"CFO, Acme Corp"}]}):e.jsx(u,{variant:n,label:n==="inline"?"Signed by":"Authorized By",name:"John Doe",title:"CEO, Acme Corp",date:"15 February 2026"})})}),N=[{value:"single",label:"Single"},{value:"double",label:"Double"},{value:"inline",label:"Inline"}];function I(){return F("Signature Component"),e.jsx(v,{title:"Signature",description:"A PDF signature block component with three layout variants: single, double (side-by-side), and inline.",installCommand:"npx @akii09/pdfx-cli add signature",componentName:"signature",preview:e.jsx(w,{title:"Preview",downloadFilename:"signature-preview.pdf",variants:{options:N,defaultValue:"single",label:"Variant"},children:z}),usageCode:C,usageFilename:"src/components/pdfx/signature/pdfx-signature.tsx",props:P,additionalInfo:e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"rounded-lg border bg-muted/40 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-2",children:"Variant Guide"}),e.jsxs("ul",{className:"space-y-2 text-sm text-muted-foreground",children:[e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"single"})," — One signature block with a label, dotted signature line, name, title, and date. Standard for contracts and authorizations."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"double"})," — Two signature blocks placed side by side. Use the"," ",e.jsx("code",{className:"text-xs bg-muted px-1 rounded",children:"signers"})," prop with exactly 2 signer objects. Ideal for approval workflows."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"inline"})," — Compact horizontal signature row with a label, signature line, and optional name. Use at the bottom of short documents."]})]})]})]})})})}export{I as default};
