import React from "react";
import { useState, useRef } from "react";

import styles from './Search.module.css';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    const [ localSearchTerm, setLocalSearchTerm ] = useState('');
    const inputRef = useRef(null);

    // When clicked on, search bar becomes wider to see input text
    function handleClick() {
        const input = document.getElementById("search-input");
        input.style.display = "block";
        inputRef.current.focus();
        showInput(true);
    };

    // When search input loses focus it gets removed and only renders search icon
    function handleBlur() {
        showInput(false);
    };

    // Hides or shows search input
    function showInput(show) {
        const input = document.getElementById("search-input");
        const icon = document.getElementById("search-icon");
        input.style.display = show ? "block" : "none";
        input.style.width = show ? "100%" : "0";
        icon.style.left = show ? "2rem" : "0";
    };

    return (
        <div className={styles.container} onBlur={handleBlur} >
            <SearchIcon className={styles.icon} id="search-icon" onClick={handleClick} />
            <input
                id="search-input"
                className={styles.input}
                type="text"
                value={localSearchTerm}
                ref={inputRef}
                onChange={(({target}) => setLocalSearchTerm(target.value))}
                placeholder="Search"
            />
        </div>
    );
};

export default Search;