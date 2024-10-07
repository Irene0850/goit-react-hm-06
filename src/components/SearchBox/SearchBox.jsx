import { useDispatch } from "react-redux";
import css from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const value = e.target.value;
    dispatch(changeFilter(value));
  };

  return (
    <div className={css.box}>
      <label className={css.label} htmlFor="">
        Find contacts by name
          </label>
          <input className={css.input} type="text" onChange={handleFilterChange} placeholder="Search contacts" />
    </div>
  );
};

export default SearchBox;
