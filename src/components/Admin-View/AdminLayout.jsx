import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <div className="flex min-h-screen w-full">
      {/* admin Slider */}
      <AdminSideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      <div className="flex flex-1 flex-col">
        {/* admin Header */}
        <AdminHeader setOpenSidebar={setOpenSidebar} />
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
