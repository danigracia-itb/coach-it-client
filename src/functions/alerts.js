import Swal from "sweetalert2";
import axiosClient from "../config/axios";

import useAthleteStore from '../stores/useAthleteStore'
import useCoachStore from "../stores/useCoachStore";

//AUTH
export function enterCoachCode(code, router) {
    Swal.fire({
        title: "Enter your coach's referral code",
        input: "text",
        inputAttributes: {
            autocapitalize: "off",
        },
        showCancelButton: true,
        cancelButtonText: "I don't have a coach",
        confirmButtonText: "Confirm",
        confirmButtonColor: "#711bba",
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            code.value = result.value;
        }
    });
}

export function showTermsConditions() {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: "<h4>Coach It - Online Strength Sports Coaching Platform</h4> <br><h3>Terms and Conditions</h3>",
            iconHtml: "",
            html: `
            <i>Last Updated: 20/11/2023</i>
            <br><br>
            Welcome to Coach It, the premier online coaching platform for strength sports! Before you embark on your journey to achieve new heights in strength and fitness, please take a moment to review our Terms and Conditions. By accessing or using Coach It, you agree to comply with and be bound by the following terms and conditions. If you do not agree with these terms, please refrain from using our platform.
            <br><br>
            <b>1. Acceptance of Terms</b>
            <br>
            By accessing or using Coach It, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. We reserve the right to update or modify these terms at any time without prior notice, so please check back periodically.
            <br><br>
            <b>2. User Accounts</b>
            <br>
            2.1. To access certain features of Coach It, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            <br>
            2.2. You are responsible for maintaining the confidentiality of your account credentials, and you are fully responsible for all activities that occur under your account.
            <br><br>
            <b>3. Coaching Services</b>
            <br>
            3.1. Coach It provides online coaching services for strength sports, including but not limited to weightlifting, powerlifting, and bodybuilding.
            <br>
            3.2. Coaches on our platform are independent contractors and not employees of Coach It. We do not guarantee the results of any coaching services.
            <br><br>
            <b>4. Code of Conduct</b>
            <br>
            4.1. Users must adhere to a high standard of conduct. Any form of harassment, discrimination, or inappropriate behavior will not be tolerated.
            <br>
            4.2. Users shall not upload, post, or transmit any content that violates applicable laws or infringes on the rights of others.
            <br><br>
            <b>5. Privacy Policy</b>
            <br>
            Your privacy is important to us. Please review our <a href="/privacy-policy" target="_blank">Privacy Policy</a> to understand how we collect, use, and disclose information.
            <br><br>
            <b>6. Intellectual Property</b>
            <br>
            All content on Coach It, including text, graphics, logos, images, and software, is the property of Coach It or its content suppliers and is protected by international copyright laws.
            <br><br>
            <b>7. Termination</b>
            <br>
            Coach It reserves the right to terminate or suspend your account at any time without notice for any violation of these Terms and Conditions.
            <br><br>
            <b>8. Contact Information</b>
            <br>
            If you have any questions or concerns about these Terms and Conditions, please contact us at <b>issues@coach.it</b> 
            <br>
            Thank you for choosing Coach It as your online strength sports coaching platform! Let's embark on this journey of strength and success together.
            `,
            confirmButtonText: "I agree to the Terms & Conditions",
            confirmButtonColor: "#711bba",

            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

export function passwordRecoverRequestedSuccess(email) {
    return Swal.fire({
        icon: "success",
        title: "Requested",
        text: "We have sent an email to " + email,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#711bba",
    });
}

export function passwordChangedSuccessfully() {
    return Swal.fire({
        icon: "success",
        title: "Changed",
        text: "Password changed succesfully, returning to login...",
        timer: 1500,
    });
}

//EXERCISES
export function selectExercise(exercises, workout) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            titleText: "Select an exercise to add",
            iconHtml: "",
            html: `
        <select id="exercise" class="form-select">
        ${exercises
                    .map((e) => {
                        return `<option value='${e.id}'>${e.name}</option>`;
                    })
                    .join("")}
        </select>
        `,
            showCloseButton: true,
            confirmButtonText: "Add to Workout",
            confirmButtonColor: "#711bba",
            preConfirm: () => {
                const exercise =
                    Swal.getPopup().querySelector("#exercise").value;

                if (!exercise) {
                    Swal.showValidationMessage("Please select an exercise.");
                }

                //Si el ejercicio ya esta añadido dar error
                if (workout.filter((e) => (e.exercise_id ? e.exercise_id : e.id) == exercise)[0]) {
                    Swal.showValidationMessage(
                        "This exercise has already been added."
                    );
                }

                return exercise;
            },
        }).then((result) => {
            if (result.value) {
                resolve(result.value);
            }
        });
    });
}

