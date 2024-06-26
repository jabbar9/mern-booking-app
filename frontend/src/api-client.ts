import { registerFormData } from "./pages/Register";
import { SigInFormData } from "./pages/SignIn";
import { HotelType } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: registerFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });
    const responseBody = await response.json();

    if (!response.ok){
        throw new Error(responseBody.message);
    }
}

export const signIn = async (formData: SigInFormData) => {    
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });

    const body = await response.json();
    if(!response.ok){
        throw new Error(body.message);
    }
    return body;
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials: "include"
    })

    if(!response.ok){
        throw new Error("Token Invalid");
    }
    return response.json();
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    });

    if(!response.ok){
        throw new Error("Error During Sign Out");
    }
}
export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method:"POST",
        credentials: "include",
        body: hotelFormData,
    });


    if(!response.ok){
        throw new Error("Failed to add hotel");
    }

    return response.json();
}

export const fetchMyHotels = async(): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    });


    if(!response.ok){
        throw new Error("Failed to fetch hotels");
    }

    return response.json();
}


export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Error Fetching Hotels")
    }

    return response.json();
}

export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
        method: "PUT",
        body: hotelFormData,
        credentials: "include",
    });

    if(!response.ok){
        throw new Error("Failed to update Hotel")
    }
    return response.json();
}