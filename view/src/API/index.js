const SERVER_ENDPOINT = "https://ziplix-ecomm-a65ab840df75.herokuapp.com";
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

    return response;
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

export const updateCartItem = async (userId, productId, variant, quantity) => {
    const response = await fetch(`${API_ENDPOINT}/users/${userId}/cart/items/${productId}?variant=${variant}&quantity=${quantity}`, {
        method: "PATCH",
        credentials: 'include',
    });

    return response;
};

export const deleteCartItem = async (userId, productId, variant) => {
    const response = await fetch(`${API_ENDPOINT}/users/${userId}/cart/items/${productId}?variant=${variant}`, {
        method: "DELETE",
        credentials: 'include',
    });

    return response;
};

export const addCartItem = async (userId, productId, variant, quantity) => {
    const response = await fetch(`${API_ENDPOINT}/users/${userId}/cart/items/${productId}?variant=${variant}&quantity=${quantity}`, {
        method: "POST",
        credentials: 'include',
    });

    return response;
};

export const checkout = async (requestBody) => {
    const response = await fetch(`${API_ENDPOINT}/checkout`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json", },
        credentials: 'include',
    });

    return response;
};

export const logout = async () => {
    const response = await fetch(`${SERVER_ENDPOINT}/logout`, { credentials: 'include' });
    return response;
};

export const getUserOrders = async (userId) => {
    const response = await fetch(`${API_ENDPOINT}/orders/users/${userId}`, { credentials: 'include' });
    return await response.json();
};