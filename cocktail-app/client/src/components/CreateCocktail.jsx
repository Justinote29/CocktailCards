import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CreateCocktail = () => {
  return (
    <>
      <h1 className="createTitle">Create a Cocktail Card</h1>
      <Card className="createCard">
        <form action="">
          <label htmlFor="cocktailName">
            <span className="createCocktailName">Cocktail name:</span>
          </label>
          <input type="text" name="cocktailName" />
          <br />
          <br />

          <h2>Ingredients:</h2>
          <label htmlFor="ing1">Ingredient 1:</label>
          <input type="text" />
          <label htmlFor="qty1">Quantity:</label>
          <input type="text" />
          <br />
          <label htmlFor="ing2">Ingredient 2:</label>
          <input type="text" />
          <label htmlFor="qty2">Quantity:</label>
          <input type="text" />
          <br />
          <label htmlFor="ing3">Ingredient 3:</label>
          <input type="text" />
          <label htmlFor="qty3">Quantity:</label>
          <input type="text" />
          <br />
          <label htmlFor="ing4">Ingredient 4:</label>
          <input type="text" />
          <label htmlFor="qty4">Quantity:</label>
          <input type="text" />
          <br />
          <label htmlFor="ing5">Ingredient 5:</label>
          <input type="text" />
          <label htmlFor="qty5">Quantity:</label>
          <input type="text" />
          <br />
          <label htmlFor="ing6">Ingredient 6:</label>
          <input type="text" />
          <label htmlFor="qty6">Quantity:</label>
          <input type="text" />
          <br />
          <label htmlFor="ing7">Ingredient 7:</label>
          <input type="text" />
          <label htmlFor="qty7">Quantity:</label>
          <input type="text" />
          <br />
          <label htmlFor="ing8">Ingredient 8:</label>
          <input type="text" />
          <label htmlFor="qty8">Quantity:</label>
          <input type="text" />
          <br />
          <br />
          <h2>
            <label htmlFor="instructions">Instructions:</label>
            <br />
          </h2>
          <textarea name="instructions" id="" cols="60" rows="6"></textarea>
          <br />
          <br />
          <Button className="createButton" variant="info" type="submit">
            Create Cocktail Card
          </Button>
        </form>
        <br />
      </Card>
    </>
  );
};

export default CreateCocktail;
