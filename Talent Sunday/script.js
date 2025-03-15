document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const talentTypeSelect = document.getElementById('talentType');
    const otherTalentLabel = document.getElementById('otherTalentLabel');
    const otherTalentInput = document.getElementById('otherTalent');
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const paymentSlipLabel = document.getElementById('paymentSlipLabel');
    const paymentSlipInput = document.getElementById('paymentSlip');
    const transactionIdLabel = document.getElementById('transactionIdLabel');
    const transactionIdInput = document.getElementById('transactionId');
    const errorMessagesDiv = document.getElementById('errorMessages');

    // Function to display error messages
    function displayError(message) {
        errorMessagesDiv.textContent = message;
        errorMessagesDiv.style.display = 'block';
    }

    // Function to clear error messages
    function clearErrors() {
        errorMessagesDiv.textContent = '';
        errorMessagesDiv.style.display = 'none';
    }

    // Talent Type Change Handler
    talentTypeSelect.addEventListener('change', () => {
        if (talentTypeSelect.value === 'other') {
            otherTalentLabel.style.display = 'block';
            otherTalentInput.style.display = 'block';
            otherTalentInput.setAttribute('required', 'required');
        } else {
            otherTalentLabel.style.display = 'none';
            otherTalentInput.style.display = 'none';
            otherTalentInput.removeAttribute('required');
        }
    });

    // Payment Method Change Handler
    paymentMethodSelect.addEventListener('change', () => {
        if (paymentMethodSelect.value === 'online') {
            paymentSlipLabel.style.display = 'none';
            paymentSlipInput.style.display = 'none';
            paymentSlipInput.removeAttribute('required');
            transactionIdLabel.style.display = 'block';
            transactionIdInput.style.display = 'block';
            transactionIdInput.setAttribute('required', 'required');
        } else if (paymentMethodSelect.value !== '') {
            paymentSlipLabel.style.display = 'block';
            paymentSlipInput.style.display = 'block';
            paymentSlipInput.setAttribute('required', 'required');
            transactionIdLabel.style.display = 'none';
            transactionIdInput.style.display = 'none';
            transactionIdInput.removeAttribute('required');
        } else {
            paymentSlipLabel.style.display = 'none';
            paymentSlipInput.style.display = 'none';
            paymentSlipInput.removeAttribute('required');
            transactionIdLabel.style.display = 'none';
            transactionIdInput.style.display = 'none';
            transactionIdInput.removeAttribute('required');
        }
    });

    // Form Submission Handler
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        clearErrors(); // Clear any previous error messages

        // Collect form data
        const formData = new FormData(form);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        //  ***IMPORTANT: Replace with your EmailJS credentials***
        emailjs.send(
            'service_xl3wr8l', //  <----  YOUR Service ID
            'template_7ktedtm', //  <----  YOUR Template ID
            formDataObject,
            'm5cA-okHHGdZuWJoh'    //  <----  YOUR Public Key
        )
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Registration submitted successfully!');
            form.reset();

            // Hide additional fields after successful submission
            otherTalentLabel.style.display = 'none';
            otherTalentInput.style.display = 'none';
            paymentSlipLabel.style.display = 'none';
            paymentSlipInput.style.display = 'none';
            transactionIdLabel.style.display = 'none';
            transactionIdInput.style.display = 'none';

        }, (err) => {
            console.log('FAILED...', err);
            displayError('Error submitting form. Please try again.');
        });
    });
});