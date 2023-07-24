import { useEffect, useState } from "react";

const Random = () => {
    const [books, setBooks] = useState([]);
    const [random, setRandom] = useState([]);
    const [request, setRequest] = useState();

    async function randomBook(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch(`https://api.publicapis.org/random`, {
            method: 'GET',

        }).then(response => response.json())
            .then(data => {
                if (data.entries) {
                    setBooks(data.entries)
                    localStorage.setItem("books", JSON.stringify(data.entries));
                } else {
                    setBooks("No Book Found");
                }
            })

        let activities = JSON.parse(localStorage.getItem("activities")) || [];

        activities.push({
            userId: 12345,
            activity: "random book search",
            date: Date.now(),
            sql: "INSERT into Activities (activity, date, userId) VALUES (activity, date, userId)"
        })

        localStorage.setItem("activities", JSON.stringify(activities));
    }

    return (
        <>
            <div className="random-container">
                <div className="random-button-container">
                    <button className="random" onClick={(e) => randomBook(e)}>Find A Random book</button>

                    <div className="book-details-grid">
                        <div id='book-title'>Title</div>
                        <div id='book-description'>Description</div>
                        <div id='book-category'>Category</div>
                        <div id='book-link'>Link</div>
                        {books ? books.map(item => {
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
            </div>
        </>
    )
}

export default Random;