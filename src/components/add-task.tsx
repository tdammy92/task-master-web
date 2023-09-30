import React, { SyntheticEvent, useState } from "react";
import { GrClose } from "react-icons/gr";
import { IoHourglassOutline } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    status: StatusData[0] ?? "in-progress",
    priority: "low",
    color: "",
    dueDate: "",
  });

  function handleSubmiit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    if (newTask.title === "") return;

    const newTaskPayload: TaskCardType = {
      title: newTask?.title ?? "",
      status: newTask?.status ?? "in-progress",
      priority: newTask.priority ?? "low",
      color: newTask.color,
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
    <div
      // onClick={handleClose}
      className="fixed inset-0  z-50 flex  items-center bg-black bg-opacity-10 backdrop-blur-sm"
    >
      <div className="fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 rounded-lg bg-white p-4 md:relative md:mx-auto md:max-w-md">
        <button
          className=" absolute  right-3  top-2 flex  h-6   w-6 items-center justify-center rounded-full bg-gray-100"
          onClick={handleClose}
        >
          <GrClose className="text-xs" />
        </button>
        <h2>Create Task</h2>
        <form
          className="mx-4 my-5 flex min-w-[300px] flex-col"
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
            className="my-2 h-10 rounded-lg border px-2 focus:outline-none"
          />

          <select
            name="status"
            id=""
            className="my-2 h-10 rounded-lg border px-2 focus:outline-none"
            defaultValue={StatusData[0]}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            {StatusData?.map((item: TaskCardType["status"], i: number) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            name="priority"
            id=""
            className="my-2 h-10 rounded-lg border px-2 focus:outline-none"
            defaultValue={"low"}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            <option value={"low"}>low</option>
            <option value={"medium"}>Medium</option>
            <option value={"high"}>High</option>
          </select>

          <div className="mt-2  flex justify-center gap-x-2">
            <div
              className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-gray-500  bg-white text-gray-500 duration-300 hover:scale-110`}
              onClick={() => setNewTask((prev) => ({ ...prev, color: "" }))}
            >
              <IoMdClose className="text-gray-500" />
            </div>
            {!!colorTag &&
              colorTag?.map((color: string, index: number) => {
                return (
                  <div
                    key={index}
                    className={`h-6 w-6 cursor-pointer rounded-full ${color} flex items-center justify-center text-gray-100 duration-300 hover:scale-110`}
                    onClick={() =>
                      setNewTask((prev) => ({ ...prev, color: color }))
                    }
                  >
                    {newTask?.color === color && <BsCheckLg />}
                  </div>
                );
              })}
          </div>

          <button
            className=" mt-3 w-full rounded-md bg-gray-100  p-1"
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
