import { NavLink } from "react-router-dom";
import s from "./NavBar.module.scss";
import { DefaultRoutes } from "@/constants/Routes";

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
                MAIN PAGE
            </NavLink>

            <NavLink 
                to={DefaultRoutes.SpecialOffers}
                className={({ isActive, isPending }) =>
                    isPending ? s.item : isActive ? `${s.item} ${s.selected}` : s.item
                }
            >
                SPECIAL OFFERS
                <span className={s.tag}>HOT</span>
            </NavLink>
        </div>
    )
}


export default NavBar;