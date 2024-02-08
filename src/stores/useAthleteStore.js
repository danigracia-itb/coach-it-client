import { defineStore, acceptHMRUpdate } from "pinia";

const useAthleteStore = defineStore('athlete', {
    state: () => ({
        athlete: {},
        calendar: {
            restDays: [],
            workouts: [],
            bodyWeights: []
        }
    }),
    actions: {
        setAthlete(data) {
            this.athlete = data
        },
        setCalendar(data) {
            this.calendar.restDays = data.restDays
            this.calendar.workouts = data.workouts
            this.calendar.bodyWeights = data.bodyWeights
        },
        addBodyWeight(data) {
            this.calendar.bodyWeights.push(data)
        },
        updateBodyWeight(data) {
            this.calendar.bodyWeights[this.calendar.bodyWeights.findIndex((a) => a.id == data.id)] = data;
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAthleteStore, import.meta.hot));
}

export default useAthleteStore