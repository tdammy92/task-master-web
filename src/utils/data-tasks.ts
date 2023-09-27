export type statusType = "todo" | "in-progress" | "done";

export type prorityType = "low" | "medium" | "high";
export type TaskCardType = {
  title: string;
  points: number;
  status: statusType;
  priority: prorityType;
  id: number;
};

export const statusArray: statusType[] = ["todo", "in-progress", "done"];

export const taskArray: TaskCardType[] = [
  {
    title: "Add more feature to SimpuGo",
    points: 4,
    id: 1,
    status: "done",
    priority: "high",
  },
  {
    title: "learn a new language",
    points: 5,
    id: 2,
    status: "todo",
    priority: "low",
  },
  {
    title: "Write my business moodel",
    points: 6,
    id: 3,
    status: "done",
    priority: "low",
  },
  {
    title: "Go to the market",
    points: 10,
    id: 4,
    status: "in-progress",
    priority: "medium",
  },
  {
    title: "Go to the office",
    points: 10,
    id: 5,
    status: "todo",
    priority: "low",
  },
];
