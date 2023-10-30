import axiosClient from "../config/axios";

export async function isLoggedIn() {
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const response = await axiosClient.post("get-user", {
                token,
            });
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("email", response.data.user.email);

            return true;
        } catch (error) {
            return false;
        }
    } else {
        return false;
    }
}
