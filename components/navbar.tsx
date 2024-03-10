import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = () => {
return (
    <div className="flex items-ceenter p-4">
        <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
        </Button>
        <div className="flex w-full justify-end">
            <UserButton afterSignOutUrl="/" />
        </div>
    </div>
    )
}

export default NavBar;