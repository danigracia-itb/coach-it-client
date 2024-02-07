import axiosClient from '../config/axios';
import useAuthStore from '../stores/useAuthStore'
import useConfigStore from '../stores/useConfigStore'
import useCoachStore from '../stores/useCoachStore';

import Swal from "sweetalert2"
import {addMonths, paymentTypeToMonths} from "../functions/helpers"

const coachController = {
    getAthletes: async () => {
        const authStore = useAuthStore()
        const coachStore = useCoachStore();
        const configStore = useConfigStore();

        configStore.setLoading(true)

        try {
            const response = await axiosClient.get(
                "coach/get-athletes/" + authStore.user.id,
            );
            configStore.setLoading(false)
            configStore.setError(false)

            coachStore.setAthletes(response.data)
        } catch (error) {
            console.log(error)
            configStore.setLoading(false)
            configStore.setError(true)
        }
    },

    //Delete athlete
    deleteAthlete: async (id)  => {
        const coachStore = useCoachStore();

        Swal.fire({
            title: "¿Do you want to delete this athlete?",
            text: "Once deleted, it cannot be recovered",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#711bba",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              //Enviar la petición al servidor
              axiosClient
                .delete(`/athlete/${id}`)
                .then(() => {
                console.log()
                  Swal.fire({
                    title: "Athlete deleted",
                    text: "Athlete deleted successfully",
                    icon: "success",
                  });
    
                  //Eliminar categoría del DOM
                  coachStore.deleteAthlete(id)
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Error 505!",
                        text: "Server error, contact with webmaster for more info",
                        icon: "error",
                  });
                });
            }
          })
    },
    

    //Other
    sendPaymentReminder: async (athlete) => {
        const configStore = useConfigStore();
        const authStore = useAuthStore();

        const payment_type = athlete.payments[athlete.payments.length - 1].payment_type

        configStore.setLoading(true)
        try {
            await axiosClient.post("send-payment-reminder", {
                athlete_email: athlete.email,
                athlete_name: athlete.name,
                coach: authStore.user.name,
                date: addMonths(athlete.payments[athlete.payments.length - 1].date, paymentTypeToMonths(payment_type)),
                quantity: athlete.payments[athlete.payments.length - 1].quantity,
                payment_type
            });
            configStore.setLoading(false)
            Swal.fire({
                title: "Sended Successfully",
                text: `Payment reminder sent successfully to ${athlete.name} for an amount of ${athlete.payments[0].quantity}€ `,
                showCancelButton: true,
                confirmButtonText: "Confirm",
                confirmButtonColor: "#711bba",
            });
        } catch (error) {
            configStore.setLoading(false)
            console.log(error);
        }

    }
}

export default coachController