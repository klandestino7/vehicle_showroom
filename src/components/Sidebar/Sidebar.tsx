import s from "./Sidebar.module.scss";

type SidebarProps = {
    children: React.ReactNode;
    position: "left" | "right"; 
}

const Sidebar : React.FC<SidebarProps> = ({ children, position }) => 
{
    return(
        <div className={s.sideBar}
            // style={{position: "absolute", [position]: "0px"}}
        >
            {children}
        </div>
    )
}


export default Sidebar;