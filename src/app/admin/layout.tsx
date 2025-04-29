'use client'

import NavBar from "@/app/admin/_components/NavBar"

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <div className="flex">
      <NavBar />
      {children}  
    </div>
  )
}

export default AdminLayout