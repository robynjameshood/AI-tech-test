import { useEffect, useState } from "react";

const RandomByDescription = () => {
    const [random, setRandom] = useState([]);
    const [request, setRequest] = useState();

    async function findRandomByCategory(e) {
        e.preventDefault();
        e.stopPropagation();

        let activities = JSON.parse(localStorage.getItem("activities")) || [];

        activities.push({
            userId: 12345,
            activity: "random book search by description",
            date: Date.now(),
            sql: "INSERT into Activities (activity, date, userId) VALUES (activity, date, userId)"
        })

        localStorage.setItem("activities", JSON.stringify(activities));

        fetch(`https://api.publicapis.org/random?description=${request}`, {
            method: 'GET',

        }).then(response => response.json())
            .then(data => {
                if (data.entries) {
                    setRandom(data.entries)
                    localStorage.setItem("books", JSON.stringify(data.entries));
                } else {
                    setRandom("No Book Found");
                }
            })
    }

    return (
        <>
            <div className="random-by-description">
                <form onSubmit={(e) => findRandomByCategory(e)}>
                    <input type="text" placeholder="Enter A Description" onChange={(e) => setRequest(e.target.value)}></input>
                </form>

                <div className="book-details-grid">
                    <div id='book-title'>Title</div>
                    <div id='book-description'>Description</div>
                    <div id='book-category'>Category</div>
                    <div id='book-link'>Link</div>
                    {random ? random.map(item => {
                        return (
                            <>
                                <div className="row-data">{item.API}</div>
                                <div className="row-data">{item.Description}</div>
                                <div className="row-data">{item.Category}</div>
                                <div className="row-data">{item.Link}</div>
                            </>
                        )
                    }) : ""}
                </div>
            </div>
        </>
    )
}

export default RandomByDescription;