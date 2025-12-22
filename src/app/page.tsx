import Image from "next/image";
import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center"> slate.ai <br /> <span className="text-green-600 font-bold">ai powered</span> <br /> note taking <br /> <span className="text-green-600 font-bold">assistant.</span></h1>
        <div className="mt-4">
          <h2 className="font-semibold text-3xl text-center text-slate-700" ><TypewriterTitle/> </h2>
          <div className="mt-8">
            <div className="flex justify-center">
               <a href="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 cursor-pointer">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
