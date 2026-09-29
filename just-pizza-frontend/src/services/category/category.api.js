const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Get all categories
export const getAllCategories = async () => {
    const res = await fetch(`${BASE_URL}/api/category`, {
        method: "GET"
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to fetch categories");
    }

    return data;
};