import axiosClient from '../config/axios';
import useAuthStore from '../stores/useAuthStore'
import useConfigStore from '../stores/useConfigStore';
import router from '../router';

const authController = {

    login: async (data) => {
        const authStore = useAuthStore()
        const configStore = useConfigStore()

        configStore.setLoading(true)

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
            configStore.setLoading(false)
            configStore.setError(false)

            authStore.setUser(response.data.user)

            if (authStore.user.is_coach) {
                router.push({ path: '/coach' });
            } else {
                router.push({ path: '/athlete' })
            }
        } catch (e) {
            console.log(e)
            configStore.setLoading(false)
            configStore.setError(true)
        }
    },

    register: async (data) => {
        const authStore = useAuthStore()
        const configStore = useConfigStore()
        configStore.setLoading(true)

        try {
            const response = await axiosClient.post(
                "register",
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    is_coach: data.is_coach,
                    coach_id: data.code ?? null,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            configStore.setLoading(false)
            configStore.clearValidationErrors();
            authStore.setUser(response.data.user)

            if (authStore.user.is_coach) {
                router.push({ path: "/coach" });
            } else {
                router.push({ path: `/form`, query: { id: authStore.user.id } });
            }
        } catch (e) {
            console.log(e)
            configStore.setLoading(false)
            configStore.setError(true)
        }
    },

    validateRegister: (data) => {
        const configStore = useConfigStore()
        configStore.clearValidationErrors()
        //Validate form
        if (!data.name) {
            configStore.setValidationError("name", "Name field is mandatory.")
        }
        if (!data.email) {
            configStore.setValidationError("email", "Email field is mandatory.")
        }
        if (!data.password && !data.password_confirmation) {
            configStore.setValidationError("password_confirmation", "Both passwords fields are mandatory.")
        }

        if (data.password != data.password_confirmation) {
            configStore.setValidationError("password_confirmation", "Passwords do not match.")
        }
        if (data.terms_conditions == false) {
            configStore.setValidationError("terms_conditions", "You must accept our Terms & Conditions.")
        }
    }
}

export default authController