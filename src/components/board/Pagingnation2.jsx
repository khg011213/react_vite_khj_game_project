import React from "react";

const Pagingnation2 = ({ paging, onClickPaging }) => {
  const { currentPage, totalPages, prev, next } = paging;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {prev && (
          <li className="page-item">
            <a
              href="#"
              onClick={() => onClickPaging(currentPage - 1)} // 이전 페이지 클릭 시
              className="page-link"
              aria-label="Previous"
            >
              &laquo;
            </a>
          </li>
        )}
        {[...Array(totalPages)].map((_, index) => (
          // 스프레드 연산자 ...를 사용하여 위의 빈 배열을 복사하여 새로운 배열을 만듭니다. 이 과정은 빈 요소가 아닌 실제 요소들을 다루기 위해 필요합니다.
          <li
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
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
        {next && (
          <li className="page-item">
            <a
              href="#"
              onClick={() => onClickPaging(currentPage + 1)} // 다음 페이지 클릭 시
              className="page-link"
              aria-label="Next"
            >
              &raquo;
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagingnation2;
