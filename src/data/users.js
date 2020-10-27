import { v4 as uuidv4 } from "uuid";

let data = [
  {
    name: "Mike",
    lastName: "scott",
    admin: true,
    status: true,
    id: uuidv4(),
    email: "bob@yahoo.com",
  },
  {
    name: "Mike",
    lastName: "scott",
    admin: false,
    status: true,
    id: uuidv4(),
    email: "bob@yahoo.com",
  },
  {
    name: "Candy",
    lastName: "Dulffer",
    admin: true,
    status: true,
    id: uuidv4(),
    email: "bob@yahoo.com",
  },
];

export function getUsers() {
  return data;
}
