import React from 'react'
import SidePanelItem from './SidePanelItem'

const SidePanel = () => {
  return (
    <div className='w-[30%] rounded-[10px] shadow-sm flex flex-col p-4 bg-gray-100'>
      <h2 className='text-lg font-semibold mb-4'>Account Settings</h2>
      <div className='flex flex-col'>
        {/* Add SidePanelItem components here */}
        <SidePanelItem title="Profile" />
        <SidePanelItem title="Security" />
        <SidePanelItem title="Notifications" />
        <SidePanelItem title="Privacy" />
      </div>
    </div>
  )
}

export default SidePanel