import React from "react";
import { useState } from "react";
import styles from "./Socials.module.css";
import AlertDialog from "../AlertDialog";

import fbLogoWhite from "./icons/fbLogoWhite.svg";
import fbLogoBlack from "./icons/fbLogoBlack.svg";
import instaLogoWhite from "./icons/instaLogoWhite.svg";
import instaLogoBlack from "./icons/instaLogoBlack.svg";
import tiktokLogoWhite from "./icons/tiktokLogoWhite.svg";
import tiktokLogoBlack from "./icons/tiktokLogoBlack.svg";
import twitterLogoWhite from "./icons/twitterLogoWhite.svg";
import twitterLogoBlack from "./icons/twitterLogoBlack.svg";

function Socials({color = "white"}) {
    const [ openDialog, setOpenDialog ] = useState(false);
    const dialogTitle = "Could not open the page!"
    const dialogContent = "This icon is rendered only for visual purposes.";

    return (
        <div className={styles.container}>
            <img src={(color === "white") ? instaLogoWhite : instaLogoBlack} className={styles.logo} alt="Company logo" onClick={() => setOpenDialog(true)} />
            <img src={(color === "white") ? twitterLogoWhite : twitterLogoBlack} className={styles.logo} alt="Company logo" onClick={() => setOpenDialog(true)} />
            <img src={(color === "white") ? fbLogoWhite : fbLogoBlack} className={styles.logo} alt="Company logo" onClick={() => setOpenDialog(true)} />
            <img src={(color === "white") ? tiktokLogoWhite : tiktokLogoBlack} className={styles.logo} alt="Company logo" onClick={() => setOpenDialog(true)} />
            {openDialog && <AlertDialog title={dialogTitle} content={dialogContent} onClose={setOpenDialog} />}
        </div>
    );
};

export default Socials;