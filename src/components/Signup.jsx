import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth';
import { Button, Logo, Input } from '../components'
import { login } from '../store/authSlice'

export default function Signup() {
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("")
    try {
      const res = await authService.createAccount(data);
      if (res) {
        const user = await authService.getUser();
        if (user) dispatch(login(user));
        navigate("/")
      }

    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary
            transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="write your full name"
              {...register("name", {
                required: true
              })}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
              })}
            />
            <Input
              label="Password"
              type='password'
              {...register("password", {
                required: true
              })}
            />
            <Button
              type="submit"
              className="w-full">
              Create Account
            </Button>

          </div>
        </form>
      </div>
    </div>
  )
}