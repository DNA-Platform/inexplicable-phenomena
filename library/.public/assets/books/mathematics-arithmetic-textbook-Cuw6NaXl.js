var Ce=Object.defineProperty;var c=(s,e)=>Ce(s,"name",{value:e,configurable:!0});import{jsxs as n,jsx as t,Fragment as Ie}from"react/jsx-runtime";import{$ as x,selection as Ne}from"@dna-platform/chemistry";import{C as $e,T as qe,a as ze,$ as Me}from"./1-the-book~code-CVo3LYJk.js";import{Chapter as ie,Title as ne,Author as je,Subject as Ke,Section as S,Heading as k,Paragraph as b,Content as j,Parenthetical as Ee,Word as h,$Format as Ge,$Section as Oe,$Paragraph as X,$Append as Xe,html as Le,$Word as ke,Part as Re,Table as ye,Sentence as v,List as De,Line as A,Means as ge,Append as R}from"@dna-platform/public";import{S as _e}from"./.synopsis-CNwRz4m6.js";import We from"katex";import{marked as Te}from"marked";import"styled-components";const Fe=c(()=>n(ie,{children:[t($e,{}),t(ne,{children:"[The Textbook of Arithmetic](/inexplicable-phenomena/arithmetic-textbook/)"}),t(je,{children:"[Doug](/inexplicable-phenomena/our-team/)"}),t(Ke,{children:"[Arithmetic](/inexplicable-phenomena/arithmetic/)"}),t(qe,{children:"The results of arithmetic, stated and proved."})]}),"Cover"),Be=c(()=>n(ie,{children:[t(ze,{}),t(ne,{children:"[Table of Contents](/inexplicable-phenomena/arithmetic-textbook/#table-of-contents)"}),n(S,{children:[t(k,{children:"The Objects"}),t(b,{children:t(j,{children:"[The Symmetry of Arithmetic](/inexplicable-phenomena/arithmetic-textbook/#the-symmetry-of-arithmetic)"})})]}),n(S,{children:[t(k,{children:"Contents"}),n(b,{children:[t(Ee,{}),t(h,{children:t(j,{children:"[Arithmetic Textbook](/inexplicable-phenomena/arithmetic-textbook/)"})}),t(h,{children:t(j,{children:"[Synopsis](/inexplicable-phenomena/arithmetic-textbook/#synopsis)"})}),t(h,{children:t(j,{children:"[Table of Contents](/inexplicable-phenomena/arithmetic-textbook/#table-of-contents)"})})]})]})]}),"Table"),He=/\[(\d+(?:,\s*\d+)*)\]|\b[Ss]ections? \d+(?: to \d+)?\b|\b[KCOI]\d+\b|\b\d\.\d(?:\.\d)?\b/g,O=c(s=>{const e=s.match(/^[Ss]ections? (\d+)/);if(e!==null)return`cite-sec-${e[1]}`;const i=s.match(/^([KCOI])(\d+)$/);return i!==null?`cite-${i[1].toLowerCase()}${i[2]}`:`cite-${s.replace(/\./g,"-")}`},"place"),Ue=c(s=>s.startsWith("[")?"["+s.slice(1,-1).split(",").map(e=>`<a href="#cite-ref-${e.trim()}">${e.trim()}</a>`).join(", ")+"]":`<a href="#${O(s)}">${s}</a>`,"link"),D=c((s,e)=>s.split(/(<[^>]*>)/).map((i,a,r)=>{if(i.startsWith("<"))return i;const d=r[a-1],m=d!==void 0&&d.includes('id="cite-')?(i.match(/^(?:[KCOI]\d+|\d+\.\d+(?:\.\d+)?|\d+\.)/)??[""])[0]:"";return m+i.slice(m.length).replace(He,l=>!e&&/^[Ss]ection/.test(l)?l:Ue(l))}).join(""),"mention"),Je=c(s=>{const e=s.replace(/<h2>(\d+)\. /g,(d,m)=>`<h2 id="cite-sec-${m}">${m}. `).replace(/<h3>(\d+)\.(\d+) /g,(d,m,l)=>`<h3 id="cite-${m}-${l}">${m}.${l} `).replace(/<(strong|td)>(\d+)\.(\d+)\.(\d+) /g,(d,m,l,p,g)=>`<${m} id="cite-${l}-${p}-${g}">${l}.${p}.${g} `).replace(/<(strong|td)>(\d+)\.(\d+) /g,(d,m,l,p)=>`<${m} id="cite-${l}-${p}">${l}.${p} `).replace(/<(strong|td)>([KCOI])(\d+) /g,(d,m,l,p)=>`<${m} id="cite-${l.toLowerCase()}${p}">${l}${p} `),i=e.indexOf("<h2>Related work</h2>");if(i===-1)return D(e,!0);let a=0;const r=e.slice(i).replace(/<li>/g,()=>`<li id="cite-ref-${++a}">`);return D(e.slice(0,i),!0)+D(r,!1)},"connect"),Ve=c(s=>{const e=s.split(/(?=<h2)/),i=e.shift()??"",a='<span class="pc-tree-bar"><label class="pc-layerbox"><input type="checkbox" class="pc-anno-master" />annotations</label><span class="pc-verb pc-sections">sections</span><span class="pc-verb pc-expand">expand</span><span class="pc-verb pc-showall">show all</span><span class="pc-verb pc-return">everything</span><span class="pc-verb pc-reset">reset</span></span>';let r=0;const d=c(p=>p.split(/(?=<(?:p|ul|ol|table|div|blockquote|pre)[ >])/).filter(g=>g.trim()!==""),"blocks"),m=c((p,g,N)=>`<div class="pc-part" draggable="true" data-home="${g}" data-seat="${N}"><span class="pc-x" title="hide">×</span><span class="pc-o" title="only this">○</span>${p}</div>`,"leaf"),l=c((p,g,N,be)=>{const f=g===1?"</h2>":"</h3>",u=p.indexOf(f),y=p.slice(0,u),C=p.slice(u+f.length),$=++r,P=[];(g===1?C.split(/(?=<h3)/):[C]).forEach(L=>{L.startsWith("<h3")?P.push(l(L,2,$,P.length)):d(L).forEach(Se=>P.push(m(Se,$,P.length)))});const q=P.join(""),Pe=(q.match(/class="pc-part"/g)??[]).length;return`<section class="pc-spart" draggable="true" data-level="${g}" data-box="${$}" data-home="${N}" data-seat="${be}"><span class="pc-x pc-sec-x" title="hide">×</span><span class="pc-o pc-sec-o" title="only this">○</span>${y}<span class="pc-count">${Pe} parts</span>${g===1?'<input type="checkbox" class="pc-sec-anno" />':""}${f}<div class="pc-kids">${q}</div></section>`},"group");return a+i+e.map((p,g)=>l(p,1,"root",g)).join("")},"treeify"),Ae=c(()=>{const s=document.querySelector(".pc-tree");if(s===null||s.classList.contains("pc-covered"))return;s.classList.add("pc-covered");const e=new Map;document.querySelectorAll(".pc-cite a").forEach(i=>{const a=O(i.textContent??""),r=e.get(a);r===void 0?(i.id=`claim-${a}`,e.set(a,{at:`claim-${a}`,count:1})):r.count+=1}),s.querySelectorAll('strong[id^="cite-"], td[id^="cite-"], h2[id^="cite-sec-"], h3[id^="cite-"]').forEach(i=>{const a=e.get(i.id),r=document.createElement("span");r.className=a===void 0?"pc-anno pc-open":"pc-anno",r.setAttribute("data-for",i.id),r.textContent=a===void 0?"Open":a.count>1?`Cited ×${a.count}`:"Cited",r.title=a===void 0?"No part of the chapter cites this clause.":"The chapter claims this part; the mark leads to the claim.",a!==void 0&&r.setAttribute("data-claim",a.at),s.appendChild(r)}),document.querySelectorAll(".pc-figure").forEach(i=>{const a=i.getAttribute("data-title")??"",r=document.createElement("span");r.className="pc-anno pc-fig",r.setAttribute("data-for",O(i.getAttribute("data-part")??"")),r.setAttribute("data-fig-title",a),r.setAttribute("data-fig-caption",i.getAttribute("data-caption")??""),r.textContent=a===""?"Figure":`Figure · ${a}`,r.title="A figure of the specification; the mark shows its object alone.",s.appendChild(r)})},"cover"),w=c(()=>{const s=document.querySelector(".pc-tree");if(s===null)return;const e=s.querySelector(".pc-anno-master"),i=s.getBoundingClientRect(),a=[];s.querySelectorAll(":scope > .pc-anno").forEach(d=>{const m=document.getElementById(d.getAttribute("data-for")??""),l=m?.closest('.pc-spart[data-level="1"]')?.querySelector(":scope > h2 > .pc-sec-anno"),p=m!==null&&m.getClientRects().length>0&&(l?.checked??e?.checked??!0);d.style.display=p?"block":"none",p&&m!==null&&a.push({chip:d,at:m.getBoundingClientRect().top-i.top})});let r=-1/0;a.sort((d,m)=>d.at-m.at).forEach(({chip:d,at:m})=>{const l=Math.max(m,r);d.style.insetBlockStart=`${l}px`,r=l+d.offsetHeight+2})},"rail"),we=c((s,e)=>{e.classList.add("pc-the-one");const i=c(a=>{[...a.children].forEach(r=>{if(r!==e){if(r.contains(e)){const d=r.querySelector(":scope > .pc-kids");d!==null&&i(d);return}(r.classList.contains("pc-part")||r.classList.contains("pc-spart"))&&r.classList.add("pc-dim")}})},"dim");i(s)},"alone"),K=c(s=>{s.querySelectorAll(".pc-dim, .pc-the-one").forEach(e=>e.classList.remove("pc-dim","pc-the-one")),s.querySelectorAll(".pc-fig-head, .pc-fig-cap").forEach(e=>e.remove())},"clearAlone"),oe=class oe extends Ge{constructor(){super(...arguments),this.$canonical="deliverable",this.flip=e=>{e.preventDefault(),Ae();const i=document.getElementById("pc-flip");if(!(i instanceof HTMLInputElement))return;const a=c(()=>{i.checked=!i.checked,w()},"turn"),r=document;r.startViewTransition===void 0?a():r.startViewTransition(a)},this.style=Ne.div`
        counter-reset: theorem;
        .pd-chapter { position: relative; }
        .pc-content { position: absolute; inset-block-start: 2.1rem; inset-inline-end: 0; cursor: pointer; padding: .25rem; }
        .pc-content input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-flip { display: inline-block; box-sizing: border-box; inline-size: 0.9em; block-size: 0.9em; border: 1.5px solid color-mix(in srgb, ${({theme:e})=>e.ink} 65%, ${({theme:e})=>e.paper}); background: ${({theme:e})=>e.paper}; transition: border-width .15s ease, border-color .15s ease; }
        .pc-content:hover .pc-flip { border-color: ${({theme:e})=>e.ink}; }
        .pc-content:has(input:checked) .pc-flip { border-width: 3px; }
        .pc-project { display: none; }
        &:has(#pc-flip:checked) .pc-project { display: block; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-paragraph:not(.pd-navigation) { display: none; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-section:not(.pc-project) { display: none; }
        .pc-project .pd-heading { display: block; font-size: calc(.8 * ${({theme:e})=>e.size}); font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, ${({theme:e})=>e.ink} 70%, ${({theme:e})=>e.paper}); margin-block: 0 .5em; }
        .pc-specification .pc-markdown { font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; font-size: calc(.9 * ${({theme:e})=>e.size}); line-height: calc(1.412 * ${({theme:e})=>e.size}); margin-block-start: calc(${({theme:e})=>e.space} / 4); }
        .pc-specification .pc-markdown h2 { font-family: inherit; font-size: calc(.9 * ${({theme:e})=>e.size}); margin-block: ${({theme:e})=>e.space} 0; font-weight: 600; color: ${({theme:e})=>e.ink}; }
        .pc-specification .pc-markdown h2::before { content: '## '; color: ${({theme:e})=>e.link}; }
        .pc-specification .pc-markdown h3 { font-family: inherit; font-size: calc(.9 * ${({theme:e})=>e.size}); margin-block: calc(${({theme:e})=>e.space} / 2) 0; font-weight: 600; color: ${({theme:e})=>e.ink}; }
        .pc-specification .pc-markdown h3::before { content: '### '; color: ${({theme:e})=>e.link}; }
        .pc-specification .pc-markdown > h2:first-of-type { display: none; }
        .pc-specification .pc-markdown p { margin-block: ${({theme:e})=>e.space}; }
        .pc-specification .pc-markdown > h2:first-of-type + p { margin-block-start: calc(${({theme:e})=>e.space} / 4); }
        .pc-specification .pc-markdown .pc-spart:first-of-type > h2 { display: none; }
        .pc-specification .pc-markdown .pc-spart:first-of-type > .pc-kids { margin-inline-start: 0; }
        .pd-title { position: relative; }
        .pd-title::before { color: ${({theme:e})=>e.ink}; }
        .pd-title::after { content: '# '; position: absolute; inset-inline-start: 0; inset-block-end: 0; opacity: 0; font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: ${({theme:e})=>e.link}; }
        &:has(#pc-flip:checked) .pd-title { padding-inline-start: calc(1.65 * ${({theme:e})=>e.size}); font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: ${({theme:e})=>e.ink}; }
        &:has(#pc-flip:checked) .pd-title::before { margin-inline-start: calc(-1.65 * ${({theme:e})=>e.size}); font-family: ${({theme:e})=>e.font}; color: ${({theme:e})=>e.ink}; }
        &:has(#pc-flip:checked) .pd-title::after { opacity: 1; }
        .pd-section.pc-project { margin-block: calc(${({theme:e})=>e.space} / 2) 0; }
        .pc-markdown h1 { display: none; }
        .pc-markdown h1 + p { display: none; }
        .pc-markdown h2 { font-family: ${({theme:e})=>e.font}; font-size: calc(1 * ${({theme:e})=>e.size}); font-weight: 600; margin-block: 1.1em .35em; color: color-mix(in srgb, ${({theme:e})=>e.ink} 76%, ${({theme:e})=>e.link} 24%); }
        .pc-markdown h3 { font-family: ${({theme:e})=>e.font}; font-size: calc(1 * ${({theme:e})=>e.size}); font-weight: 600; margin-block: .9em .3em; color: color-mix(in srgb, ${({theme:e})=>e.ink} 76%, ${({theme:e})=>e.link} 24%); }
        .pc-markdown p { margin-block: .9em; }
        .pc-markdown strong { font-weight: bold; }
        .pc-markdown a { color: ${({theme:e})=>e.link}; text-decoration: none; }
        .pc-markdown a:hover { text-decoration: underline; }
        .pc-cite a { color: ${({theme:e})=>e.link}; text-decoration: none; cursor: pointer; }
        .pc-cite a:hover { text-decoration: underline; }
        .pc-markdown table { width: 100%; border-collapse: collapse; margin-block: ${({theme:e})=>e.space}; }
        .pc-markdown th, .pc-markdown td { padding: .3em 1.2em .3em 0; text-align: start; vertical-align: top; }
        .pc-markdown th:last-child, .pc-markdown td:last-child { padding-inline-end: 0; }
        .pc-markdown thead th { font-weight: 400; }
        .pc-markdown math { font-family: 'Cambria Math', 'STIX Two Math', math; font-size: 1.08em; }
        .pc-markdown .pc-math-block { margin-block: calc(${({theme:e})=>e.space} / 2); }
        .pc-markdown ol, .pc-markdown ul { padding-inline-start: 1.5em; margin-block: .9em; }
        .pc-markdown li { margin-block: .35em; }
        .pc-interpolated { font-style: italic; opacity: .75; border-block-end: 1px dashed color-mix(in srgb, currentColor 60%, transparent); }
        .pc-theorem { counter-increment: theorem; }
        .pc-theorem::before { content: 'Theorem ' counter(theorem) '.'; font-weight: bold; margin-inline-end: .5em; }
        .pc-proof::before { content: 'Proof.'; font-style: italic; margin-inline-end: .5em; }
        .pc-tree { position: relative; }
        .pc-tree-bar { display: flex; align-items: center; gap: 1.6em; font-size: calc(.7 * ${({theme:e})=>e.size}); letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, ${({theme:e})=>e.ink} 70%, ${({theme:e})=>e.paper}); margin-block-end: calc(${({theme:e})=>e.space} / 2); user-select: none; }
        .pc-layerbox { display: inline-flex; align-items: center; gap: .6em; cursor: pointer; }
        .pc-anno-master, .pc-sec-anno { appearance: none; inline-size: .85em; block-size: .85em; border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 65%, ${({theme:e})=>e.paper}); background: ${({theme:e})=>e.paper}; margin: 0; cursor: pointer; flex: none; }
        .pc-anno-master:checked, .pc-sec-anno:checked { border-width: 3px; }
        .pc-sec-anno { margin-inline-start: .9em; vertical-align: -1px; }
        .pc-verb { cursor: pointer; }
        .pc-verb:hover { color: ${({theme:e})=>e.link}; }
        .pc-showall { display: none; }
        .pc-tree:has(.pc-hidden) .pc-showall { display: inline; }
        .pc-return { display: none; }
        .pc-tree:has(.pc-the-one) .pc-return { display: inline; }
        .pc-spart { position: relative; }
        .pc-spart > h2, .pc-spart > h3 { cursor: pointer; user-select: none; }
        .pc-kids { margin-inline-start: 2ch; }
        .pc-folded > .pc-kids { display: none; }
        .pc-count { display: none; font-weight: 400; opacity: .5; margin-inline-start: .75em; }
        .pc-folded > :is(h2, h3) .pc-count { display: inline; }
        .pc-part { position: relative; }
        .pc-hidden, .pc-dim { display: none; }
        .pc-x, .pc-o { position: absolute; inset-block-start: 0; inline-size: 2ch; text-align: center; opacity: 0; cursor: pointer; }
        .pc-x { inset-inline-start: -2.6ch; }
        .pc-o { inset-inline-start: -4.8ch; }
        .pc-sec-x, .pc-sec-o { inset-block-start: calc(${({theme:e})=>e.space} + .2em); }
        .pc-part:hover > .pc-x, .pc-part:hover > .pc-o, .pc-spart:hover > .pc-sec-x, .pc-spart:hover > .pc-sec-o { opacity: .35; }
        .pc-x:hover, .pc-o:hover { opacity: .7; }
        .pc-before { box-shadow: 0 -2px 0 0 color-mix(in srgb, ${({theme:e})=>e.link} 55%, transparent); }
        .pc-after { box-shadow: 0 2px 0 0 color-mix(in srgb, ${({theme:e})=>e.link} 55%, transparent); }
        .pc-anno { position: absolute; inset-inline-start: calc(100% + 32px); display: none; white-space: nowrap; font-family: ${({theme:e})=>e.font}; font-size: calc(.73 * ${({theme:e})=>e.size}); line-height: 1.45; letter-spacing: .12em; text-transform: uppercase; font-weight: 400; color: color-mix(in srgb, ${({theme:e})=>e.ink} 72%, ${({theme:e})=>e.paper}); }
        .pc-open { opacity: .55; }
        .pc-anno[data-claim] { cursor: pointer; }
        .pc-anno[data-claim]:hover { color: ${({theme:e})=>e.link}; }
        .pc-figure-seat { display: none; }
        .pc-anno.pc-fig { cursor: pointer; }
        .pc-anno.pc-fig:hover { color: ${({theme:e})=>e.link}; }
        .pc-fig-head { font-weight: 600; cursor: pointer; user-select: none; margin-block: ${({theme:e})=>e.space} 0; }
        .pc-fig-cap { display: none; margin-block: calc(${({theme:e})=>e.space} / 4) ${({theme:e})=>e.space}; color: color-mix(in srgb, ${({theme:e})=>e.ink} 70%, ${({theme:e})=>e.paper}); }
        .pc-cap-shown { display: block; }
    `}note(){return n(Ie,{children:[t("style",{children:"::view-transition-old(root), ::view-transition-new(root) { animation-duration: 0.14s; animation-timing-function: ease; } @media (prefers-reduced-motion: reduce) { ::view-transition-old(root), ::view-transition-new(root) { animation: none !important; } }"}),n("label",{className:"pc-content",onClick:this.flip,children:[t("input",{type:"checkbox",id:"pc-flip",defaultChecked:this.$canonical==="project"}),t("span",{className:"pc-flip"})]})]})}};c(oe,"$Content");let F=oe;const ae=class ae extends Oe{$Define(){super.$Define(),this.classes.add(this,"pc-project")}};c(ae,"$Project");let I=ae;const se=class se extends I{$Define(){super.$Define(),this.classes.add(this,"pc-specification")}};c(se,"$Specification");let B=se;const re=class re extends I{$Define(){super.$Define(),this.classes.add(this,"pc-identification")}};c(re,"$Identification");let H=re;const ce=class ce extends I{$Define(){super.$Define(),this.classes.add(this,"pc-intuition")}};c(ce,"$Intuition");let U=ce;const he=class he extends I{$Define(){super.$Define(),this.classes.add(this,"pc-progress")}};c(he,"$Progress");let J=he;const ve=c((s,e)=>We.renderToString(s,{output:"mathml",throwOnError:!1,displayMode:e}),"typeset");Te.use({extensions:[{name:"mathBlock",level:"block",start(s){const e=s.indexOf("$$");return e<0?void 0:e},tokenizer(s){const e=/^\$\$([\s\S]+?)\$\$/.exec(s);if(e!==null)return{type:"mathBlock",raw:e[0],text:e[1]}},renderer(s){return`<div class="pc-math-block">${ve(s.text,!0)}</div>`}},{name:"mathInline",level:"inline",start(s){const e=s.indexOf("$");return e<0?void 0:e},tokenizer(s){const e=/^\$(?=\S)([^$\n]*?\S)\$/.exec(s);if(e!==null)return{type:"mathInline",raw:e[0],text:e[1]}},renderer(s){return`<span class="pc-math">${ve(s.text,!1)}</span>`}}]});let T=null;const xe=c(s=>{if(T===null||s===null)return null;const i=T.getAttribute("data-level")==="1"?s.closest('.pc-spart[data-level="1"]'):s.closest(".pc-part")??s.closest(".pc-spart");return i===null||i===T||T.contains(i)?null:i},"aim"),_=c(()=>{document.querySelectorAll(".pc-before, .pc-after").forEach(s=>s.classList.remove("pc-before","pc-after"))},"unseat"),de=class de extends X{constructor(){super(...arguments),this.$identifier="",this.$tree=!1,this.follow=e=>{const i=e.currentTarget,a=e.target,r=a.closest(".pc-x");if(r!==null){r.closest(r.classList.contains("pc-sec-x")?".pc-spart":".pc-part")?.classList.add("pc-hidden"),w();return}const d=a.closest(".pc-o");if(d!==null){const f=d.closest(".pc-part, .pc-spart"),u=f?.classList.contains("pc-the-one")??!1;K(i),!u&&f!==null&&we(i,f),w();return}if(a.closest(".pc-showall")!==null){i.querySelectorAll(".pc-hidden").forEach(f=>f.classList.remove("pc-hidden")),w();return}if(a.closest(".pc-return")!==null){K(i),w();return}if(a.closest(".pc-sections")!==null){i.querySelectorAll(".pc-spart").forEach(f=>f.classList.add("pc-folded")),w();return}if(a.closest(".pc-expand")!==null){i.querySelectorAll(".pc-folded").forEach(f=>f.classList.remove("pc-folded")),w();return}if(a.closest(".pc-reset")!==null){i.querySelectorAll(".pc-hidden, .pc-folded").forEach(u=>u.classList.remove("pc-hidden","pc-folded")),K(i);const f=new Map([["root",i]]);i.querySelectorAll("[data-box]").forEach(u=>{const y=u.querySelector(":scope > .pc-kids");y!==null&&f.set(u.getAttribute("data-box")??"",y)}),[...i.querySelectorAll("[data-home]")].sort((u,y)=>Number(u.getAttribute("data-seat"))-Number(y.getAttribute("data-seat"))).forEach(u=>f.get(u.getAttribute("data-home")??"")?.append(u)),w();return}const m=a.closest(".pc-anno-master");if(m instanceof HTMLInputElement){i.querySelectorAll(".pc-sec-anno").forEach(f=>{f.checked=m.checked}),w();return}if(a.closest(".pc-sec-anno")!==null){const f=[...i.querySelectorAll(".pc-sec-anno")],u=i.querySelector(".pc-anno-master");u!==null&&(u.checked=f.every(y=>y.checked)),w();return}const l=a.closest(".pc-anno");if(l!==null){if(l.classList.contains("pc-fig")){const y=document.getElementById(l.getAttribute("data-for")??"")?.closest(".pc-part, .pc-spart")??null,C=y?.classList.contains("pc-the-one")??!1;if(K(i),!C&&y!==null){we(i,y);const $=l.getAttribute("data-fig-title")??"";if($!==""){const P=document.createElement("p");P.className="pc-fig-head",P.textContent=$,P.title="The caption stands beneath; press the title to show it.";const q=document.createElement("p");q.className="pc-fig-cap",q.textContent=l.getAttribute("data-fig-caption")??"",y.before(P),y.after(q)}}w();return}const f=l.getAttribute("data-claim");if(f!==null){const u=c(()=>{const C=document.getElementById("pc-flip");C instanceof HTMLInputElement&&(C.checked=!1),document.getElementById(f)?.scrollIntoView({block:"center"})},"turn"),y=document;y.startViewTransition===void 0?u():y.startViewTransition(u)}return}const p=a.closest(".pc-fig-head");if(p!==null){p.parentElement?.querySelector(".pc-fig-cap")?.classList.toggle("pc-cap-shown");return}const g=a.closest(".pc-spart > h2, .pc-spart > h3");if(g!==null){g.parentElement?.classList.toggle("pc-folded"),w();return}const N=a.closest('a[href^="#cite-"]');if(N===null)return;e.preventDefault(),document.getElementById(N.getAttribute("href")?.slice(1)??"")?.scrollIntoView({behavior:"smooth",block:"center"})},this.grab=e=>{const i=e.target.closest(".pc-part, .pc-spart");i!==null&&(T=i,e.dataTransfer.setData("text/plain","part"),e.dataTransfer.effectAllowed="move")},this.over=e=>{const i=xe(e.target);if(_(),i===null)return;e.preventDefault();const a=i.getBoundingClientRect();i.classList.add(e.clientY<a.top+a.height/2?"pc-before":"pc-after")},this.drop=e=>{const i=xe(e.target);if(_(),i===null||T===null)return;e.preventDefault();const a=i.getBoundingClientRect(),r=e.clientY<a.top+a.height/2;if(T.getAttribute("data-level")!=="1"&&i.classList.contains("pc-spart")){const d=i.querySelector(":scope > .pc-kids");d!==null&&(r?d.prepend(T):d.append(T))}else i.parentElement?.insertBefore(T,r?i:i.nextSibling);T=null,w()},this.settle=()=>{_(),T=null}}get append(){return this.chapter?.annotations.find(Xe).find(e=>e.$identifier===this.$identifier)}write(){const e=this.append;if(e===void 0)return null;const i=Je(Te.parse(Le.copy(e.text),{async:!1})),a=this.$tree?Ve(i):i;return t("div",{className:this.$tree?`pc-doc-${this.$identifier} pc-tree`:`pc-doc-${this.$identifier}`,onClick:this.follow,onDragStart:this.grab,onDragOver:this.over,onDrop:this.drop,onDragEnd:this.settle,dangerouslySetInnerHTML:{__html:a}})}$Define(){super.$Define(),this.classes.add(this,"pc-markdown")}};c(de,"$Markdown");let V=de;const le=class le extends ke{constructor(){super(...arguments),this.$part="",this.follow=e=>{const i=e.currentTarget.textContent??"",a=c(()=>{const d=document.getElementById("pc-flip");d instanceof HTMLInputElement&&(d.checked=!0),Ae(),w(),document.getElementById(O(i))?.scrollIntoView({block:"center"})},"turn"),r=document;r.startViewTransition===void 0?a():r.startViewTransition(a)}}write(){return t("a",{onClick:this.follow,children:this.$part})}$Define(){super.$Define(),this.classes.add(this,"pc-cite")}};c(le,"$Cite");let Y=le;const me=class me extends X{constructor(){super(...arguments),this.$part="",this.$title="",this.$caption=""}write(){return t("span",{className:"pc-figure","data-part":this.$part,"data-title":this.$title,"data-caption":this.$caption})}$Define(){super.$Define(),this.classes.add(this,"pc-figure-seat")}};c(me,"$Figure");let Z=me;const pe=class pe extends ke{$Define(){super.$Define(),this.classes.add(this,"pc-interpolated")}};c(pe,"$Interpolated");let Q=pe;const Ye=x(F);x(I);const Ze=x(B),Qe=x(H);x(U);const et=x(J),W=x(V),o=x(Y),E=x(Z),G=x(Q),fe=class fe extends X{$Define(){super.$Define(),this.classes.add(this,"pc-theorem")}};c(fe,"$Theorem");let ee=fe;const ue=class ue extends X{$Define(){super.$Define(),this.classes.add(this,"pc-proof")}};c(ue,"$Proof");let te=ue;const z=x(ee),M=x(te),tt=c(()=>n(ie,{children:[t(Re,{children:"The Objects"}),t(ne,{children:"[The Symmetry of Arithmetic](/inexplicable-phenomena/arithmetic-textbook/#the-symmetry-of-arithmetic)"}),t(Ye,{}),t(b,{children:"This chapter attempts to meet the statement of work on its other side: a single object X, added to first-order Peano arithmetic, expressing that arithmetic has a symmetry the formalism does not at present state. The specification fixes the formalism X modifies, the results it must agree with, the three types of theorem it makes immediate, the constraints on it, and the tests a candidate must pass; this chapter teaches each part in turn, and where only X itself can complete a passage, a brace stands in its place."}),n(S,{children:[t(k,{children:"The formalism"}),n(b,{children:["PA here means classical first-order logic with identity, the signature 0, S, + and ·, the Peano axioms in the form below, and induction as a rule of inference, not as an axiom schema; it has exactly the theorems of first-order Peano arithmetic (",t(o,{part:"1.1"})," of the statement). The order x ≤ y, divisibility and primality are defined in the usual way."]}),n(b,{children:[t(ye,{}),n(v,{children:[t(h,{children:"Name"}),t(h,{children:"Axiom or rule"})]}),n(v,{children:[t(h,{children:"S1"}),t(h,{children:"∀x ¬(Sx = 0)"})]}),n(v,{children:[t(h,{children:"S2"}),t(h,{children:"∀x ∀y (Sx = Sy → x = y)"})]}),n(v,{children:[t(h,{children:"A1"}),t(h,{children:"∀x (x + 0 = x)"})]}),n(v,{children:[t(h,{children:"A2"}),t(h,{children:"∀x ∀y (x + Sy = S(x + y))"})]}),n(v,{children:[t(h,{children:"M1"}),t(h,{children:"∀x (x · 0 = 0)"})]}),n(v,{children:[t(h,{children:"M2"}),t(h,{children:"∀x ∀y (x · Sy = x · y + x)"})]}),n(v,{children:[t(h,{children:"Induction"}),t(h,{children:"From φ(0) and φ(x) → φ(Sx), with x not free in any open assumption, infer ∀x φ(x)"})]})]}),n(b,{children:["Two signs are then defined, each by succession of the previous value, in the form of the axioms for addition and multiplication (",t(o,{part:"1.2"}),"): A, the sum of the numbers up to a number, with A(0) = 0 and A(Sx) = A(x) + Sx; and M, their product from one, with M(0) = S0 and M(Sx) = M(x) · Sx. This is an extension by definition — PA proves each function exists and is unique, so no new theorem appears in the original signature — and induction ranges over formulas that use the new signs."]}),n(b,{children:["The same formalism reasons from the top under the renaming σ (",t(o,{part:"1.3"}),"): 0 ↦ ∞, S ↦ P, + ↦ ⊕, · ↦ ⊗, ≤ ↦ ≫. σ(PA) names the totality and has no term for zero, as PA names zero and has no term for the totality; the two theories are identical under σ, and S1 with σ(S1) — zero has no predecessor, the totality has no successor — are one statement. PA as it stands neither asserts nor denies that the two readings express the same set of numbers. X asserts it, and gives no way to resolve which reading is the case."]}),n(b,{children:["The circles (",t(o,{part:"1.4"}),"): for N ≥ 1, C_N is the arithmetic modulo N read as a structure for PA's signature, and the mirror μ_N sends each element a to N − a, its negation. The mirror carries a step up to a step down, μ_N(Sa) = P μ_N(a), and respects addition. The circles of factorial size are the C_N with N = M(n), and on any circle a set defined by a formula has a definition from the bottom, D, and a definition from the top, μ_N[D] (",t(o,{part:"1.6"}),"): the coprimes U_N, the primes P_N below N, and their mirror image P′_N are the three that matter below."]}),n(b,{children:["The canonical sentences (",t(o,{part:"1.7"}),"), each expected true, the customary short forms their corollaries:"]}),n(b,{children:[t(ye,{}),n(v,{children:[t(h,{children:"Name"}),t(h,{children:"Canonical sentence"}),t(h,{children:"Corollary"})]}),n(v,{children:[t(h,{children:"GC"}),n(h,{children:["∀n ≥ 2 ∃k ","<"," n (n − k and n + k are prime)"]}),t(h,{children:"Every even number from 4 up is a sum of two primes"})]}),n(v,{children:[t(h,{children:"TP"}),n(h,{children:["∀n ≥ 3 ∃m (n ","<"," m ","<"," M(n) and m − 1 and m + 1 are prime)"]}),t(h,{children:"There are infinitely many twin primes"})]}),n(v,{children:[t(h,{children:"RH"}),t(h,{children:"The counts from the bottom and from the top in the balance identity differ by at most C · x^(1/2+ε)"}),t(h,{children:"The Riemann hypothesis, in its arithmetic form"})]}),n(v,{children:[t(h,{children:"Euclid"}),n(h,{children:["∀n ∃p (n ","<"," p ≤ S(M(n)) and p is prime)"]}),t(h,{children:"There are infinitely many primes; PA proves this one"})]})]})]}),n(S,{children:[t(k,{children:"What is known"}),n(b,{children:["Everything in this section is a theorem of PA or of ordinary mathematics; the constraints on X cite these results by their labels (",t(o,{part:"section 2"})," of the statement). The spine of the subject is five facts about the circles of factorial size."]}),n(b,{children:[t(De,{}),n(A,{children:[t(o,{part:"K2"}),", the zero of the sieve: every d with 1 ≤ d ≤ n divides M(n) — provable in PA by induction. The limiting factorial is the number every small number divides, as every number divides zero (",t(o,{part:"K11"}),": PA proves that if every y divides x then x = 0)."]}),n(A,{children:[t(o,{part:"K3"}),", the fold: 2 · A(n) = n · Sn, so on the circle of size N = M(n) the sum A(N) is N/2 — the fixed point of the mirror, the one odd point halfway between zero and the top on the scale whose unit is half the top."]}),n(A,{children:[t(o,{part:"K4"}),", the mirror: if p divides N then p divides a exactly when p divides N − a; the coprimes satisfy U_N = μ_N[U_N] — coprimality is symmetric on a circle."]}),n(A,{children:[t(o,{part:"K5"}),", the circle: C_N satisfies S2, A1, A2, M1, M2 and every instance of induction, and fails exactly S1 — the one axiom whose keeping or failing separates the numbers from the circles."]}),n(A,{children:[t(o,{part:"K9"}),", distinctness: the primes are not symmetric on a named circle — on C_210, 23 is prime and its mirror 187 = 11 · 17 is not — so P_N ≠ P′_N where PA can check it."]})]}),n(b,{children:["Three counting theorems on the circles carry the three conjectures' forms, each by the Chinese remainder theorem or by an identity (",t(o,{part:"K6"}),", ",t(o,{part:"K7"}),", ",t(o,{part:"K8"}),"): every even element of an even circle is a sum of two coprimes, in a computable count; the elements whose two neighbours are both coprime are counted by the same product and grow without bound as primes are added; and the balance identity splits the floor of the square root into a term of the bottom and a term of the top. And two results place Gödel (",t(o,{part:"K16"}),", ",t(o,{part:"K17"}),"): an undecided Π1 sentence holds of every numeral while its negation is consistent and ω-inconsistent, the asserted exception no numeral; and PA proves G equivalent to Con."]})]}),n(S,{children:[t(k,{children:"The three types of theorem"}),n(b,{children:["GC, TP and RH are the foundational examples of three types of theorem about a property φ of numbers (",t(o,{part:"section 3"})," of the statement). Each type has a general form, a basic case PA proves, a theorem on the circles with the definitions from the bottom and from the top kept distinct, and its foundational example. The basic cases are where the types can be checked against ordinary proof (",t(o,{part:"C9"}),"); they are the first three theorems below, and PA proves each."]}),t(z,{children:n(A,{children:["Pairing, the basic case. For all n and k ","<"," n: n − k is coprime to n exactly when n + k is."]})}),n(M,{children:["A prime dividing n divides n − k exactly when it divides n + k, since their sum and difference are multiples of n (",t(o,{part:"K4"}),"). This is the mirror on the circle of size n, and it is the ordinary proof."]}),t(z,{children:n(A,{children:["Recurrence, the basic case. For every n there is a prime p with n ","<"," p ≤ S(M(n)) — Euclid, in canonical form."]})}),n(M,{children:["Every number up to n divides M(n) (",t(o,{part:"K2"}),"), so no number up to n divides S(M(n)) but 1; its least proper divisor is a prime above n, and it is bounded by S(M(n)) itself — the top supplies the bound, which is the canonical form's point (",t(o,{part:"K12"}),")."]}),t(z,{children:t(A,{children:"Balance, the basic case. The count of multiples of 5 up to x is within 1 of x/5."})}),t(M,{children:"The multiples of 5 recur with period 5 from the bottom and, by the mirror, with period 5 from the top; the two counts bracket x/5 within one period."}),n(b,{children:["The foundational examples are the same three forms with φ the primes, and each is, on the circles, already a theorem (",t(o,{part:"K6"}),", ",t(o,{part:"K7"}),", ",t(o,{part:"K8"}),"). What the three arguments lack is one and the same step — concluding the universal form among the numbers from the circle form generalized over every pair of definitions that can be made equal in the limit (",t(o,{part:"C6"}),", ",t(o,{part:"C7"}),"). That step is X, and it is not yet found."]}),t(z,{children:n(A,{children:["Pairing — Goldbach. ∀n ≥ 2 ∃k ","<"," n (n − k and n + k are prime)."]})}),n(M,{children:["On the circle of size M(n), every even element is a sum of two elements coprime to the size, in the count ",t(o,{part:"K6"})," gives, the primes from the bottom and their mirror from the top kept distinct. ",t(G,{children:"{One use of X concludes the universal form — the figure of X is open as O6, and which definitions it generalizes over as O2 and O3}"}),". No analysis is used (",t(o,{part:"C6"}),")."]}),t(z,{children:n(A,{children:["Recurrence — the twin primes. ∀n ≥ 3 ∃m (n ","<"," m ","<"," M(n) and m − 1 and m + 1 are prime)."]})}),n(M,{children:["On the circle of size M(n), the count of elements whose two neighbours are both coprime grows without bound as primes are added (",t(o,{part:"K7"}),"). ",t(G,{children:"{One use of X concludes the canonical form; its derivation through K7 is open as O7}"}),". The computed record stands at every n from 3 to 10,000,000 (",t(o,{part:"K21"}),", of the progress)."]}),t(z,{children:t(A,{children:"Balance — the arithmetic Riemann hypothesis. The count of primes from the bottom and the count from the top differ by no more than the stated bound."})}),n(M,{children:["The balance identity holds for every x (",t(o,{part:"K8"}),"): the floor of the square root is the whole, split into a term of the bottom and a term of the top. ",t(G,{children:"{One use of X bounds the difference — the general form of the balance type is open as O11}"}),"."]})]}),n(S,{children:[t(k,{children:"The object"}),n(b,{children:["X is one finitely stated object that modifies the formalism by adding a new way of identifying truths; T denotes PA with X adjoined (",t(o,{part:"section 4"}),"). Its kind is not fixed — an axiom, a rule of inference, a duality, or something else as fundamental — but its best form is guided (",t(o,{part:"4.2"}),"): singular, not an infinite schema, agnostic to interpretation, looking like a natural modification of universal inference, wearing the same clothing as the other parts of the formalism. A rule of inference seems fitting: like induction, expressible finitely, operating on formulas, corresponding to a new form of proof — a new way to make universal conclusions. ",t(G,{children:"{The figure of X goes here: its premises, its one conclusion, its free formula, its side condition decidable on the written proof — O6}"})]})]}),n(S,{children:[t(k,{children:"The constraints"}),n(b,{children:["What X must satisfy (",t(o,{part:"section 5"}),"): stated finitely and checkable by a reader as induction is (",t(o,{part:"C1"}),"); internal to PA's formalism, naming no primes, sieves or moduli (",t(o,{part:"C2"}),"); every clause traced to a commitment of meaning (",t(o,{part:"C3"}),"); unique in the sense that any two objects meeting the constraints give the same theorems (",t(o,{part:"C4"}),"). What it must do: prove the canonical GC, TP and RH (",t(o,{part:"C5"}),"), each immediately — the circle theorem followed by one use of X, no analysis (",t(o,{part:"C6"}),") — and exactly the theorems of the circle paradigm (",t(o,{part:"C7"}),"); relate G, Con and the empty derivation, what is unprovable in PA being what the derivation with zero steps proves (",t(o,{part:"C8"}),", open as ",t(o,{part:"O5"}),"); and pass every required test while proving no excluded one (",t(o,{part:"C9"}),"). How it must stand to PA: consistent relative to PA, preferably by an interpretation in the circles or a limit object (",t(o,{part:"C10"}),"); independent, since PA has not made a decision about symmetry (",t(o,{part:"C11"}),"); stated so that it can fail — if PA refutes Goldbach the theory is inconsistent and is withdrawn, and if PA proves Goldbach X is not needed for it (",t(o,{part:"C12"}),"); fixed by σ up to provable equivalence, with S1 kept and never false (",t(o,{part:"C13"}),")."]})]}),n(S,{children:[t(k,{children:"The meaning"}),n(b,{children:["Each clause of X must trace to a commitment about what arithmetic means (",t(o,{part:"C3"}),") — the twenty entries of the identification on the other side of this page carry those commitments, ",t(o,{part:"I1"})," to ",t(o,{part:"I20"}),`. Zero is what the subject uses to speak of the existence of non-quantities without distinction: every number divides zero, and how many that is, is not none and is not a quantity the signature can refer to — it is one to one with "for all", and "for all" is "there does not exist" seen from the opposite side. Arithmetic has a reading from the top, and the top is not a number: it has no successor, so it is nothing's predecessor; it is no steps from itself; in multiples of steps from it, it is none. Induction is the expression that properties transcend — what holds at one end and is kept by each step reaches the other — and multiplicity is symmetric under interpretation. Two readings, and one circle with two directions, are two ways of seeing the same thing; the subject holds no opinion about where the journey starts (`,t(o,{part:"C13"}),")."]}),n(b,{children:["The opposite reading holds that the top and the bottom are two different things. In Gödel's argument it appears as G and ¬G referring to two different things — G unprovable but true, ¬G provable by a proof of infinite length. On the symmetric reading these refer to one thing: the proof of infinite length is the proof with zero steps (",t(o,{part:"I17"}),"). What is incomplete, on this subject's view, is the asymmetric reading — and the exception it would assert is the same thing a proof of G looks like there: big, even, divisible by every prime, a top taken as distinct from zero, which among the numbers does not exist (",t(o,{part:"K13"}),", ",t(o,{part:"K11"}),"). This is one subject's opinion of another, and it places no requirement on that subject. The surrounding work sits in the subject's notes: Gödel's system in ",t(ge,{children:"[The System P](/inexplicable-phenomena/arithmetic-notebook/#the-system-p)"}),", and the exchange of zero and infinity in ",t(ge,{children:"[Zero and Infinity](/inexplicable-phenomena/arithmetic-notebook/#zero-and-infinity)"}),"."]})]}),n(S,{children:[t(k,{children:"The tests"}),n(b,{children:["A candidate for X is judged on the statement's ",t(o,{part:"section 6"})," before anything else: T must prove the basic cases as their ordinary proofs — the coprime pairing, Euclid with the top taken as M(n), the count of multiples of five — and the canonical GC, TP and RH, each immediate; and it must not prove what PA refutes: that every N has two multiples of 5 at equal positive distance, that the polynomial of the local-global failure has a root (",t(o,{part:"K18"}),"), that the primes equal their mirror on the numeral 210, that there is ever a larger even prime, or that 0 = 1. The excluded rows are checks to run on a candidate, not further demands, since consistency relative to PA (",t(o,{part:"C10"}),") excludes them already."]})]}),n(b,{children:["The specification is the anchor for the work: it is updated when its parts are found inconsistent, since an inconsistent specification has specified nothing, and it is not thrown away — a change is made by changing it. The identification comprehends the object in twenty entries, ",t(o,{part:"I1"})," to ",t(o,{part:"I20"}),", the open determinations ",t(o,{part:"O1"})," to ",t(o,{part:"O11"})," stand in the progress, both on the other side of this page, and the chapter closes when the brace in The object is replaced by the figure it stands for."]}),n(Ze,{children:[t(k,{children:"Specification"}),t(W,{identifier:"statement-of-work",tree:!0}),t(E,{part:"1.1",title:"The formalism",caption:"Classical first-order logic with identity; the signature 0, S, + and ·; the Peano axioms in this form; and induction as a rule of inference, not as an axiom schema."}),t(E,{part:"4.1",title:"The kinds of X",caption:"The kind of X is not fixed. A solution states which kind it is and discharges the third column."}),t(E,{part:"section 6",title:"The acceptance",caption:"Every excluded statement is refuted by PA; the excluded rows are checks to run on a candidate, not further demands."}),t(E,{part:"4.2.3"})]}),n(Qe,{children:[t(k,{children:"Identification"}),t(W,{identifier:"identification"})]}),n(et,{children:[t(k,{children:"Progress"}),t(W,{identifier:"progress"})]}),t(R,{identifier:"statement-of-work",type:".md",children:`# The Symmetry of Arithmetic: Statement of Work

Nov 15, 2026 · @Doug

## Purpose

This document specifies an addition to the formalism of first-order Peano arithmetic. The addition is a single object X, which expresses that arithmetic has a symmetry the formalism does not at present state. A rule of inference seems fitting. Like induction, which can be expressed finitely as a rule of inference, it operates on formulas and corresponds to a new form of proof. It is a new way to make universal conclusions.

**Why X is specified before it is stated.** X is not derivable from existing mathematics. If it were, the three conjectures, whose arguments are elementary, would already be proven. So X can be identified only by what it must satisfy. The specification fixes the definitions X is stated in, the results it must agree with, the requirements on it and their motivation, the tests a candidate must pass, and the form it should take, so that candidates can be judged against them and the most natural form recognized when it is found.

**What X does.** With X adjoined, Goldbach, twin primes and the arithmetic form of the Riemann hypothesis are immediate. Each is a theorem already proven on the circles of factorial size, with the definitions from the bottom and from the top kept distinct, followed by one use of X. They are the foundational examples of three types of theorem: pairing, recurrence and balance.

**What is to be identified.** A mathematical object X that modifies a formalism, first-order Peano arithmetic, by adding a new way of identifying truths. X is not yet known. This document gives a search what it needs to identify X uniquely: the definitions, the record of known results, the three types, the deliverable's kind and form, the requirements and what motivates each, and the acceptance.

**Where the meaning stands.** The meaning that motivates X — what the subject commits to about zero, the totality, the two readings, the circle and the other reading — is identified in The Symmetry of Arithmetic: Identification, entries I1 to I20. The requirements cite those entries by label, and the labels O1 to O11 refer to the open determinations recorded in The Symmetry of Arithmetic: Progress.

The specification is the anchor for the work. It is updated when its parts are found inconsistent, since an inconsistent specification has specified nothing. Section 7 states where it ends.

## 1. The definitions

### 1.1 The base

PA here means: classical first-order logic with identity; the signature {0, S, +, ·}; the Peano axioms in the form below [1]; and induction as a rule of inference, not as an axiom schema. It has exactly the theorems of first-order Peano arithmetic.

| Name | Axiom or rule |
| --- | --- |
| S1 | ∀x ¬(Sx = 0) |
| S2 | ∀x ∀y (Sx = Sy → x = y) |
| A1 | ∀x (x + 0 = x) |
| A2 | ∀x ∀y (x + Sy = S(x + y)) |
| M1 | ∀x (x · 0 = 0) |
| M2 | ∀x ∀y (x · Sy = x · y + x) |
| Induction | From φ(0) and φ(x) → φ(Sx), with x not free in any open assumption, infer ∀x φ(x) |

Defined in the usual way: x ≤ y, x divides y, x is prime.

### 1.2 The defined signs A and M

Two one-place signs, each defined by succession of the previous value, in the form of the axioms for + and ·.

| Sign | Meaning | At zero | At a successor |
| --- | --- | --- | --- |
| A | 0 + … + n | A(0) = 0 | A(Sx) = A(x) + Sx |
| M | 1 · … · n | M(0) = S0 | M(Sx) = M(x) · Sx |

This is an extension by definition. PA proves that each function exists and is unique, so no new theorem appears in the original signature. Induction ranges over formulas that use the new signs.

### 1.3 The dual signature

{∞, P, ⊕, ⊗, ≫}. σ is the renaming 0 ↦ ∞, S ↦ P, + ↦ ⊕, · ↦ ⊗, ≤ ↦ ≫. σ(PA) is PA written in the dual signature.

### 1.4 The circles

For N ≥ 1, C_N is ℤ/Nℤ with 0, x ↦ x + 1, + and ·, read as a structure for the signature of PA. The mirror is μ_N(a) := N − a, which is −a in C_N. It satisfies μ_N(Sa) = P μ_N(a), with P the inverse of S, and μ_N(a + b) = μ_N(a) + μ_N(b). The circles of factorial size are the C_N with N = M(n).

### 1.5 Limit objects

Candidates for "the limit of the circles of factorial size":

- The profinite integers, the inverse limit of the circles of factorial size.
- An ultraproduct of the circles of factorial size.
- The Steinitz (supernatural) number Ω = ∏ p^∞ over all primes p, the greatest element of Steinitz's lattice [8, 9].
- The intersection of the modular arithmetics over a three-valued base, RMω in [3].

### 1.6 Definitions from the bottom and from the top

For a set D of numbers below N defined by a formula, D is its definition from the bottom and μ_N[D] its definition from the top. In particular U_N := {a ∈ C_N : gcd(a, N) = 1}, P_N := {p : p prime, p < N}, and P′_N := μ_N[P_N].

### 1.7 The canonical sentences

All are expected to be true. The forms below are canonical, and the shorter customary forms are their corollaries.

| Name | Canonical sentence | Corollary |
| --- | --- | --- |
| GC | ∀n ≥ 2 ∃k < n (n − k and n + k are prime) | Every even number from 4 up is a sum of two primes |
| TP | ∀n ≥ 3 ∃m (n < m < M(n) and m − 1 and m + 1 are prime) | ∀N ∃n > N (n − 1 and n + 1 are prime) |
| RH | For every ε > 0 there is C such that U(x) − L(x) is at most C · x^(1/2+ε) in absolute value for all x ≥ 1, with U and L as in K8 | The Riemann hypothesis; equivalent to a Π1 sentence [6, 7] |
| Euclid | ∀n ∃p (n < p ≤ S(M(n)) and p is prime) | There are infinitely many primes. PA proves this one |

G and Con denote the Gödel sentence and the consistency statement of PA [2]. Σ1, Π1, Π2 are the classes of the arithmetical hierarchy [17].

## 2. The record

Each is a theorem of PA or of ordinary mathematics. The requirements refer to them by label.

### 2.1 Renaming and the circles

| Label | Statement | Status |
| --- | --- | --- |
| K1 Renaming | PA ⊢ φ iff σ(PA) ⊢ σφ | σ is a bijective renaming |
| K2 Zero of the sieve | Every d with 1 ≤ d ≤ n divides M(n) | Provable in PA, by induction |
| K3 Fold | 2 · A(n) = n · Sn. So 2 · A(M(n)) = M(n) · S(M(n)), and in C_N with N = M(n), n ≥ 2: 2 · A(N) is N and A(N) is N/2, the fixed point of the mirror | Provable in PA, by induction |
| K4 Mirror | If p divides N then, for every a, p divides a iff p divides N − a. Hence U_N = μ_N[U_N] | Provable in PA |
| K5 Circle | C_N satisfies S2, A1, A2, M1, M2 and every instance of induction. C_N does not satisfy S1 | Direct check; noted in [3] |

### 2.2 The counting theorems

| Label | Statement | Status |
| --- | --- | --- |
| K6 Pairing on circles | N even. For every even c there are a, b ∈ U_N with a + b ≡ c (mod N). The number of such a is (N / rad N) · ∏ (p − 2) over odd p dividing N and not c, times ∏ (p − 1) over odd p dividing both | Chinese remainder theorem |
| K7 Recurrence on circles | N even. The number of k ∈ C_N with k − 1 and k + 1 in U_N is (N / rad N) · ∏ (p − 2) over odd p dividing N. It grows without bound as primes are added | Chinese remainder theorem |
| K8 Balance identity | For x ≥ 1, ⌊√x⌋ = x · ℓ(x) + U(x) − L(x), where ℓ(x) = Σ λ(d)/d over d ≤ x, U(x) = Σ (x mod d)/d over d ≤ x with Ω(d) odd, L(x) the same with Ω(d) even. RH holds iff ℓ(x) = O(x^(−1/2+ε)) for every ε > 0 | Identity: Σ λ(d) over the divisors d of n is 1 on squares and 0 otherwise. Equivalence: standard, reference to be located |

### 2.3 The primes and the top

| Label | Statement | Status |
| --- | --- | --- |
| K9 Distinctness | P_N ≠ P′_N on circles of named size. For N = 210: 23 ∈ P_N and μ(23) = 187 = 11 · 17 | Direct check |
| K10 Division order | The numbers ordered by divisibility form a lattice with least element 1 and greatest element 0. The least common multiple of all M(n) is 0. The embedding into Steinitz's lattice sends 0 to Ω | [8, 9] |
| K11 Uniqueness of zero | PA proves: if every y divides x, then x = 0. PA proves: there are infinitely many primes iff 0 is the only number every prime divides | Provable in PA |
| K12 Euclid | PA proves the canonical sentence Euclid of 1.7. The bound S(M(n)) is one step past a number that every prime up to n divides (K2) | Provable in PA |
| K13 The exception at the top | If p divides N and N − p > p, then N − p is a proper multiple of p and is not prime. So a thing every prime divides, other than 0, is not a sum of two primes | Provable in PA. By K11 there is no such number |

### 2.4 Independence and Gödel

| Label | Statement | Status |
| --- | --- | --- |
| K14 Π1 soundness | If T extends PA and is consistent, every Π1 theorem of T holds of every numeral | Since PA proves every true Σ1 sentence |
| K15 Classes | GC is Π1. RH is equivalent to a Π1 sentence. TP in canonical form is Π1; its corollary is Π2 | [6, 7] |
| K16 Independent Π1 sentences | Let φ be ∀c θ(c) with θ decidable. If PA proves neither φ nor ¬φ, then φ holds of every numeral, PA + ¬φ is consistent, and PA + ¬φ is ω-inconsistent: it proves ∃c ¬θ(c) and proves θ(n) for each numeral n. The exception it asserts is no numeral. This is the situation of ¬G in [2] | A false φ has a numeral exception, which PA verifies |
| K17 Gödel | PA ⊢ G ↔ Con | [2]; formalized second theorem |

### 2.5 The adjacent arithmetics

| Label | Statement | Status |
| --- | --- | --- |
| K18 Local-global failure | (x² − 2)(x² − 17)(x² − 34) = 0 has a solution in every C_N and none among the numbers | Standard, reference to be located |
| K19 Modular arithmetic over a three-valued base | With base RM3, arithmetic modulo i is negation-inconsistent, absolutely consistent, and contains the theorems of PA | [3] |
| K20 Collapse | In LP, identifying elements of a model by a congruence preserves every truth. The collapsed models of the numbers are a tail followed by a cycle | [4, 5, 12] |

## 3. The three types of theorem

GC, TP and RH are the foundational examples of three types of theorem about a property φ of numbers. Each type has a general form, a basic case that PA proves, a theorem on the circles with the definitions from the bottom and from the top kept distinct, and its foundational example.

|  | Type I: pairing | Type II: recurrence | Type III: balance |
| --- | --- | --- | --- |
| What it says | Every number has two φ-numbers at equal distance on either side | Above every number, and below a bound the top supplies, there is a φ-pair | The count of φ-numbers up to x stays near its estimate |
| General form | ∀n ≥ 2 ∃k < n (φ(n − k) and φ(n + k)) | ∀n ≥ 3 ∃m (n < m < M(n) and φ(m − 1) and φ(m + 1)) | The count from the bottom and the count from the top differ by no more than a stated bound |
| Basic case, provable in PA | φ is "coprime to n": n − k is coprime to n iff n + k is (K4) | Euclid (K12): the same form with one φ-number in place of a pair | φ is "multiple of 5": the count up to x is within 1 of x/5 |
| Theorem on the circles | K6 | K7 | K8 |
| Foundational example | GC | TP | RH |

The requirement on X is that each foundational example is immediate in T: it is its circle theorem followed by one use of X (C6). This is the sense in which X makes them trivial. A proof of this kind is the type of proof X adds.

## 4. The deliverable

X is one finitely stated object that modifies the formalism of 1.1 by adding a new way of identifying truths. T denotes PA with X adjoined. The kind of X is not fixed, and its form is guided.

### 4.1 The kind

| Kind | What X would be | What must then be supplied |
| --- | --- | --- |
| (a) Axiom or schema | A single sentence in the signature of PA. Not an axiom for each conjecture, and not an infinite schema (4.2) | The sentence |
| (b) Rule of inference | A figure with finitely many premises, one conclusion, a free formula, and a side condition decidable on the written proof, as induction is in 1.1. It gives a type of proof | The figure, and a proof that it is not derivable in PA |
| (c) Duality | A transfer between PA and σ(PA): a rule taking a theorem φ of a stated class to σφ read in the signature of PA, or a theory in both signatures with bridge axioms | The class of φ, or the bridge axioms. The interpretation of ∞, P, ⊕, ⊗, ≫ in the signature of PA, or the reason none is needed |
| (d) Something else as fundamental | An addition to the formalism of a kind not listed | What kind of thing it is, and how proofs use it |

A solution states which kind it is and discharges the third column.

### 4.2 The form

Guidance on its best form.

**4.2.1 Singular.** X is one thing. It is not a set of axioms for the conjectures.

**4.2.2 Finite.** Not an infinite schema.

**4.2.3 A rule of inference seems fitting.** Like induction, which can be expressed finitely as a rule of inference, it is able to operate on formulas and corresponds to a new form of proof. It is a new way to make universal conclusions, and it is to operate across formulas too. It may be trans-semantic: two identical formalisms, united by not being able to refer to the objects of the other except by equivalence under isomorphism. Perhaps. The shape of this formalism is complex to specify, and the specification leaves it open (O6).

**4.2.4 Agnostic to interpretation.** It is the most elegant way to express the existence of a symmetry while providing absolutely no way to resolve which one.

**4.2.5 The reason it can be so.** Arithmetic is structured as a from-the-bottom way of reasoning about a form of transcendence. That transcendence means there is a view from the top that is literally the same formalism, isomorphically, with shared ways of expressing the same set of numbers (I1).

**4.2.6 A natural modification of universal inference.** It should look like a natural modification of universal inference.

**4.2.7 Precedent.** Someone introduced quantification. Someone introduced universal generalization, proof by contradiction, induction. Adding a thought here is of that kind (I20).

**4.2.8 The fit.** It has to fit in extraordinarily well, wearing the same clothing as the other parts of the formalism, so that it can be seen as self-evident and fundamental.

## 5. The requirements

Each is followed by what motivates it. They fall in three groups.

### 5.1 What X is

**C1 Finite and checkable.** X is stated finitely. If X is a rule, its side condition is decidable on the written proof. *Motivation:* X is used as induction is used, by a reader who can check each step.

**C2 Internal and general.** X is integrated in the formalism of PA. It does not mention primes, sieves or a modulus, and is not stated through limits of other formalisms. *Motivation:* otherwise C5 is met by adjoining GC, TP and RH themselves, and nothing has been identified.

**C3 From meaning.** Each clause of X traces to an entry of the identification, I1 to I20. *Motivation:* X represents what the subject commits to about the meaning of arithmetic (I1). It is not a fact added from outside.

**C4 Unique.** Any two objects meeting C1 to C14 give theories with the same theorems. This is the sense in which the specification identifies one object. It is a claim to be proven of a solution.

### 5.2 What X does

**C5 Strength.** T proves the canonical GC, TP and RH of 1.7. *Consequence:* all three are Π1 or equivalent to Π1 (K15), so by K14, if T is consistent, each holds of every numeral. *Motivation:* what is added justifies statements a computer could refute.

**C6 Immediacy.** For each type of section 3, the derivation of its foundational example in T is its circle theorem (K6, K7, K8), which PA proves with the definitions from the bottom and from the top kept distinct, followed by one use of X. No analysis is used. *Motivation:* the three arguments lack one and the same step, and X is that step.

**C7 The circle paradigm.** The theorems of T are exactly what can be proven in the paradigm of the circles of factorial size, generalizing over every pair of definitions, from the bottom and from the top, that can be made equal in the limit with the limiting factorial as the top. *Motivation:* the circle is the one-theory form of what the two readings say (I9). Stating that paradigm exactly is part of the task (O2, O3).

**C8 Gödel.** T relates G, Con and the empty derivation: what is unprovable in PA is what is proven by the derivation with zero steps. *Motivation:* K17, and I17. The exact statement is open (O5).

**C9 Calibration.** T proves every statement marked "required" in section 6 and none marked "excluded". The basic cases of section 3 come out as their ordinary proofs. *Motivation:* the basic cases are where X can be checked against ordinary proof.

### 5.3 How X stands to PA

**C10 Consistency.** T does not prove 0 = 1. It is to be shown relative to the consistency of PA, preferably by an interpretation in the circles or a limit object of 1.5. *Motivation:* the circle is consistent with PA.

**C11 PA has not decided.** PA proves neither X nor its opposite, and decides none of GC, TP and RH. *Motivation:* PA has not made a decision about symmetry. That the conjectures have stood unproved for so long is taken as expressing this.

**C12 Refutation and relevance.** If PA ⊢ ¬GC, then T is inconsistent, by C5, and the theory specified here is withdrawn. If PA ⊢ GC, then X is not needed for GC and the new machinery is irrelevant to it. The same holds for TP and for RH. *Motivation:* the commitment is stated so that it can fail.

**C13 Invariance under σ.** X is fixed by σ up to provable equivalence in T. No theorem of T distinguishes the two-reading presentation, PA with σ(PA), from the circle presentation. S1 is kept and is never false: zero has no predecessor in PA, and by σ the totality has no successor in σ(PA); these are one statement under σ. The circle presentation has to be consistent with every theorem of PA (O1). *Motivation:* no opinion about where the journey starts (I13).

**C14 Negatives (expected, not required).** Over the integers with 0, S, + and ·, the analogue of X is derivable or void, since a ↦ −a is a definable involution that preserves divisibility.

## 6. The acceptance

| Statement | Of the numbers | Of T |
| --- | --- | --- |
| For all n and k < n: n − k is coprime to n iff n + k is | True | Required. Type I basic case, as its ordinary proof |
| N has multiples of m at equal distance on both sides iff m divides N + N | True | Required |
| For every distance that is a multiple of 5 there are infinitely many N with multiples of 5 at that distance on both sides | True | Required |
| The count of multiples of 5 up to x is within 1 of x/5 | True | Required. Type III basic case |
| Euclid, in the canonical form of 1.7 | True | Required. Type II basic case. With the top taken as M(n), X gives Euclid's proof |
| Every N has two multiples of 5 at equal positive distance on both sides | False | Excluded |
| (x² − 2)(x² − 17)(x² − 34) = 0 has a solution | False | Excluded |
| P_N = P′_N for the numeral N = 210 | False | Excluded |
| For every N there is a larger even prime | False | Excluded |
| 0 = 1 | False | Excluded |
| GC, TP, RH in the canonical forms of 1.7 | Open | Required, each immediate (C6) |

Every excluded statement is refuted by PA, so C10 excludes it already. The excluded rows are checks to run on a candidate, not further demands.

## 7. The boundary

Sections 1 to 7 are the specification. Nothing outside them binds the work. The meaning that motivates X stands identified in The Symmetry of Arithmetic: Identification, cited by its labels I1 to I20; the open determinations stand in The Symmetry of Arithmetic: Progress, cited by the labels O1 to O11. What follows this section is the schedules — reference bearing on the work and binding none of it.

## Related work

What each bears on. Items marked † were located and checked against a bibliographic record or the paper's abstract for this document. The others are cited from recall and are to be verified.

Level of relevance. *Setting*, the formalism the specification is stated in: 1, 2, 16, 17. *Adjacent*, the same objects with a different claim, as identified in I19: 3, 4, 5, 8, 9, 10, 11, 12, 14, 15. *Background*, facts used by a requirement: 6, 7, 13. None of the adjacent items states or implies X.

1. H. B. Enderton, *A Mathematical Introduction to Logic*, 2nd ed., Academic Press, 2001. The axioms of 1.1 in this form.
2. K. Gödel, "Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I", *Monatshefte für Mathematik und Physik* 38 (1931), 173–198; tr. B. Meltzer, 1962. System P. K16, K17, I17.
3. † R. K. Meyer and C. Mortensen, "Inconsistent models for relevant arithmetics", *Journal of Symbolic Logic* 49 (1984), 917–929. Modular arithmetics over the base RM3 as inconsistent, absolutely consistent extensions of Peano arithmetic; notes that S1 fails in modular arithmetic; the intersection RMω. K5, K19, 1.5.
4. † G. Priest, "Inconsistent models of arithmetic, Part I: finite models", *Journal of Philosophical Logic* 26 (1997), 223–235. LP models containing all sentences of first-order arithmetic. K20.
5. † G. Priest, "Inconsistent models of arithmetic, Part II: the general case", *Journal of Symbolic Logic* 65 (2000), 1519–1529. General structure: linear and cyclical parts. K20.
6. † M. Davis, Yu. Matijasevič and J. Robinson, "Hilbert's tenth problem. Diophantine equations: positive aspects of a negative solution", in *Mathematical Developments Arising from Hilbert Problems*, AMS, 1976, 323–378. RH as a Π1 statement. K15.
7. † J. C. Lagarias, "An elementary problem equivalent to the Riemann hypothesis", arXiv:math/0008177; *American Mathematical Monthly* 109 (2002), 534–543, journal details from recall. K15.
8. † E. Steinitz, "Algebraische Theorie der Körper", *Journal für die reine und angewandte Mathematik* 137 (1910), 167–309. Supernatural numbers. K10.
9. † "Coset topologies on ℤ and arithmetic applications", arXiv:2202.13478, section 4. The embedding of the numbers into the supernatural numbers with 0 ↦ ∏ p^∞. K10.
10. † H. Friedman and R. K. Meyer, "Whither relevant arithmetic?", *Journal of Symbolic Logic* 57 (1992), 824–831. A limit on relevant Peano arithmetic.
11. † R. K. Meyer, "Relevant arithmetic", *Bulletin of the Section of Logic* 5 (1976), 133–137. Finite modular models used for a finitary consistency argument. C10.
12. † G. Priest, "Minimally inconsistent LP", *Studia Logica* 50 (1991), 321–331; and *In Contradiction*, 2nd ed., Oxford, 2006. The logic LP; where the collapsing lemma is stated is to be verified. K20.
13. R. Kaye, *Models of Peano Arithmetic*, Oxford, 1991. Nonstandard models. I19.
14. † A. Tedder, "Axioms for finite collapse models of arithmetic", *Review of Symbolic Logic* 8 (2015), 529–539. A three-valued base with a cyclic axiom.
15. † J. B. Paris and A. Sirokofskich, "On LP-models of arithmetic", *Journal of Symbolic Logic* 73 (2008), 212–226. K20.
16. Project document, "Goldbach Through Gödel: The Essential Argument". The circle theorems K6 and K7 and the statement of K9.
17. † S. C. Kleene, *Introduction to Metamathematics*, Van Nostrand, 1952. Formal number theory and the arithmetical hierarchy.
18. [Proof by Symmetry: Specification](https://claude.ai/artifact/U63dJtCBAa39DU3gXyqDf8). The earlier specification. It fixed the form of X as a rule of inference with a given figure. Candidate figures, ideas and earlier statements are kept there.
`}),t(R,{identifier:"progress",type:".md",children:`# The Symmetry of Arithmetic: Progress

Nov 15, 2026 · @Doug

This records progress on the project stated in [The Symmetry of Arithmetic: Statement of Work](https://claude.ai/artifact/6gFutUADkoS1aLCwC2A3kt): what is left to be done, what has been computed, what is still to be located, and the statements the specification was drawn from. Section numbers and the labels K and C refer to that document. Nothing here is part of the specification.

## Open determinations

A solution settles each of these. Until then they are the places where the specification is not yet specific enough.

1. **O1 The circle presentation.** It must be consistent with every theorem of PA, S1 included, and supply a symmetry that PA does not specify. C\\_N read as a structure for the signature of PA does not do this, since S1 fails in it (K5). K19 does it only by letting S1 fail as well as hold. What presentation does it with S1 holding outright.
2. **O2 The limit.** What "made equal in the limit" means: equality of extensions in the profinite integers, in an ultraproduct, at Ω, or in RMω.
3. **O3 Which definitions.** Which pairs of definitions, from the bottom and from the top, can be made equal. K18 shows it cannot be every statement true on every circle.
4. **O4 Symmetric property.** A formula is symmetric on C\\_N when its extension equals its μ\\_N-image. "p divides x" is, for p dividing N (K4). "x is coprime to N" is. Prime is not (K9). What X yields about primes, and from what.
5. **O5 The statement about Gödel in C8.**
6. **O6 The kind of X.** Which row of section 4.
7. **O7 The derivation of TP.** The canonical TP is stronger than its corollary. Its derivation through K7 is to be given.
8. **O8 The unit step from the top.** Whether P, read in the signature of PA, is the inverse of S wherever both apply, or is left uninterpreted.
9. **O9 The asymmetric extension of I17.** Its exact statement. K16 is a candidate.
10. **O10 The two halves of I11.** The formal statement that the half from zero to the mirror is the referred half and the half from the mirror to the top the unreferred one.
11. **O11 The general form of type III.** Section 3 gives pairing and recurrence for an arbitrary φ. The bound in the balance form is stated only for the primes (1.7) and for the multiples of 5.

## Computed

| Label | Statement | Status |
| --- | --- | --- |
| K21 TP computed | The canonical TP holds for every n from 3 to 10,000,000; a pair is always found below 2n. Also: for every n from 2 to 40 there is k ≤ M(n) with k · M(n) − 1 and k · M(n) + 1 both prime, the least k being at most 1,162 | Computed. Primality above 64 bits by a probable-prime test |

## References still to be located

Still to be located: a reference for the equivalence in K8 between RH and the bound on ℓ(x); a reference for K18; a reference for the principle of duality in lattice theory, for kind (c).

## Sources

Doug's statements, as he gave them. Earlier statements are in the first specification.

- "we need a new specification. This one was too opinionated about the form of the solution. The new version is similar but it specifies an interpretation of from the top semantics, and quantity of zeros divisors as related to for all but as a thing that is the same on the opposite of not exists (zero from top), induction as expression that properties transcend, equivalent to the modular arithmetics of factorial size setting bottom and top definitions equal in the limit, etc.. Seems like a rule of inference but I am not sure. It needs to be the thing that represents what the subject commits to about the meaning of arithmetic. And view from one side about a number of steps that transcends what is walkable, without any opinion about where one started their journey from. Two options and one circle with two directions are understood to be two ways of seeing the same thing. This is deep and what we are specifying has changed a bit"
- "How about we do semantics of: the top is not a number: Say: it doesn't have a successor, so nothing is its predecessor. S2 is just predecessor is like successor. A1 the top represents no steps away from the top. A2 same for predecessor. M1 is in multiples of steps from the top, the top represents none. M2: same. Ind: if true for the too, and successive implication, means you get to the bottom (important for symmetry!!). <: flip it around as >> and express this in terms of the top. This is like the view from heaven. And we see this horizon because every number divides zero and the factorial gets more and more as it goes to the horizon. And induction is the statement that the view from heaven can reach all the way to earth"
- "the point is that arithmetic was always talking about something that could be from the top or from the bottom, and it is about transcending totality. It is the subject that can see that these are isomorphic. If we imagine we had: 5S and 5P for SSSSS0 and PPPPP♾️, we can say things like if xS is a multiple of 5, xP is because the top and bottom absorb all multiples. Multiplicity is symmetric under interpretation. The circle is the one-theory was to resolve this, but you can view it as two related theories that transcend the totality with induction, so properties of numbers can apply to both"
- "What makes this compelling is that maybe this isn't right and stepping down from heaven onto the numbers is not a unitary thing. But if you interpret zero as that which we use to talk about the existence of nonquantities without distinction, it forces us into a view where the non-quantity of numbers that divide zero should be zero (it actually has NO divisors? No we just can't refer to it but it isn't none otherwise PA is inconsistent)"
- "we really just can't refer to the too with distinction. If it is like zero, you can step down like you can step up. See how zero forces semantics? For all: an end if you can transcend metaphors for time and distance in the sense of unitary steps. Otherwise, there would be no concept of all. You are making a container and it already has quantity that does not exist as one, so by quantifier logic, you have quantity that is the opposite kind for all. It's in a complementary logic. Or just see the circle where the thing on the left can't be referred to"
- "Godel's theorem witnesses as numbers of proofs are another. On can also imagine this from the top as something false and provable with a countrrexample understood by analogy to something from the bottom. A whole symmetric set of proofs. And the top still represents what is unprovable, or rather can be proven with the proof that has zero steps which represents the unformalizable but essential nature of consistency in logic"
- "We need a way to say: multiple of 5 are symmetric, their negation is, reasoning that the primes are, that n-k is an S index and n+k is a P index, but those are both prime. Or maybe there is a way to just see symmetry more generally. ... we need to significantly evolve the spec to include a a subjective specification that equates bottom and top reasoning, and show it is consistent with the circle which differs from the standard model in exactly one way. The semantics might be: the number of divisors zero has as our unreferable quantity which is one to one with our for-all. And since that number is the limiting factorial… there you go. But if 5 divides it than there is a number who has remainder 4 when divided by 5 whose successor is it. Call that the predecessor. This doesn't need to be part of the subject we do see the part of the subject is capturing the essence of everything also referring to the unquantifiable without distinction as an identity. And we see that it justifies things that seem to be checkable by computer!"
- "The specification is to justify this as part of the spec of arithmetic, show equivalence to the circle interpretation which is consistent with PA, and codifies this with the thing we are adding to the formalism - new rule of inference that leads to proof type? Or something else fundamental"
- "mine is circle consistent PA with missing symmetry, under the belief that PA doesn't specify symmetry. Think carefully about what you think is a related theorem, but do include them at the appropriate level of relevance"
- "is the reason symmetry of zero and the totality and zero not having a predecessor is the limiting factorial not having a successor? These are useful things for the specification in the sense that we are specifying which of these ideas is the subject of arithmetic. In our case, arithmetic doesn't refer to totality but the symmetric theory that does can't refer to zero and is identical"
- "in my specification of arithmetic, I believe that PA should adopt some way of expressing the opposite of symmetry. GC is false, TP too, the arithmetic versions of Riemann too, or maybe a way of expressing asymmetry. That is the sense in which we believe a new tool for inference, whether axioms for each, or rule of inference or otherwise needs to be added. And we commit by saying that if PA proved GC false, we would take our theory to be inconsistent. If it proves GC true, it would make our new rule irrelevant. Our view of PA as the theory that Godel used, thinks G and not G refer to two different things, and that is the essence of the asymmetry."
- "There should be no system a. ... You can refer to aspects of the formalization we use - first order logic, induction added as a rule of inference, uses PA axioms, commits to these semantics etc... but don't name it and make it abstract rather than concrete. Refer to the formalism specifically"
- "We added machinery to prove GC. If it was specific enough to express the asymmetry, we wouldn't build off it. So if PA proves GC false, we will be inconsistent. And that expresses our belief that PA hasn't made a decision about symmetry yet. Hence the conjectrues are unproved for many many years"
- "well it's not but we can say that we think this is consistent with the subject where G and not G are different (unprovable but true versus provable with an infinite proof length, so in our view, the thing that is incomplete is the asymmetric N, and that is the standard model. So in our view, the standard model has GC false and related. In our subjects opinion of another. That doesn't force them to do anything"
- On what the exception to GC is in the asymmetric ℕ: "The same thing that a proof of G looks like. It is big, even, and all primes divide it. Numbers have more GC pairs as they get big, so GC becomes easier and easier to prove yet... we can't. Just like we can't decide G and not G"
- On the sense of equivalence with the circles: "All things that can be proven in that paradigm, generalizing across definitions that can be made equal in the limit of the limiting factorial being the top, are the set of things you can prove in our augmented PA. But we want it integrated in the formalism not through the limits of other ones"
- On twin primes: "For every number there is a larger pair from top, as equal to from every number there is a smaller one as equivalent"
- On the asymmetric ℕ: "we take it to be the canonical Godel's System P which we believe formalizes the standard model and anything consistent with its asymmetric extension"
- "GC says in our form for all n, there exist k such that n-k and n+k are both prime. TP says: For all N, there exists n > N such that n-1 and n+1 are prime."
- "But... we certainly prove Euclid. This is why I tried to say view from heaven, view from place that describes the outside of the quantity of divisors zero has, the quantity that universal quantification quantifies. It is above that notion of unboundedness"
- "while we expect all to be true, we take the factorial forms to be canonical? And the shortest possible form of the sentence as as corollary. Is it easy to express the factorial form? We can do: For all n, there exists an N > n and an m such that n < m < N! and m-1 is prime and m+1 is prime"
- "Do we want to add big epsilon sum and big factorial product to the language? M(n) = 1 \\* ... \\* N, A(n) = 0 + ... + n, and define them in terms of succession of the previous one??"
- "Then that is the theorem. You might notice that A(n) seems a lot like the mirror... Zero is even. The two zeros, even in heaven and earth, are even. The mirror symmetry is a lot like the limiting factorial over 2 so that it is odd. Between two successive evens there is an odd in between in which they are symmetric right? So leave it to make that pattern clear"
- "You are missing the analogy in the limit and clarify this in the spec. If we imagine that 0 and the limiting factorial are the only two of their kind, though referentially seprated, there is like referred and unreferred halves. This is related to multiplication and addition going to inf at different rates. So note 2\\*A(M(n)) = M(n)"
- "YET ANOTHER thing we are saying is that there is a difference between how fast addition and multiplication get to infinity and that isn't our subject at all, but you can see it as one thing to imagine related to this symmetry, which is about equivalent formalisms. The calculusy version of this subject can think about things like that. Put this in the spec and give me a spec that is formal, has these ideas appropriately structured for formal identification of a mathematical object that modifies a formalism to add new ways of identifying truths that make GC, TP and arithmetic Riemann trivial in the sense that they are foundational examples of three types of theorems"
- "for it to be earned is for the project to be over, and the specification not longer needed."
- "deciding that it did on a named circle is deciding that these theorems could have proofs. ... Yes, there is a whole. To have reduced it to something else is for this specification to not be necessary. ... if you were, then these conjectures would all be true and you can see from the elementary nature of their proof sketches that were something like this a valid proof under some interpretation of existing math, they would be proven already. Yes, identifying a hole and finding the most beautiful form that is might be used to fill in something in a formalism is the project!!"
- "not axioms for the conjectures, so its singular. Not an infinite schema. Rule of inference seems like the best option because they provide quantification over formula. Needs to be agnostic to interpretation. The most elegant way to express the existence of a symmetry while providing absolutely no way to resolve which one, because the real reason is simply that arithmetic is simply structured as a from the bottom way of reasoning about a form of transcendence. And that transcendence means there is a view from the top that is literally the same formalism isomorphically with shared ways of expressing the same set of numbers. It should look like a natural modification to universal inference. This happened right? Someone invented quantification. Someone invented universal generalization, proof by contradiction, induction... it is not insane to add a thought here. But it better look like it fits in extraordinarily well, wearing the same clothing as other parts of the formalism so that it can be seen as self-evident and fundamental."
- "Not most likely. A rule of inference seems fitting. Like induction, which can be expressed finitely as a rule of inference, it is able to operate on formula and corresponds to a new form of proof. That seems like the form that we want here. It is a new way to make universal conclusions, and we want it to operate across formula too. Might it be trans-semantic with two identical formalisms that are united by not being able to refer to the objects of the other except by equivalence under isomorphism? Perhaps. It is complex to specify the shape of this formalism."
`}),t(R,{identifier:"identification",type:".md",children:`# The Symmetry of Arithmetic: Identification

Nov 17, 2026 · @Doug

What is identified here is the subject itself — the meaning that motivates X. The statement of work is the contract; these twenty entries are the comprehension of the mathematical object it specifies, and the contract cites them by label. Nothing here binds the work except through the requirements that cite it.

**I1 The subject.** Peano arithmetic is read here as a way of reasoning from the bottom about a totality it does not refer to. Its axioms name zero and have no term for the totality; the same formalism, with every sign renamed, names the totality and has no term for zero, and the two are identical. Arithmetic was always talking about something that could be read from the top or from the bottom: what is identified in this project is not a number and not an axiom about numbers, but the commitment that these two readings are readings of one thing. PA as it stands neither asserts nor denies that commitment, and that is exactly the room X occupies.

**I2 Zero.** Zero is what the subject uses to speak of the existence of non-quantities without distinction. Its formal face is A1 and M1: adding zero changes nothing, and in multiples zero absorbs everything. From M1, every number divides zero — so the divisors of zero are the whole domain, and how many that is, is not none and is not a quantity any term of the signature can refer to. Zero forces this semantics: it is a referable name for what cannot be counted from inside.

**I3 The totality.** The top is not a number. It has no successor, so it is nothing's predecessor — σ(S1). It is no steps from itself — σ(A1) — and in multiples of steps from the top, the top is none — σ(M1). This is the view from the top: not a larger number, not an element of any model in range of PA's quantifiers, but the same formalism read from the other end. The top still represents what is unprovable — or rather, what can be proven with the proof that has zero steps.

**I4 The renaming.** σ renames every sign — 0 to ∞, S to P, + to ⊕, · to ⊗, ≤ to ≫ — and K1 states the whole of its force: PA proves φ exactly when σ(PA) proves σφ, because σ is a bijective renaming and nothing more. That zero has no predecessor and that the totality has no successor are therefore one statement, S1 seen twice. The deepest fact about the symmetry is how shallow its mechanism is: a renaming, with nothing hidden.

**I5 The two readings.** PA refers to zero and cannot refer to the totality; σ(PA) refers to the totality and cannot refer to zero; the two theories are identical under σ. Each reasons about the other's unreferable end. PA neither asserts nor denies that the two readings express the same set of numbers — X asserts it, and gives absolutely no way to resolve which reading is the case. That agnosticism is not a weakness of the formulation but the content of the commitment: the subject holds that there is nothing to resolve.

**I6 For all.** ∀x φ is ¬∃x ¬φ: "for all" is "there does not exist" seen from the opposite side. The φ-things number zero exactly when the ¬φ-things are all. So the unreferable quantity of zero's divisors is one to one with universal quantification itself: making a container of everything already commits one to a quantity that does not exist as a number, in a complementary logic. The subject takes "for all" to be an end reached by transcending unitary steps — otherwise there would be no concept of all.

**I7 The limiting factorial.** K2 is the zero of the sieve: every number from 1 to n divides M(n). The factorial is the number that more and more numbers divide, as every number divides zero — the horizon the sequence climbs toward. K10 places this in the order of divisibility: the numbers under divisibility form a lattice whose least element is 1 and whose greatest is 0, the least common multiple of all the M(n) is 0, and the embedding into Steinitz's lattice sends 0 to Ω. The quantity of zero's divisors, unreferable from inside, is the limiting factorial seen from outside.

**I8 Induction as transcendence.** Induction is the expression that properties transcend: what holds at one end and is kept by each step reaches the other end. Under σ it reads — if it is true at the top, and implication runs step by step downward, it reaches the bottom. That is why induction matters for the symmetry: it is the statement that the view from heaven can reach all the way to earth. The formalism already contains the principle that one end's truths travel to the other; what it lacks is the assertion that the two ends are ends of one thing.

**I9 The circle.** C_N — arithmetic modulo N, read as a structure for PA's signature — satisfies S2, A1, A2, M1, M2 and every instance of induction, and fails exactly S1 (K5). The circle is the one-theory form of what the two readings say: one circle with two directions, where the thing on the left cannot be referred to. It differs from the standard model in exactly one way, and that one way is the whole question. The circles of factorial size, N = M(n), are where the subject's theorems already hold with the definitions from the bottom and from the top kept distinct.

**I10 The mirror.** μ_N sends a to N − a. It carries a step up to a step down — μ_N(Sa) = P μ_N(a) — and respects addition. K4 is its arithmetic force: if p divides N, then p divides a exactly when p divides N − a, so coprimality is symmetric on the circle, U_N = μ_N[U_N]. K9 is its honest limit: the primes are not symmetric — on C_210, 23 is prime and its mirror 187 = 11 · 17 is not. What is symmetric and what is not, formula by formula, is the open heart of the search (O4).

**I11 The fold and the two halves.** K3: 2 · A(n) = n · Sn, so on the circle of size N = M(n) the sum of everything is N/2 — the fixed point of the mirror. Zero and the limiting factorial are the only two of their kind, referentially separated, and both are even; on the scale whose unit is half the top they are 0 and 2, two successive evens, and the mirror is the one odd between them. It divides what lies between into a referred half and an unreferred half. At the limit the top absorbs multiplication as zero does by M1, the top times its successor is the top, and A of the top is the mirror.

**I12 Multiplicity symmetric.** If one writes 5S for SSSSS0 and 5P for PPPPP∞, then xS is a multiple of m exactly when xP is, because the top and the bottom absorb all multiples. Multiplicity is symmetric under interpretation — K1 gives it by renaming, K4 gives it on the circle. Properties of numbers stated in multiples travel freely between the readings; this is the fragment of the symmetry that is already a theorem, and the model for what X generalizes.

**I13 The journey.** The subject holds no opinion about where the journey starts. A number of steps that transcends what is walkable can be viewed from either side, and two readings — or one circle with two directions — are understood to be two ways of seeing the same thing. C13 is this entry made requirement: X is fixed by σ up to provable equivalence, and no theorem of T distinguishes the two-reading presentation from the circle presentation.

**I14 Above unboundedness.** The view from the top is the view from outside the quantity that universal quantification quantifies — it is above the notion of unboundedness. From the top, "there is m above n" ranges between n and ∞; inside PA, the model of that thought is the bound M(n), which the canonical TP and Euclid carry (K12). The top supplies bounds the bottom cannot name, and the canonical sentences of 1.7 are stated in factorial form precisely to keep that supply visible.

**I15 The predecessor at the top.** If 5 divides the top, there is a number with remainder 4 whose successor is the top — in C_N the predecessor of 0 is N − 1, congruent to m − 1 modulo every m dividing N. Whether P, read in the signature of PA, is the inverse of S wherever both apply, or is left uninterpreted, is an open determination (O8). It need not be part of the subject: the subject is the symmetry of the two readings, not the arithmetic of a step below the top.

**I16 The three shapes.** The symmetry shows itself in three shapes of theorem: pairing — every number has two φ-numbers at equal distance on either side; recurrence — above every number, below a bound the top supplies, there is a φ-pair; balance — the count of φ-numbers stays near its estimate. Each has a basic case PA proves, a circle theorem already proven with the definitions kept distinct (K6, K7, K8), and a foundational example — GC, TP, RH. The three arguments lack one and the same step, and that one step is what the deliverable supplies.

**I17 The other reading.** The opposite reading holds that the top and the bottom are two different things. In Gödel's argument it appears as G and ¬G referring to two different things — G unprovable but true, ¬G provable by a proof of infinite length. On the symmetric reading these refer to one thing: the proof of infinite length is the proof with zero steps. What is incomplete, on this subject's view, is the asymmetric ℕ — Gödel's System P, taken to formalize the standard model, with anything consistent with its asymmetric extension — and in it GC and the related statements are false. The exception the asymmetric reading would assert has a recognizable shape: it is the same thing a proof of G looks like — big, even, divisible by every prime, a top taken as distinct from zero. Among the numbers it does not exist (K13, K11); as an asserted exception it is no numeral (K16). This is one subject's opinion of another, and it places no requirement on that subject.

**I18 Outside the subject.** Addition and multiplication get to infinity at different rates, as A and M do. That difference is not the subject of this specification, which is about equivalent formalisms — but it is one thing to imagine in relation to the symmetry, and a version of the subject with calculus can take it up. No requirement depends on it.

**I19 The neighbours.** Several existing ideas use the same objects, and the subject is none of them. Standard arithmetic holds that PA describes the numbers and there is no top; the subject agrees PA does not refer to the totality, and adds that an identical theory does and cannot refer to zero. Nonstandard models put elements above every numeral inside the range of PA's quantifiers; here the totality is not a number and is not in that range. Modular arithmetic over a three-valued base lets S1 fail as well as hold; here S1 never fails. The collapsed models of LP make some truths false as well; here nothing true becomes false. The supernatural numbers give the totality as an object Ω with divisibility and no successor; the claim here is exactly about successor, which Steinitz's lattice cannot state. The profinite integers are a candidate setting for the circle presentation, and whether they are the one is open (O1, O2).

**I20 The precedent and the commitment.** Someone introduced quantification. Someone introduced universal generalization, proof by contradiction, induction — each was once added to reasoning, and adding a thought here is of that kind. The author holds X to be a foundational commitment of arithmetic and not a technical device: on this view the conjectures have stood open because the formalism has not decided whether it is symmetric, and what Gödel's theorem finds incomplete is the asymmetric reading. The commitment is stated so that it can fail — if PA refutes Goldbach, the theory is inconsistent and is withdrawn; if PA proves Goldbach, X is not needed for it (C12). And it must fit in extraordinarily well, wearing the same clothing as the other parts of the formalism, so that it can be seen as self-evident and fundamental (4.2).
`})]}),"TheSymmetryOfArithmetic1"),it=x(Me),pt=c(()=>n(it,{children:[Fe(),_e(),Be(),tt()]}),"book");export{pt as book};
