import{_ as f,f as p,I as m,J as y,h as g,j as v,r as C,c as u,d as b,a as o,b as t,w as c,e as s,t as k,G as w,o as d,R as i,S as x}from"./index-299e80f0.js";import{C as S}from"./Calendar-27a15033.js";import{c as A}from"./coachController-6aff2776.js";const D={class:"mt-5"},B={key:1},W={class:"d-grid grid-header w-100"},R={class:"d-flex justify-content-start align-items-center"},j={class:"text-center text-primary"},I={class:"d-flex justify-content-end align-items-center gap-2"},N={__name:"AthleteCalendar",setup(V){const a=p(),h=m(),n=y(()=>a.getAthleteById(h.params.id)),l=g(!0);async function _(){l.value=!0;try{const e=await w("coach/get-athlete-calendar/"+h.params.id);a.setAthleteCalendar({workouts:e.data.workouts,restDays:e.data.restDays,bodyWeights:e.data.bodyWeights}),l.value=!1}catch(e){console.log(e),l.value=!1}}return v(()=>{a.athletes.length<=0&&A.getAthletes(),_()}),(e,$)=>{const r=C("font-awesome-icon");return d(),u("div",D,[l.value?(d(),b(x,{key:0})):(d(),u("div",B,[o("header",W,[o("div",R,[t(s(i),{class:"btn btn-primary",to:"/coach"},{default:c(()=>[t(r,{icon:"fa-solid fa-left-long"})]),_:1})]),o("h1",j,k(n.value.name),1),o("div",I,[t(s(i),{to:`/coach/athlete/${n.value.id}/stats`,class:"btn btn-primary"},{default:c(()=>[t(r,{icon:"fa-solid fa-chart-line"})]),_:1},8,["to"]),t(s(i),{to:`/coach/athlete/${n.value.id}/profile`,class:"btn btn-primary"},{default:c(()=>[t(r,{icon:"fa-solid fa-user"})]),_:1},8,["to"])])]),o("div",null,[t(S,{isCoach:!0,useStore:e.athleteStore,athlete:n.value,workouts:s(a).athleteCalendar.workouts,restDays:s(a).athleteCalendar.restDays,bodyWeights:s(a).athleteCalendar.bodyWeights},null,8,["useStore","athlete","workouts","restDays","bodyWeights"])])]))])}}},L=f(N,[["__scopeId","data-v-a529ac65"]]);export{L as default};