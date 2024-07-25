import React, { useEffect, useState } from "react";
import SliderProject from "./sliderprojects";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

export default function Customersupportpage() {
    const [emailid, setEmailid] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.email) {
                setEmailid(parsedUser.email);
            }
        }
        console.log('User Data1:', storedUser); // Log the user data1 to the console
    }, []);

    const isAlphabetic = (str) => /^[A-Za-z\s]+$/.test(str);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailid || !subject || !message) {
            Swal.fire({
                title: 'Error!',
                text: 'All fields are required.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
        if (!isAlphabetic(subject) || !isAlphabetic(message)) {
            Swal.fire({
                title: 'Error!',
                text: 'Subject and message must contain only alphabetic characters.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }
        try {
            await axios.post('https://realestate-backend-k9l8.onrender.com/submitcontectus', { emailid, subject, message });
            Swal.fire({
                title: 'Success!',
                text: 'We look forward to assisting you!',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            console.error('Error in Contact us:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="font-sans text-base text-gray-900 sm:px-10" style={{ marginTop: 30}}>
                <div className="text-base text-gray-900">
                    <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
                        <div className="mx-2 pt-12 text-center md:mx-auto md:w-2/3 md:pb-12">
                            <h1 className="mb-4 text-3xl font-black sm:text-5xl xl:text-6xl">Contact us</h1>
                            <div className="text-lg sm:text-xl xl:text-xl">
                                <div className="text-gray-900">
                                    <p className="mb-4">Have any questions or need assistance? Feel free to reach out to us through any of the methods below. Our dedicated team is ready to support you.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mb-20 flex w-full max-w-screen-lg flex-col overflow-hidden rounded-xl text-gray-900 md:flex-row md:border md:shadow-lg">
                    <form className="mx-auto w-full max-w-xl border-gray-200 px-10 py-8 md:px-8" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="text mb-2 block font-medium" htmlFor="subject">Subject:</label>
                            <input
                                className="w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                                id="subject"
                                type="text"
                                required
                                onChange={(event) => setSubject(event.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text mb-2 block font-medium" htmlFor="message">Message:</label>
                            <textarea
                                className="h-52 w-full rounded border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                                id="message"
                                required
                                onChange={(event) => setMessage(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1"></div>
                            <button className="rounded-xl bg-blue-600 px-4 py-3 text-center font-bold text-white hover:bg-blue-700" type="submit">Send message</button>
                        </div>
                    </form>
                    <div className="mt-10 bg-blue-600 px-10 py-8 text-gray-100 md:mt-0 md:ml-auto">
                        <div>
                            <p className="mb-4 font-medium border-b pb-2">OFFICE HOURS</p>
                            <p className="mb-4">Monday – Thursday: 08:00 – 16:00</p>
                            <p className="mb-4">Friday: 08:00 - 15:00</p>
                            <p className="mb-4">Weekend: Closed</p>
                            <p className="mb-4">
                                Email:
                                <a href="mailto:support@apps.io" className="font-semibold underline">info@saanviinovation.com</a>
                            </p>
                            <p className="mb-4">
                                Phone:
                                <a href="tel:07510103232" className="font-semibold underline"> 0751 (0) 10 32 32</a>
                            </p>
                            <hr className="my-2 h-0 border-t border-r-0 border-b-0 border-l-0 border-gray-300" />
                            <p className="mb-4">Org.no: 63452-2832</p>
                        </div>
                    </div>
                </div>
            </div>
            <SliderProject />
        </>
    );
}
