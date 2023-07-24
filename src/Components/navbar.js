import { Link } from 'react-router-dom';

const NavBar = () => {
    // nav component desinating their linked paths and their layout in the nav-bar front-end.
    return (
        <>
            <Link to="/find-book">Find A Book</Link>
            <Link to="/find-book-by-description">Find A Book By Description</Link>
            <Link to="/find-book-by-category">Find A Book By Category</Link>
            <Link to="/random-book">Find A Random Book</Link>
            <Link to="/random-by-category">Find A Random Book By Category</Link>
            <Link to="/random-by-description">Find A Random Book By Description</Link>
            <Link to="/categories">Browse Categories</Link>
            <Link to="/logs">Logs</Link>
            </>
    );
};

export default NavBar;