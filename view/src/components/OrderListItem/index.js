import React from "react";
import styles from './OrderListItem.module.css';
import { styled } from '@mui/material/styles';
import ChosenProducts from "../ChosenProducts";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

function OrderListItem({ order }) {
    const address = order.orderAddress;

    const tooltipContent = (
        <div className={styles.tooltipContentContainer}>
            <p>{`${address.firstName} ${address.lastName}`}</p>
            <p>{`${address.address}${address.apartment ? `, ${address.apartment}` : ""}`}</p>
            <p>{`${address.city}, ${address.state}, ${address.zipCode}`}</p>
            <p>{address.country}</p>
            <p>{`Phone: ${address.phone}`}</p>
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
                    <p>order placed</p>
                    <p>{order.createdAt}</p>
                </div>
                <div>
                    <p>total</p>
                    <p>{`$${order.totalValue}`}</p>
                </div>
                <div>
                    <p>status</p>
                    <p>{order.status}</p>
                </div>
                <div className={styles.shippingContainer}>
                    <p>ship to</p>
                    <StyledTooltip title={tooltipContent} placement="bottom" arrow>
                        <div>
                            <p>{`${address.firstName} ${address.lastName}`}</p>
                            <ExpandMoreIcon sx={{ fontSize: 18 }} className={styles.expandIcon} />
                        </div>
                    </StyledTooltip>
                </div>
            </section>
            <section className={styles.contentContainer}>
                <ChosenProducts products={order.orderItems} />
            </section>
        </div>
    );
};

export default OrderListItem;