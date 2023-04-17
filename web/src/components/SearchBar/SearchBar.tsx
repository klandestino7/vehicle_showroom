import { useAppContext } from "@/contexts/AppContext";
import s from "./SearchBar.module.scss";

type SearchBarProps = {
    
}

const SearchBar = () => 
{
    const { setWords } = useAppContext();

    const handleChange = (event) => {
        setWords(event.target.value);
    }

    return(
        <div className={s.searchBar}>
            <input 
                type="text" 
                placeholder="Search car"
                onChange={handleChange}
            />

            <img src={"./icons/search.svg"} alt="search" />
        </div>
    )
}


export default SearchBar;