"use client"

import React, { useEffect } from 'react'
import Picture from './Picture';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import IsEditDialog from '../dialogs/IsEditDialog';
import { useDispatch, useSelector } from 'react-redux';
import { setIsProfileEditing } from '@/redux/features/accountSlice';

const AccountHeader = () => {
   const account = useSelector((state: any) => state.account);
   const dispatch = useDispatch();

   useEffect(() => {
     const isEditing = sessionStorage.getItem("isEditing");
      if (isEditing) {
        dispatch(setIsProfileEditing(JSON.parse(isEditing)));
      }
    }, [dispatch]);
  return (
    <div className="w-full px-[20px] flex md:flex-row flex-col items-center justify-between mt-[20px] border border-gray-200 bg-white md:h-[20vh] shadow-lg md:py-0 py-[20px] rounded-[10px] ">
      <Picture />
      <div className="md:w-[150px] w-full md:mt-0 mt-[10px] flex flex-row md:justify-end justify-center">
        <IsEditDialog/>
      </div>
    </div>
  );
}

export default AccountHeader