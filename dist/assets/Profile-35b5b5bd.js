import{_ as P,u as $,g as V,h as n,r as D,c as h,a as e,b as B,e as b,a3 as C,l as d,v as y,a4 as F,G as N,o as g,H as x,p as j,q as A}from"./index-299e80f0.js";import{d as L}from"./index-dd4077b2.js";const s=l=>(j("data-v-a39f2b48"),l=l(),A(),l),M={class:"mt-5"},O={class:"d-flex justify-content-start"},H={class:"d-flex flex-column align-items-center justify-content-center"},R=["src"],T={class:"mt-5"},q=s(()=>e("p",{class:"text-uppercase mb-1"},"Profile settings",-1)),z=s(()=>e("button",{class:"btn btn-secondary",type:"submit"}," Save ",-1)),G={class:"mt-5"},Y=s(()=>e("p",{class:"text-uppercase mb-1"},"Your Coach",-1)),J=s(()=>e("option",{value:!0},"I have a coach ",-1)),K=s(()=>e("option",{value:!1},"I don't have a coach ",-1)),Q=[J,K],W={key:0},X={key:1},Z=s(()=>e("input",{type:"text",class:"form-control",placeholder:"No coach code",disabled:""},null,-1)),ee=[Z],te=s(()=>e("button",{class:"btn btn-secondary",type:"submit"}," Save ",-1)),oe={class:"mt-5"},se=s(()=>e("p",{class:"text-uppercase mb-1"},"Others",-1)),ae={class:"d-flex flex-column gap-2"},ne={__name:"Profile",setup(l){const a=$(),u=V(),c=L.useToast(),S="https://daniel-gracia-7e6.alwaysdata.net",p=n(a.name),v=n(a.email),m=n(a.coach_id),i=n(!!a.coach_id),r=n(null),w=n("");async function k(f){if(r.value=f.target.files[0],r.value){w.value=URL.createObjectURL(r.value);try{const t=new FormData;t.append("image",r.value);const _=await N.post("users/change-picture/"+a.id,t);a.setUser(_.data)}catch(t){console.error(t)}}else w.value=""}function U(){document.getElementById("seleccionArchivos").click()}async function E(){await x.updateUserData(p.value,v.value),u.error?c.error("Server error",{position:"top"}):c.success("Profile Settings Updated",{position:"top"})}async function I(){await x.updateUserCoach(i.value?m.value:"nocoach"),u.error?c.error(u.validationErrors.coach_id,{position:"top"}):c.success("Coach Code Updated",{position:"top"})}return(f,t)=>{const _=D("font-awesome-icon");return g(),h("div",M,[e("div",O,[e("button",{class:"btn btn-primary d-none d-md-block",onClick:t[0]||(t[0]=o=>f.$router.back())},[B(_,{icon:"fa-solid fa-left-long"})])]),e("div",H,[e("img",{class:"img-user rounded-circle",src:`${b(S)}/${b(a).picture}`,onClick:U},null,8,R),e("input",{type:"file",id:"seleccionArchivos",accept:"image/*",onChange:k,style:{display:"none"}},null,32)]),e("section",T,[q,e("form",{class:"d-flex flex-column gap-2",onSubmit:t[3]||(t[3]=C(o=>E(),["prevent"]))},[e("div",null,[d(e("input",{type:"text",class:"form-control",placeholder:"Enter your name...","onUpdate:modelValue":t[1]||(t[1]=o=>p.value=o)},null,512),[[y,p.value]])]),e("div",null,[d(e("input",{type:"text",class:"form-control",placeholder:"Enter your email...","onUpdate:modelValue":t[2]||(t[2]=o=>v.value=o)},null,512),[[y,v.value]])]),z],32)]),e("section",G,[Y,e("form",{class:"d-flex flex-column gap-2",onSubmit:t[6]||(t[6]=C(o=>I(),["prevent"]))},[e("div",null,[d(e("select",{class:"form-select","onUpdate:modelValue":t[4]||(t[4]=o=>i.value=o)},Q,512),[[F,i.value]])]),i.value?(g(),h("div",W,[d(e("input",{type:"text",class:"form-control",placeholder:"Enter your coach code...","onUpdate:modelValue":t[5]||(t[5]=o=>m.value=o)},null,512),[[y,m.value]])])):(g(),h("div",X,ee)),te],32)]),e("section",oe,[se,e("div",ae,[e("button",{class:"bg-white w-100 btn border border-1 text-danger fw-bold",onClick:t[7]||(t[7]=o=>b(x).logout())},"Log Out")])])])}}},ie=P(ne,[["__scopeId","data-v-a39f2b48"]]);export{ie as default};