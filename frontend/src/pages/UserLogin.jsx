import { Link, useNavigate} from 'react-router-dom'
import { userLogin } from '../redux/auth/user/userAuthActions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'

const loginSchema = zod.object({
    email: zod.string().email('Invalid email address'),
    password: zod.string().min(6, 'Password must be at least 6 characters long'),
})

const UserLogin = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange',
        resolver: zodResolver(loginSchema)
    })

    const error = useSelector(state => state.user.error)
    const loading = useSelector(state => state.user.loading)
    const dispatch = useDispatch()

    const submitHandler = async (data) => {
        await dispatch(userLogin(data, navigate))
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

                <form onSubmit={handleSubmit(submitHandler)}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                        {...register('email')}
                    />
                    <p className='mb-5 text-red-500 font-medium'>{errors.email?.message}</p>

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                    <input
                        className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="password"
                        placeholder='password'
                        {...register('password')}
                    />
                    <p className='mb-5 text-red-500 font-medium'>{errors.password?.message}</p>
                    <p className='mb-5 text-center text-red-500 font-medium text-lg'>{error && error}</p>
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                        disabled={loading}
                    >{loading ? "Submitting" : "Login"}</button>
                </form>
                <Loader loading={loading} />
                <p className='text-center'>New here? <Link to='/user-signup' className='text-blue-600'>Create new Account</Link></p>
            </div>
            <div>
                <Link
                    to='/captain-login'
                    className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                >Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin