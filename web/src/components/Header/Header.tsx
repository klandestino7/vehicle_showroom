import NavBar from "../NavBar/NavBar";
import SearchBar from "@/components/SearchBar/SearchBar";
import s from "./Header.module.scss";
import { Navigate, redirect, useNavigate, useRoutes } from "react-router-dom";

type HeaderProps = {
    // firstWord: string;
    title: string;
    enableNavBar: boolean;
}

type toolbarButtonProps = {
    label: string;
    icon: string;
    handle: () => void;
}

const ToolbarButton : React.FC<toolbarButtonProps> = ({label, icon, handle}) =>{

    return(
        <div className={s.toolButton}>
            <img src={`./icons/${icon}.svg`} alt={label} onClick={handle} />
        </div>
    )
}

const Toolbar = () => {
    const navigate = useNavigate();

    const closeAllPage = () =>{
        navigate("/");
    }

    const openDashboardPage = () =>{
        navigate("/management");
    }

    return (
        <div className={s.toolbar}>
            <ToolbarButton 
                label = {"settings"}
                icon = {"settings"}
                handle = {() => openDashboardPage()}
            />
            <ToolbarButton
                label = {"exit"}
                icon = {"exit"}
                handle = {closeAllPage}
            />
        </div>
    )
}

const Header : React.FC<HeaderProps> = ({title, enableNavBar}) => 
{
    return(
        <div className={s.root}>
            <div className={s.title}>
                <div>
                    <span className={s.firstWord}>CAR</span>
                    <span>SHOWROOM</span>
                </div>

                <span>{title}</span>
            </div>

            <SearchBar />

            {
                enableNavBar && <NavBar />
            }

            <Toolbar />
        </div>
    )
}


export default Header;