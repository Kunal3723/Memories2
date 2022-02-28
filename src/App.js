import react from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
function App() {

  return (
    <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/auth" element={<Auth />}></Route>
       
      </Routes>
    </Container>
  </BrowserRouter>
  );
}

export default App;
