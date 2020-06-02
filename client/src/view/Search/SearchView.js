import React, { useState } from "react";
import * as FA from "react-icons/fa";
import SearchForm from "./SearchForm";

let SearchView = (props) => {
  const [allHomes, setAllHomes] = useState([]);
  return (
    <div className="col">
      <SearchForm />
      <div>
        <div className="tab-g-row">
          {allHomes.length ? (
            allHomes.map((home, key) => (
              <div className="tab-card">
                <div className="tab-card-container">
                  <div className="tab-card-title">home.location</div>
                  <div className="tab-card-body">
                    <div>
                      <label>Avilable Rooms :</label> home.room_availability
                    </div>
                    <div>
                      <label>Rooms Size :</label>home.room_size
                    </div>
                    <div>
                      <label>Price of Each Room per month :</label> home.price
                    </div>
                    <div>
                      <div>
                        <FA.FaEye className="tab-icon" size="1.6rem" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="tab-card-title">Loding ....</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchView;
