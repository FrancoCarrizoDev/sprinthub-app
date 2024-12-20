import * as z from "zod";

export const userRegisterSchema = z
  .object({
    email: z.string().email({
      message: "Por favor ingresa un email válido.",
    }),
    firstName: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    lastName: z.string().min(2, {
      message: "El apellido debe tener al menos 2 caracteres.",
    }),
    password: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Las contraseñas no coinciden.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
