import React from "react";
import { useState } from "react";
import styles from "./Socials.module.css";
import AlertDialog from "../AlertDialog";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Socials() {
    const [ openDialog, setOpenDialog ] = useState(false);
    const dialogTitle = "Could not open the page!"
    const dialogContent = "This icon is rendered only for visual purposes.";

    return (
        <div className={styles.container}>
            <FacebookIcon   className={styles.icon}          onClick={() => setOpenDialog(true)} />
            <InstagramIcon  className={styles.icon}          onClick={() => setOpenDialog(true)} />
            <TwitterIcon    className={styles.icon}          onClick={() => setOpenDialog(true)} />
            <YouTubeIcon    className={styles.youtubeIcon}   onClick={() => setOpenDialog(true)} />
            {openDialog && <AlertDialog title={dialogTitle} content={dialogContent} onClose={setOpenDialog} />}
        </div>
    );
};

export default Socials;