import { Plus } from 'lucide-react'
import React from 'react'

const NavSelector = () => {
  return (
    <div className="relative  h-screen">
      <div className="fixed flex items-center justify-center bottom-[20px] right-[20px] w-[40px] h-[40px] bg-red-500 rounded-full">
        <Plus size={20} className="text-white" />
      </div>

      
    </div>
  );
}

export default NavSelector