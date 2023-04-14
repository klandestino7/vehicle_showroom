import { eVehicleClass } from "@/constants/eClasses";
import s from "./SideCategories.module.scss";
import { categoriesMock } from "@/constants/categories";
import { useContext } from "react";
import { useMainPageCtx } from "@/contexts/MainPageCtx";



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

    return (
        <div className={s.sideCategories}>
            {
                categoriesMock.map(item => (
                    <Item
                        id={item.id}
                        label={item.label}
                        number={item.vehiclesAmount}
                    />
                ))
            }
        </div>
    )
}

export default SideCategories