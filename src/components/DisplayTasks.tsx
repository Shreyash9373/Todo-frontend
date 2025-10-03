import { toast } from "react-toastify";
import { completTask, deleteTask, getTasks } from "../api/taskapi";
import { useAuth, type Task } from "../context/AuthContext";

const DisplayTasks = () => {
  const { tasks, setTasks, setEditingTask, fetchTasks } = useAuth();
  const handleStatus = (id: number, status: boolean) => {
    completTask(id, status).then((res) => {
      if (res) {
        fetchTasks();
        toast.success(res.message);
      }
    });
  };
  const handleDelete = async (id: number) => {
    const res = await deleteTask(id);
    if (res) {
      fetchTasks();
      toast.success("Task Deleted Successfully");
    } else {
      toast.error("Error Deleting Task");
    }
  };
  return (
    <div className="flex flex-col items-center gap-3 my-7 ">
      {tasks.length === 0 ? (
        <h1>No Tasks Added Yet</h1>
      ) : (
        tasks.map((task: Task) => (
          <div className="border border-gray-300 px-4 py-2 rounded w-full">
            <div className="flex justify-between">
              <p className="w-fit">{task.name}</p>
              <div className="flex justify-end gap-1">
                <button
                  onClick={() => {
                    setEditingTask(task);
                  }}
                  className="bg-blue-400 px-2 py-1 mb-2 rounded cursor-pointer hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  // onClick={() =>
                  //   setTasks((prev) => {
                  //     return prev.filter((t) => t !== task);
                  //   })
                  // }
                  onClick={() => handleDelete(task.id || 0)}
                  className="bg-red-500 px-2 py-1 rounded mb-2 cursor-pointer hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <p>{task.date}</p>
              <button
                // onClick={() =>
                //   setTasks((prev) =>
                //     prev.map((t) =>
                //       t === task ? { ...t, completed: !t.completed } : t
                //     )
                //   )
                // }
                onClick={() => handleStatus(task.id || 0, !task.completed)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  task.completed === true
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-300 hover:bg-yellow-400"
                }`}
              >
                {task.completed ? `Completed` : "Complete"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayTasks;
