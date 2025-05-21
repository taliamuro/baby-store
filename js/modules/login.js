// ES Module for implementing the login logic

export function initLogin() {
    const signUpBtn = document.getElementById("sign-up-btn");
    if (signUpBtn) {
        signUpBtn.addEventListener("click", (event) => {
            event.preventDefault();
            validateCreateAccountForm();
        });
    }
}

function validateCreateAccountForm() {
    console.log("Validating form...");
    const dob = document.getElementById("birthday").value;

    if (!dob) {
        showAlert("Please enter your birthday.", 'danger');
        return;
    }

    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
        showAlert("Must be 18 or older to create an account.", 'danger');
    } else {
        showAlert("Account created successfully!", 'success');
    }
}

function showAlert(message, type) {
    const alertPlaceholder = document.getElementById('validation-alert-messages');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible" role="alert">
            <div>${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertPlaceholder.appendChild(wrapper);
}
