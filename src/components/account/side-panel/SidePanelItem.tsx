import React from 'react'

type SidePanelItemProps = {
  // Define any props if needed
  title: string;
}

const SidePanelItem = ({ title }: SidePanelItemProps) => {
  return (
    <div className='p-2 hover:bg-gray-200 transition-colors duration-200'>{title}</div>
  )
}

export default SidePanelItem