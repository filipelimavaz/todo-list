import React from 'react'
import css from './header.module.css'

const Header = ({ getSearch }) => {

    const handleSearch = (e) => {
        const searchTerm = e.target.parentElement.querySelector('input').value;
        getSearch(searchTerm);
    };

    return (
        <nav className={css.header}>
            <div className={css.div_header}>
                <h1>Todo List</h1>
                <div className={css.right_box}>
                    <div className={css.div_search}>
                        <input onChange={handleSearch} type="search" />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header