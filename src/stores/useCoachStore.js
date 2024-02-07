import { defineStore, acceptHMRUpdate } from "pinia";

const useCoachStore = defineStore('coach', {
    state: () => ({
        athletes: [],
        athleteCalendar: {
            restDays: [],
            workouts: []
        }
    }),
    getters: {
        getAthleteById: (state) => {
            return (id) => state.athletes.find(a => a.id == id)
        },
    },
    actions: {
        setAthletes(data) {
            this.athletes = data
        },
        setAthleteLastPayment(athlete, data) {
            this.athletes[this.athletes.findIndex((a) => a.id == athlete)].payments = [data]
        },
        deleteAthlete(id) {
            this.athletes = this.athletes.filter(a => a.id != id);
        },
        setAthleteCalendar(data) {
            this.athleteCalendar.restDays = data.restDays
            this.athleteCalendar.workouts = data.workouts
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCoachStore, import.meta.hot));
}

export default useCoachStore