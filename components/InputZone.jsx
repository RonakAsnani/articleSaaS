"use client";

import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "react-toastify";
import useUserStore from "@/store/UserStore";
import useArticleStore from "@/store/ArticleStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}

export function InputZone() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const user = useUserStore((state) => state.user);
  const setArticleData = useArticleStore((state) => state.setArticleData);

  const AddSession = async () => {
    if (url == "" || title == "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (!isValidUrl(url)) {
      toast.error("Enter a valid Url");
      return;
    }

    const body = JSON.stringify({
      user: user,
      url: url,
      title: title,
    });
    // console.log(body);
    try {
      const res = await api.post(`/api/article/add`, body);
      const newArticle = res.data.newArticle;
      console.log(newArticle);
      toast.success("Session created");
      setArticleData(newArticle);
      router.push(`/dashboard/${newArticle._id}`);
    } catch (error) {
      toast.error("Failed to create session");
      console.log(error);
    }
  };
  return (
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle>New Session</CardTitle>
        <CardDescription>Enter the URL and the title.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Label className="text-sm" htmlFor="url">
            URL
          </Label>
          <Input
            className="mt-1 text-sm w-full"
            id="url"
            placeholder="Enter the URL"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm" htmlFor="name">
            Title
          </Label>
          <Input
            className="mt-1 text-sm w-full"
            id="name"
            placeholder="Enter the title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="border-t p-6">
        <div className="flex justify-end gap-2">
          <Button type="submit" onClick={AddSession}>
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
