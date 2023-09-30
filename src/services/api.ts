import { TaskCardType } from "./../utils/data-tasks";
import axios from "axios";
import { TaskCardType } from "../utils/data-tasks";

const baseApi = `http://localhost:3000/`;

//QUERIES
const getAllTask = async () => {
  try {
    const res = await axios.get(`${baseApi}tasks`);
    return await res.data;
  } catch (error) {
    throw error;
  }
};

const getAllStatus = async () => {
  try {
    const res = await axios.get(`${baseApi}status`);
    return await res.data;
  } catch (error) {
    throw error;
  }
};

//MUTATIOONS

//create a task
const createTask = async ({ body }: { body: TaskCardType }) => {
  try {
    const res = await axios.post(`${baseApi}tasks`, { ...body });
    return await res.data;
  } catch (error) {
    throw error;
  }
};

//update a task
const updateTask = async ({ task }: { task: TaskCardType }) => {
  try {
    const res = await axios.put(`${baseApi}tasks/${task.id}`, { ...task });
    return await res.data;
  } catch (error) {
    throw error;
  }
};

//delete a task
const deleteTask = async ({ id }: { id: string | number }) => {
  try {
    const res = await axios.delete(`${baseApi}tasks/${id}`);
    return await res.data;
  } catch (error) {
    throw error;
  }
};

export { getAllTask, getAllStatus, createTask, updateTask, deleteTask };

// console.log("update api function got called");
// console.log("updated data", JSON.stringify(task, null, 3));
