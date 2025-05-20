import Image from "next/image"
import Logo from "@/public/logo.svg"
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <div className="w-screen flex flex-row p-4 items-center justify-between">
            <Image width={180} height={180} src={Logo} alt="logo"/>
            <div className="flex flex-row gap-4">
                <Button>About</Button>
            </div>
        </div>
    )
}