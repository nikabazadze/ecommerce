const API_ENDPOINT = "http://localhost:3000/api";

export const getProducts = async () => {
    const response = await fetch(`${API_ENDPOINT}/products`);
    return response.json();
};