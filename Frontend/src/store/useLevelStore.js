import axios, { getErrorMessage } from "#lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const useLevelStore = create((set) => ({
  levelInfos: null,

  getLevels: async () => {
    try {
      const { data } = await axios.get("/level");
      set({ levelInfos: data.levels });
      return data.levels;
    } catch (error) {
      toast.error(getErrorMessage(error), { id: "levels" });
      return null;
    }
  },
}));

export default useLevelStore;
