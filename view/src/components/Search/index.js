import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import styles from './Search.module.css';
import searchIcon from "./searchIcon.svg";
import { setSearchTerm, selectSearchTerm } from "../../store/SearchSlice";

function Search({ direction = "left" }) {
    const [ localSearchTerm, setLocalSearchTerm ] = useState('');
    const currentSearchTerm = useSelector(selectSearchTerm);
    const containerRef = useRef(null);
    const iconRef = useRef(null);
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentSearchTerm) {
            navigate('/shop');
        }
    }, [currentSearchTerm, navigate]);

    // Dispatches search term to the redux store
    function handleKeyDown(e) {
        if (e.key === "Enter" && localSearchTerm) {
            e.preventDefault();
            inputRef.current.blur();
            showInput(false);
            dispatch(setSearchTerm(localSearchTerm));
            setLocalSearchTerm('');
        };
    };

    // When clicked on, search bar becomes wider to see input field
    function handleClick() {
        inputRef.current.style.display = "block";
        inputRef.current.focus();
        showInput(true);
    };

    // When search input loses focus it gets removed and only renders search icon
    function handleBlur() {
        showInput(false);
    };

    // Hides or shows search input
    function showInput(show) {
        if (window.innerWidth < 800) {
            // Window width - (2 * header padding) - menu icon, person icon and cart icon widths - gaps between icons
            const containerWidth = window.innerWidth - (2 * 16) - 30 - 22 - 20 - (3 * 14) + 10;
            containerRef.current.style.width = show ? `${containerWidth}px` : "auto";
        }
        inputRef.current.style.display = show ? "block" : "none";
        inputRef.current.style.width = show ? "100%" : "0";
        iconRef.current.style.left = show ? "2rem" : "0";
    };

    return (
        <div style={{justifyContent: (direction === "left") ? "flex-end" : "flex-start"}}
             className={styles.container}
             ref={containerRef}
             onBlur={handleBlur}
        >
            <img src={searchIcon} className={styles.searchIcon} onClick={handleClick} ref={iconRef} alt="Search icon" />
            <input
                type="text"
                ref={inputRef}
                placeholder="Search"
                value={localSearchTerm}
                className={styles.input}
                onKeyDown={handleKeyDown}
                onChange={(({target}) => setLocalSearchTerm(target.value))}
            />
        </div>
    );
};

export default Search;