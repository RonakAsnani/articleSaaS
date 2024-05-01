"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import useArticleStore from "@/store/ArticleStore";

import { Button } from "@/components/ui/button";
import { script } from "../lib/iframescript";
import useChatStore from "@/store/ChatStore";
import { toast } from "react-toastify";
const ArticleRenderer = () => {
  const [html, setHtml] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const articleData = useArticleStore((state) => state.articleData);
  const chatData = useChatStore((state) => state.chatData);
  const setChatData = useChatStore((state) => state.setChatData);
  const setChatStatus = useChatStore((state) => state.setChatStatus);
  const setChatIndex = useChatStore((state) => state.setChatIndex);
  const chatIndex = useChatStore((state) => state.chatIndex);

  const saveChat = async () => {
    console.log(articleData, chatData[chatIndex]);
    const submitData = {
      chatData: chatData[chatIndex],
      articleId: articleData._id,
    };
    try {
      const res = await api.post(
        `/api/chat/updateChats`,
        JSON.stringify(submitData)
      );
      toast.success("Chats saved successfully");
    } catch (error) {
      toast.error("Unable to save chats");
    }
  };

  const activate = () => {
    const iframeElement = document.getElementById("myIframe");
    iframeElement.contentWindow.activateDomInspector();
    window.addEventListener("message", function (event) {
      if (event.source === iframeElement.contentWindow) {
        setChatData([
          { id: -1, text: event.data.text, xpath: event.data.xpath, chats: [] },
          ...chatData,
        ]);

        // setChatIndex(chatIndex + 1);
        setChatStatus("");
      }
    });
  };
  useEffect(() => {
    const fetchUrlDetails = async () => {
      try {
        const res = await api.get(
          `/api/article/fetchExternal?url=${encodeURIComponent(
            articleData.url
          )}`
        );
        const data = res.data;
        const htmlContentWithScript = `
            <html>
              <head>
                <script >
                  ${script}
                </script>
              </head>
              <body>
                ${data.html_content}
              </body>
            </html>
          `;
        setHtml(htmlContentWithScript);
        const blob = new Blob([htmlContentWithScript], { type: "text/html" });
        setIframeUrl(URL.createObjectURL(blob));
        hello();
      } catch (error) {
        console.log(error);
      }
    };
    fetchUrlDetails();
  }, [articleData]);
  return (
    <div
      className="max-w-4xl mx-auto my-5 p-4 bg-white shadow-lg rounded overflow-auto"
      style={{ maxHeight: "100%", minWidth: "40%" }}
    >
      <div
        style={{ zIndex: 9999 }}
        className="fixed bottom-4 left-5 bg-gray-300 backdrop-blur-md rounded-full p-2 space-x-2 shadow-lg shadow-gray-900/50 w-[220px]"
      >
        <Button
          title="Search text"
          className="rounded-full"
          size="icon"
          variant="ghost"
        >
          <SearchIcon className="h-5 w-5 text-gray-900" onClick={activate} />
        </Button>
        <Button
          title="Remove chats"
          className="rounded-full"
          size="icon"
          variant="ghost"
        >
          <TrashIcon className="h-5 w-5 text-gray-900" />
        </Button>
        <Button
          title="Save chats"
          className="rounded-full"
          size="icon"
          variant="ghost"
          onClick={saveChat}
        >
          <SaveIcon className="h-5 w-5 text-gray-900" />
        </Button>
        <Button
          title="Previous chats"
          className="rounded-full"
          size="icon"
          variant="ghost"
        >
          <PlusIcon className="h-5 w-5 text-gray-900" />
        </Button>
        {/* <Button
          title="Next chats"
          className="rounded-full"
          size="icon"
          variant="ghost"
        >
          <RightIcon className="h-5 w-5 text-gray-900" />
        </Button> */}
      </div>
      <iframe
        id="myIframe"
        src={iframeUrl}
        frameBorder="0"
        allowFullScreen
        width="100%"
        height="530px"
      />
    </div>
  );
};

export default ArticleRenderer;

function SaveIcon(props) {
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
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
function SearchIcon(props) {
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}
function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
