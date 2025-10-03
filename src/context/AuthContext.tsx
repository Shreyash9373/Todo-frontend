import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getTasks } from "../api/taskapi";

export interface Task {
  id?: number;
  name: string;
  date: string;
  completed: boolean;
}
interface AuthContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  editingTask: Task | null;
  setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
  fetchTasks: () => Promise<void>;
}
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <AuthContext.Provider
      value={{ tasks, setTasks, editingTask, setEditingTask, fetchTasks }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
