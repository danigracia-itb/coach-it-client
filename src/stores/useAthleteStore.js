import { defineStore, acceptHMRUpdate } from "pinia";

const useAthleteStore = defineStore('athlete', {
    state: () => ({
        athlete: {},
        calendar: {
            restDays: [],
            workouts: []
        }
    }),
    actions: {
        setAthlete(data) {
            this.athlete = data
        },
        setCalendar(data) {
            this.calendar.restDays = data.restDays
            this.calendar.workouts = data.workouts
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAthleteStore, import.meta.hot));
}

export default useAthleteStore