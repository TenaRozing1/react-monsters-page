import "./search-box.style.css";

const SearchBox = ({className, placeholder, onChangeHandler}) => (
  // when we dont have written return, that is called implicite return
  <input
    className={`search-box ${className}`}
    type="search" // with this type we get little x at the end to delete string from input
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
);

export default SearchBox;
