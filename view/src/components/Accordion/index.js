import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

function BasicAccordion({items}) {
    return (
        <div>
            {
                items.map((item) => (
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<AddIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography variant='span'>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{item.content}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
  );
};

export default BasicAccordion;