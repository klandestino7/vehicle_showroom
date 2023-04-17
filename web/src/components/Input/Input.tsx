import { lang } from "@/constants/language";
import s from "./Input.module.scss";

type InputProps = 
{
    id: string;
    label: string;
    type: string;
    prefix: string;
    placeholder: string;
    minValue?: number;
    maxValue?: number;
    handleChange: (event: any) => void;
}

export const Input : React.FC<InputProps> = ({
    id,
    label,
    type,
    prefix,
    placeholder,
    minValue,
    maxValue,
    handleChange
}) => {

    return (
        <div className={s.input}>
            <span>
                {label}
                {
                    maxValue && minValue 
                    ?
                        <span className={s.small}>
                            <span>{lang("min_value")} {prefix}{minValue}</span>
                            <span>{lang("max_value")} {prefix}{maxValue}</span>
                        </span>
                    :
                    ""
                }
            </span>
            <label>
                {prefix}

                <input
                    style={prefix ? {marginLeft: "5px"} : {}}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    defaultValue={placeholder}
                    min={minValue}
                    max={maxValue}
                    onChange={handleChange}
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
    handleChange: (event: any) => void;
}

export const InputCheckbox : React.FC<InputCheckboxProps> = ({
    id,
    label,
    state,
    handleChange,
}) =>
{

    return (
        <div className={s.inputCheckbox}>
            <label className={s.switch}>
                <input id={id} type="checkbox"  defaultChecked={state} onChange={handleChange}/>
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

