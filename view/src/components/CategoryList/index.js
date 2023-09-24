import React from "react";
import Grid from '@mui/material/Grid';

import styles from './CategoryList.module.css';
import CategoryListItem from "../CategoryListItem";
import { categories } from "../../data/mockData";

function CategoryList() {
    return (
        <div>
            <Grid container spacing={3}>
                {
                    categories.map((category, index) => (
                        <Grid item xs={4} key={index}>
                            <CategoryListItem category={category} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

export default CategoryList;