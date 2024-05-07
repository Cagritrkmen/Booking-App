
import './App.css'
import {Route,Routes} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';
import Layout from "./Layout";

function App() {

  return (
    <Routes>
      <Route path= "/" element={<Layout/>} />
      <Route index element={<IndexPage/>}/>
      <Route path="/login" element= {<LoginPage/>}/>

    </Routes>
    
  )
}

export default App