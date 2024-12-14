import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function CheckStatus() {
  const session = await getServerSession(authConfig);
  console.log(session);
  const loggedResponse = await fetch(
    "http://localhost:8080/api/protected/info",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.id_token}`,
      },
    }
  );

  console.log({ loggedResponse });

  const status = loggedResponse.ok ? "Logged in" : "Logged out";

  return (
    <div>
      <p>{status}</p>
    </div>
  );
}
