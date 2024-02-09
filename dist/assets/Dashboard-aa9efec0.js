import{u as m,r as g,o as s,c,a as o,b as f,i as v,_ as b,d as _,w,e,t as x,R as y,f as k,g as S,h as C,j as A,k as h,l as $,v as I,F as D,m as V,n as B,p as N,q as F,S as T}from"./index-299e80f0.js";import{c as j}from"./coachController-6aff2776.js";const L={__name:"InviteAthlete",setup(t){const a=m(),n=window.location.host;function l(){v(n,a.user.id)}return(d,u)=>{const p=g("font-awesome-icon");return s(),c("div",null,[o("button",{class:"btn btn-primary",onClick:l},[f(p,{icon:"fa-solid fa-user-plus"})])])}}};const M=["src"],R={class:"display-6 fw-bold mx-4"},U={__name:"AthleteCard",props:["athlete"],setup(t){const a="https://daniel-gracia-7e6.alwaysdata.net";return(n,l)=>(s(),_(e(y),{to:`/coach/athlete/${t.athlete.id}`,class:"athlete-card p-3 border border-black border-1 rounded text-decoration-none text-black align-middle bg-white"},{default:w(()=>[o("img",{width:"130",height:"130",class:"p-2 rounded-circle",src:`${e(a)}/${t.athlete.picture}`,alt:""},null,8,M),o("p",R,x(t.athlete.name),1)]),_:1},8,["to"]))}},q=b(U,[["__scopeId","data-v-5dd23fd3"]]);const E=t=>(N("data-v-cb8b473c"),t=t(),F(),t),P={class:"mt-5"},Y=E(()=>o("h1",{class:"text-center"},"Dashboard",-1)),z={key:1,class:"d-flex justify-content-between mt-5 mt-md-0"},G={key:0,class:"athletes-grid h-100 w-100 mt-5"},H={key:1,class:"w-100 mt-5"},J={class:"text-center"},K={__name:"Dashboard",setup(t){const a=k(),n=S(),l=m(),d=C(""),u=window.location.host;return A(()=>{a.athletes.length<=0&&j.getAthletes()}),(p,i)=>(s(),c("div",null,[o("header",P,[Y,e(n).loading?(s(),_(T,{key:0,class:"mt-5"})):h("",!0),e(n).loading?h("",!0):(s(),c("div",z,[$(o("input",{type:"text",id:"searchTerm",class:"form-control w-auto",placeholder:"Search athlete...","onUpdate:modelValue":i[0]||(i[0]=r=>d.value=r)},null,512),[[I,d.value]]),f(L)]))]),!e(n).loading&&e(a).athletes.length>0?(s(),c("div",G,[(s(!0),c(D,null,V(e(a).getFilteredAthletes(d.value),r=>(s(),_(q,{key:r.id,athlete:r},null,8,["athlete"]))),128))])):h("",!0),!e(n).loading&&e(a).athletes.length<=0?(s(),c("div",H,[o("h4",J,[B("You have no athletes, "),o("span",{class:"cursor-pointer text-primary",onClick:i[1]||(i[1]=r=>e(v)(e(u),e(l).id))},"invite your first athlete")])])):h("",!0)]))}},W=b(K,[["__scopeId","data-v-cb8b473c"]]);export{W as default};