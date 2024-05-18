import create from "zustand";
import { useRouter } from "next/router";

// Define types for state
interface States {
  username: string;
  password: string;
  userId: number;
  loggedIn: boolean;
  color: string;
}

const defaultStates: States = {
  username: "",
  password: "",
  userId: 0,
  loggedIn: false,
  color: "",
};

// Define types for actions
interface Actions {
  setDataOnLogin: (username: string, password: string, userId: number) => void;
  setColorData: (color: string) => void
}

// Create and export the store
const useAppStore = create<States & Actions>((set) => ({
  ...defaultStates,
  setDataOnLogin: (username, password, userId) => {
    set({ username, password, userId, loggedIn: true });
  },
  setColorData: (color) => {
    set({ color });
  },
}));

export default useAppStore;
