import { useState } from 'react'

export default function Toggle() {
    const [isOn, setIsOn] = useState(false);
  return (
    <div className='border' onClick={()=> setIsOn(!isOn)}>
        {isOn ? 'ON' : 'OFF'}
    </div>
  )
}
