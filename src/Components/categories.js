import { useEffect, useState } from "react";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    async function getCategories() {
        fetch(`https://api.publicapis.org/categories`, {
            method: 'GET',

        }).then(response => response.json())
            .then(data => {
                setCategories(data.categories);
            })
    }

    function updateLogs() {
        let activities = JSON.parse(localStorage.getItem("activities")) || [];

            activities.push({
                userId: 12345,
                activity: "User browsed categories",
                date: Date.now(),
                sql: "INSERT into Activities (activity, date, userId) VALUES (activity, date, userId)"
            })

            localStorage.setItem("activities", JSON.stringify(activities));
    }

    useEffect(() => {
        getCategories();
        updateLogs();
    }, [])

    return (
        <>
        <div className="categories-container">
        {categories.length ? categories.map(item => {
            return (
                <div className="item">{item}</div>
            )
        }) : ""}
        </div>
        
        </>
    );
}

export default Categories;