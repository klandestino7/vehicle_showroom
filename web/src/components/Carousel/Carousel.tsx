import { useCategoryCtx } from "@/contexts/CategoryCtx";
import s from "./Carousel.module.scss";
import { useEffect, useRef, useState } from "react";
import { eVehicleClass, eVehicleClassLabel } from "@/constants/eClasses";
import VehicleCard, { VehicleCardProps } from "../VehicleCard/VehicleCard";
import { lang } from "@/constants/language";
import { CategoryType, VehicleType, useAppContext } from "@/contexts/AppContext";
import Vehicles from "../VehicleCardContainer/VehicleCardContainer";


const Carousel = () => {
    const ref = useRef(null);
    const { currentCategory } = useCategoryCtx();
    const { categories } = useAppContext();
    const [categoryLabel, setCategoryLabel] = useState<string>("");
    const [vehicles, setVehicles] = useState<number>(0);

    const getVehicleAmountFromCategory = () => {
        let amount = 0

        categories.map((item : CategoryType) => {
            if (item.id == currentCategory)
                amount = item.length;
        })

        return amount
    }

    useEffect(() => {
        const element : any = ref.current;

        const handleSmooth = (event: any) => {
            event.preventDefault();

            element.scrollBy({
                left: event.deltaY < 0 ? -40 : 40,
            });
        };

        element.addEventListener('wheel', handleSmooth);

        return () => {
            element.removeEventListener('wheel', handleSmooth);
        };
    }, []);

    useEffect(() => {
        console.log("currentCategory", currentCategory)
        setCategoryLabel(eVehicleClassLabel[currentCategory]);
        setVehicles(getVehicleAmountFromCategory())
    }, [currentCategory]);

    return (
        <div className={s.carousel}>
            <div className={s.header}>
                <span>{categoryLabel} ── {vehicles}</span>

                <div className={s.sortButton}>
                    <img src={"./icons/sort.svg"} alt={"cheapest first"} />
                    <span>{lang("cheapest_first")}</span>
                </div>
            </div>

            <div className={s.container} ref={ref}>
                <div className={s.carouselGrid}>
                    <Vehicles />
                </div>
            </div>
        </div>
    )
}

export default Carousel 