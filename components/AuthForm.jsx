"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
// import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useGlobalStore from "@/store";

function isValidEmail(email) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

const AuthForm = () => {
  const router = useRouter();
  const setUser = useGlobalStore((state) => state.setUser);
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const authentication = async (e) => {
    if (email == "" || password == "") {
      toast("Please fill all the fields");
      return;
    }
    if (!isValidEmail(email)) {
      toast("Enter a valid email");
      return;
    }
    if (isSignIn) {
      const res = await fetch(`/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      console.log(data, "data");
      if (res.ok) {
        Cookies.set("token", data.token, { expires: 1 }); // Set cookie with expiry matching JWT
        setUser(data.token ? jwtDecode(data.token).user : null);
        toast("Logged In");
        router.push("/dashboard");
      } else {
        toast("Authentication failed!");
      }
      // router.push("/");
    } else {
      if (confirmPassword == "" || username == "") {
        toast("Please fill all the fields");
        return;
      }
      if (password != confirmPassword) {
        toast("Password does not match");
        return;
      }
      try {
        const res = await fetch(`/api/user/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            username: username,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          Cookies.set("token", data.token, { expires: 1 }); // Set cookie with expiry matching JWT
          setUser(data.token ? jwtDecode(data.token).user : null);
          toast("Acount Created");
          router.push("/dashboard");
        } else {
          toast("Authentication failed!");
          // router.push("/authuser");
        }
      } catch (error) {
        console.log(error);
        toast("Failed to create user");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f7f7] px-4 text-center">
        <h1 className="mb-4 text-5xl font-bold leading-tight text-gray-900">
          {isSignIn ? "Sign in" : "Sign up"} to your Account
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Access your personalized dashboard and manage your Data.
        </p>

        <div className="w-full max-w-md space-y-8">
          <Card className="w-full">
            <CardContent>
              <div className="space-y-6">
                {!isSignIn && (
                  <div className="mt-5">
                    <Input
                      placeholder="Username"
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                )}
                <div className="mt-5">
                  <Input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {!isSignIn && (
                  <div>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <Button className="w-full" onClick={authentication}>
                    {isSignIn ? "Sign In" : "Sign Up"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center">
            <p className="text-sm text-gray-600">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                href="#"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
