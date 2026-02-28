import{j as e}from"./index-gxNVmCa4.js";import{P as a,D as r,a as i,S as s}from"./pdf-preview-CuKAGfS8.js";import{P as n}from"./pdf-image-CN0Ovb67.js";import{C as o}from"./component-page-BeUio_wO.js";import{u as d}from"./use-document-title-DooqJWF8.js";import"./code-block-C6Fi1gnR.js";import"./copy-alp8Mrhl.js";import"./package-manager-tabs-BW2GZ4Yz.js";import"./table-of-contents-D6ZBJUyE.js";const l=`import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { PdfImage } from '@/components/pdfx/pdf-image/pdfx-pdf-image';

const styles = StyleSheet.create({ page: { padding: 40 } });

// Logo as base64 data URI (best for reliability)
const LOGO_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Avatar as base64 data URI
const AVATAR_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAA...';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Full-width banner - base64 encoded PNG */}
        <PdfImage
          src={LOGO_BASE64}
          variant="cover"
          caption="PDFx Logo Banner"
        />

        {/* Avatar (circle-clipped) - base64 for profiles */}
        <PdfImage
          src={AVATAR_BASE64}
          variant="avatar"
          caption="Team Avatar"
        />

        {/* Thumbnail - compact image preview */}
        <PdfImage
          src={LOGO_BASE64}
          variant="thumbnail"
          caption="Project Thumbnail"
        />

        {/* Multiple avatars in a row */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
          <PdfImage
            src={AVATAR_BASE64}
            variant="avatar"
            caption="User 1"
          />
          <PdfImage
            src={AVATAR_BASE64}
            variant="avatar"
            caption="User 2"
          />
          <PdfImage
            src={AVATAR_BASE64}
            variant="avatar"
            caption="User 3"
          />
        </View>

        {/* Custom sized image with aspect ratio */}
        <PdfImage
          src={LOGO_BASE64}
          width={300}
          aspectRatio={16 / 9}
          caption="Custom sized image"
        />
      </Page>
    </Document>
  );
}`,c=[{name:"src",type:"string | { uri: string; method?: string; headers?: Record<string, string> }",required:!0,description:"Image source. Use a base64 data URI for best reliability, or an HTTPS URL. Supported formats: JPEG, PNG, GIF (first frame), BMP, SVG. Unsupported: WebP, AVIF, HEIC."},{name:"variant",type:"'default' | 'full-width' | 'thumbnail' | 'avatar' | 'cover' | 'bordered' | 'rounded'",defaultValue:"'default'",description:"Display variant. default = manual sizing, full-width = 100% width, thumbnail = 80×80, avatar = 48×48 circle, cover = full-width banner, bordered = framed, rounded = rounded corners."},{name:"width",type:"number | string",description:"Width in PDF points. Required for default/bordered/rounded unless using variant defaults."},{name:"height",type:"number | string",description:"Height in PDF points. Calculated from aspectRatio if omitted (when width is set)."},{name:"fit",type:"'cover' | 'contain' | 'fill' | 'none'",description:"How the image fills its container (CSS object-fit). Default depends on variant."},{name:"position",type:"string",defaultValue:"'50% 50%'",description:"Focal point for fit crops. E.g. 'top left', '50% 25%'."},{name:"caption",type:"string",description:"Optional caption text rendered below the image in muted style."},{name:"aspectRatio",type:"number",description:"If width is set and height is not, height = width / aspectRatio. E.g. 16/9."},{name:"borderRadius",type:"number",description:"Border radius in PDF points. Defaults: avatar = 999 (circle), rounded = 8."},{name:"noWrap",type:"boolean",defaultValue:"true",description:"Keep image + caption on one page. Prevents image clipping at page boundaries."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer style applied to the Image element."}],m=s.create({page:{padding:40}}),p="/pdfx.png",u="/favicon.png",g=t=>e.jsx(r,{title:"PDFx PdfImage Preview",children:e.jsx(i,{size:"A4",style:m.page,children:e.jsx(n,{src:t==="avatar"?u:p,variant:t,height:t==="default"||t==="rounded"||t==="bordered"?120:void 0,width:t==="default"?200:t==="rounded"||t==="bordered"?120:void 0,caption:`Variant: ${t}`})})}),f=[{value:"default",label:"Default"},{value:"full-width",label:"Full Width"},{value:"cover",label:"Cover"},{value:"thumbnail",label:"Thumbnail"},{value:"avatar",label:"Avatar"},{value:"bordered",label:"Bordered"},{value:"rounded",label:"Rounded"}];function I(){return d("PdfImage Component"),e.jsx(o,{title:"PdfImage",description:"A validated, theme-aware image component for react-pdf documents. Supports JPEG, PNG, GIF, BMP, and SVG formats with seven layout variants. Emits a warning for unsupported formats (WebP, AVIF, HEIC) and prevents images from being clipped at page boundaries by default.",installCommand:"npx @akii09/pdfx-cli add pdf-image",componentName:"pdf-image",preview:e.jsx(a,{title:"Preview",downloadFilename:"pdf-image-preview.pdf",variants:{options:f,defaultValue:"default",label:"Variant"},children:g}),usageCode:l,usageFilename:"src/components/pdfx/pdf-image/pdfx-pdf-image.tsx",props:c,additionalInfo:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"rounded-lg border bg-muted/40 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-2",children:"Supported Formats"}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 text-sm",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-green-600 dark:text-green-400 mb-1",children:"✓ Supported"}),e.jsxs("ul",{className:"space-y-0.5 text-muted-foreground",children:[e.jsx("li",{children:"JPEG / JPG — best performance"}),e.jsx("li",{children:"PNG — supports transparency"}),e.jsx("li",{children:"SVG — vector, limited subset"}),e.jsx("li",{children:"GIF — first frame only"}),e.jsx("li",{children:"BMP"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-medium text-red-600 dark:text-red-400 mb-1",children:"✗ Not supported"}),e.jsxs("ul",{className:"space-y-0.5 text-muted-foreground",children:[e.jsx("li",{children:"WebP → convert to PNG"}),e.jsx("li",{children:"AVIF → convert to JPEG"}),e.jsx("li",{children:"HEIC / HEIF"}),e.jsx("li",{children:"ICO"})]})]})]})]}),e.jsxs("div",{className:"rounded-lg border bg-muted/40 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-2",children:"Source Recommendations"}),e.jsxs("ul",{className:"space-y-1.5 text-sm text-muted-foreground",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-foreground",children:"Base64 data URI"})," — Most reliable. Works in both browser (PDFViewer) and server (renderToBuffer). No CORS issues."]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-foreground",children:"HTTPS URL"})," — Works in browser rendering. Requires CORS headers. Subject to network latency."]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-foreground",children:"Local file path"})," — Node.js server-side only (renderToBuffer / Route Handlers)."]})]})]}),e.jsxs("div",{className:"rounded-lg border bg-muted/40 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-2",children:"Print Resolution"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["For print PDFs, source images should be ≥ 300 DPI at the rendered size. For a 200pt-wide image (≈ 2.78 inches), the source image should be at least"," ",e.jsx("code",{className:"font-mono text-xs",children:"200 × (300/72) ≈ 834px"})," wide."]})]})]})})}export{I as default};
