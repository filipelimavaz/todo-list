import React from 'react'
import styles from './header.module.css'
import Button from '../Button/Button';

const Header = ({ getSearch }) => {

    const handleSearch = (e) => {
        const searchTerm = e.target.parentElement.querySelector('input').value;
        getSearch(searchTerm);
    };

    return (
        <nav className={styles.header}>
            <div className={styles.divHeader}>
                <h1>Lista de tarefas</h1>
                <div className={styles.rightBox}>
                    <div className={styles.divSearch}>
                        <input onChange={handleSearch} type="search" placeholder="Buscar por título"/>
                        <Button onClick={handleSearch}>Search</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header