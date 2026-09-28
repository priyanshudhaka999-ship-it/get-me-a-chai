"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"


const Paymentpage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({name:"",message:"",amount:""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setpayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('🦄 payment done Succesfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
router.push(`/${username}`)

    }, [])


    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)

        let dbpayments = await fetchpayments(username)
        setpayments(dbpayments)

        console.log(u, dbpayments)
    }

    const pay = async (amount) => {
        if (!window.Razorpay) {
            alert("Razorpay is still loading")
            return
        }

        let a = await initiate(amount, username, paymentform)
        let orderId = a.id

        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        const rzp1 = new window.Razorpay(options)

        rzp1.open()
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            {/* in newer versions of Next.js, params for dynamic routes is a Promise.
      this tries to access username before params has been resolved.
      {params.username} */}

            <div className='relative cover w-full  bg-red-50'>
                <img className='bg-cover w-full  h-[350]' src={currentUser.coverpic} alt="" />
                <div className="absolute -bottom-10 left-[48%] border-2 border-white  rounded-full ">
                    <img className="rounded-full" height={70} width={70}
                        src={currentUser.profilepic} alt="" />
                </div>
            </div>

            <div className="info flex justify-center items-center my-12 flex-col gap-2 ">
                <div className="font-bold text-lg">
                    @{username}
                </div>
                <div className="text-slate-400">
                   Lets help {username} to get a chai!
                 </div>
                <div className="text-slate-400">
                {payments.length} Payments · ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                </div>



                <div className="payment flex gap-3 w-[80%] mt-11">

                    <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-10">
                        {/* Show list of all the supporters as a leaderboard */}
                        <h2 className="text-2xl font-bold my-5">Supporters</h2>

                        <ul className="mx-5 text-1xl">
                            {payments.length == 0 && <li>no payments yet!</li>}
                            {payments.map((value, i) => {
                                return <li key={i} className="my-4 flex gap-2">
                                    <img height={33} width={33} src="man.svg" alt="" />
                                    <span >{value.name} donated </span><span className='font-bold'> ₹{value.amount}</span><span>{value.message}</span>
                                </li>
                            })}

                        </ul>
                    </div>

                    <div className="makePayment w-1/2 bg-slate-900 rounded-lg text-white p-10">
                        <h2 className="text-2xl font-bold my-5">Make a Payment</h2>

                        <div className="flex flex-col gap-2">

                            <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />

                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />

                            <button onClick={() => pay(Number.parseInt(paymentform.amount * 100))} type="button" className="w-fit text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 disabled:from-red-400 disabled:to-red-400" disabled={paymentform.name?.length < 3 || paymentform?.message?.length < 4 || paymentform.amount?.length < 1}>
                                Pay
                            </button>
                        </div>

                        {/* Or choose from these amounts */}
                        <div className='flex flex-col md:flex-row gap-2 mt-5'>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Paymentpage
