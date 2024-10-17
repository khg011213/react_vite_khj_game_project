import http from "./HttpCommon";

const getPagingList = (path = "/boards/list", search = "") => {
  return http.get(path + search);
};

const remove = (id) => {
  return http.delete(`boards/${id}`);
};
const write = (data) => {
  return http.post(`boards/`, data);
};
export default {
  getPagingList,
  remove,
  write,
};
