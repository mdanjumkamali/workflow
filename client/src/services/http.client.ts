import axios, { AxiosInstance, AxiosError } from "axios";
import toast from "react-hot-toast";
import store from "../redux/store";
import { logout } from "@/redux/slice/auth.slice";

// Define an interface for the expected error response
interface ErrorResponse {
  message: string;
}

class httpClient {
  private static instance: httpClient;
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://workflow-phi.vercel.app/api/",
      withCredentials: true,
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const status = error.response?.status;

        if (status === 400 || status === 404) {
          const errorMessage = (
            (error.response?.data as ErrorResponse)?.message || ""
          ).replaceAll(",", " | ");
          toast.error(`Error: ${errorMessage}`);
          return;
        }

        if (status === 401) {
          toast.error("Unauthorized. Please log in again.");
          store.dispatch(logout());
          window.location.replace("/login");
          return;
        }

        if (status === 403) {
          toast.error(
            "Forbidden. You don't have permission to access this resource."
          );
          return;
        }

        if (status === 500) {
          toast.error("Internal server error. Please try again later.");
          return;
        }

        throw error;
      }
    );
  }

  static getInstance(): httpClient {
    if (!httpClient.instance) {
      httpClient.instance = new httpClient();
    }

    return httpClient.instance;
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const httpsClient = httpClient.getInstance().getClient();
