"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import ArticleRenderer from "@/components/ArticleRenderer";
import ChatWrapper from "@/components/ChatWrapper";
import useGlobalStore from "@/store";
import api from "@/lib/api";

const page = () => {
  const params = useParams();
  const { articleid } = params;
  const setArticleData = useGlobalStore((state) => state.setArticleData);
  const fetchArticleData = async () => {
    console.log(articleid);
    const res = await api.post(
      `/api/article/getById`,
      JSON.stringify({ id: articleid })
    );
    setArticleData(res.data.article);
  };
  useEffect(() => {
    fetchArticleData();
  });
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
