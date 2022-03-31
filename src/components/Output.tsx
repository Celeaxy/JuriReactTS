import { Button, Container, IconButton, Paper, styled } from "@mui/material";
import { useState } from "react";
import MinimizeOutlinedIcon from '@mui/icons-material/MinimizeOutlined';
const StyledPaper = styled(Paper)(({ theme }) => ({
    height: '100%',
    width: '40%',
    margin: '0px 2%',
    maxHeight: '80vh',
    display: 'inline-flex',
    overflowY: 'auto',
    textAlign: 'left'
}));

export default function Output({ result, isOpen, setOpen }: { result: InterpreterResult, isOpen : boolean, setOpen: Function}) {

    const StandardMessage = () => {
        return <>
            <h3>Standard:</h3>
            <pre>
                {result.standard.reduce((total, next) => total + next, '')}
            </pre>
        </>;
    }
    const ErrorMessage = () => {
        return <>
            <h3>Error:</h3>
            {result.error.map((err: InterpreterError) => <><div style={{ color: 'red' }}>{err.message}</div> <div>In Linie: {err.line}</div></>)}
        </>;
    }

    const OpenButton = () => {
        return <Button variant='outlined' color='primary' sx={{margin: '0 24px'}}
         onClick={() => setOpen(true)}>Output</Button>;
    }

    return isOpen ? (<StyledPaper >

        <Container>
            <div style={{textAlign: 'right'}}><IconButton color='primary' onClick={() => setOpen(false)}><MinimizeOutlinedIcon/></IconButton></div>
            {result.status === -1 && (<><ErrorMessage /><hr /></>)}
            <StandardMessage />
        </Container>
    </StyledPaper>) : <OpenButton />;
}