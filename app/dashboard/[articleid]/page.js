"use client";

import React, { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ArticleRenderer from "@/components/ArticleRenderer";
import ChatWrapper from "@/components/chat/ChatWrapper";
import useUserStore from "@/store/UserStore";
import useArticleStore from "@/store/ArticleStore";
import api from "@/lib/api";
import useChatStore from "@/store/ChatStore";

const page = () => {
  const params = useParams();
  const { articleid } = params;
  const setArticleId = useArticleStore((state) => state.setArticleId);
  const setArticleData = useArticleStore((state) => state.setArticleData);
  const setChatData = useChatStore((state) => state.setChatData);
  const setChatStatus = useChatStore((state) => state.setChatStatus);
  const setChatIndex = useChatStore((state) => state.setChatIndex);
  const chatData = useChatStore((state) => state.chatData);
  const fetchArticleData = async () => {
    console.log(articleid);
    setArticleId(articleid);
    const res = await api.post(
      `/api/article/getById`,
      JSON.stringify({ id: articleid })
    );

    setArticleData(res.data.article);
    var chatArray = res.data.article.highlightedArea;
    chatArray.push({ _id: -1, text: "", xpath: "", chats: [] });
    setChatData(chatArray);
    setChatIndex(res.data.article.highlightedArea.length - 1);
  };
  useEffect(() => {
    fetchArticleData();
  }, []);
  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Main area */}
            <ArticleRenderer />
          </div>
        </div>
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper />
        </div>
      </div>
    </div>
  );
};

export default page;
