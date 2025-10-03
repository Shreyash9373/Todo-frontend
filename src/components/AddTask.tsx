import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addTask, updateTask } from "../api/taskapi";
import { toast } from "react-toastify";

interface Task {
  name: string;
  date: string;
  completed: boolean;
}
const AddTask = () => {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const { tasks, setTasks, editingTask, setEditingTask, fetchTasks } =
    useAuth();
  const [task, setTask] = useState<Task>({
    name: "",
    date: "",
    completed: false,
  });
  useEffect(() => {
    if (editingTask) {
      console.log("editing task", editingTask);
      setTask(editingTask);
    }
  }, [editingTask]);
  console.log("task", task);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleClick = async () => {
    if (editingTask) {
      await updateTask(task);
      toast.success("Task Updated Successfully");
      setEditingTask(null);
      fetchTasks();
      setTask({ name: "", date: "", completed: false });

      return;
    }
    const res = await addTask(task);
    if (res) {
      fetchTasks();
      toast.success("Task added successfully");
    } else {
      toast.error("Error adding task");
    }
    setTask({ name: "", date: "", completed: false });

    // if (editingTask) {
    //   setTasks(
    //     tasks.map((t) =>
    //       t.name === editingTask.name && t.date === editingTask.date ? task : t
    //     )
    //   );
    //   setEditingTask(null);
    // } else {
    //   setTasks([...tasks, task]);
    // }
    // setTask({ name: "", date: "", completed: false });
  };
  return (
    <div>
      <div className="flex flex-col items-center mx-auto gap-4 mt-7 border border-gray-500 py-3 px-3 w-min rounded bg-gray-100">
        <input
          className="border rounded px-2 py-1"
          type="text"
          name="name"
          placeholder="Enter Task"
          value={task.name}
          onChange={handleChange}
        />
        <input
          className="border rounded px-2 py-1"
          type="date"
          name="date"
          placeholder="Select Date"
          value={task.date}
          onChange={handleChange}
        />
        <button
          className="bg-yellow-300 px-4 py-2 rounded"
          onClick={handleClick}
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default AddTask;
