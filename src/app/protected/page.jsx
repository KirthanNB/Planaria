import { currentUser } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
  const user = await currentUser();

  return (
    <div className="text-center p-10 text-xl text-white">
      Welcome <b>{user?.firstName}</b> — You are logged in 🎉
    </div>
  );
}
