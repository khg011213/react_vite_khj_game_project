import http from "./HttpCommon";

const getPagingList = (path = "/emps/list", search = "") => {
  return http.get(path + search);
};

const remove = (id) => {
  return http.delete(`emps/${id}`);
};
const write = (data) => {
  console.log(data);
  return http.post("/emps/", data);
};
// //글번호
// const get = (id) => {
//   console.log(id);
//   return http.get(`/boards/${id}`);
// };

// const update = (data) => {
//   console.log(data);
//   return http.put("/boards/", data);
// };
export default {
  getPagingList,
  remove,
  write,
  // get,
  // update,
};
