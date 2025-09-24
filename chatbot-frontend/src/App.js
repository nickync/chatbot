import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="flex flex-col">
      <Header />
      <ChatWindow />
      <Footer />
    </div>
  );
}

export default App;

