import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard/>
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket/>
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck/>
  }
];


function MenuItem(){
  const navigate = useNavigate()
  return <nav className='mt-8 flex flex-col gap-2'>
    {
      adminSidebarMenuItems.map((menuItem)=><div key={menuItem.id} onClick={()=>navigate(menuItem.path)} className='flex cursor-pointer text-2xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground'>
        {menuItem.icon}
        <span>{menuItem.label}</span>
      </div>)
    }
  </nav>
}

const AdminSideBar = () => {

  const navigate = useNavigate()
  return (
    <Fragment>
      <aside className='hidden lg:flex w-64 flex-col border-r bg-background p-6'> 
        <div onClick={()=>navigate("/admin/dashboard")} className='flex items-center gap-2 cursor-pointer'>
          <ChartNoAxesCombined size={30}/>
          <h1 className='text-xl font-extrabold'>Admin Pannel</h1>
        </div>
        <MenuItem/>
      </aside>
    </Fragment>
  )
}

export default AdminSideBar
