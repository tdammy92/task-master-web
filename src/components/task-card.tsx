import React, { useState } from "react";
import { TaskCardType } from "../utils/data-tasks";
import {
  FaArrowsAltH,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
  FaRegTrashAlt,
} from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi2";
import { format } from "date-fns";
import { formatMessageDateTime } from "../utils/date";

type taskCardProps = {
  task: TaskCardType;
  updateTask: (task: TaskCardType) => void;
};

function TaskCard({ task, updateTask }: taskCardProps) {
  const { title, id, priority, createdAt, updatedAt } = task;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("id", id.toString())}
      className="border rounded-lg py-2 px-2 m-2 bg-white w-56"
    >
      <div className="py-2">
        {isEditing ? (
          <input
            className="text-base font-base focus:outline-none"
            value={title}
            onBlur={() => setIsEditing(false)}
            onChange={(e) => updateTask({ ...task, title: e.target.value })}
          />
        ) : (
          <h1
            className="text-base font-base"
            onClick={() => setIsEditing(true)}
          >
            {title}
          </h1>
        )}
      </div>
      <div className="flex justify-between items-center text-gray-500 py-2  text-sm">
        <div className="flex gap-2  items-center">
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

        <div>
          <FaRegTrashAlt className="text-red-400" />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
