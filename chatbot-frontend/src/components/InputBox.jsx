import { useState } from "react";

export default function InputBox({ onSend, disabled }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="space-x-2 flex align-center">
      <input
        type="text"
        className="flex-1 border rounded-lg p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
        disabled={disabled}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleSend}
        disabled={disabled}
      >
        Send
      </button>
    </div>
  );
}
