import React from "react";

const DashTableRow = ({ row }) => {
    // console.log(row.name, row.jobTitle, row.hiringStatus);
    return (
        <tr>
            <td>{row.name}</td>
            <td>{row.jobTitle}</td>
            <td>{row.hiringStatus ? "Open" : "Close"}</td>
        </tr>
    );
};

export default DashTableRow;
