import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import Content from './Content';

const Login = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"home"} variant={"ghost"}>
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className='z-[500] xl:w-[30%] md:w-[50%] w-[95%] min-h-[95vh]'>
        <DialogHeader>
          <DialogTitle></DialogTitle>
            <Content/>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Login