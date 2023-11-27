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
                    return resolve(response.data)
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
