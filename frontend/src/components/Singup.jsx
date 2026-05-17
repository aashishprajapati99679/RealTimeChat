import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';


const Singup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    {
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: ""
    }
  );
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/user/register", user, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(res.data);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed due to a network error");
    }
    setUser({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
  }


  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }

  return (
    <div className='text-black w-[30%]'>
      <div className='w-full p-6 rounded-lg shadow-md bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Sing Up</h1>
        <form action="" onSubmit={handleSignup}>
          <div>
            <label className='label p-2'>
              <span className='text-black label-text'> Full Name : </span>
            </label>
            <input type="text"
              placeholder='Ashish'
              className='w-full input bg-white text-black file-input-bordered h-10'
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })} />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-black label-text'> User Name : </span>
            </label>
            <input type="text"
              placeholder='Ashish'
              className='w-full input bg-white text-black file-input-bordered h-10'
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })} />


          </div>

          <div>
            <label className='label p-2'>
              <span className='text-black label-text'> Password : </span>
            </label>
            <input type="password"
              placeholder='Enter your password'
              className='w-full input bg-white text-black file-input-bordered h-10'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-black label-text'> Confirm Password : </span>
            </label>
            <input type="password"
              placeholder='Confirm your password'
              className='w-full input bg-white text-black file-input-bordered h-10'
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />

          </div>
          <br />
          <div className='flex gap-4'>
            <input type="radio"
              name='gender'
              className='checkbox checkbox-primary'
              onChange={() => handleCheckbox("male")} />
            <p className='text-black label-text'>Male</p>
            <input type="radio"
              name='gender'
              className=' checkbox checkbox-primary'
              onChange={() => handleCheckbox("female")}
            />
            <p className='text-black label-text'>Female</p>
          </div>

          <Link to="/login">
            <p className='text-black label-text flex justify-center mt-4'>Already have an account? Login</p>
          </Link>
          <button type="submit" className='btn btn-block bg-white text-black btn-neutral mt-4'>Sign Up</button>

        </form>
      </div>

    </div>
  )
}
export default Singup