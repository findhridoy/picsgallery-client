import React from "react";
import DashboardMenu from "../DashboardMenu/DashboardMenu";

const DashboardLayout = ({ children }) => (
  <div className="dashboardLayout">
    <div className="dashboardLayout__menu">
      <DashboardMenu />
    </div>
    <div className="dashboardLayout__items">{children}</div>
  </div>
);

export default DashboardLayout;