//Invite Athlete
export function inviteAthlete(host, code) {
    const url = `http://${host}/register?type=athlete&code=${code}`;


    Swal.fire({
        width: "auto",
        html: `
            <div class="invite-container mx-auto" style="display: flex; flex-direction: column; justify-content: center;">
                <h1 class="text-black">Your code is: <span class="text-primary">${code}</span></h1>
                <div style="display: flex; align-items: center; margin-top: 10px;">
                    <a id="registrationLink" href="${url}" class="d-block border p-3 text-nowrap">${url}</a> 
                    
                    <button class="btn"  id="copyButton">
                        <svg style="margin-left: 10px; margin-right: none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="26" height="26">
                            <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/>
                        </svg>
                        </button>
                </div>
                <div id="copiedMessage" style="display: none; color: green; margin-top: 10px; margin-bottom: 0;">Copied!</div>
            </div>`,
        confirmButtonColor: "#711bba",
    });

    const copyButton = document.getElementById("copyButton");
    const copiedMessage = document.getElementById("copiedMessage");

    copyButton.addEventListener("click", () => {
        const tempInput = document.createElement("input");
        tempInput.value = url;
        document.body.appendChild(tempInput);

        tempInput.select();
        tempInput.setSelectionRange(0, 99999);
        document.execCommand("copy");

        document.body.removeChild(tempInput);

        copiedMessage.style.display = "block";

        setTimeout(() => {
            copiedMessage.style.display = "none";
        }, 3000);
    });
}

//WORKOUTS
export function copyWorkout(workout_id, workout_date, router) {
    //copy
    Swal.fire({
        title: "Where do you want to copy the workout?",
        input: "date",
        inputValue: workout_date,
        didOpen: () => {
            const today = (new Date()).toISOString();
            Swal.getInput().min = today.split("T")[0];
        },
        showCancelButton: true,
        confirmButtonText: "Copy",
        confirmButtonColor: "#711bba",
        showLoaderOnConfirm: true,
        preConfirm: async (date) => {
            try {
                const response = await axiosClient.post("workout/copy/" + workout_id, { date });

                return response.data;
            } catch (error) {
                Swal.showValidationMessage(`
                    Request failed: ${error}
                `);
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            //actualizar pagina para mostrar el nuevo entreno en el calendario como?
            router.go(0)
        }
    });
}

//BODY WEIGHT
export function addBodyWeightPopUp(date, user_id, isCoach) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: "Add Body Weight",
            html: `    
                <div class="form-group mt-5">
                    <label for="value" class="form-label d-block">KG</label>
                    <input type="number" id="value" name="value" class="form-control">
                </div>
                `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Add",
            confirmButtonColor: "#711bba",
            preConfirm: () => {
                const value = Swal.getPopup().querySelector("#value").value;

                if (!value) {
                    Swal.showValidationMessage("KG field is mandatory");
                }

                return { value };
            },
        }).then(async (result) => {
            if (result.value) {
                const { value } = result.value;

                try {
                    const response = await axiosClient.post(
                        "body-weights",
                        {
                            date,
                            value,
                            user_id
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (isCoach) {
                        const coachStore = useCoachStore();
                        coachStore.addBodyWeight(response.data)
                    } else {
                        const athleteStore = useAthleteStore();
                        athleteStore.addBodyWeight(response.data)
                    }

                    return resolve(response.data);
                } catch (e) {
                    console.log(e)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
            }
        });
    });
}

