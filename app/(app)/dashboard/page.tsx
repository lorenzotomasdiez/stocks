import { defaultLinks } from "@/config/nav";
import { getUserAuth } from "@/lib/auth/utils";
import MenuOption from "@/sections/home/menu-option";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <div className="flex flex-col text-center max-w-screen-md mx-auto">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        Bienvenido/a {session?.user.name}
      </h1>
      <div className="grid grid-cols-3 mt-10 gap-4">
        {defaultLinks.map((e) => (
          <MenuOption
            key={e.href}
            href={e.href}
            label={e.title}
            icon={e.icon}
            isSelected={e.title === "Home"}
          />
        ))}
      </div>
    </div>
  );
}
