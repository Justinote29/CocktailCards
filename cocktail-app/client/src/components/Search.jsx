import { useState } from "react";
import "../App.css";
import CocktailList from "./CocktailList";

// TODO - fix error message, doesn't work now that I moved the CocktailList to it's own file

function Search() {
  //used to capture what's entered in the input and then to reset it after an ingredient when user presses enter.
  const [searchTerm, setSearchTerm] = useState("");

  //used to setCocktails to the data returned from the API call and then take out the data used for the CocktailList to pass it as props to the cocktailList component.
  const [cocktails, setCocktails] = useState([]);

  //used as a toggle to have (click on cocktail for recipe) appear after enter is pressed on the input. And for it to not appear on page refresh.
  const [flag, setFlag] = useState(false);

  //captures what is entered into input.
  const onChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  //performs api call when user presses enter.  Uses the searchTerm to complete the API call. and then setsCocktails to the data returned to then pass as props to child component.  It resets the input to an empty string and uses setFlag to goggle on the (Click cocktail for recipe) h3.
  const onSubmitHandler = (event) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
    event.preventDefault();

    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(`Error with fetch`);
      })
      .then((data) => {
        setCocktails(data.drinks);
        setSearchTerm("");
        setFlag(true);
      })
      .catch((error) => {
        console.log("Error coming from API:", error);
        setCocktails([`No cocktails found with that ingredient`]);
      });
  };

  return (
    <div className="searchContainer">
      <h1>Cocktail Search</h1>
      <form action="#" onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="enter an ingredient"
          onChange={onChangeHandler}
          value={searchTerm}
        />
      </form>
      <br />
      {flag && (
        <div>
          {/* <h2>Cocktails made with {cocktailIngredient}</h2> */}
          <h3>(Click card for recipe)</h3>
        </div>
      )}
      <div className="cocktailListContainer">
        {cocktails.map((cocktail) => (
          <CocktailList
            key={cocktail.idDrink}
            cocktailid={cocktail.idDrink}
            cocktailName={cocktail.strDrink}
            cocktailImage={cocktail.strDrinkThumb}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
