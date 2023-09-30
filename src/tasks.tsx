import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import TaskCard from "./components/task-card";
import { GrAdd } from "react-icons/gr";
import { SlOptionsVertical } from "react-icons/sl";
import { taskArray, TaskCardType, statusType } from "./utils/data-tasks";
import AddTask from "./components/add-task";
import { getAllStatus, getAllTask, updateTask } from "./services/api";

function Tasks() {
  const queryClient = useQueryClient();
  const [showAddtaskModal, setShowAddtaskModal] = useState(false);
  const [tasks, setTasks] = useState<TaskCardType[]>(taskArray);
  const [currentlyHovering, setCurrentlyHovering] = useState<statusType | null>(
    null,
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

  const { mutate, isLoading, error } = useMutation(updateTask, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tasks"]);
    },
    onError(error, variables, context) {},
  });

  const colums = StatusData?.map((status: statusType) => {
    const taskInColunm = tasksData?.filter(
      (task: TaskCardType) => task?.status === status,
    );
    return {
      status,
      totalItems: taskInColunm?.length,
      tasks: taskInColunm,
    };
  });

  const handleUpdateTask = useCallback(
    (task: TaskCardType) => {
      // const updatedTask = tasks.map((tas) => (tas.id === task.id ? task : tas));
      // setTasks(updatedTask);

      mutate({ task });
    },
    [colums],
  );

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    status: statusType,
  ) => {
    e.preventDefault();
    setCurrentlyHovering(null);
    const Id = e.dataTransfer.getData("id");

    const task = tasksData.find((tas: TaskCardType) => tas.id === +Id);

    if (task) {
      handleUpdateTask({ ...task, status });
    }
  };

  const handleDragEnter = (status: statusType) => {
    setCurrentlyHovering(status);
  };

  // console.log("Task loading ", tasksLoading);
  // console.log(JSON.stringify(tasksData, null, 3));
  return (
    <div className="mt-3 flex divide-x">
      {colums?.map((colum: any, i: number) => (
        <div
          onDrop={(e) => handleDrop(e, colum.status)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => handleDragEnter(colum.status)}
          key={i}
          className={
            currentlyHovering === colum.status
              ? "min-w-[300px]  bg-gray-100"
              : "mx-2 min-w-[280px] rounded-lg  bg-gray-50"
          }
        >
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center">
              <h3 className="p-1 text-2xl font-bold capitalize text-gray-500">
                {colum.status}
              </h3>
              {colum?.totalItems > 0 && (
                <span className="rounded-full bg-white text-sm  text-gray-500">
                  {colum?.totalItems}
                </span>
              )}
            </div>

            <button>
              <SlOptionsVertical />
            </button>
          </div>
          {colum?.tasks?.map((task: TaskCardType, index: number) => (
            <TaskCard key={index} task={task} updateTask={handleUpdateTask} />
          ))}
        </div>
      ))}

      {showAddtaskModal === false && (
        <button
          onClick={() => setShowAddtaskModal(!showAddtaskModal)}
          className="absolute  bottom-10 right-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 duration-300 hover:scale-110"
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
