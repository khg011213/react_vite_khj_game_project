import React, { useEffect, useState } from "react";
import boardService from "../../services/BoardService";

const BoardListPage = () => {
  const [boards, setBoards] = useState([]);

  // 컴포턴트가 처음 랜더링된후 실행
  useEffect(() => {
    console.log("use Effectiv 실행");
    initBoards();
  }, []);

  const initBoards = () => {
    boardService.getPagingList().then((response) => {
      console.log(response); //성공했을때
    });
  };

  return <div>게시판 실행</div>;
};

export default BoardListPage;
