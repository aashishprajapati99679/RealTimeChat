import React from 'react'
import Sidebar from './Sidebar'
import Messagecontainer from './Messagecontainer'
const HomePage = () => {
    return (
        <div className='lg:w-[90%] lg:h-[90%] flex sm:h-[90%] md:h-[90%] w-[90%] md:w-[90%] text-black rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100'>
            <Sidebar />
            <Messagecontainer />
        </div>
    )
}

export default HomePage