import { defineStore, acceptHMRUpdate } from "pinia";

const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            id: null,
            name: "",
            email: "",
            picture: "",
            is_coach: null,
        }
    },
    getters: {
        user: (state) => ({
            id: state.id,
            name: state.name,
            email: state.email,
            picture: state.picture,
            is_coach: state.is_coach
        })
    },
    actions: {
        setUser(user) {
            this.id = user.id
            this.name = user.name
            this.email = user.email
            this.picture = user.picture
            this.is_coach = user.is_coach
        },
    },
    persist: true,
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

export default useAuthStore