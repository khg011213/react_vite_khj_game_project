import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagingnation2 from "../board/Pagingnation2";

const JasonPage2 = () => {
  const [data, setData] = useState([]);
  const [paging, setPaging] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 초기값 1로 설정

  useEffect(() => {
    axios
      .get(
        `https://sample.bmaster.kro.kr/contacts?pageno=${currentPage}&pagesize=10`
      )
      .then((response) => {
        console.log(response.data); // API 응답 확인
        setData(response.data.contacts); //데이터 넣어주기

        // 총 페이지 수 계산
        const totalCount = response.data.totalcount; // 전체 데이터가 몇개인지 데이터 속에서 가져오기
        const pagesize = 10;
        const totalPages = Math.ceil(totalCount / pagesize); //전체 데이터 / 한 페이지에 보여줄 숫자

        setPaging({
          currentPage: currentPage, //보여줄 페이지 설정
          totalPages: totalPages,
          prev: currentPage > 1,
          next: currentPage < totalPages,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("에러가 나든 안나든 무조건 실행");
      });
  }, [currentPage]); // currentPage가 변경될 때마다 호출

  const removeClick = (event) => {
    let no = event.target.name;
    setData(data.filter((client) => client.no !== no));
    console.log("삭제", no);
  };

  const onClickPaging = (page) => {
    setCurrentPage(page); // 페이지 클릭 시 현재 페이지 업데이트
  };

  return (
    <div className="container mt-3">
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
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
                    <th>전화번호</th>
                    <th>주소</th>
                    <th>사진</th>
                    <th>삭제</th>
                  </tr>
                </thead>

                <tbody>
                  {data &&
                    data.map((post) => (
                      <tr key={post.no}>
                        <td>{post.no}</td>
                        <td>{post.name}</td>
                        <td>{post.tel}</td>
                        <td>{post.address}</td>
                        <td>
                          {" "}
                          <img src={post.photo} alt="" />
                        </td>
                        <td className="text-center">
                          <button
                            name={post.no}
                            id={post.no}
                            className="btn btn-success"
                            value={post.no}
                            onClick={removeClick}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* 페이징           */}
            <ul className="pagination justify-content-center">
              {paging != null
                ? [...Array(paging.totalPages)].map((_, index) => (
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
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JasonPage2;
