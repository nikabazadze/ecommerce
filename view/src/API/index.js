const SERVER_ENDPOINT = "http://localhost:3000";
const API_ENDPOINT = `${SERVER_ENDPOINT}/api`;

export const getProducts = async () => {
    const response = await fetch(`${API_ENDPOINT}/products`, { credentials: 'include' });
    return response.json();
};

export const addUser = async (firstName, lastName, email, password) => {
    const response = await fetch(`${SERVER_ENDPOINT}/signup`, {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        }),
        headers: { "Content-Type": "application/json", },
        credentials: 'include',
    });

    return response.status;
};

export const login = async (email, password) => {
    const response = await fetch(`${SERVER_ENDPOINT}/login`, {
        method: "POST",
        body: JSON.stringify({
            username: email,
            password
        }),
        headers: { "Content-Type": "application/json", },
        credentials: 'include',
    });

    return await response.json();
};

export const getCurrentUser = async () => {
    const response = await fetch(`${SERVER_ENDPOINT}/currentUser`, { credentials: 'include' });
    return await response.json();
};

export const getUserCart = async (userId) => {
    const response = await fetch(`${API_ENDPOINT}/users/${userId}/cart`, { credentials: 'include' });
    return await response.json();
};

export const updateCartItem = async (userId, productId, quantity) => {
    const response = await fetch(`${API_ENDPOINT}/users/${userId}/cart/items/${productId}?quantity=${quantity}`, {
        method: "PATCH",
        credentials: 'include',
    });

    return response;
};