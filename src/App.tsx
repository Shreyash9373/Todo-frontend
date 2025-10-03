import AddTask from "./components/AddTask";
import DisplayTasks from "./components/DisplayTasks";
import { Header } from "./components/Header";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="m-2">
      <ToastContainer />
      <Header />
      <AddTask />
      <DisplayTasks />
    </div>
  );
};

export default App;
