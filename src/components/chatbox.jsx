import { RiDeleteBin2Fill } from "react-icons/ri";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [error, setError] = useState("");
  const textBoxRef = useRef();

  const supportedLanguages = {
    en: "English",
    pt: "Portuguese",
    es: "Spanish",
    ru: "Russian",
    tr: "Turkish",
    fr: "French",
  };

  const handleMessageTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    return `${hours}:${minutes} ${ampm}`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTyping(true);
      setError(" ");
      try {
        const newMessage = {
          id: Date.now(),
          text: input.trim(),
          sender: "user",
          isTranslating: false,
          messageTime: handleMessageTime(),
          translations: {},
        };
        setInput("");

        // Detect language
        const canDetect = await self.ai.languageDetector.capabilities();
        let detector;
        if (canDetect && canDetect.available !== "no") {
          if (canDetect.available === "readily") {
            // The detection API can immediately be used.
            detector = await self.ai.languageDetector.create();
          } else {
            // The detection API can be used after the model download.
            detector = await self.ai.languageDetector.create();
            alert(
              "Detector API model downloading...check developer console for progress"
            );
            detector.addEventListener("downloadprogress", (e) => {
              console.log((e.loaded / e.total) * 100, "%");
            });
            await detector.ready;
          }

          const results = await detector.detect(newMessage.text);

          const detectedLanguage = results[0].detectedLanguage;
          newMessage.detectedLanguage = detectedLanguage;
          setMessages([...messages, newMessage]);
        } else {
          // The Detector can't be used at all.
          newMessage.detectedLanguage = "";
          setMessages([...messages, newMessage]);
          throw "CustomError: Language Detector API unavailable on your device. 😢";
        }
      } catch (error) {
        setError(String(err).split(":")[1]);
      } finally {
        setTyping(false);
      }
    }
  };

  //handle translate

  const handleTranslate = async (messageId, e) => {
    setError("");
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, isTranslating: true } : msg
      )
    );
    try {
      const messageToTranslate = messages.find((msg) => msg.id === messageId);
      if (messageToTranslate) {
        // translate message
        if ("ai" in self && "translator" in self.ai) {
          const translator = await self.ai.translator.create({
            sourceLanguage: messageToTranslate.detectedLanguage,
            targetLanguage: targetLanguage,
          });
          const translation = await translator.translate(
            messageToTranslate.text
          );
          console.log(translation);
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    translation,
                    lang: targetLanguage,
                    isTranslating: false,
                  }
                : msg
            )
          );
        } else {
          throw "Custom Error:Translation API unavailable on your device 😢";
        }
      }
    } catch (err) {
      setError(String(err).split(":")[1]);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                isTranslating: false,
              }
            : msg
        )
      );
    }
  };

  const getLanguageString = (lng) => {
    if (lng) {
      const lang = new Intl.DisplayNames(["en"], { type: "language" });
      return `${lang.of(lng)} Language detected`;
    } else {
      return "unable to detect language";
    }
  };

  const shouldShowSummarize = (message) => {
    return (
      message.detectedLanguage === "en" &&
      message.text.length > 150 &&
      !message.summary
    );
  };

  const handleSummarize = async (messageId, e) => {
    setIsSummarizing(true);
    setError("");

    try {
      const messageToSummarize = messages.find((msg) => msg.id === messageId);
      if (messageToSummarize) {
        //summarize message
        const canSummarize = await self.ai.summarizer.capabilities();
        let summarizer;
        if (canSummarize && canSummarize.available !== "no") {
          const summaryOptions = {
            type: "tl;dr",
            format: "plain-text",
          };
          if (canSummarize.available === "readily") {
            // The summarizer can immediately be used.
            summarizer = await self.ai.summarizer.create(summaryOptions);
          } else {
            //after-download
            // The summarizer can be used after the model download.
            alert(
              "Summarizer API model downloading...check developer console for progress"
            );
            summarizer = await self.ai.summarizer.create(summaryOptions);

            summarizer.addEventListener("downloadprogress", (e) => {
              console.log((e.loaded / e.total) * 100, "%");
            });
            await summarizer.ready;
          }
          const summary = await summarizer.summarize(messageToSummarize.text);
          console.log(summary);

          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === messageId ? { ...msg, summary } : msg
            )
          );
        } else {
          throw "CustomError: 😢 Summary API unavailable on your device.";
        }
      }
    } catch (err) {
      setError(String(err).split(":")[1]);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleClearMessages = () => {
    setMessages([]);
    setError("");
  };
  return (
    <section className="flex flex-col w-full max-w-4xl mx-auto min-h-screen px-4 sm:px-6 py-6">
      <header
        className="flex w-full items-center justify-between gap-4 border-b-2 pb-4"
        role="region"
        aria-labelledby="chat-heading"
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="cursor-pointer">
            <svg
              className="w-10 h-10 sm:w-16 sm:h-16"
              role="image"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-labelledby="logo-tittle"
            >
              <path
                fill="#725DE5"
                d="M17.753 14a2.25 2.25 0 0 1 2.25 2.25v.904A3.75 3.75 0 0 1 18.696 20c-1.565 1.344-3.806 2-6.696 2s-5.128-.656-6.69-2a3.75 3.75 0 0 1-1.306-2.843v-.908A2.25 2.25 0 0 1 6.254 14zM11.9 2.006L12 2a.75.75 0 0 1 .743.648l.007.102l-.001.749h3.5a2.25 2.25 0 0 1 2.25 2.25v4.505a2.25 2.25 0 0 1-2.25 2.25h-8.5a2.25 2.25 0 0 1-2.25-2.25V5.75A2.25 2.25 0 0 1 7.75 3.5l3.5-.001V2.75a.75.75 0 0 1 .649-.743L12 2zM9.749 6.5a1.25 1.25 0 1 0 0 2.498a1.25 1.25 0 0 0 0-2.498m4.493 0a1.25 1.25 0 1 0 0 2.498a1.25 1.25 0 0 0 0-2.498"
              />
            </svg>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold font-JejuMyeongjo">
            LanguoAi
          </h1>
        </div>
        <button
          type="button"
          aria-label="delete all chats"
          onClick={handleClearMessages}
          className="w-8 h-8 sm:w-10 sm:h-10 p-1.5 sm:p-2 rounded-full cursor-pointer bg-[#725DE5] border-2 border-solid border-[#f2f2f2] outline-2 outline-offset-0 hover:outline-red-500 focus:outline-red-500 focus:border-[#f2f2f2] transition-all"
        >
          <RiDeleteBin2Fill className="w-full h-full text-white" />
        </button>
      </header>

      <main className="flex-1 w-full pt-6 sm:pt-10 flex flex-col gap-4 overflow-y-auto">
        {messages.map((message) => {
          const isLongMessage =
            message.text?.length > 150 || message.summary?.length > 150;

          return (
            <div
              key={message.id}
              className={`
            chat relative mb-8
            ${
              message.sender === "user"
                ? "flex flex-col items-end"
                : "flex flex-col items-start"
            }
          `}
              aria-label={`Message from ${
                message.sender === "user" ? "you" : "LanguoAi"
              }`}
            >
              <div
                className={`
            flex flex-col gap-2 max-w-[90%] sm:max-w-[75%]
            ${isLongMessage ? "w-full" : "w-auto"}
          `}
              >
                <p
                  className={`
                text-white text-base p-4 break-words
                ${message.summary ? "bg-[#1e1e1e]" : "bg-[#725de5]"}
                ${
                  message.sender === "user"
                    ? "rounded-tr-[3rem] rounded-l-[3rem]"
                    : "rounded-tl-[3rem] rounded-r-[3rem]"
                }
              `}
                  aria-live="polite"
                >
                  {message.summary || message.text}
                </p>

                {message.translation && (
                  <p className="bg-[#45415a] text-white text-base p-4 break-words rounded-tl-[3rem] rounded-r-[3rem]">
                    {message.translation}
                  </p>
                )}

                <p
                  className={`text-sm text-[#725de5] ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {getLanguageString(message.detectedLanguage)}
                </p>

                <div
                  className={`flex flex-wrap gap-2 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {shouldShowSummarize(message) && (
                    <button
                      onClick={() => handleSummarize(message.id)}
                      className="text-[#f2f2f2] bg-[#725DE5] text-sm cursor-pointer px-3 py-1 rounded-md"
                      aria-label="Summarize message"
                    >
                      {isSummarizing ? "Summarizing..." : "Summarize"}
                    </button>
                  )}

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="text-sm border rounded-md p-1 bg-white"
                      aria-label="Select target language"
                    >
                      {Object.entries(supportedLanguages).map(
                        ([code, name]) => (
                          <option key={code} value={code}>
                            {name}
                          </option>
                        )
                      )}
                    </select>
                    <button
                      onClick={() => handleTranslate(message.id)}
                      className="text-[#f2f2f2] bg-[#725de5] text-sm cursor-pointer px-3 py-1 rounded-md"
                      disabled={message.isTranslating || !targetLanguage}
                      aria-label="Translate message"
                    >
                      {message.isTranslating ? "Translating..." : "Translate"}
                    </button>
                  </div>
                </div>
              </div>

              <span className="text-sm italic mt-1">{message.messageTime}</span>
            </div>
          );
        })}

        {typing && (
          <div className="chat flex items-start gap-2 relative h-max">
            <img src="../bot.svg" alt="bot" className="w-4 h-4" />
            <p className="bg-[#45415a] text-[#f2f2f2] text-sm rounded-tl-[3rem] rounded-r-[3rem] p-4 italic">
              Typing...
            </p>
          </div>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </main>

      <form
        onSubmit={handleSendMessage}
        className="sticky bottom-0 w-full mt-4 rounded-[3rem] bg-[#725DE5] flex gap-4 items-center px-4 py-2"
      >
        <textarea
          aria-label="message text box"
          id="message-text-box"
          name="message-text-box"
          ref={textBoxRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          rows="1"
          placeholder="Ask me anything..."
          className="w-full flex leading-5 bg-transparent text-white border-none outline-none text-base placeholder:text-gray-300 focus:outline-white focus:border-white rounded-chat-box p-2 resize-none"
        />
        <button
          type="submit"
          aria-label="send message"
          disabled={!input.trim()}
          className="focus:outline-white focus:border-white border outline rounded-full w-8 h-8 p-2 flex items-center flex-shrink-0"
        >
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="1.18rem"
            height="1.2rem"
            viewBox="0 0 1792 1824"
            aria-hidden="true"
          >
            <path
              fill="white"
              d="M1764 43q33 24 27 64l-256 1536q-5 29-32 45q-14 8-31 8q-11 0-24-5l-527-215l-298 327q-18 21-47 21q-14 0-23-4q-19-7-30-23.5t-11-36.5v-452L40 1115q-37-14-40-55q-3-39 32-59L1696 41q35-21 68 2m-342 1499l221-1323l-1434 827l336 137l863-639l-478 797z"
            />
          </svg>
        </button>
      </form>
    </section>
  );
}
