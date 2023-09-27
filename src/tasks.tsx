import { useCallback, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import TaskCard from "./components/task-card";
import { GrAdd } from "react-icons/gr";
import {
  taskArray,
  statusArray,
  TaskCardType,
  statusType,
} from "./utils/data-tasks";
import AddTask from "./components/add-task";

function Tasks() {
  const [showAddtaskModal, setShowAddtaskModal] = useState(false);
  const [tasks, setTasks] = useState<TaskCardType[]>(taskArray);
  const [currentlyHovering, setCurrentlyHovering] = useState<statusType | null>(
    null
  );

  const colums = statusArray?.map((status) => {
    const taskInColunm = tasks.filter((task) => task.status === status);
    return {
      status,
      totalPoints: taskInColunm.reduce(
        (accu, current) => accu + current?.points,
        0
      ),
      tasks: taskInColunm,
    };
  });

  const updateTask = useCallback(
    (task: TaskCardType) => {
      const updatedTask = tasks.map((tas) => (tas.id === task.id ? task : tas));

      setTasks(updatedTask);
    },
    [colums]
  );

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    status: statusType
  ) => {
    e.preventDefault();
    setCurrentlyHovering(null);
    const Id = e.dataTransfer.getData("id");

    const task = tasks.find((tas) => tas.id === +Id);

    if (task) {
      updateTask({ ...task, status });
    }
  };

  const handleDragEnter = (status: statusType) => {
    setCurrentlyHovering(status);
  };
  return (
    <div className="flex divide-x">
      {colums?.map((colum, i) => (
        <div
          onDrop={(e) => handleDrop(e, colum.status)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => handleDragEnter(colum.status)}
          key={i}
          className={currentlyHovering === colum.status ? "bg-gray-100" : ""}
        >
          <div className="flex items-center justify-between px-2">
            <h3 className="text-3xl p-2 capitalize font-bold text-gray-500">
              {colum.status}
            </h3>
            <span className="text-xl rounded-full bg-gray-100 px-2 text-gray-500">
              {colum?.totalPoints}
            </span>
          </div>
          {colum.tasks.map((task, index) => (
            <TaskCard key={index} task={task} updateTask={updateTask} />
          ))}
        </div>
      ))}

      {showAddtaskModal === false && (
        <button
          onClick={() => setShowAddtaskModal(!showAddtaskModal)}
          className="absolute  bottom-10 right-10 bg-gray-200 h-12 w-12 hover:scale-110 duration-300 flex items-center justify-center rounded-full"
        >
          <GrAdd className="text-3xl" />
        </button>
      )}

      {showAddtaskModal && (
        <AddTask handleClose={() => setShowAddtaskModal(false)} />
      )}
    </div>
  );
}

export default Tasks;
