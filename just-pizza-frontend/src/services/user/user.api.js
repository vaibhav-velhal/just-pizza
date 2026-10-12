const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// User Details
export const userDetails = async (token) => {
    const res = await fetch(`${BASE_URL}/api/user`,{
        "method": "GET",
        "headers": {
            "authorization": `Bearer ${token}`
        }
    });
    
    const data = await res.json();
    
    if (!res.ok) {
        throw new Error(data.msg || "Failed to fetch data");
    }
    
    return data;
}


// Edit User
export const editUser = async (token, userData) => {
    const res = await fetch(`${BASE_URL}/api/user`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to update data");
    }

    return data;
};

// Delete User
export const deleteUser = async (token) => {
    const res = await fetch(`${BASE_URL}/api/user`, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to delete user");
    }

    return data;
};