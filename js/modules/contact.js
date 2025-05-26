// ES Module for implementing the contact logic

export function initContact() {
    //Check the client-email-txt input to be an email
    const sendEmailForm = document.getElementById('send-email-form');

    sendEmailForm.addEventListener('submit', function(event) {
        console.log("Validating form...");
        if(!validateForm()){
            event.preventDefault();
        }
    })
}

function validateForm() {
    //Retrieve Fields
    const email = document.getElementById('client-email-txt').value;
    const messageToSend = document.getElementById('comment-to-send').value;

    console.log(email);
    console.log(messageToSend);

    //Use RegEx to do input validation
    const regExEmail = /^([a-zA-Z0-9.$#'!*%&+/=?^_`|{}~-]+)@([a-zA-Z0-9-]+)(\.[a-zA-Z0-9-]+)*$/;//TODO: make this more robust

    if (email == null || !regExEmail.test(email)) {
        showAlert("Please enter a valid email code (e.g.: name@example.com)", 'danger');
        return false;
    }
    else if (messageToSend.length == 0) { //empty message
        showAlert("Please enter a message to send", 'danger');
        return false;
    }
    else
    {
        return true;
    }
}    

function showAlert(msg, type) {
    const alertPlaceholder = document.getElementById('alertMessagesArea');
    alertPlaceholder.innerHTML = "";
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${msg}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');
    alertPlaceholder.append(wrapper);
}
