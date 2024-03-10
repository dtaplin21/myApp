import { Button } from "@/components/ui/button";
import Link from "next/link";


const LandingPage = () => {
    return (
        <div>
            <div>
            Landing Page (unprotected)
        <Link href="sign-in" passHref>
        <Button>
            Login
        </Button>
        </Link>
        </div>
         <div>
     <Link href="sign-up" passHref>
     <Button>
         Register
    </Button>
     </Link>
     </div>
     </div>
    );
}

export default LandingPage;