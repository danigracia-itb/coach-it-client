import axiosClient from '../config/axios';
import useAuthStore from '../stores/useAuthStore'
import useCoachStore from '../stores/useCoachStore';

const coachController = {
    getAthletes: async () => {
        const authStore = useAuthStore()
        const coachStore = useCoachStore();

        coachStore.setLoading(true)

        try {
            const response = await axiosClient.post(
                "login",
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            authStore.setLoading(false)
            authStore.setError(false)

            authStore.setUser(response.data.user)
        } catch (error) {
            console.log(error)
            authStore.setLoading(false)
            authStore.setError(true)
        }


    },
}

export default coachController