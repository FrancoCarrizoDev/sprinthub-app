import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./components/LogoutButton";

export default async function Home() {
  const session = await getServerSession(authConfig);

  if (!session) redirect("/auth/login");

  return (
    <div className="max-w-full overflow-hidden flex flex-col gap-3 justify-center p-10 ">
      <div className="p-10">
        <LogoutButton />
        Home Page
      </div>
    </div>
  );
}
