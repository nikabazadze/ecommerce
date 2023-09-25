import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';

function BasicAccordion({items}) {
    return (
        <div>
            {
                items.map((item) => (
                    <Accordion key={item.id}>
                        <AccordionSummary
                        expandIcon={<AddIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            {item.title}
                        </AccordionSummary>
                        <AccordionDetails>
                            {item.content}
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
  );
};

export default BasicAccordion;