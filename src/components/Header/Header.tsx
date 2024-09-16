import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex w-full items-center justify-between p-4 from-pink-100 to-blue-100">
            <nav>
                <ul className='flex space-x-4 py-4 font-semibold bg-white rounded-full'>
                    <li><a href='#' className='py-4 px-7 rounded-full  text-blue-700 hover:bg-blue-700 hover:text-white transition'>Rewrite</a></li>
                    <li><a href='#' className='py-4 px-7 rounded-full  text-blue-700 hover:bg-blue-700 hover:text-white transition'>Evaluate</a></li>
                    <li><a href='#' className='py-4 px-7 rounded-full  text-blue-700 hover:bg-blue-700 hover:text-white transition'>Essay</a></li>
                    <li><a href='#' className='py-4 px-7 rounded-full bg-blue-700 text-white hover:bg-blue-100 hover:text-blue-700 transition'>Chat</a></li>
                </ul>
            </nav>
            <h2 className="font-bold text-2xl text-gold-500">Tutor<span className=" text-orange-300">Chase</span></h2>
            <div className="flex space-x-8 mr-8">
                <a href='#' className='text-orange-500 text-base font-bold hover:underline'>Monthly Plan</a>
                <a href='#' className='text-blue-700 text-base font-bold hover:underline'>Manage Plan</a>
            </div>
        </header>
    )
}

export default Header;
