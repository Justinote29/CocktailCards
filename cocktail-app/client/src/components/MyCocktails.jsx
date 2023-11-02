import { useState, useEffect } from "react";
import { Card, CardGroup, Button } from "react-bootstrap";

const MyCocktails = () => {
  const endpoint = "http://localhost:3000/mycocktails";
  const [cocktails, setCocktails] = useState([]);
  const [data, setData] = useState({});

  //received the cocktail_.id from db as an argument to control the flip only for that card by setting it's flip property to !cocktail.flip and not all cards.
  const onClickHandler = (id) => {
    const newCocktails = cocktails.map((cocktail) => {
      if (cocktail._id === id) {
        return { ...cocktail, flip: !cocktail.flip };
      } else {
        return cocktail;
      }
    });
    setCocktails(newCocktails);
  };
  // Sorting tracks in descending and using data from useState as a dependency.
  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((results) => {
        const sortedCocktails = [...results].sort((a, b) => {
          // Assuming 'created' is a timestamp or date string
          const dateA = new Date(a.created);
          const dateB = new Date(b.created);
          return dateA - dateB; // Sort in descending order
        });

        // Add flip property to each cocktail object and sets it to false and uses state to set the cocktails as the cocktails with the flip property.
        const cocktailsWithFlip = sortedCocktails.map((cocktail) => {
          return { ...cocktail, flip: false };
        });

        setCocktails(cocktailsWithFlip);
      })
      .catch((error) => {
        console.log("error coming from db:", error);
      });
  }, [data]); // data as a dependency from state

  return (
    <div>
      <h1 className="myCardsTitle">My Cocktail Cards</h1>
      <div className="cocktailCardsContainer">
        {cocktails.map((cocktail) => (
          <Card
            key={cocktail._id}
            className={`card ${cocktail.flip ? "flip" : ""}`}
            onClick={() => onClickHandler(cocktail._id)}
          >
            <div className="front">
              <Card.Body className="cardBody">
                <Card.Title className="cocktailName">
                  <h3 className="cocktailTitle">{cocktail.strDrink}</h3>
                </Card.Title>
                {/* <div className="imageDiv">
                <Card.Img
                  variant="bottom"
                  className="image"
                  src={cocktailImage}
                  alt={cocktailName}
                />
              </div> */}
              </Card.Body>
            </div>
            <Card.Text className="back">
              <h5 className="title">Ingredients</h5>
              <div className="lists">
                <div className="listDiv">
                  <ul className="ingredients">
                    {[cocktail.strIngredient1, cocktail.strIngredient2].map(
                      (ingredient, index) =>
                        ingredient && <li key={index}>{ingredient}</li>
                    )}
                  </ul>
                </div>
                <div className="listDiv">
                  <ul className="ingredients">
                    {[cocktail.strMeasure1, cocktail.strMeasure1].map(
                      (measurement, index) =>
                        measurement && <li key={index}>{measurement}</li>
                    )}
                  </ul>
                </div>
              </div>
              <h5 className="title">Instructions</h5>
              <p className="instructions">{cocktail.strInstructions}</p>
            </Card.Text>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCocktails;
