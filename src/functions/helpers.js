import axiosClient from "../config/axios";

// Función para verificar la autenticación utilizando la API
export async function checkAuth() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return false;
        }

        const response = await axiosClient.get("get-user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error during authentication check:", error);
        return false;
    }
}
