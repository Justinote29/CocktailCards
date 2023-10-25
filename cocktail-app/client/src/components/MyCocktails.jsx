import { useState, useEffect } from "react";
import { Card, CardGroup, Button } from "react-bootstrap";

const MyCocktails = () => {
  const endpoint = "http://localhost:3000/mycocktails";
  const [cocktails, setCocktails] = useState([]);
  const [data, setData] = useState({});
  const [flip, setFlip] = useState(false);

  const onClickHandler = (id) => {
    setFlip(!flip);
    setId(id);
  };
  // Sorting tracks in descending and using data from useState as a dependency.
  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((results) => {
        const sortedCocktails = results.sort((a, b) => {
          // Assuming 'created' is a timestamp or date string
          const dateA = new Date(a.created);
          const dateB = new Date(b.created);
          return dateB - dateA; // Sort in descending order
        });

        setCocktails(sortedCocktails);
      })
      .catch((error) => {
        console.log("error coming from db:", error);
      });
  }, [data]); // data as a dependency from state

  return (
    <div>
      <h1>My Cocktail Cards</h1>
      <div className="cocktailCardsContainer">
        {cocktails.map((cocktail) => (
          <Card
            key={cocktail._id}
            className={`card ${flip ? "flip" : ""}`}
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
            <Card.Text className="back" onClick={() => setFlip(!flip)}>
              <h5 className="title">Ingredients</h5>
              {/* <div className="lists">
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
            </div> */}

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
