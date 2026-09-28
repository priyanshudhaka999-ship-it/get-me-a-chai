import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import Payment from "@/models/Payment";
import { connect } from "mongoose";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import User from "@/models/User";

export const POST = async(req)=>{
await connectDB()
let body = await req.formData()
body = Object.fromEntries(body)
// check if razorpay id is  present on server
let p = await Payment.findOne({oid:body.razorpay_order_id})
if(!p){
    return NextResponse.json({success:false,message:'order id not found'})
}
let user = await User.findOne({ username: p.to_user })

if (!user) {
    return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
    )
}

let secret = user.razorpaysecret?.trim()
if (!secret) {
    return NextResponse.json(
        { success: false, message: "Recipient Razorpay secret is missing." },
        { status: 400 }
    )
}

// validate payment verification
let xx = validatePaymentVerification({order_id:body.razorpay_order_id,payment_id:body.razorpay_payment_id},body.razorpay_signature,secret)

if(xx){
    //update payment
    let updatedPayment = await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:true},{new:true})
    return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
)
}else{
    return NextResponse.json({success:false,message:"payment verification failed"}, { status: 400 })
}
}