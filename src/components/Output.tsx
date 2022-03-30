import { Button, Container, IconButton, Paper, styled } from "@mui/material";
import { useState } from "react";
import MinimizeOutlinedIcon from '@mui/icons-material/MinimizeOutlined';
const StyledPaper = styled(Paper)(({ theme }) => ({
    height: '608px',
    width: '40%',
    margin: '2%',
    display: 'inline-flex',
    overflowY: 'auto',
    textAlign: 'left'
}));

export default function Output({ result }: { result: InterpreterResult }) {
    let [open, setOpen] = useState(true);

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
        return <Button variant='outlined' color='primary'
         onClick={() => setOpen(true)}>Output</Button>;
    }
    return open ? (<StyledPaper>
        <Container>
            <div style={{textAlign: 'right'}}><IconButton color='primary' onClick={() => setOpen(false)}><MinimizeOutlinedIcon/></IconButton></div>
            {result.status == -1 && (<><ErrorMessage /><hr /></>)}
            <StandardMessage />
        </Container>
    </StyledPaper>) : <OpenButton />;
}