import axios from "axios"
import { useEffect, useState } from "react";
import { List, ListItem, Paper, Button} from "@mui/material";

function Example({title, code}:{title: string, code : string}){

    let copy = () =>{
        // var type = "text/plain";
        // var blob = new Blob([code], { type });
        // var data = [new ClipboardItem({ [type]: blob })];
        // navigator.clipboard.write(data);
        localStorage.setItem('code', code)
    }

    return <div><div><h2>{title} <Button variant='outlined' href='/' onClick={copy} color='primary' sx={{fontWeight: 'bold'}}>Try!</Button></h2></div><div><pre>{code}</pre></div></div>
}
export default function Examples() {
    let [examples, setExamples] = useState([] as JSX.Element[])

    useEffect(() =>{
        axios.get('https://raw.githubusercontent.com/SebastianBrack/JuriLang/master/JuriConsole/examples/examples.toc')
        .then(response => {
            let fileNames = response.data.split('\r\n');
            
            Promise.all(fileNames.map((fileName : string) => 
                fileName && axios.get(`https://raw.githubusercontent.com/SebastianBrack/JuriLang/master/JuriConsole/examples/${fileName}`)
            )).then(responses => {
                setExamples(responses.map((e, i) => <Example title={fileNames[i]} code={e.data}/>))
            });
        })
        .catch(err => console.log(err));
    }, [])
    

    return <List>{examples.map(e => <Paper><ListItem>{e}</ListItem></Paper>)}</List>
}