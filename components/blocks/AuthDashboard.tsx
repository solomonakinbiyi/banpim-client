"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { UserContext } from "@/context/app";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  page: "signin" | "signup";
};

export function AuthDashboard({ page }: Props) {
  const { session, setSession } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("email", email);

      formData.append("password", password);

      const response = await axios.post(
        `/api/login`,
        { email, password },
        {
          validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
          },
        }
      );

      setLoading(false);

      
      if (response.status < 400) {
        const { data } = response;

        if (data.status === "success") {
          toast.success(data.message);
          
          const userObject = {
            email: data.data.user.email
          }

          setSession({
            user: userObject,
            token: data.data.token,
          });

          // save in localstorage
          window.localStorage.setItem("userauth", JSON.stringify(data.data));

          router.push("/dashboard");
        } else if (data.status === "error") {
          toast.error(data.message);
        }
      } else {
        // Handle other status codes (e.g., 400, 500)
        // Access response data from error object
        const { data } = response;

        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);

      toast.error("Something went wrong. Please try again");
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      let formData = new FormData();

      formData.append("email", email);

      formData.append("password", password);

      const response = await axios.post(
        `/api/user`,
        { email, password },
        {
          validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
          },
        }
      );

      setLoading(false);

      if (response.status < 400) {
        // Handle successful response
        const { data } = response;
        if (data.status === "success") {
          toast.success(data.message);

          const userObject = {
            email: data.data.user.email
          }

          setSession({
            user: userObject,
            token: data.data.token,
          });

          // save in localstorage
          window.localStorage.setItem("userauth", JSON.stringify(data.data));

          router.push("/dashboard");
        } else if (data.status === "error") {
          toast.error(data.message);
        }
      } else {
        // Handle other status codes (e.g., 400, 500)
        // Access response data from error object
        const { data } = response;

        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);

      toast.error("Something went wrong. Please try again");
    }
  };

  if (session && session.token) router.push("/dashboard");

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              {page === "signin" ? "Sign in" : "Create an account"}
            </h1>
            <p className="text-balance text-muted-foreground">
              {page === "signin"
                ? "Enter your email below to sign in to your account"
                : "Enter your email below to create an account"}
            </p>
          </div>
          <form
            className="grid gap-4"
            onSubmit={page === "signin" ? handleLogin : handleRegister}
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full">
              {page === "signin" ? "Sign in" : "Register"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {page === "signin"
              ? "Don't have an account? "
              : "Already an account? "}
            <Link
              href={page === "signin" ? "/signup" : "/signin"}
              className="underline"
            >
              {page === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            <Link href={"/"} className="underline">
              Home page
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/balazs-ketyi-9VzoRKfBsMM-unsplash.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
