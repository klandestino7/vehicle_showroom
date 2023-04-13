import s from "./BackgroundBars.module.scss";

const BackgroundBars = () => 
{

    return (
        <div className={s.bg}>
            <div className={s.topBar}></div>
            <div className={s.bottomBar}></div>
        </div>
    )
}

export default BackgroundBars