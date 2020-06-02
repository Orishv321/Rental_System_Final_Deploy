import React, { useState } from "react";
import { connect } from "react-redux";
import ViewHome from "./Home Info/ViewHome";
import AllTendentsView from "./Tendents/AllTendentsView";

let HomeOwnersProfile = () => {
  const [tabIndex, setTabIndex] = useState(1);
  return (
    <section>
      <nav className="space-evenly h-nav h-nav-grid">
        {/* home info ma all work huxn add home add tendednts delete home and to edit the home inf */}
        <div className="h-nav-item" onClick={() => setTabIndex(1)}>
          Home Info
        </div>
        {/* //tendents ko ma only tendents ko profile n home info herna milxa */}
        <div className="h-nav-item" onClick={() => setTabIndex(2)}>
          Tendents Bills
        </div>

        <div className="h-nav-item" onClick={() => setTabIndex(3)}>
          Messages
        </div>
      </nav>
      {/* //The filed to view the tablist */}
      <div>
        <div className="tab-area">{tabIndex === 1 && <ViewHome />}</div>
        <div className="tab-area">{tabIndex === 2 && <AllTendentsView />}</div>
      </div>
    </section>
  );
};
let mapStateToProps = (state) => {
  return {};
};
let mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeOwnersProfile);
