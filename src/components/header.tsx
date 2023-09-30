import { format } from "date-fns";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi2";
import { IoOptionsOutline } from "react-icons/io5";

function Headeer() {
  return (
    <div className="h-12 px-4  bg-gray-100 flex  items-center justify-between">
      <div>
        <h1 className="text-2xl">Task Master</h1>
      </div>
      <div className="bg-white flex items-center rounded-lg px-3 text-gray-500 text-xl">
        <input placeholder="search task" className="focus:outline-none" />
        <BsSearch />
      </div>

      <div className="flex items-center gap-x-3">
        <div className="flex items-center gap-x-1 text-sm">
          <HiOutlineClock className="text-l" />{" "}
          <span>{format(new Date(), "dd MMM yyyy hh:mm a")}</span>
        </div>
        <div>
          <IoOptionsOutline className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default Headeer;
