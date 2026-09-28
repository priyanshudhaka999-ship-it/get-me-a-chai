import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white flex items-center justify-center px-4 h-16">
        <p className="text-center">Get me a chai &copy; {new Date().getFullYear()} All rights reserved</p>
    </footer>
  )
}

export default Footer
