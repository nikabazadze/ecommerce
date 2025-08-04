import styles from "./BasicAccordion.module.css"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function BasicAccordion({items, placement}) {
    let accordionStyles = {};

    if (placement === "footer") {
        accordionStyles = {
            color: "#fff",
            boxShadow: "none",
            borderRadius: "0",
            borderTop: "1px solid #fff",
            backgroundColor: "#454545",
        }
    } else if (placement === "card") {
        accordionStyles = {
            marginBottom: "0.625rem",
            border: "none",
            borderRadius: "var(--border-radius-card)",
            boxShadow: "var(--box-shadow-card)",
        }
    };

    const summaryStyles = (index) => {
        return {
            padding: (placement === "footer") ? "0px" : (placement === "card") ? "0.625rem 1.5rem" : "",
            borderBottom: (placement === "footer" && index === 2) ? "1px solid #fff" : "",
        };
    };

    return (
        <div>
            {
                items.map((item, index) => (
                    <Accordion key={item.id} style={accordionStyles} className={styles.accordion}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: placement === "footer" ? "#fff" : "", fontSize: "22px" }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={(placement === "card") && styles.accordionSummary}
                        sx={summaryStyles(index)}
                        >
                            {item.title}
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: placement === "footer" ? "0 16px" : "" }} >
                            {item.content}
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
  );
};

export default BasicAccordion;