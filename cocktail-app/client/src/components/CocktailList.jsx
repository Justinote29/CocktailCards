import { useState, useEffect } from "react";
import { Card, CardGroup, Button } from "react-bootstrap";

const CocktailList = (props) => {
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

  //These are used to toggle on and off the ingredients and instructions.  When that flat is set to true, onClick, the ingredients and instructs pop up.
  // const [flag, setFlag] = useState(false);

  //state for card flip
  const [flip, setFlip] = useState(false);

  //I'm setting the id with the cocktailid  in the onClickHandler (below) that is returned with each item from the first api call.  So I set the id to use in the api call since you access the ingredients and instructions like this -Lookup full cocktail details by id with 11007 being an example id in the following url.
  // www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

  //in the OnClickHandler I'm setting the cocktailid and looking up the cocktail instructions and ingredients with the api call based on that id.  I returned the results from the api call and called them instructions, but they really hold all the cocktail details including measurements and ingredients.    The ingredients are returned as individual items in an object so I had to search for them by filtering for keys that include "strIngredient", then I had to get rid of the items starting with strIngredient that had a value of null (depending on the number of ingredients they have, to return only keys that contained ingredients as values (ingredientsList variable).  I then use setIngredients to set ingredients to Object.values(ingredientsList) so it's an array and I can map over it to render each item as a list item.  I do the same thing for the measurement items to create a list of measurements that correspond to each ingredient.

  const onClickHandler = (id, event) => {
    // If the clicked element is a button, stop the event propagation
    if (event.target.tagName === "BUTTON") {
      event.stopPropagation();
      return;
    }
    setFlip(!flip);
    setId(id);
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInstructions(data.drinks[0]);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error coming from API:", error);
      });
  };

  const onSaveHandler = async (event) => {
    event.stopPropagation();
    let strDrink = instructions.strDrink;
    let strInstructions = instructions.strInstructions;
    let strIngredient1 = instructions.strIngredient1;
    let strIngredient2 = instructions.strIngredient2;
    let strIngredient3 = instructions.strIngredient3;
    let strIngredient4 = instructions.strIngredient4;
    let strIngredient5 = instructions.strIngredient5;
    let strIngredient6 = instructions.strIngredient6;
    let strIngredient7 = instructions.strIngredient7;
    let strIngredient8 = instructions.strIngredient8;
    let strMeasure1 = instructions.strMeasure1;
    let strMeasure2 = instructions.strMeasure2;
    let strMeasure3 = instructions.strMeasure3;
    let strMeasure4 = instructions.strMeasure4;
    let strMeasure5 = instructions.strMeasure5;
    let strMeasure6 = instructions.strMeasure6;
    let strMeasure7 = instructions.strMeasure7;
    let strMeasure8 = instructions.strMeasure8;
    let file = instructions.strDrinkThumb;

    const endpoint = "http://localhost:3000/save";

    try {
      const response = await fetch(endpoint, {
        method: "POST", //tells which verb to use
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          strDrink,
          strInstructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
          strIngredient6,
          strIngredient7,
          strIngredient8,
          strMeasure1,
          strMeasure2,
          strMeasure3,
          strMeasure4,
          strMeasure5,
          strMeasure6,
          strMeasure7,
          strMeasure8,
          file,
        }),
      });

      if (response.ok) {
        console.log(response);
        const data = await response.json();
        console.log(data);
      } else {
        throw Error("Cannot send data for create in server");
      }
    } catch (err) {
      console.error(`Error creating data in client: `, err);
    }
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
    <>
      <Card className={`card ${flip ? "flip" : ""}`}>
        <div
          className="front"
          onClick={(event) => onClickHandler(cocktailid, event)}
        >
          <Card.Body className="cardBody">
            <Card.Title className="cocktailName">
              <h3 className="cocktailTitle">{cocktailName}</h3>
            </Card.Title>
            <div className="imageDiv">
              <Card.Img
                variant="bottom"
                className="image"
                src={cocktailImage}
                alt={cocktailName}
              />
            </div>
          </Card.Body>
        </div>
        <Card.Text className="back" onClick={() => setFlip(!flip)}>
          <h5 className="ingredientsTitle">Ingredients</h5>
          <Button className="saveButton" onClick={onSaveHandler}>
            Save
          </Button>
          <div className="lists">
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
          </div>

          <h5 className="title">Instructions</h5>
          <p className="instructions">{instructions.strInstructions}</p>
        </Card.Text>
      </Card>
    </>
  );
};

export default CocktailList;
