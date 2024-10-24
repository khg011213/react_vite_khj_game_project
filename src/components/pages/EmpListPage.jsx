import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmpService from "../../services/EmpService";

const EmpListPage = () => {
  const [emp, setEmp] = useState([]); // 전체 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // 페이지 크기

  // 컴포넌트가 처음 랜더링된 후 실행
  useEffect(() => {
    console.log("useEffect 실행");
    initBoards();
  }, []);

  const initBoards = () => {
    EmpService.getPagingList() // 전체 데이터를 가져오는 API 호출
      .then((response) => {
        console.log(response); // 성공했을때
        setEmp(response.data); // 전체 데이터 설정
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteBoard = (e) => {
    const { value } = e.target;
    EmpService.remove(value).then((response) => {
      console.log(response + " 삭제 완료");
      initBoards(); // 삭제 후 데이터 다시 불러오기
    });
  };

  const onClickPaging = (page) => {
    setCurrentPage(page); // 페이지 클릭 시 현재 페이지 업데이트
  };

  // 현재 페이지에 맞는 데이터만 필터링
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = emp.slice(startIndex, startIndex + pageSize); // 현재 페이지에 해당하는 데이터 슬라이스
  const totalPages = Math.ceil(emp.length / pageSize); // 전체 페이지 수 계산

  return (
    <div className="container mt-3">
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">게시판</h1>
        <p className="mb-4">
          DataTables is a third party plugin that is used to generate the demo
          table below. For more information about DataTables, please visit the{" "}
          <a target="_blank" href="https://datatables.net">
            official DataTables documentation
          </a>
          .
        </p>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              DataTables Example
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>직업</th>
                    <th>mgr</th>
                    <th>고용일</th>
                    <th>급여</th>
                    <th>comm</th>
                    <th>부서번호</th>
                    <th className="text-center">삭제</th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.map((emp) => (
                    <tr key={emp.empno}>
                      <td>{emp.empno}</td>
                      <td>{emp.ename}</td>
                      <td>{emp.job}</td>
                      <td>{emp.mgr}</td>
                      <td>{emp.hiredate}</td>
                      <td>{emp.sal}</td>
                      <td>{emp.comm}</td>
                      <td>{emp.deptno}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-success"
                          value={emp.empno}
                          onClick={deleteBoard}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 페이징 */}
            <ul className="pagination justify-content-center">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  key={index}
                >
                  <a
                    href="#"
                    onClick={() => onClickPaging(index + 1)} // 페이지 번호 클릭 시
                    className="page-link"
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
            </ul>

            <hr />
            <Link to="/emp/write">
              <button type="button" className="btn btn-primary">
                글쓰기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpListPage;
