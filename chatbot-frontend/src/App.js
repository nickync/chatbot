import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatWindow from "./components/ChatWindow";

function App() {
  
  const [darkMode, setDarkMode] = useState(false);

  
  return (
    <div className="flex flex-col">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <ChatWindow darkMode={darkMode} />
      <Footer />
    </div>
  );
}

export default App;

