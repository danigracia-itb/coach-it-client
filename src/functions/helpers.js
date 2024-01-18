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

export function calculateTonelage(sets, edit=false) {
    var tonelage = 0
    
    if(!sets[0]) {
        return tonelage
    }

<<<<<<< Updated upstream
    sets.map(set => {
        tonelage += set.weight * set.reps
    })
    
    return tonelage
}

export function logOut(router) {
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    router.push({ path: "/login" })
=======
    if(!edit) {
        sets.map(set => {
            tonelage += set.weight * set.reps
        })
        
        return sets[0].weight ? tonelage : 0
    } else {
        sets.map(set => {
            tonelage += set.target_weight * set.target_reps
        })
        
        return sets[0].target_weight ? tonelage : 0
    }


>>>>>>> Stashed changes
}