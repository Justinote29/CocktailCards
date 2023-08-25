import Accordion from "react-bootstrap/Accordion";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

// Todo- Get bootstrap accordion to work correctly. Fit api call-  Why do you have to click twice on the cocktails to get the recipe to appear.  Maybe try and convert to cards that turn around and reveal the recipe/ingredients when clicked.

const CocktailList = (props) => {
  // Feedback: what are these about? What do they do?
  //These are variables taken from the data the first API call returned.  cocktailName is the name of the cocktail, cocktailImage the image, and cocktailId is used for the second API call to access the ingredients and instructions.  You can see the docs here- https://www.thecocktaildb.com/api.php

  //destructuring props to get out these vairables.
  let { cocktailName, cocktailImage, cocktailid } = props;

  //id is used based on the api documentation to make the Api call that will return the ingredients and instructions.  I set the id to the cocktail that is clicked in the onClickHandler with the cocktailid variable that I destructured from the props (above)

  const [id, setId] = useState("");
  //instructions returns all the cocktail details including ingredients and measurements. Once I get this working correctly, I'll update this to a better name.
  const [instructions, setInstructions] = useState([]);

  //used to set the ingredients for each cocktail.
  const [ingredients, setIngredients] = useState([]);

  // used to set the measurements for each cocktail.
  const [measurements, setMeasurements] = useState([]);

  // feedback: no comments on what these do?
  //           also it's a good idea to put all the state variables together
  //               so they are easy to find.

  //These are used to toggle on and off the ingredients and instructions.  When that flat is set to true, onClick, the ingredients and instructs pop up.
  // const [flag, setFlag] = useState(false);

  //state for card flip
  const [flip, setFlip] = useState(false);

  // Feedback: the id here is undefined.  Since it is coming from the state which has
  //           not received any values. It is an empty array. I'm not sure what's
  //           happening here without comments

  //I'm setting the id with the cocktailid  in the onClickHandler (below) that is returned with each item from the first api call.  So I set the id to use in the api call since you access the ingredients and instructions like this -Lookup full cocktail details by id with 11007 being an example id in the following url.
  // www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

  //in the OnClickHandler I'm setting the cocktailid to look up the cocktail instructions and ingredients with the api call.  I returned the results from the api call and called them instructions, but they really hold all the cocktail details including measurements and ingredients.    The ingredients are returned as individual items in an object so I had to search for them by filtering for keys that include "strIngredient", then I had to get rid of the items starting with strIngredient that had a value of null (depending on the number of ingredients they have, to return only keys that contained ingredients as values (ingredientsList variable).  I then use setIngredients to set ingredients to Object.values(ingredientsList) so it's an array and I can map over it to render each item as a list item.  I do the same thing for the measurement items to create a list of measurements that correspond to each ingredient.

  const onClickHandler = (id) => {
    setFlip(!flip);
    setId(id);
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInstructions(data.drinks[0]);
      })
      .catch((error) => {
        console.log("Error coming from API:", error);
      });
  };

  useEffect(() => {
    let ingredientsList = Object.keys(instructions)
      .filter((key) => key.includes("strIngredient"))
      .reduce((cur, key) => {
        return Object.assign(cur, { [key]: instructions[key] });
      }, {});
    Object.keys(ingredientsList).forEach((key) => {
      if (!ingredientsList[key]) delete ingredientsList[key];
    });
    setIngredients(Object.values(ingredientsList));
    console.log(ingredients);

    let measurementsList = Object.keys(instructions)
      .filter((key) => key.includes("strMeasure"))
      .reduce((cur, key) => {
        return Object.assign(cur, { [key]: instructions[key] });
      }, {});
    Object.keys(measurementsList).forEach((key) => {
      if (!measurementsList[key]) delete measurementsList[key];
    });
    setMeasurements(Object.values(measurementsList));
    console.log(measurements);
  }, [instructions]);

  return (
    <div className="container">
      <div className={`card ${flip ? "flip" : ""}`}>
        <div className="front" onClick={() => onClickHandler(cocktailid)}>
          <Card.Title className="cocktailName">
            <h3>{cocktailName}</h3>
            <img className="image" src={cocktailImage} alt={cocktailName} />
          </Card.Title>
        </div>
        <div className="back" onClick={() => setFlip(!flip)}>
          <h5 className="title">Ingredients</h5>
          <div className="listDiv">
            <ul className="ingredients">
              {measurements.map((measurement) => (
                <li key={measurement}>{measurement}</li>
              ))}
            </ul>
          </div>
          <div className="listDiv">
            <ul className="ingredients">
              {ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <h5 className="title">Instructions</h5>
          <p className="instructions">{instructions.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default CocktailList;
