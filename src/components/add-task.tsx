import React, { SyntheticEvent, useState } from "react";
import { GrClose } from "react-icons/gr";
import { IoHourglassOutline } from "react-icons/io5";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createTask, getAllStatus } from "../services/api";
import { TaskCardType, colorTag } from "../utils/data-tasks";
import { v4 as uuidv4 } from "uuid";

function AddTask({ handleClose }: { handleClose: () => void }) {
  const queryClient = useQueryClient();
  const {
    data: StatusData,
    isLoading: statusLoading,
    error: statusError,
  } = useQuery({
    queryKey: ["status"],
    queryFn: getAllStatus,
  });

  const { mutate, isLoading, error } = useMutation(createTask, {
    onSuccess: (data) => {
      console.log("success", data);
      queryClient.invalidateQueries(["tasks"]);
      handleClose();
    },
    onError(error, variables, context) {},
  });

  const [newTask, setNewTask] = useState({
    title: "",
    status: StatusData[0],
    priority: "low",
    color: "",
  });

  function handleSubmiit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    const newTaskPayload: TaskCardType = {
      title: newTask?.title,
      status: newTask?.status,
      priority: newTask.priority,
      id: 0,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    mutate({ body: newTaskPayload });

    // console.log(
    //   JSON.stringify(
    //     { ...newTask, createdAt: new Date(), updatedAt: new Date() },
    //     null,
    //     3
    //   )
    // );
  }

  return (
    <div className="fixed inset-0  bg-black bg-opacity-10  backdrop-blur-sm z-50 flex items-center">
      <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
        <button
          className=" absolute  top-2  right-3 rounded-full  bg-gray-100   h-6 w-6 flex items-center justify-center"
          onClick={handleClose}
        >
          <GrClose className="text-xs" />
        </button>
        <h2>Create Task</h2>
        <form
          className="flex flex-col min-w-[300px] mx-4 my-5"
          onSubmit={handleSubmiit}
        >
          <input
            type="text"
            required
            value={newTask.title}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Title"
            className="border rounded-lg focus:outline-none px-2 h-10 my-2"
          />

          <select
            name="status"
            id=""
            className="border rounded-lg focus:outline-none px-2 h-10 my-2"
            defaultValue={StatusData[0]}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            {StatusData?.map((item, i: number) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            name="priority"
            id=""
            className="border rounded-lg focus:outline-none px-2 h-10 my-2"
            defaultValue={"low"}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            <option value={"low"}>low</option>
            <option value={"medium"}>Medium</option>
            <option value={"high"}>High</option>
          </select>

          <div className="flex  justify-center gap-x-2 mt-2">
            {colorTag?.map((color: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`h-6 w-6 cursor-pointer rounded-full bg-${color}-400 hover:scale-110 duration-300`}
                ></div>
              );
            })}

            {/* <div
              className={`h-6 w-6 cursor-pointer rounded-full bg-green-400`}
            ></div>
            <div
              className={`h-6 w-6 cursor-pointer rounded-full bg-amber-400`}
            ></div>
            <div
              className={`h-6 w-6 cursor-pointer rounded-full bg-purple-400`}
            ></div>
            <div
              className={`h-6 w-6 cursor-pointer rounded-full bg-rose-400`}
            ></div> */}
          </div>

          <button
            className=" w-full mt-3 bg-gray-100 p-1  rounded-md"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <IoHourglassOutline /> : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
