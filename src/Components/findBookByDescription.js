import { useEffect, useState } from 'react'
import Select from 'react-select';

const FindByDescription = ({ userId}) => {
    const [description, setDescription] = useState();
    const [books, setBooks] = useState([]);
    const [categorySelect, setCategorySelect] = useState("Select");
    let categories = [];

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        updateLogs("book-search by description", description);

        fetch(`https://api.publicapis.org/entries?Description=${description}`, {
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

    function updateLogs(activity, description) {
        let activities = JSON.parse(localStorage.getItem("activities")) || [];

        activities.push({
            userId: userId,
            activity: activity,
            request: description,
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

    if (books) {
        books.forEach(item => {
            categories.push(item.Category)
        })
    }    

    const removeDuplicates = [...new Set(categories)];

    return (
        <>
            <div className='form-container'>
                <div className='label'>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder='Enter description' onChange={(e) => setDescription(e.target.value)}></input>
                </form>
            </div>
            {books.length > 0 ? <div className='filter-buttons'> <div className='filter'>Filter By Category
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
                {books.length > 0 ? books.map((item, key) => {
                    return (
                        <>
                            <div key={key} className='row-data'>{item.API}</div>
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

export default FindByDescription;