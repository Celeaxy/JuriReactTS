import TryOut from './TryOut';
import {ReadMe } from './Contents';
import Examples from './Examples';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { JsxEmit } from 'typescript';

export default function Routing() {
  return <>
    <BrowserRouter>
      <Routes>
        {AppRoutes.jsx}
      </Routes>
    </BrowserRouter>
  </>
}

export const AppRoutes = {
  get routes() {
    return {
      '/': {component:<TryOut />, title: 'Home'},
      '/readme': {component: ReadMe, title:'ReadMe'},
      '/examples' : {component: <Examples />, title: 'Beispiele'}
    } as {[key: string] : {component: JSX.Element, title: string}}
  },

  
  get paths() {
    return Object.keys(this.routes);
  },

  get jsx() {
    return Object.entries(this.routes).map(
      e =>
      <>
        <Route path={e[0]} element={e[1].component} />
      </>);
  }
}