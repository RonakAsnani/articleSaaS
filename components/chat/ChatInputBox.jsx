import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useContext, useRef } from "react";
import useChatStore from "@/store/ChatStore";
import { Send } from "lucide-react";
import api from "@/lib/api";

export function ChatInputBox({ isDisabled }) {
  const textareaRef = useRef(null);
  const [message, setMessage] = useState("");
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const setIsFetchingResponse = useChatStore(
    (state) => state.setIsFetchingResponse
  );
  const isFetchingResponse = useChatStore((state) => state.isFetchingResponse);
  const chatData = useChatStore((state) => state.chatData);
  const setChatData = useChatStore((state) => state.setChatData);
  const chatIndex = useChatStore((state) => state.chatIndex);
  const addChat = async (newChatMessages) => {
    let newChatState = [...chatData];
    newChatState[chatIndex] = {
      ...newChatState[chatIndex],
      chats: [
        { text: newChatMessages[1], owner: "model" },
        { text: newChatMessages[0], owner: "user" },
        ...newChatState[chatIndex].chats,
      ],
    };
    setChatData(newChatState);
  };

  const addMessage = async () => {
    console.log(chatData, "dataa");
    setIsFetchingResponse(true);
    const res = await api.post(
      `/api/chat/getResponse`,
      JSON.stringify({ message: message, context: chatData[chatIndex].text })
    );
    addChat([message, res.data]);
    setIsFetchingResponse(false);
  };
  return (
    <div className="absolute bottom-2 left-0 flex flex-col items-center justify-between w-full max-w-2xl px-4 py-3 bg-white rounded-lg shadow-md dark:bg-gray-900">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center w-full space-x-2 overflow-x-auto no-scrollbar ml-[3]">
          <span className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 whitespace-nowrap border px-2 py-1 rounded-md">
            Translate
          </span>
          <span className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 whitespace-nowrap border px-2 py-1 rounded-md">
            Summarize
          </span>
          <span className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 whitespace-nowrap border px-2 py-1 rounded-md">
            Audio
          </span>
          <span className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 whitespace-nowrap border px-2 py-1 rounded-md">
            Sentiment Score
          </span>
        </div>
      </div>
      <div className="flex w-full items-center space-x-2 mt-4">
        <Input
          className="flex-1 bg-gray-100 dark:bg-gray-800 dark:text-gray-50"
          onChange={handleInputChange}
          value={message}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              addMessage();

              // textareaRef.current?.focus();
            }
          }}
          placeholder="Enter your question..."
        />
        <Button
          disabled={isFetchingResponse || isDisabled}
          className="bg-black text-gray-50 hover:bg-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-800"
          size="sm"
          variant="icon"
          onClick={() => {
            addMessage();
            // textareaRef.current?.focus();
          }}
        >
          <SendIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
