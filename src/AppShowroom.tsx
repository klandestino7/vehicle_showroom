
import { useEffect, useMemo, useState } from "react";

import useKeyPress from "./hooks/useKeyPress";
import {fetchApp} from "./hooks/fetchApp";
import { useNUIMessage } from "./utils/useNUIMessage";

import s from './AppShowroom.module.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultRoutes } from "./constants/Routes";
import MainPage from "./pages/Showroom/MainPage/MainPage";
import SpecialOffers from "./pages/Showroom/SpecialOffers/SpecialOffers";
import BackgroundBars from "./elements/BackgroundBars/BackgroundBars";
import { VehicleSelectedCtxProvider } from "./contexts/VehicleSelectedCtx";
import ShowroomManagement from "./pages/Management/Showroom/Showroom";

const AppShowroom = () => {
    const [displayUi, setDisplayUi] = useState<boolean>(true);

    const escPressed = useKeyPress('Escape');

    useEffect(() =>{
        if (escPressed) {
            setDisplayUi(false)
            fetchApp('AppShowroom', 'CLOSE_INTERFACE');
        }
    },[escPressed]);

    useNUIMessage<boolean>('AppShowroom/DisplayNUI', (data) =>
    {
        setDisplayUi(data);
    });

    return (
        <VehicleSelectedCtxProvider>
            <div className={`${s.root} ${ displayUi ? s.active : '' }`} >
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