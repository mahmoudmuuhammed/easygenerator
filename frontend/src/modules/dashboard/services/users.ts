import axios from "axios";
import { JsonResponse } from "../../../shared/types/response";
import { User } from "../models/users";

export const profile = async (token: string) => {
  try {
    const response = await axios.get<JsonResponse<User>>(
      "http://localhost:8000/api/v1/profile",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
