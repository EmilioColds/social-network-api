## Introduction
For this challenge, my task was to create an API for a social network. This social network allows users to manipulate their account, their thoughts (texts) and reactions about other thoughts, following the CRUD ecosystem. This was achieved using Express and Mongoose for the connection, design and implementation of the routes, models and server. The specific objectives of the challenge are the following: 

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Links

Video Link: https://youtu.be/E_qafQAr2uw

GitHub Repo: https://github.com/EmilioColds/social-network-api