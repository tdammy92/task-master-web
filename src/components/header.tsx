import React from "react";
import { BsSearch } from "react-icons/bs";
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
      <div>
        <IoOptionsOutline className="text-xl" />
      </div>
    </div>
  );
}

export default Headeer;
