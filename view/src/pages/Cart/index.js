import React from "react";
import styles from './Cart.module.css';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

import { products } from "../../data/mockData";

function Cart() {
    const product = products[0];

    function renderTable() {
        return (
            <table>
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles.product}>
                            <div className={styles.imgContainer}>
                                <img src={product.url} alt="Product picture" />
                            </div>
                            <div className={styles.meta}>
                                <p>{product.product_name}</p>
                                <p>Color: Deep Ocean</p>    {/* This hardcoded color should be changed with actual chosen color */}
                            </div>
                        </td>
                        <td className={styles.price}>$28.99</td>
                        <td className={styles.quantity}>
                            <div className={styles.quantityWrapper}>
                                <div>
                                    <span>1</span>
                                    <AddIcon className={styles.addIcon}/>
                                </div>
                                <div>
                                    <span>Remove</span>
                                    <ClearIcon className={styles.clearIcon} fontSize="small"/>
                                </div>
                            </div>
                        </td>
                        <td className={styles.total}>$28.99</td>
                    </tr>
                    <tr>
                        <td className={styles.product}>
                            <div className={styles.imgContainer}>
                                <img src={product.url} alt="Product picture" />
                            </div>
                            <div className={styles.meta}>
                                <p>{product.product_name}</p>
                                <p>Color: Deep Ocean</p>    {/* This hardcoded color should be changed with actual chosen color */}
                            </div>
                        </td>
                        <td className={styles.price}>$28.99</td>
                        <td className={styles.quantity}>
                            <div className={styles.quantityWrapper}>
                                <div>
                                    <span>1</span>
                                    <AddIcon className={styles.addIcon}/>
                                </div>
                                <div>
                                    <span>Remove</span>
                                    <ClearIcon className={styles.clearIcon} fontSize="small"/>
                                </div>
                            </div>
                        </td>
                        <td className={styles.total}>$28.99</td>
                    </tr>
                </tbody>
            </table>
        );
    };
    
    return (
        <div className={styles.cartPage}>
            <h1>shopping cart</h1>
            <div className={styles.table}>{renderTable()}</div>
            <div className={styles.cartFooter}>
                <p>Subtotal: $57.98</p>     {/* This hardcoded total should be changed with actual total */}
                <p>Taxes and <span>Shipping</span> calculated at chekout</p>
                <button>Check Out</button>
            </div>
        </div>
    );
};

export default Cart;