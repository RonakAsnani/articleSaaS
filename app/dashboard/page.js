"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useUserStore from "@/store/UserStore";
import Dashboard from "@/components/Dashboard";

const page = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (!Cookies.get("token")) {
      router.push("/authuser");
    }
  }, []);
  return <Dashboard />;
};

export default page;
