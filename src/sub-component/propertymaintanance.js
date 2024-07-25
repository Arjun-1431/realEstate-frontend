import Navbar from '../sub-component/navbar';
import SliderProject from '../sub-component/sliderprojects';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function randombg() {
  var random = Math.floor(Math.random() * 4);
  var bigSize = [
    "url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60')",
    "url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60')",
    "url('https://images.unsplash.com/photo-1441794016917-7b6933969960?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=60')",
    "url('https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1400&q=60')"
  ];
  document.getElementById("right").style.backgroundImage = bigSize[random];
}

export default function PropertyMaintenance() {
  const [name, setName] = useState('');
  const [flatno, setFlatNo] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regular expression patterns
    const namePattern = /^[A-Za-z\s]+$/;
    const flatnoPattern = /^[A-Za-z0-9]+$/;
    const mobilenoPattern = /^[0-9]{10}$/;

    // Validations
    if (!name || !flatno || !mobileno || !service) {
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (!namePattern.test(name)) {
      Swal.fire({
        title: 'Error!',
        text: 'Name should only contain characters',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    // Check if flatNo contains only numbers
    if (!isNaN(flatno)) {
      Swal.fire({
        title: 'Error!',
        text: 'Flat No. should be alphanumeric',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (!flatnoPattern.test(flatno)) {
      Swal.fire({
        title: 'Error!',
        text: 'Flat No. should be alphanumeric',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (!mobilenoPattern.test(mobileno)) {
      Swal.fire({
        title: 'Error!',
        text: 'Mobile No. should be exactly 10 digits',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    try {
      await axios.post('https://realestate-backend-k9l8.onrender.com/submitquery', { name, mobileno, flatno, service });
      Swal.fire({
        title: 'Success!',
        text: 'Query submitted successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Query submission failed',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      console.error('Error submitting query:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
        <section style={{ marginTop: '5%' }} className="py-12 text-gray-800 sm:py-24">
          <div className="mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
            <div className="max-w-2xl px-4 lg:pr-24">
              <h3 className="mb-5 text-3xl font-semibold">Property Maintenance</h3>
              <p className="mb-16 text-lg text-gray-600">we understand the importance of maintaining your property to the highest standards. Our property maintenance services are designed to ensure your property remains in excellent condition, providing you with peace of mind and preserving the value of your investment.</p>
              <div className="mb-5 flex font-medium">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-7 w-7 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                  </svg>
                </div>
                <div>
                  <p className="mb-2">Monthly 400k Image Downloads</p>
                  <span className="font-normal text-gray-600">Ensure your property visuals are always up-to-date and appealing. With our service, you can download up to 400k images monthly, showcasing your property in the best light. Whether it's for marketing materials or records, we've got you covered.</span>
                </div>
              </div>
              <div className="mb-5 flex font-medium">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-7 w-7 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <div>
                  <p className="mb-2">Stay Synced to the Database</p>
                  <span className="font-normal text-gray-600">Keep your property data accurate and up-to-date with our database synchronization service. All information is automatically updated, ensuring that you have the most current data at your fingertips. This feature helps in seamless property management and decision-making.</span>
                </div>
              </div>
              <div className="mb-5 flex font-medium">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-7 w-7 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div>
                  <p className="mb-2">Save on Energy Costs</p>
                  <span className="font-normal text-gray-600">Our maintenance services include energy efficiency audits and improvements. By identifying areas where your property can save energy, we help reduce your overall costs and contribute to a more sustainable environment.</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-100 shadow-gray-500/20 mt-8 mb-8 max-w-md bg-white shadow-sm sm:rounded-lg sm:shadow-lg lg:mt-0">
              <div className="relative border-b border-gray-300 p-4 py-8 sm:px-8">
                <h3 className="mb-1 inline-block text-3xl font-medium"><span className="mr-4">Property Maintenance Form</span><span className="inline-block rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-700 sm:inline">Quick Response</span></h3>
                <p className="text-gray-600">Contact us for custom use cases</p>
              </div>
              <div className="p-4 sm:p-8">
                <TextField fullWidth label="Your Name" id="fullWidth" style={{ margin: '1%' }} onChange={(e) => setName(e.target.value)} required />
                <TextField fullWidth label="Flat No." id="fullWidth" style={{ margin: '1%' }} onChange={(e) => setFlatNo(e.target.value)} required />
                <TextField fullWidth label="Mobile No." id="fullWidth" style={{ margin: '1%' }} onChange={(e) => setMobileNo(e.target.value)} required />

                <div className="peer-invalid:block mt-1 hidden text-left text-xs text-rose-600">Email format Incorrect. Please complete the email</div>
                <label className="mt-5 mb-2 inline-block max-w-full">About our Service</label>
                <select className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" onChange={(e) => setService(e.target.value)} required>
                  <option value="">Select Service</option>
                  <option value="Full Home Cleaning">Full Home Cleaning</option>
                  <option value="Home disinfection">Home disinfection</option>
                  <option value="Painting & Waterproofing">Painting & Waterproofing</option>
                  <option value="Unfurnished apartment">Unfurnished apartment</option>
                  <option value="Full Home Deep Cleaning">Full Home Deep Cleaning</option>
                  <option value="Outdoor lighting installation and repair">Outdoor lighting installation and repair</option>
                  <option value="Seasonal clean-up (spring and fall)">Seasonal clean-up (spring and fall)</option>
                  <option value="Roof maintenance and repair">Roof maintenance and repair</option>
                  <option value="Exterior painting">Exterior painting</option>
                  <option value="Pest control (insects, rodents)">Pest control (insects, rodents)</option>
                  <option value="Plumbing repairs and maintenance">Plumbing repairs and maintenance</option>
                  <option value="Electrical repairs and maintenance">Electrical repairs and maintenance</option>
                  <option value="Carpentry repairs">Carpentry repairs</option>
                  <option value="Window cleaning">Window cleaning</option>
                </select>
                <button style={{ marginTop: '1%' }} onClick={handleSubmit} className="w-full rounded-lg border border-blue-700 bg-blue-700 p-3 text-center font-medium text-white outline-none transition focus:ring hover:border-blue-700 hover:bg-blue-600 hover:text-white">Submit</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div style={{ marginTop: '0%' }}>
        <SliderProject />
      </div>
    </div>
  );
}
