



Build an API

CRUD functionality

Endpoints- /mycards
        /create
        /mycards/:id


Create Data
1) route /create and we'll use the POST method
2) send back data as JSON
3)  send back document from DB to client (with ID), the "receipt" we receive from DB to client- one object with an "id", description, and isCompleted. (Then client can do whatever they want with it).  Forward on a receipt from DB.
4) let people using this know they need to send json with a body and a key named "description".

example of data send to/from DB  
{
strDrink: {
    type: String,
    trim: true,
    minLength: [1, "Must include a cocktail name."],
    required: true,
  },
  strInstructions: {
    type: String,
    trim: true,
    minLength: [1, "Must include instructions."],
    required: true,
  },
  strImageSource: {
    type: String,
  },
  strIngredient1: {
    type: String,
    required: true,
    trim: true,
    minLength: [1, "Must include at least 2 ingredients."],
    required: true,
  },
  strIngredient2: {
    type: String,
    required: true,
    trim: true,
    minLength: [1, "Must include at least 2 ingredients."],
    required: true,
  },
  strIngredient3: {
    type: String,
  },
  strIngredient4: {
    type: String,
  },
  strIngredient5: {
    type: String,
  },
  strIngredient6: {
    type: String,
  },
  strIngredient7: {
    type: String,
  },
  strIngredient8: {
    type: String,
  },
  strMeasure1: {
    type: String,
    required: true,
  },
  strMeasure2: {
    type: String,
    required: true,
  },
  strMeasure3: {
    type: String,
  },
  strMeasure4: {
    type: String,
  },
  strMeasure5: {
    type: String,
  },
  strMeasure5: {
    type: String,
  },
  strMeasure6: {
    type: String,
  },
  strMeasure7: {
    type: String,
  },
  strMeasure8: {
    type: String,
  },
}


READ Data
1) /mycards route and GET method
2) send data back as JSON
3) send back an array of object (cocktail cards)
4) send json with body and description


Update Data - we use the id to update the item
1) /mycards/:id route and PUT method
2) send back data as JSON
3) send back a copy of the updated document  (object)

Delete Data - so we can delete one specific item
1) /mycards/:id route and DELETE method
2) send back data as JSON
3) send back a copy of the deleted document (object)