"use client";

import React, { useEffect, useState } from "react";
import { Loader2, MessageSquare } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Message from "./Message";
import useChatStore from "@/store/ChatStore";
import { PageNavigator } from "./PageNavigator";

const Messages = () => {
  const chatData = useChatStore((state) => state.chatData);
  const setChatData = useChatStore((state) => state.setChatData);
  const isFetchingResponse = useChatStore((state) => state.isFetchingResponse);
  const chatIndex = useChatStore((state) => state.chatIndex);
  useEffect(() => {
    // const newChat = chatData;
    // setChatData([]);
    // setChatData(newChat);
    // console.log(newChat, "new");
  }, [chatIndex]);
  return (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {isFetchingResponse ? (
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : chatData.length > 0 &&
        chatData[chatIndex] &&
        chatData[chatIndex].chats &&
        chatData[chatIndex].chats.length > 0 ? (
        chatData[chatIndex].chats.map((message, i) => {
          return (
            <Message
              message={message}
              isUserMessage={message.owner === "user"}
              key={message.id}
            />
          );
        })
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="h-8 w-8 text-gray-900" />
          <h3 className="font-semibold text-xl">You&apos;re all set!</h3>
          <p className="text-zinc-500 text-sm">
            Ask your first question to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
