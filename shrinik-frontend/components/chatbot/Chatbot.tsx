"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ChevronDown,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface ChatMessage {
  id: string;
  role: "user" | "bot" | "error";
  text: string;
  timestamp: Date;
}

interface HistoryEntry {
  role: "user" | "model";
  text: string;
}

/* =========================================================
   API
========================================================= */

const API_ENDPOINT =
  "https://shrinik-ai-chatbot-production.up.railway.app/api/chat";

const GREETING =
  "Hi! I'm the Shrinik Club assistant. Ask me about our teams, events like GLB Talks, how to join, or how to reach us.";

/* =========================================================
   HELPERS
========================================================= */

let messageCounter = 0;

function createId(): string {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
}

/**
 * Formats bot response text with basic rich-text styling:
 * - **bold** → <strong>
 * - *italic* → <em>
 * - `code` → <code>
 * - Lines starting with • or - → bullet items
 * - Numbered lines like "1." → numbered items
 * - Blank lines → paragraph breaks
 */
function formatBotText(raw: string): string {
  let text = raw;

  // Escape HTML
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Inline: bold, italic, code
  text = text.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="shrinik-chat-bold">$1</strong>',
  );
  text = text.replace(
    /\*(.+?)\*/g,
    '<em class="shrinik-chat-italic">$1</em>',
  );
  text = text.replace(
    /`(.+?)`/g,
    '<code class="shrinik-chat-code">$1</code>',
  );

  // Process lines
  const lines = text.split("\n");
  const parts: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Bullet list items
    const bulletMatch = trimmed.match(
      /^[•\-–]\s+(.+)$/,
    );
    if (bulletMatch) {
      if (!inList) {
        parts.push(
          '<ul class="shrinik-chat-list">',
        );
        inList = true;
      }
      parts.push(`<li>${bulletMatch[1]}</li>`);
      continue;
    }

    // Numbered list items
    const numMatch = trimmed.match(
      /^\d+[.)]\s+(.+)$/,
    );
    if (numMatch) {
      if (!inList) {
        parts.push(
          '<ul class="shrinik-chat-list shrinik-chat-list-num">',
        );
        inList = true;
      }
      parts.push(`<li>${numMatch[1]}</li>`);
      continue;
    }

    // Close list if we were in one
    if (inList) {
      parts.push("</ul>");
      inList = false;
    }

    // Blank line → spacer
    if (trimmed === "") {
      parts.push(
        '<div class="shrinik-chat-spacer"></div>',
      );
      continue;
    }

    parts.push(
      `<span class="shrinik-chat-line">${trimmed}</span>`,
    );
  }

  if (inList) {
    parts.push("</ul>");
  }

  return parts.join("");
}

/* =========================================================
   COMPONENT
========================================================= */

