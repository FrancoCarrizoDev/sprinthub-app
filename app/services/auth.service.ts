export default function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}
