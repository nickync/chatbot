import { useState } from "react";
import MessageList from "./MessageList";
import InputBox from "./InputBox";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful AI assistant." }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userInput) => {
    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3.1:70b", // or llama3:70b
          stream: true,
          messages: newMessages
        })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let botMessage = { role: "assistant", content: "" };
      setMessages(prev => [...prev, botMessage]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        
        // Ollama streams JSON lines
        const lines = chunk.split("\n").filter(line => line.trim());
        for (const line of lines) {
          const data = JSON.parse(line);
          const token = data?.message?.content;
          console.log(token)
          if (token) {
            botMessage.content += token;
            setMessages(prev => [...prev.slice(0, -1), { ...botMessage }]);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-4 flex flex-col h-[80vh]">
        <MessageList messages={messages} loading={loading} />
        <InputBox onSend={sendMessage} disabled={loading} />
      </div>
    </div>
  );
}
