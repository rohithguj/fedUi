import create from "zustand";
import { useRouter } from "next/router";

// Define types for state
interface States {
  username: string;
  password: string;
  userId: number;
  loggedIn: boolean;
}

const defaultStates: States = {
  username: "",
  password: "",
  userId: 0,
  loggedIn: false,
};

// Define types for actions
interface Actions {
  setDataOnLogin: (username: string, password: string, userId: number) => void;
}

// Create and export the store
const useAppStore = create<States & Actions>((set) => ({
  ...defaultStates,
  setDataOnLogin: (username, password, userId) => {
    set({ username, password, userId, loggedIn: true});
  },
}));

export default useAppStore;
