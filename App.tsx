import { useState } from 'react';
import Main from './components/main-page';

export default function App() {
  const [visible, setVisible] = useState(false)
  const setVisibility = () => {
    setVisible(true)
  }
  return (
     <Main/>
  );
}
