"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import useGlobalStore from "@/store";

const ArticleRenderer = () => {
  const [html, setHtml] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const articleData = useGlobalStore((state) => state.articleData);
  useEffect(() => {
    const call = async () => {
      try {
        const res = await api.get(
          `/api/article/fetchExternal?url=${encodeURIComponent(
            articleData.url
          )}`
        );
        const data = res.data;
        setHtml(data.html_content);
        console.log(data, "data");
        const blob = new Blob([data.html_content], { type: "text/html" });
        setIframeUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.log(error);
      }
    };
    call();
  }, [articleData]);
  return (
    <div
      className="max-w-4xl mx-auto my-5 p-4 bg-white shadow-lg rounded overflow-auto"
      style={{ maxHeight: "900px", minWidth: "650px" }}
    >
      <iframe
        src={iframeUrl}
        frameBorder="0"
        allowFullScreen
        width="800px"
        height="530px"
      />
    </div>
  );
};

export default ArticleRenderer;
