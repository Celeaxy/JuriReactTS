import { styled } from "@mui/material";
import { useEffect, useRef } from "react";
import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
import { keymap, ViewUpdate } from "@codemirror/view"
import { juri } from "../lang-juri/lang-juri";

const EditorDiv = styled('div')(({ theme }) => ({
  ...theme.shape,
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  textAlign: 'left',
  caretColor: "#0F0",
  height: '608px',
  minWidth: '400px',
  width: '40%',
  margin: '2%',
  display: 'inline-flex',
  overflowY: 'auto',
  '.cm-activeLine, .cm-gutters, .cm-activeLineGutter': {
    background: 'transparent'
  },
  cursor: 'text'
}));

export default function Editor({ref} : {ref? : React.RefObject<HTMLDivElement>}) {
  const editor = ref || useRef<HTMLDivElement>(null);

  const keybindings = [
    {
      key: 'Tab', run: function (target: EditorView): boolean {
        target.dispatch(target.state.replaceSelection("    "));
        return true;
      }
    }
  ];

  const updateListener = (update: ViewUpdate) => {
      localStorage.setItem('code', update.view.state.doc.toString())
  };

  useEffect(() => {
    const state = EditorState.create({
      doc:  localStorage.getItem('code') || '',
      extensions: [basicSetup, juri(), EditorView.lineWrapping, keymap.of(keybindings),
        EditorView.updateListener.of(updateListener)]
    });

    const view = new EditorView({
      state: state,
      parent: editor.current!
    });
    
    if (!state.doc)
      view.dispatch({ changes: { from: 0, insert: '\n'.repeat(25) } });

    return () => view.destroy();
  }, []);
  return (
    <EditorDiv ref={editor}></EditorDiv>
  );
}