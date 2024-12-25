import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import { captainRegister } from "../redux/auth/captain/captainAuthActions"

const captainSignupSchema = zod.object({
  fullName: zod.object({
    firstName: zod.string().nonempty("First name is required"),
    lastName: zod.string(), 
  }),
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
  vehicle: zod.object({
    color: zod.string().nonempty("Vehicle color is required"),
    plate: zod.string().nonempty("Vehicle plate is required"),
    capacity: zod.string().nonempty("Capacity must be at least 1"),
    vehicleType: zod.enum(["car", "auto", "motorcycle"], {
      errorMap: () => ({ message: "Invalid vehicle type" }),
    }),
  }),
});

const CaptainSignup = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: {
        firstName: "",
        lastName: "",
      },
      email: "",
      password: "",
      vehicle: {
        color: "",
        plate: "",
        capacity: "",
        vehicleType: "",
      },
    },
    mode: "onChange",
    resolver: zodResolver(captainSignupSchema),
  });

  const error = useSelector((state) => state.captain.error);
  const loading = useSelector((state) => state.captain.loading);

  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    await dispatch(captainRegister(data, navigate));
  }

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={handleSubmit(submitHandler)}>
          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-4'>
            <input
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              {...register("fullName.firstName")}
            />
            <input
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              {...register("fullName.lastName")}
            />
          </div>
          <p className="mb-7 text-red-500 font-medium">{errors.fullName?.firstName?.message}</p>
          <p className="mb-7 text-red-500 font-medium">{errors.fullName?.lastName?.message}</p>
          
          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            {...register("email")}
          />
          <p className="mb-7 text-red-500 font-medium">{errors.email?.message}</p>
          
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
            {...register("password")}
          />
          <p className="mb-7 text-red-500 font-medium">{errors.password?.message}</p>
          
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4'>
            <input
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              {...register("vehicle.color")}
            />
            <input
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              {...register("vehicle.plate")}
            />
          </div>
          <p className="mb-7 text-red-500 font-medium">{errors.vehicle?.color?.message || errors.vehicle?.plate?.message}</p>
          
          <div className='flex gap-4'>
            <input
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              {...register("vehicle.capacity")}
            />
            <select
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              {...register("vehicle.vehicleType")}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
          <p className="text-red-500 mb-7 font-medium">{errors.vehicle?.capacity?.message || errors.vehicle?.vehicleType?.message}</p>
          <p className="text-center text-red-500 mb-5 font-medium">{error && error}</p>
          
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            disabled={loading}
          >
            {loading ? "Submitting" : "Create Captain account"}
          </button>
        </form>
        
        <Loader loading={loading} />
        
        <p className='text-center'>
          Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link>
        </p>
      </div>
      
      <div>
        <p className='text-[10px] mt-6 leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup;
