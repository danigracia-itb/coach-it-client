import axiosClient from '../config/axios';
import useAuthStore from '../stores/useAuthStore'
import useConfigStore from '../stores/useConfigStore'
import useExercisesStore from '../stores/useExercisesStore';

import Swal from "sweetalert2"

const exerciseController = {
    getExercises: async () => {
        const authStore = useAuthStore()
        const configStore = useConfigStore();
        const exercisesStore = useExercisesStore();

        configStore.setLoading(true)
        try {
            const response = await axiosClient(
                "exercises/get-all-user/" + authStore.user.id
            );

            exercisesStore.setExercises(response.data);

            configStore.setLoading(false)
        } catch (e) {
            console.log(e);
            configStore.setLoading(false)
        }
    },
    addExercise: async () => {
        const authStore = useAuthStore()
        const exercisesStore = useExercisesStore();


        Swal.fire({
            title: "Add Exercise",
            html: `<div class="form-group">
                    <label class="form-label d-block">Name</label>
                    <input id="name" class="form-control">
                </div>
    
                <div class="form-group mt-5">
                    <label class="form-label d-block">Muscular Group</label>
                    <select id="muscular_group" class="form-select">
                        <option value="1">Push</option>
                        <option value="2">Pull</option>
                        <option value="3">Leg</option>
                        <option value="4">Core</option>
                    </select>
                </div>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Add",
            confirmButtonColor: "#711bba",
            preConfirm: () => {
                const name = Swal.getPopup().querySelector("#name").value;
                const muscular_group =
                    Swal.getPopup().querySelector("#muscular_group").value;

                if (!name || !muscular_group) {
                    Swal.showValidationMessage("Both fields are mandatory.");
                }

                return { name, muscular_group };
            },
        }).then(async (result) => {
            if (result.value) {
                const { name, muscular_group } = result.value;

                try {
                    const response = await axiosClient.post(
                        "exercises",
                        {
                            name,
                            muscular_group,
                            user_id: authStore.user.id
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    exercisesStore.addExercise(response.data);
                } catch (e) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
            }
        });
    },
    deleteExercise: async id => {
        const exercisesStore = useExercisesStore();
        try {
            exercisesStore.deleteExercise(id);
            await axiosClient.delete("exercises/" + id);
        } catch (e) {
            console.log(e);
        }
    }
}

export default exerciseController