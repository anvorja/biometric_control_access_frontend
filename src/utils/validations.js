export const validateAndFormatInput = {
    // Validate and sanitize against SQL injection
    sanitizeInput: (input) => {
        if (typeof input !== 'string') return input;

        const sqlPatterns = /('|"|;|--|\/\*|\*\/|xp_|UNION|SELECT|INSERT|UPDATE|DELETE|DROP|EXEC|\/\*|\*\/)/gi;
        return input.replace(sqlPatterns, '');
    },

    // Validate email format
    validateEmail: (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    },

    // Format email to lowercase
    formatEmail: (email) => {
        return email.toLowerCase().trim();
    },

    // Validate name format
    validateName: (name) => {
        // Verificar que no haya números
        if (/\d/.test(name)) {
            return { isValid: false, error: 'El nombre no puede contener números' };
        }

        // Patrón que permite solo letras, espacios y tildes específicas en vocales
        const validNamePattern = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/;

        if (!validNamePattern.test(name)) {
            return {
                isValid: false,
                error: 'Solo se permiten tildes en vocales (á, é, í, ó, ú)'
            };
        }

        return { isValid: true, error: null };
    },

    // Format name (to be used only when submitting)
    formatName: (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
            .trim();
    },

    // Validate password
    validatePassword: (password) => {
        const validations = [
            {
                isValid: password.length >= 6,
                error: 'La contraseña debe tener al menos 6 caracteres'
            },
            {
                isValid: /[A-Z]/.test(password),
                error: 'La contraseña debe contener al menos una mayúscula'
            },
            {
                isValid: /[a-z]/.test(password),
                error: 'La contraseña debe contener al menos una minúscula'
            },
            {
                isValid: /\d/.test(password),
                error: 'La contraseña debe contener al menos un número'
            }
        ];

        const failedValidation = validations.find(v => !v.isValid);
        return failedValidation
            ? { isValid: false, error: failedValidation.error }
            : { isValid: true, error: null };
    }
};