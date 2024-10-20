import { usePathname, useRouter } from "next/navigation"

type SidebarItemType = {
    Name: string,
    Icon: React.ReactNode,
    Link: string
}
const SidebarItem = ({Name, Icon, Link} : SidebarItemType) => {
    const router = useRouter();
    const pathname = usePathname();
    
    const isActive = pathname===Link;
    return (
        <div>

            <div onClick={()=>{router.push(Link)}} className={`cursor-pointer flex items-center p-2 rounded-lg group ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
            } text-gray-900 dark:text-white`}>
                {Icon}
                <span className="ms-3">{Name}</span>
            </div>
        </div>
    )
}

export default SidebarItem