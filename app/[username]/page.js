import Paymentpage from '@/components/Paymentpage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

export async function generateMetadata({ params }) {
  const { username } = await params

  return {
    title: `@${username} - Get Me A Chai`,
  }
}

const Username = async ({ params }) => {
  const { username } = await params // it means params.username
  // If the username is not present in the database, show a 404 page
  const checkUser = async () => {
    await connectDb()
    let u = await User.findOne({ username: username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser()



  return (
    <>
      <Paymentpage username={username} />
    </>
  )
}
export default Username

