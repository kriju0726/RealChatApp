import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({})

    const handleInput = (e) => {
        setInputData({
            ...inputData, [e.target.id]:e.target.value
        })
    }
console.log(inputData);
    const selectGender = (selectGender) => {
        setInputData((prev)=>({
            ...prev, gender:selectGender === inputData.gender ? '' : selectGender
        }))
    }

    const handleSubmit=() => {

    }

  return (
    <div className='flex flex-col items-center justify-center min-w-full mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-lg
                            bg-gray-400 bg-clip-padding
                            backdrop-filter backdrop-blur-lg bg-opacity-20'>
                <h1 className='text-3xl font-bold text-center text-gray-300'>Register
                    <span className='text-gray-950'> Chatters </span>
                </h1>

                <form onSubmit={handleSubmit} className='flex flex-col text-black'>
                    <div>
                        <label className='label p-2'>
                            <span className='font-bold text-gray-950 text-xl label-text'>FullName :</span>
                        </label>
                        <input id='fullname' type='text' 
                        onChange={handleInput}
                        placeholder='Enter your fullname...: ' 
                        required className='w-full input input-bordered h-10'/>

                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='font-bold text-gray-950 text-xl label-text'>UserName :</span>
                        </label>
                        <input id='username' type='text' 
                        onChange={handleInput}
                        placeholder='Enter your username...: ' 
                        required className='w-full input input-bordered h-10'/>

                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='font-bold text-gray-950 text-xl label-text'>Email :</span>
                        </label>
                        <input id='email' type='email' 
                        onChange={handleInput}
                        placeholder='Enter your Email...: ' 
                        required className='w-full input input-bordered h-10'/>
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='font-bold text-gray-950 text-xl label-text'>Password :</span>
                        </label>
                        <input id='password' type='password' 
                        onChange={handleInput}
                        placeholder='Enter your password...: ' 
                        required className='w-full input input-bordered h-10'/>

                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='font-bold text-gray-950 text-xl label-text'>Confirm Password :</span>
                        </label>
                        <input id='confpassword' type='text' 
                        onChange={handleInput}
                        placeholder='Enter Confirm password...: ' 
                        required className='w-full input input-bordered h-10'/>

                    </div>
                    <div id='gender' className='flex gap-2'>
                        <label className="cursor-pointer label flex gap-2">
                        <span className="label-text font-semibold text-gray-950">male</span>
                        <input 
                        onChange={()=>selectGender('male')}
                        checked={inputData.gender === 'male'}
                        type='checkbox' className="checkbox checkbox-info"/>
                        </label>
                        <label className="cursor-pointer label flex gap-2">
                        <span className="label-text font-semibold text-gray-950">female</span>
                        <input
                        onChange={()=>selectGender('female')}
                        checked={inputData.gender === 'female'}
                        type='checkbox' className="checkbox checkbox-info"/>
                        </label>
                    </div>
                    <button type='submit' className='mt-4 self-center 
                            w-auto px-2 py-1 bg-gray-950 
                            text-lg hover:bg-gray-900 
                            text-white rounded-lg hover: scale-105'>
                            {loading ? "loading.." : "LogIn"}
                    </button>
                </form>
                <div className='pt-2'>
                    <p className='text-sm font-semibold text-gray-800'>
                            Don't have an Acount ? 
                        <Link to={'/login'}>
                                <span className='text-gray-950 
                                        font-bold underline cursor-pointer
                                        hover:text-green-950'> Login Now!! </span>
                        </Link>
                    </p>
                </div>
            </div>
    </div>
  )
}

export default Register


