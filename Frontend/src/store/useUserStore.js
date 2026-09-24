import axios, { getErrorMessage } from "#lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import useLevelStore from "#store/useLevelStore";

const useUserStore = create((set) => {
  const submit = async (url, payload) => {
    set({ loading: true });
    try {
      const { data } = await axios.post(url, payload);
      set({ user: data.user });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ loading: false });
    }
  };

  return {
    user: null,
    loading: false,
    checkingAuth: true,

    register: (name, email, password) =>
      submit("/auth/register", { name, email, password }),

    login: (email, password) => submit("/auth/login", { email, password }),

    logout: async () => {
      try {
        await axios.post("/auth/logout");
        useLevelStore.setState({ levelInfos: null });
        set({ user: null });
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },

    authentication: async () => {
      try {
        const { data } = await axios.get("/auth");
        set({ user: data.user });
      } catch (error) {
        if (error.response?.status !== 401) {
          toast.error(getErrorMessage(error));
        }
        set({ user: null });
      } finally {
        set({ checkingAuth: false });
      }
    },

    setUser: (user) => set({ user }),
  };
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = error.config?.url?.startsWith("/auth");
    if (error.response?.status === 401 && !isAuthRequest) {
      useUserStore.setState({ user: null });
    }
    return Promise.reject(error);
  }
);

export default useUserStore;
