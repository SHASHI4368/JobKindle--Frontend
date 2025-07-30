import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { AlignJustify, X } from "lucide-react";

const SideBar = () => {
  return (
    <Drawer direction="top">
      <DrawerTrigger className="md:hidden">
        <AlignJustify size={20} className="text-gray-500" />
      </DrawerTrigger>
      <DrawerContent className="pt-[10vh] ">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
          <div className="flex flex-col text-[50px] space-y-2 text-gray-500justify-end items-center w-full">
            <Button className="w-full" size={"home"} variant={"outline"}>
              Login
            </Button>
            <Button
              className="text-white w-full"
              size={"home"}
              variant={"default"}
            >
              Sign Up
            </Button>
          </div>
        </DrawerHeader>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBar;
