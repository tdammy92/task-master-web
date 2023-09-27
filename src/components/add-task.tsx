import React from "react";
import { GrClose } from "react-icons/gr";

function AddTask({ handleClose }: { handleClose: () => void }) {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-10  backdrop-blur-sm z-50 flex items-center">
      <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
        <button
          className=" absolute  top-2  right-3 rounded-full  bg-gray-100   h-6 w-6 flex items-center justify-center"
          onClick={handleClose}
        >
          <GrClose className="text-sm" />
        </button>
        <h2>Create Task</h2>
        <form className="flex flex-col">
          <input
            type="text"
            placeholder="Title"
            className="border rounded-lg focus:outline-none px-2"
          />

          <select name="status" id=""></select>
          <button
            className=" w-full mt-3 bg-gray-200 p-1  rounded-md"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
