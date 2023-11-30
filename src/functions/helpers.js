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

//Obtiene el usuario del localstorage y lo convierte en objeto javascript
export function getUser() {
    const userRaw = localStorage.getItem("user")

    if(userRaw) {
        return JSON.parse(userRaw)
    } else {
        return false
    }
}

export function calculateTonelage(sets) {
    var tonelage = 0
    if(!sets[0]) {
        return tonelage
    }

    sets.map(set => {
        tonelage += set.weight * set.reps
    })
    
    return tonelage
}