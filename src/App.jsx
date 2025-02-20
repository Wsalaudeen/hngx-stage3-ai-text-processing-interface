import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage";
import Chatbox from "./components/chatbox";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chats" element={<Chatbox />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
