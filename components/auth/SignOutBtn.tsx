"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function SignOutBtn() {
  return (
    <Button onClick={() => signOut()} className="w-full flex justify-between">
      Sign out
      <LogOut />
    </Button>
  );
}
