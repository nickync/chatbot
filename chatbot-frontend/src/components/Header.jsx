export default function Header() {
  return (
    <header className="flex w-full justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-center shadow-md fixed top-0 left-0 z-10">
      <div className="text-white text-3xl font-bold">Chat Bot</div>
      <p className="text-black text-1xl font-extralight italic py-2 px-4">当前语言模型 llama3.1:70b</p>
    </header>
  );
}
