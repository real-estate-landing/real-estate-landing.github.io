import{j as e,f as a,R as l,r as s,B as t,o as n,a9 as i,aa as r,ab as o,ac as c,ad as d,ae as h,af as u,O as p,I as x,M as m,q as g,ag as j,ah as b,ai as f,aj as v,a7 as y,A as C,a3 as T,E as w,al as k,ak as S,am as N}from"./vendor-7622ee6b.js";import{r as P,i as D,m as z,u as F}from"./makeStyle-e38f8f6b.js";import{d as B,b as I,c as R,a as O,n as E,e as W,f as M,g as $,h as L}from"./no_data-a7685956.js";import{d as A,a as H,b as V}from"./MoreTime-35def26b.js";import{c as _,u as Y,h as q,d as U,i as G,o as J,f as K,g as Q,q as X,j as Z,l as ee,k as ae,m as le}from"./firestore-7e8a093f.js";import"./index-780a21eb.js";var se={},te=D;Object.defineProperty(se,"__esModule",{value:!0});var ne=se.default=void 0,ie=te(P()),re=e,oe=(0,ie.default)((0,re.jsx)("path",{d:"m18 7-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41 6 19l1.41-1.41L1.83 12 .41 13.41z"}),"DoneAll");ne=se.default=oe;var ce={},de=D;Object.defineProperty(ce,"__esModule",{value:!0});var he=ce.default=void 0,ue=de(P()),pe=e,xe=(0,ue.default)((0,pe.jsx)("path",{d:"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"}),"FilterList");he=ce.default=xe;const me=z()((e=>({root:{background:e.palette.background.default},h2:{fontSize:"20px"},freeTrialChip:{marginRight:"5px",color:"#ffd900",border:"1px solid #ffd900",backgroundColor:a("#ffd900",.2)},purchasedChip:{marginRight:"5px",color:"#008000",border:"1px solid #008000",backgroundColor:a("#008000",.2)},noStatusChip:{marginRight:"5px",color:"#808080",border:"1px solid #808080",backgroundColor:a("#808080",.2)},wannaTryChip:{marginRight:"5px",color:"#FF0000",border:"1px solid #FF0000",backgroundColor:a("#FF0000",.2)},typography:{width:"auto",display:"flex",alignItems:"center",gap:"5px",fontSize:"16px"},reloader:{color:e.palette.primary.main,textDecoration:"underline",cursor:"pointer"},needToCall:{backgroundColor:a("#008000",.2)},alreadyCalled:{},popper:{position:"absolute",borderRadius:"8px",border:`1.5px solid ${e.palette.primary.main}`,height:"150px",overflowY:"scroll",width:"250px",transform:"translateY(-10%)",zIndex:11111111,"&::-webkit-scrollbar":{width:"6px","border-radius":"15px"},"&::-webkit-scrollbar-track":{background:"rgb(231, 230, 230)","border-radius":"15px"},"&::-webkit-scrollbar-thumb":{background:"white","border-radius":"15px"},"&:hover":{"&::-webkit-scrollbar-thumb":{background:"rgb(147, 147, 147)"},"&::-webkit-scrollbar-track":{background:"#f1f1f1"}}},popperOpen:{visibility:"visible",position:"absolute",opacity:"1",transition:"400ms ease",transform:"translateY(0)"},popperClose:{position:"absolute",visibility:"hidden",opacity:"0",transition:"400ms ease",transform:"translateY(-10%)"},noDataImg:{width:"350px",height:"auto",aspectRatio:"1/1",margin:"auto"},noDataImgFull:{height:"100%",width:"auto",aspectRatio:"1/1",marginLeft:"50px"}})));function ge(a){const{onSelectAllClick:l,numSelected:s,rowCount:t,headCells:n}=a;return e.jsx(v,{children:e.jsxs(c,{children:[e.jsx(d,{padding:"checkbox",children:e.jsx(h,{color:"primary",indeterminate:s>0&&s<t,checked:t>0&&s===t,onChange:l,inputProps:{"aria-label":"select all desserts"}})}),null==n?void 0:n.map((a=>e.jsx(d,{align:a.numeric?"right":"left",padding:a.disablePadding?"none":"normal",children:a.label},a.id)))]})})}function je(i){var r,o,c,d;const{t:h}=F(),{classes:m}=me(),{numSelected:j,tableTitle:b,selectedTitle:f,deleteSelecteds:v,nameVal:P,phoneVal:D,searchByName:z,searchByPhone:B,searchByStatus:R,status:O,statusSelected:_}=i,[Y,q]=s.useState(""),[G,X]=s.useState(""),[Z,ee]=s.useState(null),[ae,le]=s.useState(null),[se,te]=s.useState(void 0),[ne,ie]=s.useState(void 0),[re,oe]=l.useState(null),[ce,de,ue,pe,xe,ge]=h("callTableUserStatuses").split(";"),je=Boolean(ae),be=Boolean(Z),fe=()=>{oe(null)},ve=Boolean(re),ye=ve?"simple-popover":void 0;function Ce(){const e=K(Q,"contactsName");J(e,(e=>{const a=e.docs[0].data().values.split(";");te(a)}))}function Te(){const e=K(Q,"contactsPhone");J(e,(e=>{const a=e.docs[0].data().values.split(";");ie(a)}))}function we(e,a){return null==e?void 0:e.filter((e=>e.includes(a??"")&&e.length>0))}console.log({names:se}),console.log({phones:ne}),s.useEffect((()=>{0===(null==Y?void 0:Y.length)&&z(void 0)}),[Y]),s.useEffect((()=>{0===(null==G?void 0:G.length)&&B(void 0)}),[G]),s.useEffect((()=>{q(P)}),[P]),s.useEffect((()=>{X(D)}),[D]),s.useEffect((()=>(Ce(),Te(),()=>{Ce(),Te()})),[]);return e.jsxs(y,{sx:{width:"100%",pl:{sm:2},pr:{xs:1,sm:1},...j>0&&{bgcolor:e=>a(e.palette.primary.main,e.palette.action.activatedOpacity)}},children:[j>0?e.jsxs(p,{sx:{flex:"1 1 100%"},color:"inherit",variant:"subtitle1",component:"div",children:[j," ",f]}):e.jsx(p,{sx:{flex:"1 1 100%",fontSize:"20px"},variant:"h6",id:"tableTitle",component:"div",children:b}),j>0?e.jsx(C,{title:"Delete",children:e.jsx(x,{onClick:v,children:e.jsx(W,{})})}):ve?e.jsx(C,{title:"Filter list",children:e.jsx(x,{"aria-describedby":ye,onClick:fe,children:e.jsx(U,{})})}):e.jsx(C,{title:"Filter list",children:e.jsx(x,{"aria-describedby":ye,onClick:e=>{oe(e.currentTarget)},children:e.jsx(he,{})})}),e.jsx(T,{id:ye,open:ve,anchorEl:re,onClose:fe,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:e.jsxs(n,{sx:{display:"flex",flexDirection:"column",gap:"20px",padding:"10px"},children:[e.jsx(p,{sx:{textAlign:"center"},children:h("filterName")}),e.jsxs(t,{sx:{position:"relative"},children:[e.jsx(w,{id:"searchByPhone",label:h("searchByPhone"),variant:"outlined",value:G,onChange:e=>X(e.target.value),onClick:e=>{le(e.currentTarget)},onBlur:()=>{le(null)}}),e.jsx(n,{className:`${m.popper} ${je?m.popperOpen:m.popperClose}`,children:we(ne,G)&&(null==(r=we(ne,G))?void 0:r.length)>0?null==(o=we(ne,G))?void 0:o.map(((a,l)=>a.length>1?e.jsx(e.Fragment,{children:e.jsxs(g,{sx:{display:"flex",alignItems:"center",gap:"10px",width:"100%",borderBottom:"1px solid grey"},onClick:()=>{B(a),X(a)},children:[e.jsx(M,{fontSize:"medium"}),e.jsxs(t,{sx:{display:"flex",flexDirection:"column"},children:[e.jsx(p,{sx:{fontSize:"14px",fontWeight:"bold"},children:a}),e.jsx(p,{sx:{fontSize:"12px",color:"gray"},children:we(se,Y)?we(se,Y)[l]:null})]})]},a)}):null)):e.jsx(e.Fragment,{children:e.jsx("img",{src:E,alt:"no-data-img",className:m.noDataImgFull,loading:"lazy"})})})]}),e.jsxs(t,{sx:{position:"relative"},children:[e.jsx(w,{id:"searchByName",label:h("searchByName"),variant:"outlined",value:Y,onChange:e=>q(e.target.value),onClick:e=>{ee(e.currentTarget)},onBlur:()=>{ee(null)}}),e.jsx(n,{className:`${m.popper} ${be?m.popperOpen:m.popperClose}`,children:(null==(c=we(se,Y))?void 0:c.length)>0?null==(d=we(se,Y))?void 0:d.map(((a,l)=>a.length>1?e.jsx(e.Fragment,{children:e.jsxs(g,{sx:{display:"flex",alignItems:"center",gap:"10px",width:"100%",borderBottom:"1px solid grey"},onClick:()=>{z(a),q(a)},children:[e.jsx(M,{fontSize:"medium"}),e.jsxs(t,{sx:{display:"flex",flexDirection:"column"},children:[e.jsx(p,{sx:{fontSize:"14px",fontWeight:"bold"},children:a}),e.jsx(p,{sx:{fontSize:"12px",color:"gray"},children:we(ne,G)&&we(ne,G)[l]})]})]},a)}):null)):e.jsx(e.Fragment,{children:e.jsx("img",{src:E,alt:"no-data-img",className:m.noDataImgFull,loading:"lazy"})})})]}),e.jsxs(t,{sx:{minWidth:120,minHeight:"150px"},children:[_&&"all"!==_?e.jsxs(e.Fragment,{children:[e.jsx(k,{id:"demo-simple-select-label",children:"Status:"}),e.jsx("br",{})]}):null,_&&"all"!==_?e.jsx(e.Fragment,{children:"isOnTrial"==_?e.jsx(u,{className:m.freeTrialChip,label:e.jsxs(p,{className:m.typography,children:[e.jsx(A,{}),ce]})}):"isPurchased"==_?e.jsx(u,{className:m.purchasedChip,label:e.jsxs(p,{className:m.typography,children:[e.jsx(H,{}),de]})}):"isWannaTry"==_?e.jsx(u,{className:m.wannaTryChip,label:e.jsxs(p,{className:m.typography,children:[e.jsx(V,{}),ue]})}):null}):e.jsxs(S,{fullWidth:!0,children:[e.jsxs(k,{id:"demo-simple-select-label",children:[h("status"),":"]}),e.jsxs(N,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:O,onChange:e=>{R(e.target.value)},children:[e.jsxs(g,{value:"all",children:[e.jsx($,{sx:{marginRight:"5px"}}),ge]},0),e.jsxs(g,{value:"wantToContact",children:[e.jsx(L,{sx:{marginRight:"5px"}}),xe]},1),e.jsxs(g,{value:"isOnTrial",children:[e.jsx(A,{sx:{marginRight:"5px"}}),ce]},2),e.jsxs(g,{value:"isPurchased",children:[e.jsx(H,{sx:{marginRight:"5px"}}),de]},3),e.jsxs(g,{value:"isWannaTry",children:[e.jsx(V,{sx:{marginRight:"5px"}}),ue]},4),e.jsxs(g,{value:"noStatus",children:[e.jsx(I,{sx:{marginRight:"5px"}}),pe]},5)]})]})]})]})})]})}function be({pageStatus:a}){var v;const{classes:y}=me(),{t:C}=F(),[T,w]=l.useState([]),[k,S]=s.useState(void 0),[N,P]=s.useState({phoneNumber:void 0,name:void 0,status:"all"});console.log("selected Items to delete",T);const[D,z]=s.useState(""),[W,M]=s.useState(!0),[$,L]=l.useState(0),[U,se]=l.useState(!1),[te,ie]=l.useState(void 0),[re,oe]=s.useState(),[ce,de]=s.useState(null);function he(e){let a=X(K(Q,"users"),Z("time","desc"));return a="total"==e?X(a):X(a,ee(te)),ae(a,{phoneNumber:N.phoneNumber,name:N.name,status:N.status})}s.useEffect((()=>{a&&P((e=>({...e,status:a})))}),[a]),s.useEffect((()=>{const e=localStorage.getItem("rowsPerpageCalls");e?ie(+e):(localStorage.setItem("rowsPerpageCalls","10"),ie(10))}),[]),s.useEffect((()=>{console.log({searchFilter:N}),(async()=>{if(0!==$){const e=await G(te,k,re||void 0,N.phoneNumber,N.name,N.status);return de({...e,data:te<e.data.length?e.data.slice(te):e.data,rawData:te<e.rawData.length?e.rawData.slice(te):e.rawData}),()=>{}}if(te){const e=J(he("table"),(async e=>{const a=await le(void 0,he("total")),l=e.docs.map((e=>({id:e.id,...e.data()})));de({data:l,rawData:e.docs,totalElements:a})}))}})()}),[$,te,k,W,N]),console.log(null==ce?void 0:ce.data);const ue=null==(v=null==ce?void 0:ce.data)?void 0:v.map((e=>{return a=e.id,l=e.isOnTrial,s=e.isPurchased,t=e.isWannaTry,n=e.name,i=e.phoneNumber,r=e.time,o=e.wantToContact,{id:a,name:n,phoneNumber:i,wantToContact:o,time:r,status:{isOnTrial:l,isPurchased:s,isWannaTry:t}};var a,l,s,t,n,i,r,o})),pe=[{id:"name",numeric:!1,disablePadding:!0,label:C("callTableName")},{id:"phoneNumber",numeric:!0,disablePadding:!1,label:C("callTablePhone")},{id:"time",numeric:!0,disablePadding:!1,label:C("callTableTime")},{id:"status",numeric:!0,disablePadding:!1,label:C("callTableStatus")},{id:"wantToContact",numeric:!0,disablePadding:!1,label:C("callPhoneStatus")}],[xe,be]=l.useState(null),fe=Boolean(xe),ve=e=>{e.stopPropagation(),be(null),M((e=>!e))};return e.jsx(e.Fragment,{children:e.jsxs(t,{sx:{width:"100%"},children:[e.jsxs(n,{sx:{width:"100%",mb:2,display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx(je,{numSelected:null==T?void 0:T.length,selectedTitle:C("selectTitle"),tableTitle:C("isOnTrial"==a?"freeTrialTableTitle":"isPurchased"===a?"purchasedTableTitle":"isWannaTry"===a?"interestedTableTitle":"callTableTitle"),deleteSelecteds:()=>{_("users",T),M((e=>!e)),w([])},status:N.status,nameVal:N.name,phoneVal:N.phoneNumber,searchByName:e=>{P((a=>({...a,name:e})))},searchByPhone:e=>{P((a=>({...a,phoneNumber:e})))},searchByStatus:e=>{P((a=>({...a,status:e})))},statusSelected:a}),(null==ue?void 0:ue.length)>0?e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsxs(r,{sx:{minWidth:950},"aria-labelledby":"tableTitle",size:U?"small":"medium",children:[e.jsx(ge,{numSelected:null==T?void 0:T.length,onSelectAllClick:e=>{if(e.target.checked){const e=null==ue?void 0:ue.map((e=>e.id));w(e)}else w([])},rowCount:null==ue?void 0:ue.length,headCells:pe}),e.jsx(o,{children:null==ue?void 0:ue.map(((a,l)=>{const s=(t=a.id,-1!==T.indexOf(t));var t;const n=`enhanced-table-checkbox-${l}`,[i,r,o,j]=C("callTableUserStatuses").split(";");return e.jsxs(c,{hover:!0,onClick:e=>((e,a)=>{const l=T.indexOf(a);let s=[];-1===l?s=s.concat(T,a):0===l?s=s.concat(T.slice(1)):l===(null==T?void 0:T.length)-1?s=s.concat(T.slice(0,-1)):l>0&&(s=s.concat(T.slice(0,l),T.slice(l+1))),w(s)})(0,a.id),role:"checkbox","aria-checked":s,tabIndex:-1,selected:s,sx:{cursor:"pointer"},className:(null==a?void 0:a.wantToContact)?y.needToCall:y.alreadyCalled,children:[e.jsx(d,{padding:"checkbox",children:e.jsx(h,{color:"primary",checked:s,inputProps:{"aria-labelledby":n}})}),e.jsx(d,{component:"th",id:n,scope:"row",padding:"none",children:a.name}),e.jsx(d,{align:"right",children:e.jsx("a",{href:`tel:${a.phoneNumber}`,onClick:e=>{e.stopPropagation(),Y(a.id),M((e=>!e))},children:a.phoneNumber})}),e.jsxs(d,{align:"right",children:[B(new Date(a.time),"HH:MM:ss")," ",e.jsx("br",{}),B(new Date(a.time),"mm/dd/yyyy")]}),e.jsxs(d,{align:"right",children:[a.status.isOnTrial?e.jsx(u,{className:y.freeTrialChip,label:e.jsxs(p,{className:y.typography,children:[e.jsx(A,{}),i]})}):a.status.isPurchased?e.jsx(u,{className:y.purchasedChip,label:e.jsxs(p,{className:y.typography,children:[e.jsx(H,{}),r]})}):a.status.isWannaTry?e.jsx(u,{className:y.wannaTryChip,label:e.jsxs(p,{className:y.typography,children:[e.jsx(V,{}),o]})}):e.jsx(u,{className:y.noStatusChip,label:e.jsxs(p,{className:y.typography,children:[e.jsx(I,{}),j]})}),e.jsx(x,{"aria-label":"more",id:"long-button","aria-controls":fe?"long-menu":void 0,"aria-expanded":fe?"true":void 0,"aria-haspopup":"true",onClick:e=>((e,a)=>{e.stopPropagation(),z(a),be(e.currentTarget)})(e,a.id),children:e.jsx(R,{})}),e.jsxs(m,{id:"long-menu",MenuListProps:{"aria-labelledby":"long-button"},anchorEl:xe,open:fe,onClose:ve,PaperProps:{style:{width:"20ch"}},children:[e.jsxs(g,{onClick:e=>{ve(e),q(D,"trial").then((e=>console.log(e))),console.log("fre trial clicked")},children:[e.jsx(A,{sx:{marginRight:"5px"}}),i]},1),e.jsxs(g,{onClick:e=>{ve(e),q(D,"purchased"),console.log("purchased")},children:[e.jsx(H,{sx:{marginRight:"5px"}}),r]},2),e.jsxs(g,{onClick:e=>{ve(e),q(D,"wannaTry"),console.log("wannatry clicked")},children:[e.jsx(V,{sx:{marginRight:"5px"}}),o]},3),e.jsxs(g,{onClick:e=>{ve(e),q(D,void 0),console.log("wannatry clicked")},children:[e.jsx(I,{sx:{marginRight:"5px"}}),j]},4)]})]}),e.jsx(d,{align:"right",children:a.wantToContact?e.jsx("a",{href:`tel:${a.phoneNumber}`,onClick:e=>{e.stopPropagation(),Y(a.id),M((e=>!e))},children:e.jsx(u,{className:y.purchasedChip,label:e.jsxs(p,{className:y.typography,children:[e.jsx(O,{}),C("callTablePhoneActive")]})})}):e.jsx(u,{className:y.noStatusChip,label:e.jsxs(p,{className:y.typography,children:[e.jsx(ne,{}),C("callTablePhoneDisactive")]})})})]},a.id)}))})]})}),e.jsx(j,{rowsPerPageOptions:[5,10,25,50],component:"div",sx:{width:"100%",display:"flex",flexWrap:"wrap",justifyContent:"flex-end",".css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar":{display:"flex",justifyContent:"flex-end",flexWrap:"wrap"}},count:null==ce?void 0:ce.totalElements,rowsPerPage:te??10,page:$,onPageChange:(e,a)=>{var l,s;console.log(a),S(0===a?void 0:a>$?"forward":"back"),oe(null==(s=null==ce?void 0:ce.rawData)?void 0:s[(null==(l=null==ce?void 0:ce.rawData)?void 0:l.length)-1]),L(a)},onRowsPerPageChange:e=>{localStorage.setItem("rowsPerpageCalls",e.target.value??"10"),ie(parseInt(e.target.value,10)),L(0)}})]}):e.jsx("img",{src:E,alt:"no-data-img",className:y.noDataImg,loading:"lazy"})]}),e.jsxs(t,{sx:{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"},children:[e.jsx(b,{control:e.jsx(f,{checked:U,onChange:e=>{se(e.target.checked)}}),label:C("densePadding")}),e.jsx("h4",{onClick:()=>M((e=>!e)),className:y.reloader,children:C("reloadTable")})]})]})})}export{be as default};
