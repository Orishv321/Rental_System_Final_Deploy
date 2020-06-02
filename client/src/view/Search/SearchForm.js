import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as FA from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
let SearchForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [locations, setLocations] = useState([]);
  const history = useHistory();
  useEffect(() => {
    props.allHomes && setLocations(props.allHomes);
  }, [props.allHomes]);
  let searchHandel = (data) => {
    history.push(`/search`);
  };
  return (
    <form onSubmit={handleSubmit(searchHandel)}>
      <div className="search-div">
        <div>
          <input
            type="text"
            className="input"
            name="search"
            placeholder={
              errors.search ? errors.search.message : "Kathmandu-Nepal"
            }
            ref={register({
              required: "Address in required",
              pattern: {
                value: /^[#.0-9a-zA-Z\s,-]{5,30}$/,
                message: `Should contain Alphabetes or "-"`,
              },
            })}
            list={"locationList"}
          />
          <datalist id={"locationList"}>
            {locations &&
              locations.map((l, key) => (
                <option key={key} value={l.location} />
              ))}
          </datalist>
          <FA.FaSearch
            onClick={handleSubmit(searchHandel)}
            className="tab-icon"
            size="1rem"
          />
        </div>
      </div>
    </form>
  );
};
let mapStateToProps = (state) => {
  return {
    allHomes: state.HomeInfoReducer.allHome,
  };
};
export default connect(mapStateToProps, null)(SearchForm);
