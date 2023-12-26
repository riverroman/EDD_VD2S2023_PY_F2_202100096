import * as React from 'react'

export default function Form(){
    return(
        <div className='bg-white px-20 py-20 rounded-3xl border-2 border-gray-100 font-mono'>
            <h1 className='text-5xl font-semibold text-center'>Bienvenido</h1>
            <p className='font-medium text-lg text-gray-500 mt-4 text-center'>Ingrese sus Datos</p>
            <div className='mt-8'>
                <div className='text-center'>
                    <label className='text-lg font-medium'>User</label>
                    <input 
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-center font-mono'
                        placeholder='Ingresa tu User'
                    />
                </div>
                <div className='text-center'>
                    <label className='text-lg font-medium' >Password</label>
                    <input 
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-center font-mono'
                        placeholder='Ingresa tu Password'
                        type='password'
                    />
                </div>
                <div className='mt-8 flex justify-center items-center'> 
                    <div className='w-full flex items-center justify-center gap-1'> 
                        <input
                            type='checkbox'
                            id='admin'
                        />
                        <label className='font-medium text-base' for="admin" >Administrador</label>
                        <input
                            type='checkbox'
                            id='estudiante'
                        />
                        <label className='font-medium text-base' for="estudiante" >Estudiante</label>
                    </div>
                </div>
                <div className='mt-8 flex justify-center items-center'>
                    <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.1] ease-in-out w-full bg-violet-500 text-white text-lg font-bold py-4 rounded-xl tracking-wide'>Ingresar</button>
                </div>
            </div>
        </div>
    )
}