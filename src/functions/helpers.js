import axiosClient from "../config/axios";
import { rpeTable } from "./const";

// Función para verificar la autenticación utilizando la API
export async function checkAuth() {
    return true
    // try {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         return false;
    //     }

    //     const response = await axiosClient.get("get-user", {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });

    //     if (response.status === 200) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // } catch (error) {
    //     console.error("Error during authentication check:", error);
    //     return false;
    // }
}

//Obtiene el usuario del localstorage y lo convierte en objeto javascript
export function getUser() {
    const userRaw = localStorage.getItem("user")

    if (userRaw) {
        return JSON.parse(userRaw)
    } else {
        return false
    }
}

export function calculateTonelage(sets, edit = false, target = true) {
    var tonelage = 0

    if (!sets[0]) {
        return tonelage
    }

    if (target) {
        if (!edit) {
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
    } else {
        sets.map(set => {
            tonelage += set.actual_weight * set.actual_reps
        })

        return sets[0].actual_weight ? tonelage : 0
    }

}


export function formatDate(fecha) {
    var fechaObj = new Date(fecha);
    var dia = ("0" + fechaObj.getDate()).slice(-2); // Agrega un cero inicial si es necesario
    var mes = ("0" + (fechaObj.getMonth() + 1)).slice(-2); // Agrega un cero inicial si es necesario
    var año = fechaObj.getFullYear();
    return dia + '/' + mes + '/' + año;
}


export function addOneMonth(date) {
    var newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return formatDate(newDate);
}

export function isDateBeforeOrEqualToToday(date) {
    // Obtener la fecha de hoy
    var today = new Date();
    // Convertir la fecha proporcionada a un objeto Date
    var providedDate = new Date(date);
    providedDate.setMonth(providedDate.getMonth() + 1);

    // Comprobar si la fecha proporcionada es igual o anterior a hoy
    return providedDate <= today;
}

export function calculateMaxRpe(sets) {
    let max = 0;
    for(let set of sets) {
        const rpeForReps = rpeTable[`${set.actual_reps}`]
        
        if(rpeForReps) {
            const e1rm = parseFloat(set.actual_weight * ((100+((-1) *( rpeForReps[`${set.actual_rpe}`] - 100)))/ 100))
            
            if(e1rm >= max) {
                max = e1rm
            }
        }

    }
    return 2.5 * Math.ceil(max/2.5)
}