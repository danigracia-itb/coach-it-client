import{_ as C,u as S,g as N,h as d,r as P,c as l,a as e,b as u,e as s,t as U,l as B,v as I,k as _,d as j,G as D,H as F,o as n,p as V,q as $,S as A}from"./index-299e80f0.js";const h=i=>(V("data-v-8f2bf4f4"),i=i(),$(),i),z={class:"mt-5 text-center"},E={class:"d-flex justify-content-start"},L=h(()=>e("h1",{class:"text-center"},"Profile",-1)),R={class:"row justify-content-center"},q={class:"align-bottom text-center col-4"},G=["src"],H={class:"d-flex gap-3 align-items-center justify-content-between camposPerfil col-8 align-items-center"},M=h(()=>e("p",{class:"fw-bold"},"Name",-1)),O={key:0,class:"flex-grow-1"},T={class:"text-start"},J={key:1,class:"flex-grow-1"},K={__name:"Profile",setup(i){const c=S(),m=N(),y="https://daniel-gracia-7e6.alwaysdata.net",f=d(c.name),r=d(null),v=d("");async function b(p){if(r.value=p.target.files[0],r.value){v.value=URL.createObjectURL(r.value);try{const t=new FormData;t.append("image",r.value);const a=await D.post("users/change-picture/"+c.id,t);c.setUser(a.data)}catch(t){console.error(t)}}else v.value=""}function k(){document.getElementById("seleccionArchivos").click()}let o=d(!1);function x(){o.value=!o.value}function w(){o.value=!1,F.updateUserName(f.value)}return(p,t)=>{const a=P("font-awesome-icon");return n(),l("div",z,[e("div",E,[e("button",{class:"btn btn-primary",onClick:t[0]||(t[0]=g=>p.$router.back())},[u(a,{icon:"fa-solid fa-left-long"})])]),L,e("div",R,[e("div",q,[e("img",{class:"img-user rounded-circle",src:`${s(y)}/${s(c).picture}`},null,8,G),e("input",{type:"file",id:"seleccionArchivos",accept:"image/*",onChange:b,style:{display:"none"}},null,32),e("button",{class:"align-bottom bg-transparent border-0",onClick:k},[u(a,{class:"text-primary",icon:"fa-solid fa-arrow-up-from-bracket",size:"xl"})])]),e("div",H,[M,s(o)?(n(),l("div",J,[B(e("input",{"onUpdate:modelValue":t[1]||(t[1]=g=>f.value=g),style:{width:"100%"},type:"text",class:"form-control"},null,512),[[I,f.value]])])):(n(),l("div",O,[e("p",T,U(s(c).name),1)])),!s(o)&&!s(m).loading?(n(),l("button",{key:2,class:"btn btn-primary ms-3",onClick:x},[u(a,{icon:"fa-solid fa-pen",class:"text-white"})])):_("",!0),s(o)?(n(),l("button",{key:3,class:"btn btn-primary ms-3",onClick:w},[u(a,{icon:"fa-solid fa-floppy-disk",class:"text-white"})])):_("",!0),s(m).loading?(n(),j(A,{key:4})):_("",!0)])])])}}},W=C(K,[["__scopeId","data-v-8f2bf4f4"]]);export{W as default};