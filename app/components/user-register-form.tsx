"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Icons } from "@/app/components/icons";
import { userRegisterSchema } from "@/lib/validations/register";
import registerUser from "../services/auth.service";

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement>;

type FormData = z.infer<typeof userRegisterSchema>;

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const registerResponse = await registerUser(data);

    setIsLoading(false);

    if (!registerResponse?.ok) {
      return console.error("Something went wrong!");
    }

    const dataResponse = await registerResponse.json();

    console.log(dataResponse);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="jhon@doe.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Contraseña
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Crear cuenta
          </Button>
        </div>
      </form>
    </div>
  );
}
