import Message from "./Message";

export default function MessageList({ messages, loading }) {
  return (
    <div className="flex-1 overflow-y-auto space-y-2 mb-4">
      {messages.filter(m => m.role !== "system").map((msg, i) => (
        <Message key={i} role={msg.role} content={msg.content} />
      ))}
      {loading && <div className="text-gray-500 italic">Thinking...</div>}
    </div>
  );
}
