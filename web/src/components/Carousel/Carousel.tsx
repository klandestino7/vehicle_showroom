import { useMainPageCtx } from "@/contexts/MainPageCtx";
import s from "./Carousel.module.scss";
import { useEffect, useRef, useState } from "react";
import { eVehicleClass, eVehicleClassLabel } from "@/constants/eClasses";
import { categoriesMock } from "@/constants/categories";
import { vehiclesMock } from "@/constants/vehicles";
import VehicleCard, { VehicleCardProps } from "../VehicleCard/VehicleCard";

type VehiclesProps = {
    currentClass: eVehicleClass;
}

const Vehicles: React.FC<VehiclesProps> = ({ currentClass }) => {
    const generateVehicleArray = (): VehicleCardProps[] => {
        if (currentClass == eVehicleClass.all) {
            return vehiclesMock;
        }

        let array: VehicleCardProps[] = [];

        vehiclesMock.map(vehicle => {
            if (vehicle.class == currentClass) {
                array.push(vehicle);
            }
        })

        return array;
    }

    return (
        <>
            {generateVehicleArray().map(item => <VehicleCard
                {...item}
                showVehicleStatus={false}
            />)}
        </>
    )
}


const Carousel = () => {
    const ref = useRef(null);
    const { currentCategory } = useMainPageCtx();
    const [categoryLabel, setCategoryLabel] = useState<string>("");
    const [vehicles, setVehicles] = useState<number>(0);

    const getVehicleAmountFromCategory = () => {
        let amount = 0

        categoriesMock.map(item => {
            if (item.id == currentCategory)
                amount = item.vehiclesAmount;
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
        setCategoryLabel(eVehicleClassLabel[currentCategory]);
        setVehicles(getVehicleAmountFromCategory())
    }, [currentCategory]);

    return (
        <div className={s.carousel}>
            <div className={s.header}>
                <span>{categoryLabel} ── {vehicles}</span>

                <div className={s.sortButton}>
                    <img src={"./icons/sort.svg"} alt={"cheapest first"} />
                    <span>CHEAPEST FIRST</span>
                </div>
            </div>

            <div className={s.container} ref={ref}>
                <div className={s.carouselGrid}>
                    <Vehicles currentClass={currentCategory} />
                </div>
            </div>
        </div>
    )
}

export default Carousel 