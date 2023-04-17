
import { useEffect, useMemo, useState } from "react";

import useKeyPress from "./hooks/useKeyPress";
import {fetchApp} from "./hooks/fetchApp";
import { useNUIMessage } from "./utils/useNUIMessage";

import s from './AppShowroom.module.scss';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { DefaultRoutes } from "./constants/Routes";
import MainPage from "./pages/Showroom/MainPage/MainPage";
import SpecialOffers from "./pages/Showroom/SpecialOffers/SpecialOffers";
import BackgroundBars from "./components/BackgroundBars/BackgroundBars";
import { VehicleSelectedCtxProvider } from "./contexts/VehicleSelectedCtx";
import ShowroomManagement from "./pages/Management/Showroom/Showroom";
import { IsEnvBrowser } from "./constants/IsEnvBrowser";
import { useAppContext } from "./contexts/AppContext";

const AppShowroom = () => {
    const [displayUi, setDisplayUi] = useState<boolean>(IsEnvBrowser ? true : false);
    const [backgroundDisplay, setBackgroundDisplay] = useState<boolean>(true);

    const [ currentLocation, setCurrentLocation ] = useState("dsds");

    const { setVehiclesNode, setCategoriesNode } = useAppContext();

    const currentPath = useLocation();

    const escPressed = useKeyPress('Escape');

    useEffect(() =>{
        setCurrentLocation(currentPath.pathname);
    },[currentPath]);

    useEffect(() =>{
        if (escPressed) {
            setDisplayUi(false)
            fetchApp('AppShowroom', 'CLOSE_INTERFACE');
        }
    },[escPressed]);

    useNUIMessage<boolean>('AppShowroom/DisplayNUI', (data) =>
    {
        setDisplayUi(data);
        setBackgroundDisplay(true);
    });

    useNUIMessage<boolean>('AppShowroom/DisableBackground', (data) =>
    {
        setBackgroundDisplay(data);
    });

    useNUIMessage<any>('AppShowroom/UpdateVehicleNode', (data) =>
    {
        setVehiclesNode(data);
    });

    useNUIMessage<any>('AppShowroom/UpdateCategoryNode', (data) =>
    {
        setCategoriesNode(data);
    });

    return (
        <VehicleSelectedCtxProvider>
            <div className={`${s.root} ${ displayUi ? s.active : '' }`} 
                style={{
                    background: currentLocation == "/" ? backgroundDisplay ? `url("./images/symbols.svg")` : `url("./images/main-bg.png")` : `url("./images/symbols.svg")`,
                    backgroundSize: "cover"
                }}
            >
                <BackgroundBars />

                <Routes>
                    <Route path={DefaultRoutes.MainPage} element={ <MainPage /> } />
                    <Route path={DefaultRoutes.SpecialOffers} element={ <SpecialOffers /> } />

                    <Route path={DefaultRoutes.Showroom} element={ <ShowroomManagement /> }>
                            {/* <Route path='/management/showroom' element={ <SpecialOffers /> }>

                            </Route> */}
                    </Route>
                </Routes>
            </div>
        </VehicleSelectedCtxProvider>
    )
}

export default AppShowroom;