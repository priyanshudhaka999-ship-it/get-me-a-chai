
import React from 'react'
import Dashboard from '@/components/Dashboard'

const dashboard = () => {

  // This is a server component so we cant use useEffect or useSession here so we to this stuff i <Dashboard/> bcoz its a client component 
  /*   const { data: session } = useSession()
      const router = useRouter()
    
      useEffect(() => {
        if (!session) {
          router.push("/login")
        }
      }, [session, router])
     */
  return (
    <Dashboard/>
  )
}

export default dashboard
export const metadata = {
  title : "Dashboard - get me chai!"
}