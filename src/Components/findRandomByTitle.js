import { useState } from 'react'
import Select from 'react-select';

const RandomByTitle = ({ userId}) => {
    const [title, setTitle] = useState();
    const [books, setBooks] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        updateLogs("random-search by title", title);

        fetch(`https://api.publicapis.org/random?title=${title}`, {
            method: 'GET',

        }).then(response => response.json())
            .then(data => {
                if (data.entries) {
                    setBooks(data.entries)
                    localStorage.setItem("books", JSON.stringify(data.entries));
                } else {
                    setBooks([]);
                }
            })
    }

    function updateLogs(activity, title) {
        let activities = JSON.parse(localStorage.getItem("activities")) || [];

        activities.push({
            userId: userId,
            activity: activity,
            request: title,
            date: Date.now(),
            sql: "INSERT into Activities (activity, date, userId) VALUES (activity, date, userId)"
        })

        localStorage.setItem("activities", JSON.stringify(activities));
    }

    return (
        <>
            <div className='form-container'>
                <div className='label'>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder='Enter a title' onChange={(e) => setTitle(e.target.value)}></input>
                </form>
            </div>

            <div className='book-details-grid'>
                <div id='book-title'>Title</div>
                <div id='book-description'>Description</div>
                <div id='book-category'>Category</div>
                <div id='book-link'>Link</div>
                {books ? books.map((item, key) => {
                    return (
                        <>
                            <div className='row-data'>{item.API}</div>
                            <div className='row-data'>{item.Description}</div>
                            <div className='row-data'>{item.Category}</div>
                            <div className='row-data'>{item.Link}</div>
                        </>
                    )
                }) : ""}


            </div>

        </>
    )
}

export default RandomByTitle;