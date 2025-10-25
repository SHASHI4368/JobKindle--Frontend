import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditJobPostMain from './EditPostContent';

export type EditJobPostDialogProps = {
 open: boolean;
 setOpen: (open: boolean) => void;
}

const EditJobPostDialog = ({ open, setOpen }: EditJobPostDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='md:max-w-[60vw] md:min-w-[60vw] max-w-[90vw] min-w-[90vw] min-h-[90vh] overflow-auto max-h-[90vh]'>
       <DialogTitle className='text-2xl font-bold mb-4'></DialogTitle>
        <EditJobPostMain open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default EditJobPostDialog