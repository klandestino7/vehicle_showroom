import { eVehicleClass } from "@/constants/eClasses";
import s from "./SideCategories.module.scss";
import { useContext } from "react";
import { useMainPageCtx } from "@/contexts/MainPageCtx";
import { CategoryType, useAppContext } from "@/contexts/AppContext";



type ItemProps = {
    id: eVehicleClass;
    label: string;
    number: number;
}

const Item = ({id, label, number} : ItemProps) => {
    const { currentCategory, setCategory } = useMainPageCtx();

    return (
        <div className={`${s.item} ${id == currentCategory ? s.selected : "" }`} onClick={() => setCategory(id)}>
            {label}
            <div className={s.counter}>
                <span className={s.number}>{number}</span>
                <span className={s.arrow}></span>
            </div>
        </div>
    )
}

const SideCategories = () => 
{
    const { categories } = useAppContext();

    return (
        <div className={s.sideCategories}>
            {
                categories.map((item: CategoryType) => (
                    <Item
                        id={item.id}
                        label={item.label}
                        number={item.length}
                    />
                ))
            }
        </div>
    )
}

export default SideCategories