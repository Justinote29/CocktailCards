import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCocktail = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    strDrink: "",
    strInstructions: "",
    strIngredient1: "",
    strIngredient2: "",
    strIngredient3: "",
    strIngredient4: "",
    strIngredient5: "",
    strIngredient6: "",
    strIngredient7: "",
    strIngredient8: "",
    strMeasure1: "",
    strMeasure2: "",
    strMeasure3: "",
    strMeasure4: "",
    strMeasure5: "",
    strMeasure6: "",
    strMeasure7: "",
    strMeasure8: "",
  });

  //declare this outside of the submitForm so we can append the user email as postedBy first.
  //declare this outside of the submitForm so we can append the user email as postedBy first.
  const formDataForUpload = new FormData();

  //Takes what is entered in the inputs and uses the formData state variables to save them to formData.
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // if (formData.cocktailName.length > 20) {
    //   return alert("Title must be less than 20 characters");
    // }
    // if (formData.instructions.length > 50) {
    //   return alert("Description must be less than 50 characters");
    // }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formData.ing2);
    formDataForUpload.append("strDrink", formData.cocktailName);
    formDataForUpload.append("strInstructions", formData.instructions);
    formDataForUpload.append("strIngredient1", formData.ing1);
    formDataForUpload.append("strIngredient2", formData.ing2);
    formDataForUpload.append("strIngredient3", formData.ing3);
    formDataForUpload.append("strIngredient4", formData.ing4);
    formDataForUpload.append("strIngredient5", formData.ing5);
    formDataForUpload.append("strIngredient6", formData.ing6);
    formDataForUpload.append("strIngredient7", formData.ing7);
    formDataForUpload.append("strIngredient8", formData.ing8);
    formDataForUpload.append("strMeasure1", formData.qty1);
    formDataForUpload.append("strMeasure2", formData.qty2);
    formDataForUpload.append("strMeasure3", formData.qty3);
    formDataForUpload.append("strMeasure4", formData.qty4);
    formDataForUpload.append("strMeasure5", formData.qty5);
    formDataForUpload.append("strMeasure6", formData.qty6);
    formDataForUpload.append("strMeasure7", formData.qty7);
    formDataForUpload.append("strMeasure8", formData.qty8);

    //   strDrink: e.target.cocktailName.value.trim().substring(0, 30),
    //   strInstructions: e.target.instructions.value.trim(),
    //   strIngredient1: e.target.ing1.value.trim(),
    //   strIngredient2: e.target.ing2.value.trim(),
    //   strIngredient3: e.target.ing3.value.trim(),
    //   strIngredient4: e.target.ing4.value.trim(),
    //   strIngredient5: e.target.ing5.value.trim(),
    //   strIngredient6: e.target.ing6.value.trim(),
    //   strIngredient7: e.target.ing7.value.trim(),
    //   strIngredient8: e.target.ing8.value.trim(),
    //   strMeasure1: e.target.qty1.value.trim(),
    //   strMeasure2: e.target.qty2.value.trim(),
    //   strMeasure3: e.target.qty3.value.trim(),
    //   strMeasure4: e.target.qty4.value.trim(),
    //   strMeasure5: e.target.qty5.value.trim(),
    //   strMeasure6: e.target.qty6.value.trim(),
    //   strMeasure7: e.target.qty7.value.trim(),
    //   strMeasure8: e.target.qty8.value.trim(),
    // };
    const endpoint = "http://localhost:3000/create";
    for (const [name, value] of formDataForUpload.entries()) {
      console.log(`${name}: ${value}`);
    }
    try {
      const response = await fetch(endpoint, {
        method: "POST", //tells which verb to use
        mode: "cors",
        body: formDataForUpload,
      });

      if (response.ok) {
        console.log(response);
        const data = await response.json();
        console.log(data);
        navigate("/mycocktails");
      } else {
        throw Error("Cannot send data for create in server");
      }
    } catch (err) {
      console.error(`Error creating data in client: `, err);
    }
  };

  return (
    <>
      <h1 className="createTitle">Create a Cocktail Card</h1>
      <Card className="createCard">
        <br />
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="cocktailName">
            <h2 className="createCocktailName">Cocktail name:</h2>
          </label>
          <input
            type="text"
            name="cocktailName"
            value={formData.cocktailName}
            onChange={changeHandler}
          />
          <br />
          <br />

          <h2>Ingredients:</h2>
          <label htmlFor="ing1">Ingredient 1:</label>
          <input
            type="text"
            name="ing1"
            value={formData.ing1}
            onChange={changeHandler}
          />
          <label htmlFor="qty1">Quantity:</label>
          <input
            type="text"
            name="qty1"
            value={formData.qty1}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="ing2">Ingredient 2:</label>
          <input
            type="text"
            name="ing2"
            value={formData.ing2}
            onChange={changeHandler}
          />
          <label htmlFor="qty2">Quantity:</label>
          <input
            type="text"
            name="qty2"
            value={formData.qty2}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="ing3">Ingredient 3:</label>
          <input
            type="text"
            name="ing3"
            value={formData.ing3}
            onChange={changeHandler}
          />
          <label htmlFor="qty3">Quantity:</label>
          <input
            type="text"
            name="qty3"
            value={formData.qty3}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="ing4">Ingredient 4:</label>
          <input
            type="text"
            name="ing4"
            value={formData.ing4}
            onChange={changeHandler}
          />
          <label htmlFor="qty4">Quantity:</label>
          <input
            type="text"
            name="qty4"
            value={formData.qty4}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="ing5">Ingredient 5:</label>
          <input
            type="text"
            name="ing5"
            value={formData.ing5}
            onChange={changeHandler}
          />
          <label htmlFor="qty5">Quantity:</label>
          <input
            type="text"
            name="qty5"
            value={formData.qty5}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="ing6">Ingredient 6:</label>
          <input
            type="text"
            name="ing6"
            value={formData.ing6}
            onChange={changeHandler}
          />
          <label htmlFor="qty6">Quantity:</label>
          <input
            type="text"
            name="qty6"
            value={formData.qty6}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="ing7">Ingredient 7:</label>
          <input
            type="text"
            name="ing7"
            value={formData.ing7}
            onChange={changeHandler}
          />
          <label htmlFor="qty7">Quantity:</label>
          <input
            type="text"
            name="qty7"
            value={formData.qty7}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="ing8">Ingredient 8:</label>
          <input
            type="text"
            name="ing8"
            value={formData.ing8}
            onChange={changeHandler}
          />
          <label htmlFor="qty8">Quantity:</label>
          <input
            type="text"
            name="qty8"
            value={formData.qty8}
            onChange={changeHandler}
          />
          <br />
          <br />
          <h2>
            <label htmlFor="instructions">Instructions:</label>
            <br />
          </h2>
          <textarea
            name="instructions"
            id=""
            cols="60"
            rows="6"
            value={formData.instructions}
            onChange={changeHandler}
          ></textarea>
          <br />
          <br />
          <label htmlFor="cocktailPhoto">Cocktail Photo:</label>
          <input type="file" name="cocktailPhoto" id="cocktailPhoto" />
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
