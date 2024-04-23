"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";

const ArticleRenderer = () => {
  const [html, setHtml] = useState("");
  useEffect(() => {
    const call = async () => {
      try {
        const res = await api.get(
          `/api/article/fetchExternal?url=${encodeURIComponent(
            "https://medium.com/stackademic/react-19-is-coming-whats-new-79e2d4b948e4"
          )}`
        );
        const data = res.data;
        setHtml(data.html_content);
        console.log(data, "data");
        // document.getElementById("html-content").innerHTML = html;
      } catch (error) {
        console.log(error);
      }
    };
    call();
  }, []);
  return (
    <div
      className="max-w-4xl mx-auto my-5 p-4 bg-white shadow-lg rounded overflow-auto"
      style={{ maxHeight: "550px" }}
    >
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
};

export default ArticleRenderer;
