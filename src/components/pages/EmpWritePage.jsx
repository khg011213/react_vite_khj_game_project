import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import EmpService from "../../services/EmpService";

function EmpWritePage() {
  const initBoardState = {
    empno: "",
    ename: "",
    job: "",
    mgr: "",
    hiredate: "",
    sal: "",
    comm: "",
    deptno: "",
  };

  const [emp, setEmp] = useState(initBoardState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmp({ ...emp, [name]: value });
  };

  const saveBoard = () => {
    let data = {
      empno: emp.empno,
      ename: emp.ename,
      job: emp.job,
      mgr: emp.mgr,
      hiredate: emp.hiredate,
      sal: emp.sal,
      comm: emp.comm,
      deptno: emp.deptno,
    };

    EmpService.write(data)
      .then((response) => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return submitted ? (
    <Navigate to={{ pathname: "/emp" }} />
  ) : (
    <div>
      <div className="container mt-3">
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center mt-3">신규 직원 등록</h3>
              <div className="card-body">
                <div className="form-group"></div>
                <div className="form-group mt-3">
                  <label> 직원번호 </label>
                  <input
                    type="text"
                    placeholder="직원번호"
                    name="empno"
                    className="form-control"
                    value={emp.empno}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label> 이름 </label>
                  <input
                    placeholder="이름"
                    name="ename"
                    className="form-control"
                    value={emp.ename}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label> 직업 </label>
                  <input
                    type="text"
                    placeholder="직업"
                    name="job"
                    className="form-control"
                    value={emp.job}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label> mgr </label>
                  <input
                    placeholder="mgr"
                    name="mgr"
                    className="form-control"
                    value={emp.mgr}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label> 고용일 </label>
                  <input
                    type="date"
                    placeholder="고용일"
                    name="hiredate"
                    className="form-control"
                    value={emp.hiredate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label> 급여 </label>
                  <input
                    placeholder="급여"
                    name="sal"
                    className="form-control"
                    value={emp.sal}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label> comm </label>
                  <input
                    type="text"
                    placeholder="comm"
                    name="comm"
                    className="form-control"
                    value={emp.comm}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label> 부서번호 </label>
                  <input
                    placeholder="부서번호"
                    name="deptno"
                    className="form-control"
                    value={emp.deptno}
                    onChange={handleInputChange}
                  />
                </div>

                <button className="btn btn-success mt-3" onClick={saveBoard}>
                  Save
                </button>
                <button
                  className="btn btn-danger mt-3"
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpWritePage;