export function editBodyWeightPopUp(value, id, isCoach) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: "Add Body Weight",
            html: `    
                <div class="form-group mt-5">
                    <label for="value" class="form-label d-block">KG</label>
                    <input type="number" id="value" name="value" value="${value}" class="form-control">
                </div>
                `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Add",
            confirmButtonColor: "#711bba",
            preConfirm: () => {
                const value = Swal.getPopup().querySelector("#value").value;

                if (!value) {
                    Swal.showValidationMessage("KG field is mandatory");
                }

                return { value };
            },
        }).then(async (result) => {
            if (result.value) {
                const { value } = result.value;

                try {
                    const response = await axiosClient.put(
                        "body-weights/" + id,
                        {
                            value,
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (isCoach) {
                        const coachStore = useCoachStore();
                        coachStore.updateBodyWeight(response.data)
                    } else {
                        const athleteStore = useAthleteStore();
                        athleteStore.updateBodyWeight(response.data)
                    }

                    return resolve(response.data);
                } catch (e) {
                    console.log(e)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
            }
        });
    });
}

//PAYMENTS
export function addPaymentPopUp(coach_id, athlete_id) {
    return new Promise((resolve, reject) => {
        // Obtiene la fecha actual en el formato deseado (YYYY-MM-DD)
        const today = new Date().toISOString().split('T')[0];
    
        Swal.fire({
            title: "Add Payment",
            html: `<div class="form-group">
                    <label for="date" class="form-label d-block">Date</label>
                    <input type="date" id="date" name="date" class="form-control" value="${today}">
                </div>
    
                <div class="form-group mt-5">
                    <label for="quantity" class="form-label d-block">Quantity (€)</label>
                    <input type="number" id="quantity" name="quantity" class="form-control">
                </div>
                <div class="form-group mt-5">
                    <label for="payment_type" class="form-label d-block">Payment Type</label>
                    <select id="payment_type" name="payment_type" class="form-select">
                        <option value="monthly" selected>Monthly (1 month)</option>
                        <option value="quarterly">Quarterly (3 months)</option>
                        <option value="annual">Annual (12 months)</option>
                    </select>
                </div>
                
                `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Add",
            confirmButtonColor: "#711bba",
            preConfirm: () => {
                const date = Swal.getPopup().querySelector("#date").value;
                const quantity =
                    Swal.getPopup().querySelector("#quantity").value;
                const payment_type = Swal.getPopup().querySelector("#payment_type").value;
    
                if (!date || !quantity || !payment_type) {
                    Swal.showValidationMessage("All fields are mandatory.");
                }
    
                return { date, quantity, payment_type };
            },
        }).then(async (result) => {
            if (result.value) {
                const { date, quantity, payment_type } = result.value;
    
                try {
                    const response = await axiosClient.post(
                        "payments",
                        {
                            date,
                            quantity,
                            payment_type,
                            coach_id,
                            athlete_id
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    return resolve(response.data);
                } catch (e) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
            }
        });
    });
    
}

export function athletePaymentsHistoric(athlete) {
    Swal.fire({
        title: `<h4><span class="fw-bold text-primary">${athlete.name}</span> Payment Historial</h4>`,
        iconHtml: "",
        html: `
        <ul class="list-unstyled">
        ${athlete.payments.map(payment => {
            return `<li>${payment.date} for <span class="fw-bold">${payment.quantity}€</span></li>`;
        }).join("")}
    </ul>
 `,
        confirmButtonText: "Ok",
        confirmButtonColor: "#711bba",
        showCancelButton: true,
    });
}
