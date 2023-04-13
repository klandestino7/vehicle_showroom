import s from "./Input.module.scss";

type InputProps = 
{
    id: string;
    label: string;
    type: string;
    prefix: string;
    placeholder: string;
}

export const Input : React.FC<InputProps> = ({
    id,
    label,
    type,
    prefix,
    placeholder
}) => {

    return (
        <div className={s.input}>
            <span>{label}</span>
            <label>
                {prefix}

                <input
                    style={prefix ? {marginLeft: "5px"} : {}}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                />
            </label>
        </div>
    )
}


type InputCheckboxProps = 
{
    id: string;
    label: string;
    state: boolean;
}

export const InputCheckbox : React.FC<InputCheckboxProps> = ({
    id,
    label,
    state
}) =>
{

    return (
        <div className={s.inputCheckbox}>
            <label className={s.switch}>
                <input id={id} type="checkbox" defaultChecked={state}/>
                <div className={`${s.slider} ${s.round}`}>
                    <img src={"./icons/checked.svg"} alt="" />
                </div>
            </label>

            
            <span className={s.label}>
                {label}
            </span>
        </div>
    )
}

