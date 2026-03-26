import{j as e}from"./vendor-react-pdf-BZRS4xaB.js";import{r as o}from"./vendor-router-DN-v89qs.js";import{c as n,C as l,h as d}from"./index-CGBhfwoB.js";/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],m=n("check",p);function f({value:s,className:c,onCopy:t}){const[a,r]=o.useState(!1),i=o.useCallback(async()=>{await navigator.clipboard.writeText(s),r(!0),t==null||t(s),setTimeout(()=>r(!1),2e3)},[s,t]);return e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:i,className:d("inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",c),"aria-label":a?"Copied":"Copy to clipboard","aria-pressed":a,children:a?e.jsx(m,{className:"h-4 w-4 text-green-500"}):e.jsx(l,{className:"h-4 w-4"})}),a&&e.jsx("output",{className:"sr-only","aria-live":"polite",children:"Copied to clipboard"})]})}export{f as C,m as a};