export default function Chatbot() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [messages, setMessages] = useState<
    ChatMessage[]
  >([
    {
      id: createId(),
      role: "bot",
      text: GREETING,
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const [showScrollDown, setShowScrollDown] =
    useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  const messagesContainerRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const historyRef = useRef<HistoryEntry[]>(
    [],
  );

  /* -------------------------------------------------------
     Auto-scroll to bottom
  ------------------------------------------------------- */

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  /* -------------------------------------------------------
     Track scroll position for "scroll down" button
  ------------------------------------------------------- */

  const handleScroll = useCallback(() => {
    const container =
      messagesContainerRef.current;
    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    setShowScrollDown(distanceFromBottom > 100);
  }, []);

  /* -------------------------------------------------------
     Focus input when panel opens
  ------------------------------------------------------- */

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 350);
    }
  }, [isOpen]);

  /* -------------------------------------------------------
     Send message
  ------------------------------------------------------- */

  const sendMessage =
    useCallback(async () => {
      const text = inputValue.trim();
      if (!text || isTyping) return;

      const userMessage: ChatMessage = {
        id: createId(),
        role: "user",
        text,
        timestamp: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);
      setInputValue("");
      setIsTyping(true);

      try {
        const response = await fetch(
          API_ENDPOINT,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              message: text.slice(0, 500),
              history:
                historyRef.current.slice(-6),
            }),
          },
        );

        const data = await response
          .json()
          .catch(() => ({}));

        if (!response.ok) {
          setMessages((prev) => [
            ...prev,
            {
              id: createId(),
              role: "error",
              text:
                data.error ||
                "Something went wrong. Please try again.",
              timestamp: new Date(),
            },
          ]);
        } else {
          const reply =
            data.reply ||
            "I couldn't process that. Please try again.";

          setMessages((prev) => [
            ...prev,
            {
              id: createId(),
              role: "bot",
              text: reply,
              timestamp: new Date(),
            },
          ]);

          historyRef.current.push(
            { role: "user", text },
            { role: "model", text: reply },
          );

          if (
            historyRef.current.length > 12
          ) {
            historyRef.current =
              historyRef.current.slice(-12);
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: "error",
            text: "Network error. Please check your connection and try again.",
            timestamp: new Date(),
          },
        ]);
      }

      setIsTyping(false);
    }, [inputValue, isTyping]);

  /* -------------------------------------------------------
     Handle key press
  ------------------------------------------------------- */

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  /* -------------------------------------------------------
     Format timestamp
  ------------------------------------------------------- */

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

  return (
    <>
      {/* ==================================================
          FLOATING LAUNCHER BUTTON
      ================================================== */}

      <button
        id="shrinik-chat-launcher"
        className={`
          shrinik-chat-launcher
          ${isOpen ? "shrinik-chat-launcher--hidden" : ""}
        `}
        onClick={() => setIsOpen(true)}
        aria-label="Open Shrinik AI Chat"
      >
        <div className="shrinik-chat-launcher__glow" />

        <div className="shrinik-chat-launcher__icon">
          <MessageSquare size={26} />
        </div>

        <div className="shrinik-chat-launcher__pulse" />
      </button>

      {/* ==================================================
          CHAT PANEL
      ================================================== */}

      <div
        id="shrinik-chat-panel"
        className={`
          shrinik-chat-panel
          ${isOpen ? "shrinik-chat-panel--open" : ""}
        `}
      >
        {/* ------------------------------------------------
            HEADER
        ------------------------------------------------ */}

        <div className="shrinik-chat-header">
          <div className="shrinik-chat-header__glow" />

          <div className="shrinik-chat-header__avatar">
            <Sparkles size={18} />
          </div>

          <div className="shrinik-chat-header__info">
            <h3 className="shrinik-chat-header__title">
              Shrinik AI
            </h3>

            <span className="shrinik-chat-header__status">
              <span className="shrinik-chat-header__dot" />
              Always online
            </span>
          </div>

          <button
            className="shrinik-chat-header__close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* ------------------------------------------------
            MESSAGES
        ------------------------------------------------ */}

        <div
          className="shrinik-chat-messages"
          ref={messagesContainerRef}
          onScroll={handleScroll}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`
                shrinik-chat-msg
                shrinik-chat-msg--${msg.role}
              `}
            >
              {msg.role === "bot" && (
                <div className="shrinik-chat-msg__avatar">
                  <Sparkles size={12} />
                </div>
              )}

              <div className="shrinik-chat-msg__content">
                <div
                  className={`
                    shrinik-chat-bubble
                    shrinik-chat-bubble--${msg.role}
                  `}
                >
                  {msg.role === "bot" ? (
                    <div
                      className="shrinik-chat-bubble__text"
                      dangerouslySetInnerHTML={{
                        __html: formatBotText(
                          msg.text,
                        ),
                      }}
                    />
                  ) : (
                    <div className="shrinik-chat-bubble__text">
                      {msg.text}
                    </div>
                  )}
                </div>

                <span className="shrinik-chat-msg__time">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}

          {/* TYPING INDICATOR */}

          {isTyping && (
            <div className="shrinik-chat-msg shrinik-chat-msg--bot">
              <div className="shrinik-chat-msg__avatar">
                <Sparkles size={12} />
              </div>

              <div className="shrinik-chat-typing">
                <span className="shrinik-chat-typing__dot" />
                <span className="shrinik-chat-typing__dot" />
                <span className="shrinik-chat-typing__dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* SCROLL-DOWN BUTTON */}

        {showScrollDown && (
          <button
            className="shrinik-chat-scroll-down"
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
          >
            <ChevronDown size={16} />
          </button>
        )}

        {/* ------------------------------------------------
            INPUT BAR
        ------------------------------------------------ */}

        <div className="shrinik-chat-input-bar">
          <input
            ref={inputRef}
            className="shrinik-chat-input"
            type="text"
            placeholder="Ask about Shrinik..."
            maxLength={500}
            value={inputValue}
            onChange={(e) =>
              setInputValue(e.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />

          <button
            className={`
              shrinik-chat-send
              ${!inputValue.trim() || isTyping ? "shrinik-chat-send--disabled" : ""}
            `}
            onClick={sendMessage}
            disabled={
              !inputValue.trim() || isTyping
            }
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
