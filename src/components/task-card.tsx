import React, { useState } from "react";
import { TaskCardType } from "../utils/data-tasks";
import {
  FaArrowsAltH,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
  FaRegTrashAlt,
} from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi2";
import { formatMessageDateTime } from "../utils/date";
import { deleteTask } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";

type taskCardProps = {
  task: TaskCardType;
  updateTask: (task: TaskCardType) => void;
};

function TaskCard({ task, updateTask }: taskCardProps) {
  const { title, id, priority, color, dueDate, createdAt, updatedAt } = task;
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(deleteTask, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tasks"]);
    },
    onError(error, variables, context) {},
  });

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("id", id.toString())}
      className={"min-w-56 relative m-2 rounded-lg border bg-white px-2 py-2"}
    >
      <div
        className={twMerge(
          `absolute right-2 top-3 h-3 w-3 rounded-full`,
          color,
        )}
      ></div>
      <div className="py-2">
        {isEditing ? (
          <input
            className="font-base w-full text-base focus:outline-none"
            value={title}
            onBlur={() => setIsEditing(false)}
            onChange={(e) => updateTask({ ...task, title: e.target.value })}
          />
        ) : (
          <h1
            className="font-base text-base"
            onClick={() => setIsEditing(true)}
          >
            {title}
          </h1>
        )}
      </div>
      <div className="flex items-center justify-between py-2 text-sm  text-gray-500">
        <div className="flex items-center  gap-2">
          <div className="flex  items-center">
            <HiOutlineClock className="text-l" />
            <p>
              {!!updatedAt
                ? formatMessageDateTime(new Date(updatedAt))
                : formatMessageDateTime(new Date())}
            </p>
          </div>
          <p>
            {priority === "low" && (
              <FaLongArrowAltDown className="text-amber-500" />
            )}
            {priority === "medium" && (
              <FaArrowsAltH className="text-green-500" />
            )}
            {priority === "high" && (
              <FaLongArrowAltUp className="text-red-500" />
            )}
          </p>
        </div>

        <div
          className="cursor-pointer   duration-300  hover:scale-110"
          onClick={() => mutate({ id })}
        >
          <FaRegTrashAlt className="text-red-400" />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
