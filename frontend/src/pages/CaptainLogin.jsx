import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { captainLogin } from '../redux/auth/captain/captainAuthActions'

const captainLoginSchema = zod.object({
  email: zod.string().email('Invalid email address'),
  password: zod.string().min(6, 'Password must be at least 6 characters long'),
});

const CaptainLogin = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(captainLoginSchema),
  });

  const error = useSelector((state) => state.captain.error);
  const loading = useSelector((state) => state.captain.loading);

  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    await dispatch(captainLogin(data, navigate));
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={handleSubmit(submitHandler)}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            {...register('email')}
          />
          <p className="text-red-500 font-medium mb-5">
            {errors?.email?.message}
          </p>
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
            {...register('password')}
          />
          <p className="text-red-500 mb-7 font-medium mb-5">
            {errors?.password?.message}
          </p>
          {error && <p className='text-red-500 text-center font-medium mb-5'>{error}</p>}
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            disabled={loading}
          >Login</button>
        </form>
        <Loader loading={loading} />
        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin