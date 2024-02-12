import { defineStore, acceptHMRUpdate } from "pinia";
import { getTodayDate } from "../functions/helpers";

const useAthleteStore = defineStore('athlete', {
    state: () => ({
        athlete: {},
        calendar: {
            restDays: [],
            workouts: [],
            bodyWeights: [],
            tracs: []
        }
    }),
    getters: {
        getTodayEvents: (state) => {
            const today = getTodayDate()
            return {
                restDay: state.calendar.restDays.find(i => i.date == today),
                workout: state.calendar.workouts.find(i => i.date == today),
                bodyWeight: state.calendar.bodyWeights.find(i => i.date == today),
                trac: state.calendar.tracs.find(i => i.date == today),
            }
        },
    },
    actions: {
        setAthlete(data) {
            this.athlete = data
        },
        setCalendar(data) {
            this.calendar.restDays = data.restDays
            this.calendar.workouts = data.workouts
            this.calendar.bodyWeights = data.bodyWeights
            this.calendar.tracs = data.tracs
        },
        addBodyWeight(data) {
            this.calendar.bodyWeights.push(data)
        },
        updateBodyWeight(data) {
            this.calendar.bodyWeights[this.calendar.bodyWeights.findIndex((a) => a.id == data.id)] = data;
        },

        //Trac
        addTrac(data) {
            this.calendar.tracs.push(data)
        },
        deleteTrac(data) {
            const index = this.calendar.tracs.findIndex(i => i.id == data.id)
            this.calendar.tracs.splice(index, 1)
        },
        //Workout
        addWorkout(data) {
            this.calendar.workouts.push(data)
        },
        deleteWorkout(data) {
            const index = this.calendar.workouts.findIndex(i => i.id == data.id)
            this.calendar.workouts.splice(index, 1)
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAthleteStore, import.meta.hot));
}

export default useAthleteStore