import { defineStore, acceptHMRUpdate } from "pinia";

 const useCoachStore =  defineStore('coach', {
    state: () => ({
        athletes: []
    }),
    getters: {
        
    },
    actions: {
        setAthletes(data) {
            this.athletes = data
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCoachStore, import.meta.hot));
}

export default useCoachStore