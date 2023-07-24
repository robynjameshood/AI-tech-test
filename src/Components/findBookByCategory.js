import { useState } from 'react'
import Select from 'react-select';

const FindByCategory = () => {
    const [category, setCategory] = useState();
    const [books, setBooks] = useState([]);
    const [categorySelect, setCategorySelect] = useState("Select");
    let categories = [];

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        

        let activities = JSON.parse(localStorage.getItem("activities")) || [];

        console.log(activities)

        updateLogs("book-search by category");

        fetch(`https://api.publicapis.org/entries?category=${category}`, {
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
    }

    function updateLogs(activity) {
        let activities = JSON.parse(localStorage.getItem("activities")) || [];

        console.log(activities)

        activities.push({
            userId: 12345,
            activity: activity,
            date: Date.now(),
            sql: "INSERT into Activities (activity, date, userId) VALUES (activity, date, userId)"
        })

        localStorage.setItem("activities", JSON.stringify(activities));
    }

    function removeFilter() {
        setBooks(JSON.parse(localStorage.getItem("books")))
        setCategorySelect("Select");
    }

    const handleChange = (e) => {
        updateLogs("user filtered books by description");

        if (e.target.value !== "Select") {
            const filtered = books.filter(item => item.Category === e.target.value);
            setCategorySelect(e.target.value)
            setBooks(filtered);
        } else {
            removeFilter();
        }
    }

    books.forEach(item => {
        categories.push(item.Category)
    })

    const removeDuplicates = [...new Set(categories)];

    return (
        <>
            <div className='form-container'>
                <div className='label'>Please enter the category of the book you wish to find:
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" onChange={(e) => setCategory(e.target.value)}></input>
                </form>
            </div>
            {books.length ? <div className='filter-buttons'> <div className='filter'>Filter By Category
                <select
                    onChange={handleChange}
                >
                    <option>{categorySelect}</option>
                    {removeDuplicates.length ? removeDuplicates.map(item => {
                        return (
                            <option value={item}>{item}</option>
                        )
                    }) : ""}</select>

            </div><button className='clear-filter' onClick={removeFilter}>Remove Filter</button></div> : ""}

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

export default FindByCategory;