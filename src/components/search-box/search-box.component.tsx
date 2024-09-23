import "./search-box.style.css";
import { ChangeEvent, ChangeEventHandler } from "react";
// interface ISearchBoxProps extends IChangeHandlerProps  {
//   className: string;
//   placeholder?: string;
// }

// interface IChangeHandlerProps {
//   onChangeHandler: (a: string) => void;
// }

type SearchBoxProps = {
  className: string;
  placeholder?: string;
  // onChangeHandler: ChangeEventHandler<HTMLInputElement>; this returns void and this under is second way of using
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

type CanadianAddress = {
  street: string;
  province: string;
}

type USAAddress = {
  street: string;
  state: string;
}

type ItalianAddress = {
  street: string;
  region: string;
}

type Address = CanadianAddress | USAAddress | ItalianAddress;


const Address: Address = {
  street: 'street',
  province: 'province',
  region: 'region'
}

const SearchBox = (
  { className, placeholder, onChangeHandler }: SearchBoxProps // type is isearchboxprops
) => (
  // when we dont have written return, that is called implicite return
  <input
    className={`search-box ${className}`}
    type="search" // with this type we get little x at the end to delete string from input
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
);

export default SearchBox;
