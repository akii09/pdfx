import{j as e}from"./index-C9AvUW2r.js";import{P as t,D as r,a as l,S as n}from"./pdf-preview-rLr0qO0-.js";import{P as s}from"./graph-mbuhrCaI.js";import{C as o}from"./component-page-Ce2pcqep.js";import{u as i}from"./use-document-title-FKNhTRCm.js";import"./code-block-BtUYxK1y.js";import"./copy-DsPtDBN2.js";import"./package-manager-tabs-ONZ4w3FS.js";import"./table-of-contents-B8-efyUB.js";const d=`import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { PdfGraph } from '@/components/pdfx/graph/pdfx-graph';

const styles = StyleSheet.create({ page: { padding: 40 } });

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Bar chart */}
        <PdfGraph
          variant="bar"
          title="Monthly Revenue"
          data={[
            { label: 'Jan', value: 42000 },
            { label: 'Feb', value: 38000 },
            { label: 'Mar', value: 55000 },
            { label: 'Apr', value: 61000 },
            { label: 'May', value: 49000 },
            { label: 'Jun', value: 72000 },
          ]}
          showValues
        />

        {/* Line chart */}
        <PdfGraph
          variant="line"
          title="Monthly Revenue Trend"
          data={[
            { label: 'Jan', value: 42000 },
            { label: 'Feb', value: 38000 },
            { label: 'Mar', value: 55000 },
            { label: 'Apr', value: 61000 },
            { label: 'May', value: 49000 },
            { label: 'Jun', value: 72000 },
          ]}
          smooth
        />

        {/* Donut chart with center label */}
        <PdfGraph
          variant="donut"
          title="Market Share"
          data={[
            { label: 'Product A', value: 45 },
            { label: 'Product B', value: 28 },
            { label: 'Product C', value: 17 },
            { label: 'Other', value: 10 },
          ]}
          centerLabel="$1.2M"
        />
      </Page>
    </Document>
  );
}`,u=[{name:"variant",type:"'bar' | 'horizontal-bar' | 'line' | 'area' | 'pie' | 'donut'",defaultValue:"'bar'",description:"Chart type to render."},{name:"data",type:"GraphDataPoint[] | GraphSeries[]",required:!0,description:"Single-series: array of { label, value }. Multi-series: array of { name, data[] }. Multi-series works with bar, line, and area."},{name:"title",type:"string",description:"Chart title rendered above the chart area."},{name:"subtitle",type:"string",description:"Optional subtitle or description below the title."},{name:"width",type:"number",defaultValue:"500",description:"Total chart width in PDF points."},{name:"height",type:"number",defaultValue:"260",description:"Total chart height in PDF points."},{name:"colors",type:"string[]",description:"Override color palette with hex values. Defaults to theme-derived colors."},{name:"showValues",type:"boolean",defaultValue:"false",description:"Show numeric value labels on bars or data points."},{name:"showGrid",type:"boolean",defaultValue:"true",description:"Show horizontal grid lines on cartesian charts."},{name:"legend",type:"'bottom' | 'right' | 'none'",defaultValue:"'bottom'",description:"Legend position. 'none' hides the legend. Not shown for pie/donut."},{name:"centerLabel",type:"string",description:"For donut variant: text displayed in the center hole."},{name:"showDots",type:"boolean",defaultValue:"true",description:"For line/area: show dots at each data point."},{name:"smooth",type:"boolean",defaultValue:"false",description:"For line/area: render smooth bezier curves instead of straight segments."},{name:"yTicks",type:"number",defaultValue:"5",description:"Number of Y-axis tick marks."},{name:"noWrap",type:"boolean",defaultValue:"true",description:"Keep the chart on one page. Prevents the chart from being split across pages."},{name:"style",type:"Style",description:"Custom @react-pdf/renderer style applied to the container View."}],c=n.create({page:{padding:40}}),p=[{label:"Jan",value:42e3},{label:"Feb",value:38e3},{label:"Mar",value:55e3},{label:"Apr",value:61e3},{label:"May",value:49e3},{label:"Jun",value:72e3}],h=[{label:"Product A",value:45},{label:"Product B",value:28},{label:"Product C",value:17},{label:"Other",value:10}],m=[{label:"Engineering",value:42},{label:"Marketing",value:18},{label:"Sales",value:31},{label:"HR",value:9}];function b(a){return a==="pie"||a==="donut"?h:a==="horizontal-bar"?m:p}function x(a){return{bar:"Monthly Revenue","horizontal-bar":"Team Headcount by Department",line:"Monthly Revenue Trend",area:"Revenue Over Time",pie:"Market Share",donut:"Market Share"}[a]}const f=a=>e.jsx(r,{title:"PDFx Graph Preview",children:e.jsx(l,{size:"A4",style:c.page,children:e.jsx(s,{variant:a,title:x(a),subtitle:"FY 2025",data:b(a),showValues:a==="bar"||a==="horizontal-bar",centerLabel:a==="donut"?"$1.2M":void 0,smooth:a==="line"||a==="area",width:480,height:260})})}),g=[{value:"bar",label:"Bar"},{value:"horizontal-bar",label:"Horizontal Bar"},{value:"line",label:"Line"},{value:"area",label:"Area"},{value:"pie",label:"Pie"},{value:"donut",label:"Donut"}];function M(){return i("Graph Component"),e.jsx(o,{title:"Graph",description:"Native SVG charts rendered inside react-pdf documents — no external charting libraries required. Supports bar, horizontal-bar, line, area, pie, and donut variants. All rendering uses react-pdf's built-in SVG primitives for crisp vector output at any PDF resolution.",installCommand:"npx @akii09/pdfx-cli add graph",componentName:"graph",preview:e.jsx(t,{title:"Preview",downloadFilename:"graph-preview.pdf",variants:{options:g,defaultValue:"bar",label:"Chart type"},children:f}),usageCode:d,usageFilename:"src/components/pdfx/graph/pdfx-graph.tsx",props:u,additionalInfo:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"rounded-lg border bg-muted/40 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-2",children:"Chart Variant Guide"}),e.jsxs("ul",{className:"space-y-2 text-sm text-muted-foreground",children:[e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"bar"})," — Compare values across categories. Supports multi-series side-by-side groups."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"horizontal-bar"})," — Best for long category names or rankings. Single-series only."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"line"})," — Trends over time. Use"," ",e.jsx("code",{className:"font-mono text-xs",children:"smooth"})," for bezier curves."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"area"})," — Like line but with filled area. Good for volume or cumulative metrics."]})]}),e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-foreground",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-foreground",children:"pie / donut"})," — Part-to-whole proportions. Donut accepts a"," ",e.jsx("code",{className:"font-mono text-xs",children:"centerLabel"})," (e.g. total value)."]})]})]})]}),e.jsxs("div",{className:"rounded-lg border bg-muted/40 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-2",children:"Multi-Series Example"}),e.jsx("pre",{className:"text-xs font-mono text-muted-foreground overflow-x-auto",children:`<PdfGraph
  variant="bar"
  data={[
    { name: 'Revenue', data: [{ label: 'Q1', value: 42000 }, ...] },
    { name: 'Expenses', data: [{ label: 'Q1', value: 28000 }, ...] },
  ]}
/>`})]}),e.jsxs("div",{className:"rounded-lg border bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-1 text-amber-900 dark:text-amber-200",children:"SVG Limitations in react-pdf"}),e.jsxs("ul",{className:"space-y-1 text-sm text-amber-800 dark:text-amber-300",children:[e.jsx("li",{children:"• No CSS filters, drop shadows, or blur effects"}),e.jsx("li",{children:"• No animations (PDFs are static)"}),e.jsx("li",{children:"• SVG text uses SVG font attributes, not StyleSheet fonts"}),e.jsx("li",{children:"• RadialGradient support is limited — use LinearGradient"}),e.jsx("li",{children:"• Keep bar charts under ~20 categories for readability"})]})]})]})})}export{M as default};
