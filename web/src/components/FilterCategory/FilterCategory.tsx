import s from "./FilterCategory.module.scss";

type FilterCategoryProps = 
{
    id: number;
    label: string;
}

const FilterCategory : React.FC<FilterCategoryProps> = ({id, label}) => {

    return (
        <div className={s.filterCategory}>
            {label}
        </div>
    )
}

export default FilterCategory