import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

const Clients =  (clients = [], action) => {
  switch (action.type) {
    case DELETE:
      return clients.filter((client) => client._id !== action.payload);
    case UPDATE:
      return clients.map((client) =>
        client._id === action.payload._id ? action.payload : client
      );
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...clients, action.payload];
    default:
      return clients;
  }
};

export default Clients