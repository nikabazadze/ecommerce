export const formatPhoneNumber = (value) => {
    if (!value) return value;
    if (value.length > 14) return value.slice(0, 14);

    // Removing all non-digit characters
    const phoneNumber = value.replace(/[^\d]/g, '');

    // Format for 10-digit numbers
    if (phoneNumber.length <= 10) {
        return phoneNumber.replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, (match, g1, g2, g3) => {
            if (g2 && g3) {
                return `(${g1}) ${g2}-${g3}`;
            } else if (g2) {
                return `(${g1}) ${g2}`;
            } else {
                return `(${g1}`;
            }
        });
    }

    // Format for 11-digit numbers
    return phoneNumber.replace(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/, (match, g1, g2, g3, g4) => {
        if (g2 && g3 && g4) {
            return `+${g1} (${g2}) ${g3}-${g4}`;
        } else if (g2 && g3) {
            return `+${g1} (${g2}) ${g3}`;
        } else if (g2) {
            return `+${g1} (${g2}`;
        } else {
            return `+${g1}`;
        }
    });
};