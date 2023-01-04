import { useState } from 'react';
import Login from './components/login';
import Main from './components/main-page';

export default function App() {
  const [visible, setVisible] = useState(false)
  const setVisibility = () => {
    setVisible(true)
  }
  return (
     <Login/>
    //  <Main/>
  );
}
