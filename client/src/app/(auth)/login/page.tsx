"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/redux.hooks";
import { loginThunk } from "@/redux/thunk/auth.thunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long.")
    .nonempty("Password is required."),
});

interface LoginFormData {
  email: string;
  password: string;
}

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      router.push("/dashboard");
      toast.success("Login Successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-b-custom w-full h-screen  py-32">
      <div className="px-4 md:px-20 md:max-w-screen-sm lg:max-w-screen-md  mx-auto overflow-hidden md:border rounded-lg pb-10 md:bg-white">
        <h1 className="text-2xl font-semibold my-8">
          Welcome to <span className="text-[#4534AC]">Workflow</span>!
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-button-gradient">
              Login
            </Button>
          </form>
        </Form>
        <div className="text-center my-2">
          Don’t have an account? Create a{" "}
          <Link href="/signup" className="text-[#4534AC]">
            new account.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
