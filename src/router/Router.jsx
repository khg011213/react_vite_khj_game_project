import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LottoPage from "../components/pages/LottoPage";
import RspPage from "../components/pages/RspPage";
import BoardListPage from "../components/pages/BoardListPage";
import BoardWritePage from "../components/pages/BoardWritePage";
import BoardUpdatePage from "../components/pages/BoardUpdatePage";
import JasonPage from "../components/pages/jasonPage";
import JasonPage2 from "../components/pages/JasonPage2";
import EmpListPage from "../components/pages/EmpListPage";
import EmpWritePage from "../components/pages/EmpWritePage";
import JasonPage3 from "../components/pages/JasonPage3";
import EmpUpdatePage from "../components/pages/EmpUpdatePage";

const routes = [
  {
    path: "/",
    element: <App />,
    loader: () => "가위바위보",
    children: [
      {
        path: "/",
        loader: () => "가위바위보",
        element: <RspPage />,
      },
    ],
  },
  {
    path: "/lotto",
    element: <App />,
    loader: () => "로또",
    children: [
      {
        path: "/lotto",
        loader: () => "로또",
        element: <LottoPage />,
      },
    ],
  },
  {
    path: "/boards",
    element: <App />,
    loader: () => "게시판",
    children: [
      {
        path: "/boards",
        loader: () => "게시판",
        element: <BoardListPage />,
      },
      {
        path: "/boards/write",
        loader: () => "글쓰기",
        element: <BoardWritePage />,
      },
      {
        path: "/boards/:bid",
        loader: () => "업데이트",
        element: <BoardUpdatePage />,
      },
    ],
  },
  {
    path: "/lego",
    element: <App />,
    loader: () => "lego",
    children: [
      {
        path: "/lego",
        loader: () => "레고테이블",
        element: <JasonPage />,
      },
    ],
  },
  {
    path: "/lego2",
    element: <App />,
    loader: () => "lego2",
    children: [
      {
        path: "/lego2",
        loader: () => "레고테이블2",
        element: <JasonPage2 />,
      },
    ],
  },
  {
    path: "/lego3",
    element: <App />,
    loader: () => "lego3",
    children: [
      {
        path: "/lego3",
        loader: () => "레고테이블3",
        element: <JasonPage3 />,
      },
    ],
  },
  {
    path: "/emp",
    element: <App />,
    loader: () => "emp",
    children: [
      {
        path: "/emp",
        loader: () => "emp테이블",
        element: <EmpListPage />,
      },
      {
        path: "/emp/write",
        loader: () => "글쓰기",
        element: <EmpWritePage />,
      },
      {
        path: "/emp/:empno",
        loader: () => "글쓰기",
        element: <EmpUpdatePage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
