import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import EmpService from "../../services/EmpService";

function EmpUpdatePage() {
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
  const { empno } = useParams();
  const [emp, setEmp] = useState(initBoardState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    EmpService.get(empno)
      .then((response) => {
        setEmp(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmp({ ...emp, [name]: value });
  };

  const updateBoard = () => {
    EmpService.update(emp)
      .then((response) => {
        naviage(`/emp`);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const naviage = useNavigate();

  return (
    <div>
      <div className="container mt-3">
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center mt-3">직원 정보 갱신</h3>
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

                <button className="btn btn-success mt-3" onClick={updateBoard}>
                  Save
                </button>
                <button
                  className="btn btn-success mt-3"
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

export default EmpUpdatePage;
