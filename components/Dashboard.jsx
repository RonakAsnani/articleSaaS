"use client";

import { useEffect, useState } from "react";
import InputButton from "./InputButton";
import Skeleton from "react-loading-skeleton";
import useUserStore from "@/store/UserStore";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import api from "@/lib/api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [userArticles, setUserArticles] = useState([]);
  const isLoading = useUserStore((state) => state.isLoading);
  const user = useUserStore((state) => state.user);
  const fetchUserArticles = async () => {
    const res = await api.post(
      `/api/article/getByUser`,
      JSON.stringify({ id: user.id })
    );
    console.log(res.data.user);
    setUserArticles(res.data.user.UrlIds);
  };
  const deleteArticle = async (articleId) => {
    try {
      const res = await api.post(
        `/api/article/deleteById`,
        JSON.stringify({ articleId: articleId, userId: user.id })
      );
      toast.success("Session Deleted Successfully");
      fetchUserArticles();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete session");
    }
  };
  useEffect(() => {
    if (user) {
      fetchUserArticles();
    }
  }, [user]);
  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My Sessions</h1>

        <InputButton />
      </div>

      {/* display all user files */}
      {userArticles && userArticles?.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {userArticles
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((article) => (
              <li
                key={article._id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <Link
                  href={`/dashboard/${article._id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {format(new Date(article.createdAt), "MMM yyyy")}
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    mocked
                  </div>

                  <Button
                    onClick={() => {}}
                    size="sm"
                    className="w-full"
                    variant="destructive"
                  >
                    {/* {currentlyDeletingFile === article.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : ( */}
                    <Trash
                      className="h-4 w-4"
                      onClick={() => deleteArticle(article._id)}
                    />
                    {/* )} */}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3} />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="font-semibold text-xl">Pretty empty around here</h3>
          <p>Let&apos;s drop your first Link here.</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
