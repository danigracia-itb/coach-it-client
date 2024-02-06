import { defineStore, acceptHMRUpdate } from "pinia";

const useConfigStore = defineStore('config', {
    state: () => {
        return {
            loading: false,
            error: false,
            validationErrors: {}
        }
    },

    actions: {
        setLoading(value) {
            this.loading = value;
        },
        setError(value) {
            this.error = value;
        },
        setValidationError(key, value) {
            this.validationErrors[`${key}`] = value
        },
        clearValidationErrors() {
            this.validationErrors = {};
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot));
}

export default useConfigStore