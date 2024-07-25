import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "../sub-component/navbar";
import SliderProject from "../sub-component/sliderprojects";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '../CSSfiles/rental.css';

export default function UploadForRentFlate() {
    const userId = localStorage.getItem('data1');
    console.log(userId);

    const [flatlocation, setFlatlocation] = useState('');
    const [pricing, setPricing] = useState('');
    const [rating, setRating] = useState('');
    const [sqtfoot, setSqtfoot] = useState('');
    const [bedroom, setBedroom] = useState('');
    const [beds, setBeds] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [conte, setConte] = useState('');
    const [imagesq, setImages] = useState(null);
    const [imageName, setImageName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
            });
            return;
        }

        // Contact number validation
        const contactPattern = /^\d{10}$/;
        if (!contactPattern.test(conte)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Contact Number',
                text: 'Please enter a valid 10-digit contact number.',
            });
            return;
        }

        // Flat location validation (alphanumeric)
        const flatLocationPattern = /^[a-zA-Z0-9\s]+$/;
        if (!flatLocationPattern.test(flatlocation)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Flat Location',
                text: 'Flat location should be alphanumeric.',
            });
            return;
        }

        // Pricing validation (format example: 10,000)
        const pricingPattern = /^\d{1,3}(?:,\d{3})*$/;
        if (!pricingPattern.test(pricing)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Pricing Format',
                text: 'Please enter pricing in the correct format (e.g., 10,000).',
            });
            return;
        }

        // Rating validation (should not be greater than 5)
        if (parseFloat(rating) > 5) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Rating',
                text: 'Rating should be between 0 and 5.',
            });
            return;
        }

        // Square foot validation (numeric)
        const sqtFootPattern = /^\d+$/;
        if (!sqtFootPattern.test(sqtfoot)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Square Footage',
                text: 'Please enter a valid numeric value for square footage.',
            });
            return;
        }

        // Bedrooms validation (numeric)
        if (!Number.isInteger(Number(bedroom)) || parseInt(bedroom) < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Number of Bedrooms',
                text: 'Please enter a valid numeric value for bedrooms.',
            });
            return;
        }

        // Bathrooms validation (numeric)
        if (!Number.isInteger(Number(beds)) || parseInt(beds) < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Number of Bathrooms',
                text: 'Please enter a valid numeric value for bathrooms.',
            });
            return;
        }

        // Checkbox validation
        const checkbox = document.getElementById('checkbox1');
        if (!checkbox.checked) {
            Swal.fire({
                icon: 'error',
                title: 'Terms and Conditions',
                text: 'Please agree to the terms and conditions.',
            });
            return;
        }

        // Validation passed, proceed with form submission
        const formData = new FormData();
        formData.append('flatlocation', flatlocation);
        formData.append('pricing', pricing);
        formData.append('rating', rating);
        formData.append('sqtfoot', sqtfoot);
        formData.append('bedroom', bedroom);
        formData.append('beds', beds);
        formData.append('image', imagesq);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('conte', conte);

        try {
            const response = await axios.post(`https://realestate-backend-k9l8.onrender.com/uploadflat/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log(response.data);
            Swal.fire({
                icon: "success",
                title: "Uploaded!",
                text: "Flat uploaded successfully!",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            console.error('Error uploading image:', error);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImages(file);
            setImageName(file.name);
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ marginTop: '7%' }}>
                <div className="lg:m-10">
                    <form className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10" onSubmit={handleSubmit}>
                        <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Fill Details for Rent a Flat</h1>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div>
                                <label>Enter Name</label>
                                <input type="text" placeholder="Enter Name" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label>Email ID</label>
                                <input type="text" placeholder="Enter email ID" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label>Contact Number</label>
                                <input type="text" placeholder="Contact number" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setConte(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div>
                                <label>Flat Location with Size</label>
                                <input type="text" placeholder="Location here" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setFlatlocation(e.target.value)} />
                            </div>
                            <div>
                                <label>Pricing (e.g., 10,000)</label>
                                <input type="text" placeholder="ex: 12,000/month" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setPricing(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label>Rating (0-5)</label>
                            <input type="text" placeholder="4/5" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setRating(e.target.value)} />
                        </div>
                        <div>
                            <label>Square Footage</label>
                            <input type="text" placeholder="120sqt" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setSqtfoot(e.target.value)} />
                        </div>
                        <div>
                            <label>Number of Bedrooms</label>
                            <input type="text" placeholder="4" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setBedroom(e.target.value)} />
                        </div>
                        <div className="flex items-center">
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Image
                                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                            </Button>
                            {imageName && <span className="ml-3">{imageName}</span>}
                        </div>
                        <div>
                            <label>Number of Bathrooms</label>
                            <input type="text" placeholder="3" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" onChange={(e) => setBeds(e.target.value)} />
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" id="checkbox1" />
                            <label htmlFor="checkbox1">I agree to the <a href="#" target="_blank" className="text-blue-600">Terms and Conditions</a></label>
                        </div>
                        <div>
                            <button type="submit" className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white">Submit</button>
                        </div>
                    </form>
                </div>
                <SliderProject />
            </div>
        </>
    );
}
