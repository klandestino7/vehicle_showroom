import { useCategoryCtx } from "@/contexts/CategoryCtx";
import s from "./FilterCategory.module.scss";

type FilterCategoryProps = 
{
    id: number;
    label: string;
}

const FilterCategory : React.FC<FilterCategoryProps> = ({id, label}) => {

    const { setCategory } = useCategoryCtx(); 

    return (
        <div className={s.filterCategory} onClick={() => setCategory(id)}>
            {label}
        </div>
    )
}

export default FilterCategory