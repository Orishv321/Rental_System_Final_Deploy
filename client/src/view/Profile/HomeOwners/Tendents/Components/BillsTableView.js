import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import * as FA from "react-icons/fa";
import * as actions from "../../../../../Store/Actions";
let BillsTableView = (props) => {
  const { handleSubmit, errors, register } = useForm();

  const [billInfo, setBillInfo] = useState([]);
  const [editState, setEditState] = useState(false);
  let totalSumTotal = null;
  let totalPaid = null;
  useEffect(() => {
    props.usersInfo && props.getTendentsBillsInfo(props.usersInfo._id);
  }, [props.usersInfo]);
  useEffect(() => {
    props.userBills && setBillInfo(props.userBills);
  }, [props.userBills]);

  let addBills = (data) => {
    data = { ...data, _usersID: props.usersInfo._id };
    props.addBills(data);
  };
  let handelChange = (e, key) => {
    let curentValue = billInfo[key];
    curentValue = { ...curentValue, [e.target.name]: e.target.value };
    let newValue = billInfo;
    newValue[key] = curentValue;
    setBillInfo([...newValue]);
  };
  return (
    <div className="col">
      <form>
        <div className="tab-form-grid space-evenly">
          <div className="tab-input-div">
            <div className="cols">
              <label className="tab-label"> Electricity :</label>{" "}
              <input
                type="number"
                name="electricity"
                className="tab-input"
                ref={register({
                  required: "Electricity per month required",
                  pattern: {
                    value: /^[0-9]{1,4}$/,
                    message: "should contain Numbers",
                  },
                })}
              />
            </div>

            <small className="error-msg">
              {errors.electricity && errors.electricity.message}
            </small>
          </div>
          <div className="tab-input-div">
            <div className="cols">
              <label className="tab-label"> Water Price :</label>{" "}
              <input
                type="number"
                name="water"
                className="tab-input"
                ref={register({
                  required: "Per month water price required",
                  pattern: {
                    value: /^[0-9]{1,4}$/,
                    message: "should contain Numbers",
                  },
                })}
              />
            </div>

            <small className="error-msg">
              {errors.water && errors.water.message}
            </small>
          </div>
          <div className="tab-input-div">
            <div className="cols">
              <label className="tab-label"> Rent Per Month :</label>{" "}
              <input
                type="number"
                name="rentPerMonth"
                className="tab-input"
                ref={register({
                  required: "Rent Per month is required",
                  pattern: {
                    value: /^[0-9]{1,5}$/,
                    message: "should contain Numbers",
                  },
                })}
              />
            </div>

            <small className="error-msg">
              {errors.rentPerMonth && errors.rentPerMonth.message}
            </small>
          </div>
          <FA.FaPlusSquare
            onClick={handleSubmit(addBills)}
            size="2.5rem"
            className="tab-icon"
            style={{
              padding: "10px",
            }}
          />
        </div>
      </form>
      <table role="table" className="table">
        <caption>Users Bill</caption>
        <thead role="rowgroup">
          <tr role="row">
            <th role="columnheader">Date</th>
            <th role="columnheader">Electricity</th>
            <th role="columnheader">Water</th>
            <th role="columnheader">RentPerMonth</th>
            <th role="columnheader">SumTotal</th>
            <th role="columnheader">Paid Amount</th>
            {localStorage.getItem("homeOwnersID") && (
              <th role="columnheader">Manage</th>
            )}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {billInfo &&
            billInfo.map((bi, key) => (
              <tr role="row" key={key}>
                <td role="cell" data-title="Date">
                  {bi.date || ""}
                </td>
                <td role="cell" data-title="Electricity">
                  {(!editState && bi.electricity) || ""}
                  {editState && (
                    <input
                      type="text"
                      name="electricity"
                      value={bi.electricity}
                      onChange={(e) => handelChange(e, key)}
                    />
                  )}
                </td>
                <td role="cell" data-title="Water">
                  {(!editState && bi.water) || ""}
                  {editState && (
                    <input
                      type="text"
                      name="water"
                      value={bi.water}
                      onChange={(e) => handelChange(e, key)}
                    />
                  )}
                </td>
                <td role="cell" data-title="RentPerMonth">
                  {(!editState && bi.rentPerMonth) || ""}
                  {editState && (
                    <input
                      type="text"
                      name="rentPerMonth"
                      value={bi.rentPerMonth}
                      onChange={(e) => handelChange(e, key)}
                    />
                  )}
                </td>
                <td role="cell" data-title="SumTotal">
                  {Number(bi.electricity) +
                    Number(bi.water) +
                    Number(bi.rentPerMonth) || "0"}
                </td>
                <td role="cell" data-title="Paid">
                  {(!editState && bi.paidAmt) || 0}
                  {editState && (
                    <input
                      type="text"
                      name="paidAmt"
                      value={bi.paidAmt}
                      onChange={(e) => handelChange(e, key)}
                    />
                  )}
                </td>
                {localStorage.getItem("homeOwnersID") && (
                  <td role="cell" data-title="Manage">
                    <div className="space-evenly">
                      <FA.FaPenAlt
                        style={{ cursor: "pointer" }}
                        size="1.6rem"
                        onClick={() => {
                          setEditState(!editState);
                          editState && props.update_BillInfo(key, bi);
                        }}
                      />
                      <FA.FaTrashAlt
                        style={{ cursor: "pointer" }}
                        size="1.6rem"
                        onClick={() =>
                          window.confirm(
                            `Do you want to delete information of  ${bi.date} ?? `,
                          ) && props.delete_BillInfo(bi._id, bi._userID)
                        }
                      />
                    </div>
                  </td>
                )}
                <td style={{ display: "none" }}>
                  {
                    (totalSumTotal =
                      Number(totalSumTotal) +
                      Number(bi.electricity) +
                      Number(bi.water) +
                      Number(bi.rentPerMonth))
                  }
                  {(totalPaid = Number(totalPaid) + Number(bi.paidAmt))}
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot role="rowgroup">
          <tr role="row">
            <td colSpan="4" align="center">
              {" "}
              Total
            </td>
            <td role="cell" data-title="Sum Total">
              {totalSumTotal || ""}
            </td>
            <td role="cell" data-title="Paid Amount">
              {totalPaid || ""}
            </td>
          </tr>
          <tr role="row">
            <td role="cell" colSpan="5">
              {" "}
              Total Payment Left
            </td>
            <td role="cell" data-title="Total Payment Left" colSpan="2">
              {" "}
              {totalSumTotal - totalPaid > 0 ? totalSumTotal - totalPaid : "0"}
            </td>
          </tr>
          <tr role="row">
            <td role="cell" colSpan="5">
              Advance Amout
            </td>
            <td role="cell" colSpan="2" data-title="Advance Amount">
              {totalPaid - totalSumTotal > 0 ? totalPaid - totalSumTotal : "0"}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    userBills: state.BillsReducer.bills,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    addBills: (data) => dispatch(actions.Post_NewBills(data)),
    getTendentsBillsInfo: (id) => dispatch(actions.Get_TendentsBills(id)),
    delete_BillInfo: (id, userID) =>
      dispatch(actions.Delete_Bill_Info(id, userID)),
    update_BillInfo: (id, data) => dispatch(actions.Update_Bill_Info(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillsTableView);
