const form = document.querySelector(".contact-form");
const formStatus = document.getElementById("my-form-status");

if (form) {
    async function handleSubmit(event) {
        event.preventDefault();
        var data = new FormData(event.target);
        formStatus.innerHTML = "Sending...";
        form.querySelector("button").disabled = true;
        formStatus.style.color = "#3498db";

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            form.querySelector("button").disabled = false;
            if (response.ok) {
                formStatus.innerHTML = "Thanks! Your message has been sent; 🚀";
                formStatus.style.color = "#27ae60";
                form.reset();
            } else {
                formStatus.innerHTML = "Oops! There was a problem.";
                formStatus.style.color = "#e74c3c";
            }
        }).catch(error => {
            form.querySelector("button").disabled = false;
            formStatus.innerHTML = "Server Error.";
        });
    }
    form.addEventListener("submit", handleSubmit);
}