import { useSelector } from "react-redux";
import styles from "./Shop.module.css";
import ProductGrid from "../../components/ProductGrid";
import { selectProducts } from "../../store/ProductsSlice";

function Shop() {
    const products = useSelector(selectProducts);

    return (
        <div className={styles.shopPage}>
            <div className={styles.banner}></div>
            <div className={styles.container}>
                <ProductGrid products={products} />
            </div>
        </div>
    );
};

export default Shop;