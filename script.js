// Validation du formulaire de connexion
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('button[type="submit"]');

    // Fonction pour afficher les erreurs
    function showError(input, message) {
        let errorElement = input.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            input.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.style.borderColor = '#e74c3c';
    }

    // Fonction pour masquer les erreurs
    function hideError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        input.style.borderColor = '#e1e5e9';
    }

    // Validation de l'email
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailInput, 'L\'adresse e-mail est requise.');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, 'Veuillez entrer une adresse e-mail valide.');
            return false;
        } else {
            hideError(emailInput);
            return true;
        }
    }

    // Validation du mot de passe
    function validatePassword() {
        const password = passwordInput.value;
        
        if (password === '') {
            showError(passwordInput, 'Le mot de passe est requis.');
            return false;
        } else if (password.length < 6) {
            showError(passwordInput, 'Le mot de passe doit contenir au moins 6 caractères.');
            return false;
        } else {
            hideError(passwordInput);
            return true;
        }
    }

    // Événements de validation en temps réel
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '') {
            hideError(emailInput);
        }
    });

    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', function() {
        if (passwordInput.value !== '') {
            hideError(passwordInput);
        }
    });

    // Validation lors de la soumission
    form.addEventListener('submit', function(e) {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            e.preventDefault();
            submitButton.textContent = 'Vérifiez les erreurs';
            setTimeout(() => {
                submitButton.textContent = 'Se connecter';
            }, 2000);
        } else {
            // Simulation de chargement
            submitButton.textContent = 'Connexion en cours...';
            submitButton.disabled = true;
            
            // Ici, vous pouvez ajouter l'appel AJAX pour la connexion
            // Pour cet exemple, on simule un délai
            setTimeout(() => {
                submitButton.textContent = 'Se connecter';
                submitButton.disabled = false;
                alert('Connexion simulée réussie !');
            }, 2000);
        }
    });

    // Animation du bouton au survol
    submitButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    submitButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});