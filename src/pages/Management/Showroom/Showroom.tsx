import s from "./Showroom.module.scss";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

type ShowroomManagementProps = {

}

const ShowroomManagement = () => 
{
    return(
        <div className={s.showroomManagement}>
            <Header 
                title={"MANAGEMENT"}
                enableNavBar={false}
            />

            <div className={s.container}>
                <Sidebar
                    position={"left"}
                >
                    Eu sou
                </Sidebar>
                
                <div className={s.vehicles}>Testee</div>
            </div>
        </div>
    )
}


export default ShowroomManagement;