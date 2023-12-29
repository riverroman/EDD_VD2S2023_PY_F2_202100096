import * as React from 'react'

export default function Header(){
    return(
        <div className='flex items-center justify-center gap-3'>
            <div>
                <img className='w-14 h-13' src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png" alt="usac-logo" />
            </div>
                <h1 className='font-mono text-2xl tracking-widest'>USAC - EDD</h1>
        </div>
    )
}