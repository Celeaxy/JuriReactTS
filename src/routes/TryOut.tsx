import { ChangeEvent, KeyboardEvent, useState, ReactNode, useEffect, useCallback, useRef, RefObject, createRef } from 'react';
import '../style/App.scss';
import { Button, TextField, CircularProgress, styled, Container } from '@mui/material';
import { Theme } from '@mui/material';
import axios from 'axios';
import Highlighter from '../util/Highlighter';
import { CSSProperties } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Editor from '../components/Editor';



import base64url from 'base64url';
import Output from '../components/Output';


(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;



export default function TryOut({ theme }: { theme?: Theme }) {
  let [interpreterResult, setInterpreterResult] = useState({status: 0} as InterpreterResult)
  let [loading, setLoading] = useState(false);
  let editor = useRef<HTMLDivElement>(null); 

  let handleRun = function () {
    let code = localStorage.getItem('code') || '';
    if (!code) return;

    let encoded = base64url(code);

    setLoading(true);
    axios.get('https://juriwebinterpreter.herokuapp.com/interpret?code=' + encoded)
      .then(res =>{
        const statusCode = res.data.error.length ? -1 : 1;
        setInterpreterResult({...res.data, status: statusCode} as InterpreterResult);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="TryOut">
      <h1 style={{ fontSize: '36pt' }}>try juri</h1>
      <Container sx={{alignItems: 'left'}}>
      <Button variant='outlined' onClick={handleRun} style={{ fontSize: '20px' }}>
        {loading ? <CircularProgress size='1.7em' /> : <><PlayArrowIcon fontSize='large' />Run</>}</Button>
      </Container>
      <Container>
        <Editor reference={editor} />
        {interpreterResult.status != 0 && <Output result={interpreterResult} />}
      </Container>
      
    </div>

  );
}

