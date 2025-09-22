import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

export default function Message({ role, content }) {
  const isUser = role === "user";

  // Split into parts: text & code
  const parts = [];
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: content.slice(lastIndex, match.index)
      });
    }

    parts.push({
      type: "code",
      language: match[1] || "plaintext",
      content: match[2]
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      content: content.slice(lastIndex)
    });
  }

  return (
    <div
      className={`p-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
        isUser ? "bg-blue-100 self-end ml-auto" : "bg-gray-200 self-start mr-auto"
      }`}
    >
      {parts.map((part, i) =>
        part.type === "code" ? (
          <CodeBlock
            key={i}
            language={part.language}
            content={part.content}
          />
        ) : (
          <span key={i}>{part.content}</span>
        )
      )}
    </div>
  );
}

function CodeBlock({ language, content }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="relative my-2">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ borderRadius: "0.5rem", margin: 0, paddingTop: "2rem" }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
}

