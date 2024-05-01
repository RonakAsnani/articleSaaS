import React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "../Icons";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { forwardRef } from "react";

const Message = ({ message, isUserMessage }) => {
  return (
    <div
      className={cn("flex items-end", {
        "justify-end": isUserMessage,
      })}
    >
      <div
        className={cn(
          "relative flex h-6 w-6 aspect-square items-center justify-center",
          {
            "order-2 bg-blue-600 rounded-sm": isUserMessage,
            "order-1 bg-zinc-800 rounded-sm": !isUserMessage,
          }
        )}
      >
        {isUserMessage ? (
          <Icons.user className="fill-zinc-200 text-zinc-200 h-3/4 w-3/4" />
        ) : (
          <Icons.logo className="fill-zinc-300 h-3/4 w-3/4" />
        )}
      </div>

      <div
        className={cn("flex flex-col space-y-2 text-base max-w-md mx-2", {
          "order-1 items-end": isUserMessage,
          "order-2 items-start": !isUserMessage,
        })}
      >
        <div
          className={cn("px-4 py-2 rounded-lg inline-block", {
            "bg-blue-600 text-white": isUserMessage,
            "bg-gray-200 text-gray-900": !isUserMessage,
            "rounded-br-none": isUserMessage,
            "rounded-bl-none": !isUserMessage,
          })}
        >
          {typeof message.text === "string" ? (
            <ReactMarkdown
              className={cn("prose", {
                "text-zinc-50": isUserMessage,
              })}
            >
              {message.text}
            </ReactMarkdown>
          ) : (
            message.text
          )}
          {message.text !== "loading-message" ? (
            <div
              className={cn("text-xs select-none mt-2 w-full text-right", {
                "text-zinc-500": !isUserMessage,
                "text-blue-300": isUserMessage,
              })}
            >
              {/* {format(new Date(message.createdAt), "HH:mm")} */}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Message;
