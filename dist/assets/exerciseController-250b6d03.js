import{V as d,u as l,g as p,G as i,M as o}from"./index-299e80f0.js";function a(e){return e.reduce((s,t)=>{var r="No Type";switch(parseInt(t.muscular_group)){case 1:r="Push";break;case 2:r="Pull";break;case 3:r="Leg";break;case 4:r="Core";break}return s[r]||(s[r]=[]),s[r].push(t),s},{})}const c=d("exercises",{state:()=>({exercises:[]}),getters:{getGroupedExercises:e=>a(e.exercises),getExerciseIndex:e=>s=>e.exercises.findIndex(t=>t.id===s),getFilteredExercises:e=>s=>{if(s){const t=e.exercises.filter(r=>r.name.toLowerCase().includes(s));return t?a(t):[]}else return a(e.exercises)}},actions:{setExercises(e){this.exercises=e},addExercise(e){this.exercises.push(e)},deleteExercise(e){this.exercises=this.exercises.filter(s=>s.id!=e)}}}),f={getExercises:async()=>{const e=l(),s=p(),t=c();s.setLoading(!0);try{const r=await i("exercises/get-all-user/"+e.id);t.setExercises(r.data),s.setLoading(!1)}catch(r){console.log(r),s.setLoading(!1)}},addExercise:async()=>{const e=l(),s=c();o.fire({title:"Add Exercise",html:`<div class="form-group">
                    <label class="form-label d-block">Name</label>
                    <input id="name" class="form-control">
                </div>
    
                <div class="form-group mt-5">
                    <label class="form-label d-block">Muscular Group</label>
                    <select id="muscular_group" class="form-select">
                        <option value="1">Push</option>
                        <option value="2">Pull</option>
                        <option value="3">Leg</option>
                        <option value="4">Core</option>
                    </select>
                </div>`,focusConfirm:!1,showCancelButton:!0,confirmButtonText:"Add",confirmButtonColor:"#711bba",preConfirm:()=>{const t=o.getPopup().querySelector("#name").value,r=o.getPopup().querySelector("#muscular_group").value;return(!t||!r)&&o.showValidationMessage("Both fields are mandatory."),{name:t,muscular_group:r}}}).then(async t=>{if(t.value){const{name:r,muscular_group:u}=t.value;try{const n=await i.post("exercises",{name:r,muscular_group:u,user_id:e.user.id},{headers:{"Content-Type":"application/json"}});s.addExercise(n.data)}catch{o.fire({icon:"error",title:"Oops...",text:"Something went wrong!"})}}})},deleteExercise:async e=>{const s=c();try{s.deleteExercise(e),await i.delete("exercises/"+e)}catch(t){console.log(t)}}};export{f as e,c as u};
