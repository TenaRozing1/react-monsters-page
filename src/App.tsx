import { useEffect, useState, ChangeEvent } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";
import { getData } from "./utils/data.utils";

export type Monster = {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  console.log("render");
  const [searchField, setSearchField] = useState(""); // [value, setValue]
  const [monsters, setMonsters] = useState<Monster[]>([]); // value i setter value
  const [filteredMonsters, setFilteredMosters] = useState(monsters);

  console.log("render");

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users") // fetch from API
    //   // when i fetched that it is a promise
    //   .then((response) => response.json()) // parsirani podatci
    //   .then((users) => setMonsters(users));
    const fetchUsers = async () => {
      const users = await getData<Monster[]>("https://jsonplaceholder.typicode.com/users")
      setMonsters(users);
    }

    fetchUsers();
  }, []); // in callback goes code that we want to happen inside our function component
  // posto pozivam fetch tj. dohvacam podatke s apija potrebno je samo jednom na mount da se dogodi, zato je array of dependencies prazan
  // array of dependencies je prazan u ovom slucaju jer se izvrsava dohvacanje s apija samo, to je prikladno za operacije koje se trebaju izvršiti samo jednom prilikom mountanja komponente.
  // prazan array of dependencies osigurava da se ovaj efekt izvrši samo jednom nakon prvog renderiranja.
  useEffect(() => {
    // kad god se updatea monsters i searchfield treba se izvrsiti funkcija u tom useEffectu
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField); // includes is array method that returns true or false (boolean type)
    });
    setFilteredMosters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    // this.setState(() => { // method unique to class components and we are not using it anymore
    //   return { searchField };
    // }); // WE DONT NEED THIS ANYMORE BECAUSE OF USESTATE
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="monsters-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users") // fetch from API
//       // when i fetched that it is a promise
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }

//   onSearchChange = (event) => {
//     // kao sto je onclick na klik, tako je ovo na promjenu inputa (okida se na promjenu inputa)
//     // callback function runs whenever the value in  input field changes
//     // we get back an event
//     // console.log(event.target.value); // get value
//     const searchField = event.target.value.toLocaleLowerCase();
//     // it recieve callback and pass to every monster in array
//     // if the name includes the search string in input field (event.target.value) => it is that what we write in search box
//     // next step is to set monsters to filtered monsters
//     // includes is not case sensitive so we need to add toLowerCase to find right monster
//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//
//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         {/* {filteredMonsters.map((monster) => {
//           return (
//             <div key={monster.id}>
//               <h1>{monster.name}</h1>
//             </div>
//           );
//         })} */}
//         <SearchBox
//           onChangeHandler={onSearchChange}
//           placeholder="search monsters"
//           className="monsters-search-box"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
