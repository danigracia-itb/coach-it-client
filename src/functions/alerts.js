import Swal from "sweetalert2";

export function enterCoachCode(code, router) {
    Swal.fire({
        title: "Enter your coach's referral code",
        input: "text",
        inputAttributes: {
            autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#711bba"
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            code.value = result.value
        } else {
            router.push("/register")
        }
    });
}
