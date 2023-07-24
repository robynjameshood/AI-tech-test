import { useEffect, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";

const Logs = ({ userId}) => {
    const [logs, setLogs] = useState([]);
    // localStorage.clear();

    function getLogs() {
        setLogs((JSON.parse(localStorage.getItem("activities"))))
    }

    function updateLogs() {
        let activities = JSON.parse(localStorage.getItem("activities")) || [];

            activities.push({
                userId: userId,
                activity: "User browsed logs",
                date: Date.now(),
                sql: "INSERT into Activities (activity, date, userId) VALUES (activity, date, userId)"
            })

            localStorage.setItem("activities", JSON.stringify(activities));
    }

    useEffect(() => {
        getLogs();
        updateLogs();
    }, [])

    const formatDate = (date) => {
        let formatted = new Date(date).toISOString();
        return formatted;
    }

    return (
        <>
        <div className="disclaimer">The SQL statements per entry assume there are two tables Users/Activities - Linked via Primary/Foreign Key on UserId</div>
        <CSVLink data={logs}>Download log as CSV</CSVLink>
        {logs ? logs.map(item => {
            return (
                <>
                <div className="userId">UserID: {item.userId}</div>
                <div className="date">Date: {formatDate(item.date)}</div>
                <div className="activity">Activity: {item.activity}</div>
                <div className="sql">SQL Statement: {item.sql}</div>
                </>
            )
            
        }) : ""}
        </>
    )
}

export default Logs;