import { ChangeEvent, KeyboardEvent, useState, ReactNode, useEffect, useCallback, useRef, RefObject, createRef } from 'react';
import '../style/App.scss';
import { Button, TextField, CircularProgress, styled } from '@mui/material';
import { Theme } from '@mui/material';
import axios from 'axios';
import Highlighter from '../util/Highlighter';
import { CSSProperties } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Editor from '../components/Editor';



import base64url from 'base64url';


(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;



export default function TryOut({ theme }: { theme?: Theme }) {
  let [code, setCode] = useState(localStorage.getItem('code') || '');
  let [output, setOutput] = useState('');

  let [loading, setLoading] = useState(false);
  let editor = useRef<HTMLDivElement>(null);
  
  let handleRun = function () {
    if (!code) {
      setOutput('');
      return;
    }
    let encoded = base64url(code);

    setLoading(true);
    axios.get('https://juri-online-compiler.herokuapp.com/jurii?code=' + encoded)
      .then(res => setOutput(output + res.data.standard + res.data.error))
      .catch(err => setOutput(output + err))
      .finally(() => {
        setLoading(false)
        let out = document.getElementById('out')!;
        out.scrollTop = out?.scrollHeight || 0;
      });
  }

  return (
    <div className="TryOut">
      <h1 style={{ fontSize: '36pt' }}>try juri</h1>
      <div>
        <Editor ref={editor}/>
        <TextField id='out' label='Output' multiline margin='normal' variant='outlined' style={{ width: '40%', minWidth: '400px', margin: '2%' }} rows='25' value={output} disabled />
      </div>
      <Button variant='contained' onClick={handleRun} style={{ fontSize: '20px' }}>
        {loading ? <CircularProgress size='1.7em' /> : <><PlayArrowIcon fontSize='large' />Run</>}</Button>
    </div>

  );
}

