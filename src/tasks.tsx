import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import TaskCard from "./components/task-card";
import { GrAdd } from "react-icons/gr";
import { SlOptionsVertical } from "react-icons/sl";
import { taskArray, TaskCardType, statusType } from "./utils/data-tasks";
import AddTask from "./components/add-task";
import { getAllStatus, getAllTask } from "./services/api";

function Tasks() {
  const [showAddtaskModal, setShowAddtaskModal] = useState(false);
  const [tasks, setTasks] = useState<TaskCardType[]>(taskArray);
  const [currentlyHovering, setCurrentlyHovering] = useState<statusType | null>(
    null
  );

  const {
    data: StatusData,
    isLoading: statusLoading,
    error: statusError,
  } = useQuery({
    queryKey: ["status"],
    queryFn: getAllStatus,
  });

  const {
    data: tasksData,
    isLoading: tasksLoading,
    error: taskError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTask,
  });

  const colums = StatusData?.map((status: statusType) => {
    const taskInColunm = tasksData?.filter(
      (task: TaskCardType) => task?.status === status
    );
    return {
      status,
      totalItems: taskInColunm?.length,
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
    <div className="flex divide-x mt-3">
      {colums?.map((colum, i: number) => (
        <div
          onDrop={(e) => handleDrop(e, colum.status)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => handleDragEnter(colum.status)}
          key={i}
          className={
            currentlyHovering === colum.status
              ? "bg-gray-100"
              : "bg-gray-50 rounded-lg mx-2"
          }
        >
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center">
              <h3 className="text-2xl p-1 capitalize font-bold text-gray-500">
                {colum.status}
              </h3>
              <span className="text-sm rounded-full bg-white  text-gray-500">
                {colum?.totalItems}
              </span>
            </div>

            <button>
              <SlOptionsVertical />
            </button>
          </div>
          {colum?.tasks?.map((task: TaskCardType, index: number) => (
            <TaskCard key={index} task={task} updateTask={updateTask} />
          ))}
        </div>
      ))}

      {showAddtaskModal === false && (
        <button
          onClick={() => setShowAddtaskModal(!showAddtaskModal)}
          className="absolute  bottom-10 right-10 bg-gray-100 h-12 w-12 hover:scale-110 duration-300 flex items-center justify-center rounded-full"
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
