export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response("Email and password are required", {
      status: 400,
    });
  }

  const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return new Response("Failed to register", {
      status: 400,
    });
  }

  return new Response("Success", {
    status: 200,
  });
}
