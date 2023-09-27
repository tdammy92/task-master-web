import React, { useState } from "react";
import { TaskCardType } from "../utils/data-tasks";
import {
  FaArrowsAltH,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
} from "react-icons/fa";

type taskCardProps = {
  task: TaskCardType;
  updateTask: (task: TaskCardType) => void;
};

function TaskCard({ task, updateTask }: taskCardProps) {
  const { title, id, points, priority } = task;
  const [isEditing, setIsEditing] = useState(false);
  const updatePoints = (sign: "-" | "+") => {
    if (sign == "+") {
      if (points >= 13) {
        return;
      }
      updateTask({ ...task, points: points + 1 });
    } else {
      if (points === 0) return;

      updateTask({ ...task, points: points - 1 });
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("id", id.toString())}
      className="border rounded-lg py-2 px-2 m-2 bg-white w-56"
    >
      <div className="py-2">
        {isEditing ? (
          <input
            className="text-base font-base"
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
      <div className="flex justify-between text-gray-500 py-2  text-sm">
        <div className="flex gap-2  items-center">
          <p>BUS-{id}</p>
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
        <div className="flex  gap-x-1 text-basee ">
          <button onClick={() => updatePoints("-")}>-</button>
          <span className="text-sm font-semibold">{points}</span>
          <button onClick={() => updatePoints("+")}>+</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
