// Filtre des skills
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".filter-btn");
    const skills = document.querySelectorAll(".skill");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const category = button.getAttribute("data-category");
            skills.forEach(skill => {
                if (category === "all" || skill.getAttribute("data-category") === category) {
                    skill.style.display = "block";
                } else {
                    skill.style.display = "none";
                }
            });
        });
    });
});

// Bouton scroll
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

//Gestion avec EMailJS
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('button');
    const form = document.getElementById('form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        btn.value = 'Sending...'; 
        const serviceID = 'default_service'; 
        const templateID = 'template_mi3qsbk'; 

        formMessage.style.display = 'none';
        formMessage.textContent = '';

        // Envoi via EmailJS
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email'; 
                form.reset(); 

                // Message succès
                formMessage.textContent = 'Votre message a été envoyé avec succès !';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
            })
            .catch((err) => {
                btn.value = 'Send Email'; 

                // Message erreur
                formMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';

                console.error("Erreur EmailJS :", err);
            });
    });
});



