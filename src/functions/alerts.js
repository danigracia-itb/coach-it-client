import Swal from "sweetalert2";
import axiosClient from "../config/axios";

export function enterCoachCode(code, router) {
    Swal.fire({
        title: "Enter your coach's referral code",
        input: "text",
        inputAttributes: {
            autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#711bba",
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            code.value = result.value;
        } else {
            router.push("/register");
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

//Add exercise
export function addExercisePopup() {
    return new Promise((resolve, reject) => {
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
                            user_id: localStorage.getItem("id"),
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

//Select Exercise
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
                if (workout.filter((e) => e.id == exercise)[0]) {
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
        width: "700px",
        html: `
            <div class="invite-container" style="display: flex; flex-direction: column; justify-content: center;">
                <h1 class="text-black">Your code is: <span class="text-primary">${code}</span></h1>
                <div style="display: flex; align-items: center; margin-top: 10px;">
                    <a id="registrationLink" href="${url}" class="d-block border p-3 text-nowrap">${url}</a> 
                    <svg id="copyButton" style="margin-left: 10px; margin-right: none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="26" height="26">
                        <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/>
                    </svg>
                   <svg id="shareButton" style="margin-left: 10px; margin-right: none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="26" height="26">
                   <path xmlns="http://www.w3.org/2000/svg" d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm352 80c0 26.5-21.5 48-48 48c-9.8 0-18.9-2.9-26.5-7.9L197.7 256l79.9 39.9c7.6-5 16.7-7.9 26.5-7.9c26.5 0 48 21.5 48 48s-21.5 48-48 48c-25.5 0-46.4-20-47.9-45.1l-85.6-42.8c-7.6 5-16.7 7.9-26.5 7.9c-26.5 0-48-21.5-48-48s21.5-48 48-48c9.8 0 18.9 2.9 26.5 7.9l85.6-42.8C257.6 148 278.5 128 304 128c26.5 0 48 21.5 48 48z"/></svg>
                </div>
                <div id="copiedMessage" style="display: none; color: green; margin-top: 10px; margin-bottom: 0;">Copied!</div>
            </div>`,
        confirmButtonColor: "#711bba",
    });

    const copyButton = document.getElementById("copyButton");
    const copiedMessage = document.getElementById("copiedMessage");
    const shareButton = document.getElementById("shareButton");

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

    shareButton.addEventListener("click", () => {
        const gmailLoginUrl =
            "whatsapp://send?text=This is WhatsApp sharing example using link";
        window.open(gmailLoginUrl, "_blank");
    });
}

const style = document.createElement("style");
style.innerHTML = `
    .svg-hover:hover {
        fill: #711bba; 
        cursor: pointer;
    }
`;
document.head.appendChild(style);
