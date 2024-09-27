import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function BasicAccordion({items, placement}) {
    const accordionStyles = (placement === "footer") ? {
        color: "#fff",
        boxShadow: "none",
        borderRadius: "0",
        borderTop: "1px solid #fff",
        backgroundColor: "#454545",
    } : {};

    return (
        <div>
            {
                items.map((item, index) => (
                    <Accordion key={item.id} style={accordionStyles}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: placement === "footer" ? "#fff" : "", fontSize: "22px" }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ 
                            padding: placement === "footer" ? "0px" : "",
                            borderBottom: (placement === "footer" && index === 2) ? "1px solid #fff" : "",
                        }}
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