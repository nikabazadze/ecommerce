import styles from './OrderListItem.module.css';
import { styled } from '@mui/material/styles';
import ChosenProducts from "../ChosenProducts";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

function OrderListItem({ order }) {
    const address = order.orderAddress;

    const tooltipContent = (
        <div className={styles.tooltipContentContainer}>
            <p><span>Name: </span>{`${address.firstName} ${address.lastName}`}</p>
            <p><span>Address: </span>{`${address.address}${address.apartment ? `, ${address.apartment}` : ""}`}</p>
            <p><span>City: </span>{`${address.city}, ${address.state}, ${address.zipCode}`}</p>
            <p><span>Country: </span>{address.country}</p>
            <p><span>Phone: </span>{address.phone}</p>
        </div>
    );

    const StyledTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
        ))(({ theme }) => ({
            [`& .${tooltipClasses.tooltip}`]: {
                backgroundColor: '#fff',
                color: '#454545',
                border: '1px solid #d8d8d8',
                borderRadius: '8px',
            },
            [`& .${tooltipClasses.arrow}`]: {
                color: '#fff',
            },
    }));

    return (
        <div className={styles.mainContainer}>
            <section className={styles.header}>
                <div>
                    <h3>order placed</h3>
                    <p>{order.createdAt}</p>
                </div>
                <div>
                    <h3>total</h3>
                    <p>{`$${order.totalValue}`}</p>
                </div>
                <div>
                    <h3>status</h3>
                    <p>{order.status}</p>
                </div>
                <div className={styles.shippingContainer}>
                    <h3>ship to</h3>
                    <p>{address.address}</p>
                    <div className={styles.tooltip}>
                        <StyledTooltip title={tooltipContent} placement="bottom" arrow>
                            <div>
                                <p>{address.address}</p>
                                <ExpandMoreIcon sx={{ fontSize: 18 }} className={styles.expandIcon} />
                            </div>
                        </StyledTooltip>
                    </div>
                </div>
            </section>
            <section className={styles.contentContainer}>
                <ChosenProducts products={order.orderItems} />
            </section>
        </div>
    );
};

export default OrderListItem;