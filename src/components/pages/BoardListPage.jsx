import React, { useEffect, useState } from "react";
import boardService from "../../services/BoardService";
import { Link } from "react-router-dom";

const BoardListPage = () => {
  const [boards, setBoards] = useState([]);

  // 컴포턴트가 처음 랜더링된후 실행
  useEffect(() => {
    console.log("use Effectiv 실행");
    initBoards();
  }, []);

  const initBoards = () => {
    boardService
      .getPagingList()
      .then((response) => {
        console.log(response); //성공했을때
        setBoards(response.data.boards);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteBoard = (e) => {
    const { name, value } = e.target;
    console.log(name + "::" + value);
    boardService.remove(value);
    initBoards();
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
                    <th>제목</th>
                    <th>날짜</th>
                    <th>히트</th>
                    <th className="text-center">삭제</th>
                  </tr>
                </thead>

                <tbody>
                  {boards &&
                    boards.map((board) => (
                      <tr key={board.bid}>
                        <td>{board.bid}</td>
                        <td>{board.bname}</td>

                        <td>
                          <Link to={"/board/" + board.bid}>{board.btitle}</Link>
                        </td>

                        <td>{board.bdate}</td>
                        <td>{board.bhit}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-success"
                            value={board.bid}
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
            {/* 페이징           */}
            {/* <PaginationB5
              paging={paging}
              onClickPaging={onClickPaging}
            ></PaginationB5> */}
            <hr />
            <Link to="/boards/write">
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

export default BoardListPage;
