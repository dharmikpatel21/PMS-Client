import React from "react";

const DashboardCard = (props) => {
    return (
        <div className="dashboard-card">
            <div>
                <h1>{props.value}</h1>
                <span>{props.label}</span>
            </div>
        </div>
    );
};

export default DashboardCard;
