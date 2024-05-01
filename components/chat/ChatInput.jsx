import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useContext, useRef } from "react";
import useChatStore from "@/store/ChatStore";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import api from "@/lib/api";

const ChatInput = ({ isDisabled }) => {
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
    setIsFetchingResponse(true);
    const res = await api.post(
      `/api/chat/getResponse`,
      JSON.stringify({ message: message, context: chatData[chatIndex].text })
    );
    addChat([message, res.data]);
    setIsFetchingResponse(false);
  };
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative">
              <Textarea
                rows={1}
                // ref={textareaRef}
                maxRows={4}
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
                className="resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              />

              <Button
                disabled={isFetchingResponse || isDisabled}
                className="absolute bottom-1.5 right-[8px]"
                aria-label="send message"
                onClick={() => {
                  addMessage();
                  // textareaRef.current?.focus();
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
