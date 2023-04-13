import Carousel from "@/components/Carousel/Carousel";
import s from "./MainPage.module.scss";

import Header from "@/components/Header/Header";
import SideCategories from "@/components/SideCategories/SideCategories";
import Sidebar from "@/components/Sidebar/Sidebar";
import { MainPageCtxProvider } from "@/contexts/MainPageCtx";
import VehicleDetails from "@/components/VehicleDetails/VehicleDetails";
type MainPageProps = {

}

const MainPage = () => 
{
    return(
        <MainPageCtxProvider>
            <div className={s.mainPage}>
                <Header 
                    title={""}
                    enableNavBar={true}
                />

                <div className={s.container}>
                    <Sidebar
                        position={"left"}
                    >
                        <SideCategories />
                    </Sidebar>
                    
                    <div className={s.rightContainer}>
                        <VehicleDetails />

                        <Carousel />
                    </div>
                </div>
            </div>
        </MainPageCtxProvider>
    )
}


export default MainPage;