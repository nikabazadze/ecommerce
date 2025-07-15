import styles from './ProductGrid.module.css';
import ProductCard from '../ProductCard';

function ProductGrid({ products }) {
    return (
        <div className={styles.container}>
            {products.map((product) => <ProductCard product={product} placement='grid' key={product.id} />)}
        </div>
    );
};

export default ProductGrid;