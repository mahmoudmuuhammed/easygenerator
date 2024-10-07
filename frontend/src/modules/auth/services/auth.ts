import axios from "axios";
import { JsonResponse } from "../../../shared/types/response";

export const signup = async (data: any) => {
  try {
    const response = await axios.post<JsonResponse<{ oauth_token: string }>>(
      "http://localhost:8000/api/v1/auth/signup",
      data,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: any) => {
  try {
    const response = await axios.post<JsonResponse<{ oauth_token: string }>>(
      "http://localhost:8000/api/v1/auth/login",
      data,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
