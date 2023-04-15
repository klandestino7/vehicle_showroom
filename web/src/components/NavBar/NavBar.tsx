import { NavLink } from "react-router-dom";
import s from "./NavBar.module.scss";
import { DefaultRoutes } from "@/constants/Routes";
import { lang } from "@/constants/language";

type NavBarProps = {
    
}

const NavBar = () => 
{
    return(
        <div className={s.navBar}>
            <NavLink 
                to={DefaultRoutes.MainPage}
                className={({ isActive, isPending }) =>
                    isPending ? s.item : isActive ? `${s.item} ${s.selected}` : s.item
                }
            >
                {lang("main_page")}
            </NavLink>

            <NavLink 
                to={DefaultRoutes.SpecialOffers}
                className={({ isActive, isPending }) =>
                    isPending ? s.item : isActive ? `${s.item} ${s.selected}` : s.item
                }
            >
                {lang("special_offers")}
                <span className={s.tag}>
                    {lang("hot")}
                </span>
            </NavLink>
        </div>
    )
}


export default NavBar;