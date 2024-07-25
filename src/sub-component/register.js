import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        const namePattern = /^[a-zA-Z\s]+$/; // Only letters and spaces
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const mobilePattern = /^[0-9]{10}$/; // Only 10-digit numbers

        if (!name.match(namePattern)) {
            Swal.fire({
                title: 'Error!',
                text: 'Name can only contain letters and spaces',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        if (!email.match(emailPattern)) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid email address',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        if (!mobile.match(mobilePattern)) {
            Swal.fire({
                title: 'Error!',
                text: 'Mobile number must be a 10-digit number',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        if (!name || !email || !password || !mobile || !role) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        try {
            await axios.post('https://realestate-backend-k9l8.onrender.com/register', { name, email, password, mobile, role });
            Swal.fire({
                title: 'Success!',
                text: 'Register successful',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate('/login');
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Register failed',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            console.error('Error registering user:', error);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Sign up
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                

                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or sign up with e-mail
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder="Name"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        required
                                        pattern="[a-zA-Z\s]+"
                                        title="Name can only contain letters and spaces"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                        title="Please enter a valid email address"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="tel"
                                        placeholder="Contact No."
                                        onChange={(e) => setMobile(e.target.value)}
                                        value={mobile}
                                        required
                                        pattern="[0-9]{10}"
                                        title="Mobile number must be a 10-digit number"
                                    />

                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required
                                    />
                                    <select
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        onChange={(e) => setRole(e.target.value)}
                                        value={role}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="tenant">Tenant</option>
                                    </select>

                                    <button onClick={handleSubmit}
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">
                                            Sign Up
                                        </span>
                                    </button>
                                    <div className="text-sm">
                                        <a href='/login' className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">Already have an account</a>
                                    </div>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        I agree to abide by templatana's
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            Terms of Service
                                        </a>
                                        and its
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    );
}
