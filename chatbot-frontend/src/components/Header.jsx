import{ FaSun, FaMoon } from "react-icons/fa";

export default function Header({darkMode, setDarkMode}) {
  return (
    <header className="relative flex bg-gradient-to-r from-blue-500 to-indigo-600 text-center shadow-md fixed pb-2 top-0">
      <div className="text-white text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">Chat Bot</div>
      <p className="text-black text-1xl font-extralight italic">LLM Model: llama3.1:70b</p>
      <div className="ml-auto">
        <button onClick={() => setDarkMode(!darkMode)} className="ml-4 p-2 rounded"> {
          darkMode ? (
            <>
              <FaSun />
            </> 
            ) : (
            <>
              <FaMoon />
            </>
            )
            }
          
          
        </button>  
      </div>
    </header>
  );
}
