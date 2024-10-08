"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authFormSchema } from "../../schemas/auth.schema";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import CustomInput from "../shared/inputs/custom-input";


const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        console.log("SIGNING UP USER: ", data);

        const userData = {
          first_name: data.first_name!,
          last_name: data.last_name!,
          address1: data.address1!,
          city: data.city!,
          postal_code: data.postal_code!,
          date_of_birth: data.date_of_birth!,
          email: data.email,
          password: data.password,
        };

        const response = await fetch("http://localhost:3002/api/users/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Sign-up failed");
        }

        setUser(result);
        router.push("/");
      }

      if (type === "sign-in") {
        
        console.log("SIGNING IN USER: ", data);

        const userSignin = {
          email: data.email,
          password: data.password,
        };

        const response = await fetch("http://localhost:3002/api/users/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userSignin),
        });

        console.log("RESPONSE: ", response);
  
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Sign-in failed");
        }

        setUser(result);
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen w-full flex-col justify-center gap-5 py-10 sm:px-32 md:gap-8 bg-white">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/assets/icons/logo/energy-bloom-icon.png"
            width={90}
            height={90}
            alt="Energy Bloom logo"
          />
          <h1 className="text-[26px] font-bold text-black-1">Energy Bloom</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[24px] lg:text-[36px] font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-[16px] font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/* <PlaidLink user={user} variant="primary" /> */}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="first_name"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="last_name"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your specific address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="postal_code"
                      label="Postal Code"
                      placeholder="Example: 11101"
                    />
                    <CustomInput
                      control={form.control}
                      name="date_of_birth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="text-[16px] rounded-lg border border-primary bg-primary font-semibold text-white shadow-form"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-[14px] font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
