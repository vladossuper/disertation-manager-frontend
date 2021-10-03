import { Priority, Status } from "./app/thunk/task";

export const statuses = [
  { key: Status.TO_DO, value: 'To Do' },
  { key: Status.IN_PROGRESS, value: 'In progress' },
  { key: Status.IN_TEST, value: 'In Test' },
  { key: Status.DONE, value: 'Done' },
];

export const priorities = [
  { key: Priority.LOW, value: 'Low' },
  { key: Priority.MEDIUM, value: 'Medium' },
  { key: Priority.HIGH, value: 'High' },
];

// export const colorToStatus = {
//   [Status.TO_DO]: 
// }