import{f as _,H as p,k as y,h as m,j as g,r as b,c as u,d as v,a as n,b as t,w as c,e as s,t as C,I as k,E as w,o as i,R as d,S}from"./index-0768fb48.js";import{c as x}from"./coachController-750bf2c1.js";const D={class:"mt-5"},A={key:1},B={class:"d-flex justify-content-between"},W={class:"text-primary"},R={class:"d-flex gap-2"},V={__name:"AthleteCalendar",setup(j){const a=_(),h=p(),o=y(()=>a.getAthleteById(h.params.id)),l=m(!0);async function f(){l.value=!0;try{const e=await w("coach/get-athlete-calendar/"+h.params.id);a.setAthleteCalendar({workouts:e.data.workouts,restDays:e.data.restDays,bodyWeights:e.data.bodyWeights}),l.value=!1}catch(e){console.log(e),l.value=!1}}return g(()=>{a.athletes.length<=0&&x.getAthletes(),f()}),(e,E)=>{const r=b("font-awesome-icon");return i(),u("div",D,[l.value?(i(),v(S,{key:0})):(i(),u("div",A,[n("header",B,[t(s(d),{class:"btn btn-primary",to:"/coach"},{default:c(()=>[t(r,{icon:"fa-solid fa-left-long"})]),_:1}),n("h1",W,C(o.value.name),1),n("div",R,[t(s(d),{to:`/coach/athlete/${o.value.id}/stats`,class:"btn btn-primary"},{default:c(()=>[t(r,{icon:"fa-solid fa-chart-line"})]),_:1},8,["to"]),t(s(d),{to:`/coach/athlete/${o.value.id}/profile`,class:"btn btn-primary"},{default:c(()=>[t(r,{icon:"fa-solid fa-user"})]),_:1},8,["to"])])]),n("div",null,[t(k,{isCoach:!0,useStore:e.athleteStore,athlete:o.value,workouts:s(a).athleteCalendar.workouts,restDays:s(a).athleteCalendar.restDays,bodyWeights:s(a).athleteCalendar.bodyWeights},null,8,["useStore","athlete","workouts","restDays","bodyWeights"])])]))])}}};export{V as default};