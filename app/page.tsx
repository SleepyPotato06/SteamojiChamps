import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header/>
      <div className="w-screen mt-[10rem] px-[35rem] flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col p-8 rounded-md justify-center items-center gap-6 border-2 border-stone-100 drop-shadow-lg">
          <div>Please login here</div>
          <Input type="text" placeholder="Username" className="min-w-[25rem]"/>
          <Input type="password" placeholder="Password" className="min-w-[25rem]"/>
          <Button className="hover:bg-blue-700 w-full">Login</Button>
        </div>
      </div>
    </>
  );
}
