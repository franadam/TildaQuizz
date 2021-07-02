# Data model
I will add a user schema and for each quiz I will store the user answer.
# Infrastructure
The application could be deployed on several services like Heroku or Netlify.
Before deploying we need to think of the scalability, readability and security. For the latter we can use Environment Variables to protect sensitive information such as API keys, DB URLs, ... Also making sure that the code is well tested increase the security. Adding documentation to the code helps with the maintenance and readability. 
If you need to deploy only the frontend you can use Netlify but if it's a full stack app Heroku would be a solution, it also has scalability options.   
# Backend
I will build an Express backend in Node.js. For this application I used Apollo-Client and if I wanted to build the backend and I will need Apollo-Server. 
I will start by defining the GraphQL schemas. This app will have Quiz, Question, and User types, each type would have a query related to it. And we can add mutations, for example createQuizz and createQuestion.  
I will use MongoDB for the database and the schemas will be similar to the GraphQL types.

GraphQL Schemas : 
|Question |  |
--- | --- 
|answer| String!|
|id|uuid|
|options|String!|
|text| String!|
|quizz|quizzes!|

|Quizz |  |
--- | --- 
|name| String!|
|id|uuid|
|questions|[question!]!|

