import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
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

  // const startIndex = (currentPage - 1) * pageSize;
  // 목적: 현재 페이지에서 보여줄 데이터의 시작 인덱스를 계산합니다.
  // currentPage: 사용자가 보고 있는 현재 페이지 번호입니다. 예를 들어, 1페이지, 2페이지 등이 있습니다.
  // pageSize: 한 페이지에 보여줄 데이터의 개수입니다. 예를 들어, 10개 항목을 표시하고 싶다면 pageSize는 10입니다.
  // 계산 방식:
  // 현재 페이지가 1이면, startIndex는 (1 - 1) * pageSize로 0이 됩니다. 즉, 배열의 첫 번째 요소에서 시작합니다.
  // 현재 페이지가 2이면, startIndex는 (2 - 1) * pageSize로 10이 됩니다. 즉, 배열의 11번째 요소에서 시작합니다.
  // 이를 통해 사용자가 요청한 페이지에 따라 적절한 데이터 범위를 지정합니다.
  // 2. const currentData = emp.slice(startIndex, startIndex + pageSize);
  // 목적: emp 배열에서 현재 페이지에 해당하는 데이터를 슬라이스(추출)합니다.
  // emp: 전체 데이터 배열입니다. 예를 들어, 직원 정보를 담고 있는 배열일 수 있습니다.
  // slice() 메서드: JavaScript의 배열 메서드로, 주어진 인덱스 범위에 해당하는 배열의 일부를 반환합니다.
  // startIndex: 슬라이스의 시작 인덱스.
  // startIndex + pageSize: 슬라이스의 끝 인덱스. 이 인덱스는 포함되지 않습니다.
  // 예를 들어, startIndex가 0이고 pageSize가 10일 경우, currentData는 emp 배열의 0번부터 9번까지의 요소를 포함하게 됩니다.
  // 3. const totalPages = Math.ceil(emp.length / pageSize);
  // 목적: 전체 데이터에서 몇 페이지가 필요한지를 계산합니다.
  // emp.length: 전체 데이터의 개수입니다. 예를 들어, 50명의 직원이 있다면 emp.length는 50입니다.
  // 계산 방식:
  // emp.length / pageSize는 전체 데이터 수를 페이지당 데이터 수로 나눈 값으로, 총 페이지 수를 구합니다. 예를 들어, 50명의 직원을 10명씩 표시하면 5페이지가 필요합니다.
  // Math.ceil() 메서드는 주어진 수보다 크거나 같은 가장 작은 정수를 반환합니다. 이는 전체 데이터가 페이지당 데이터 수로 나누어떨어지지 않을 때, 추가 페이지를 반영하기 위해 사용됩니다. 예를 들어, 53명의 직원을 10명씩 나누면 5.3이 되며, Math.ceil()을 사용하여 6페이지로 올림합니다.

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
                    <th className="text-center">수정</th>
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
                          className="btn btn-danger"
                          value={emp.empno}
                          onClick={deleteBoard}
                        >
                          삭제
                        </button>
                      </td>
                      <td className="text-center">
                        <Link to={"/emp/" + emp.empno}>
                          <button className="btn btn-success" value={emp.empno}>
                            수정
                          </button>
                        </Link>
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
