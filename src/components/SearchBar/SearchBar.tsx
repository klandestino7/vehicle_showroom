import s from "./SearchBar.module.scss";

type SearchBarProps = {
    
}

const SearchBar = () => 
{
    return(
        <div className={s.searchBar}>
            <input 
                type="text" 
                placeholder="Search car"
            />

            <img src={"./icons/search.svg"} alt="search" />
        </div>
    )
}


export default SearchBar;