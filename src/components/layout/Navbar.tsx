import Link from "next/link";
import DrawerPost from "../post/DrawerPost";
import {Button} from "@/components/ui/button";

const Navbar = () => {
    return ( 
        <nav className="flex justify-around bg-amber-400 p-5">
            <Button variant="default">
            <Link href="/">Post list</Link>
            </Button>

            <Button variant="default">
            <Link href="/categories">Category list</Link>
            </Button>
            <DrawerPost />
        </nav>
     );
}
 
export default Navbar;