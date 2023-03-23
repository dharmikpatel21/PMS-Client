import React from "react";
import DashTableRow from "./DashTableRow";
import { Link } from "react-router-dom";

const DashTable = ({ title, data, link }) => {
    return (
        <div className="companies">
            <div className="table-card card">
                <div className="card-header">
                    <h2>{title}</h2>
                    {link ? (
                        <Link to={link}>
                            <button>See All</button>
                        </Link>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="card-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Job Title</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <DashTableRow key={row._id} row={row} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashTable;
