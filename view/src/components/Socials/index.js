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
            <FacebookIcon   fontSize="large"        onClick={() => setOpenDialog(true)} />
            <InstagramIcon  fontSize="large"        onClick={() => setOpenDialog(true)} />
            <TwitterIcon    fontSize="large"        onClick={() => setOpenDialog(true)} />
            <YouTubeIcon    sx={{ fontSize: 44 }}   onClick={() => setOpenDialog(true)} />
            {openDialog && <AlertDialog title={dialogTitle} content={dialogContent} onClose={setOpenDialog} />}
        </div>
    );
};

export default Socials;