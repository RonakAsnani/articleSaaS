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
    console.log(user, "dash");
  }, [user]);
  return <Dashboard />;
};

export default page;
