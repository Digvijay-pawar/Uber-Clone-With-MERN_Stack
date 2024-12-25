import { Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { userRegister } from "../redux/auth/user/userAuthActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const signUpSchema = zod.object({
    fullName: zod.object({
        firstName: zod.string().nonempty("First name is required"),
        lastName: zod.string(),
    }),
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
});

const UserSignup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            fullName: {
                firstName: "",
                lastName: "",
            },
            email: "",
            password: "",
        },
        mode: "onChange",
        resolver: zodResolver(signUpSchema),
    });

    const { errors } = formState;

    const error = useSelector((state) => state.user.error);
    const loading = useSelector((state) => state.user.loading);
    const dispatch = useDispatch();

    const submitHandler = async (data) => {
        await dispatch(userRegister(data, navigate));
    };

    return (
        <div>
            <div className="p-7 h-screen flex flex-col justify-between">
                <div>
                    <img
                        className="w-16 mb-10"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
                        alt=""
                    />

                    <form onSubmit={handleSubmit(submitHandler)}>
                        <h3 className="text-lg w-1/2  font-medium mb-2">What's your name</h3>
                        <div className="flex gap-4">
                            <input
                                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                                type="text"
                                placeholder="First name"
                                {...register("fullName.firstName")}
                            />
                            <input
                                className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                                type="text"
                                placeholder="Last name"
                                {...register("fullName.lastName")}
                            />
                        </div>
                        <p className="text-red-500 font-medium mb-5">
                            {errors.fullName?.firstName?.message}
                        </p>

                        <h3 className="text-lg font-medium mb-2">What's your email</h3>
                        <input
                            className="bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                            type="email"
                            placeholder="email@example.com"
                            {...register("email")}
                        />
                        <p className="text-red-500 font-medium mb-5">
                            {errors.email?.message}
                        </p>
                        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                        <input
                            className="bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                            type="password"
                            placeholder="password"
                            {...register("password")}
                        />
                        <p className="text-red-500 font-medium mb-5">
                            {errors.password?.message}
                        </p>

                        {error && (
                            <p className="text-red-500 text-center font-medium mb-5">
                                {error}
                            </p>
                        )}

                        <button
                            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
                            disabled={loading}
                        >
                            {loading ? "Submitting" : "Sign up"}
                        </button>
                    </form>
                    <Loader loading={loading} />
                    <p className="text-center">
                        Already have an account?{" "}
                        <Link to="/user-login" className="text-blue-600">
                            Login here
                        </Link>
                    </p>
                </div>
                <div>
                    <p className="text-[10px] leading-tight">
                        This site is protected by reCAPTCHA and the{" "}
                        <span className="underline">Google Privacy Policy</span> and{" "}
                        <span className="underline">Terms of Service apply</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserSignup;
