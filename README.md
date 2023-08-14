
<h1 align="center">Welcome to Accord 👋</h1>
<p>
  <a href="https://github.com/abramfelix1/Accord/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> [Accord](https://accord-ajr.onrender.com/) (Discord Clone) is a social platform that specializes in instant messaging. Users have the ability to create "Servers" for other users to join, "Channels" associated with the server which allows users to create and read live messages, and the ability to "Discover Communities" to join.

## Technologies Used

Accord was built using the following technologies:

- Python
- Flask
- SQLAlchemy/Alembic
- WTForms
- JavaScript
- React
- Redux
- Socket.io
- AWS

![image](<img width="1433" alt="image" src="https://github.com/abramfelix1/Accord/assets/113399691/2b228c59-2e6c-4b3b-b5db-f9b63c963f09">
)

### 🏠 [Homepage](https://accord-ajr.onrender.com/)

## Table of Contents

 - [Installing/Getting Started](https://github.com/abramfelix1/Accord#readme#installation)
	 - [Initial Configuration](https://github.com/abramfelix1/Accord#readme#initial-configuration)
- [Screenshots](https://github.com/abramfelix1/Accord#readme#screenshots)
- [Wiki Documents](https://github.com/abramfelix1/Accord#readme#wiki-documents)
 	- Database Schema
 	- Features
 	- Backend Routes
	- User Stories
- [To-Dos/Future Features](https://github.com/abramfelix1/Accord#readme#to-dosfuture-features)
- [Technical Implementation Details](https://github.com/abramfelix1/Accord#readme#technical-implementation-details)
	- Socket.io
- [Authors](https://github.com/abramfelix1/Accord#readme#authors)
- [Show your support](https://github.com/abramfelix1/Accord#readme#show-your-support)

## Installation

### Initial Configuration
#### Flask
To install and run this project locally, start off with your backend server.

1. Clone this repository
    ```bash
    git clone https://github.com/abramfelix1/Accord.git
    ```

2. Install dependencies
    ```bash
    pipenv install -r requirements.txt
    ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
    - Make sure the SQLite3 database connection URL is in the **.env** file
    - The env example organizes all tables inside the `flask_schema` schema, defined
        by the `SCHEMA` environment variable.  Replace the value for
        `SCHEMA` with a unique name, **making sure you use the snake_case
        convention**.
    <br></br>

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```
   and then
   ```bash
   flask db upgrade &&
   flask seed all &&
   flask run
   ```

5. Now that you have your backend Flask server running. You need to run the React App in development in a different terminal instance.

#### React
1. Make sure you have a new terminal instance separate from your terminal for your backend. Navigate into the Accord project folder and then into the react-app folder.
    ```bash
    cd react-app
    ```

2. Install all your dependencies before starting up the application.
    ```bash
    npm install &&
    npm start
    ```

3. Now that you have both your Flask backend and React App frontend running, enjoy using Pour'd. Cheers!

### Operating
To run the application, navigate into the project folder in two separate terminal windows.

1. Ensure that the database has already been migrated and seeded. If it hasn't been done yet, refer to [Intitial Configuration](https://github.com/abramfelix1/Accord#readme#initial-configuration)

2. In one terminal, go into pipenv and run the Flask app
    ```bash
    pipenv shell && flask run
    ```

3. In the other terminal, start the React app.

4. Pour'd will open in your browser and you can now enjoy using Pour'd. Cheers!

## Screenshots

### Login

https://user-images.githubusercontent.com/113399691/260408060-f7bf7db5-d6fe-4cd9-9996-7f844cad940d.png

### Application Home

https://user-images.githubusercontent.com/113399691/260408344-97eb2f59-4143-4b7a-b8c8-edb5044793ee.png

### Servers, Channels, Members, Live Chat

https://user-images.githubusercontent.com/113399691/260408488-c61de139-b8a7-4c7c-a854-a5546a838209.png

## [Wiki Documents](https://github.com/nicolyoshikawa/pour-d/wiki)
- [Database Schema](https://github.com/abramfelix1/Accord/wiki/Database-Schema)
- [Features](https://github.com/abramfelix1/Accord/wiki/Feature-List)
- [Backend Routes](https://github.com/abramfelix1/Accord/wiki/Backend-Routes)
- [User Stories](https://github.com/abramfelix1/Accord/wiki/User-Stories)


## To-Dos/Future Features

The project is fully functional in its current state, but some other features we would like to implement in the future include:

- Live Voice Chat that allows users to join a "Voice Channel".
- Share screen that allows users to share screen while in a Voice Channel.
- Friends List to add users.
- Direct Message that allows the user to message friends.

## Technical Implementation Details

### Code Snippets

**Search box component**
```
ADD HERE
```

## Authors

👤 **Abram Felix, Randy Hac, and Jonathan Ang**

* Eric's [Github](https://github.com/abramfelix1) and [LinkedIn](https://www.linkedin.com/in/abram-felix-98937b162/)
* Nicol's [Github](https://github.com/randydhack) and [LinkedIn](https://www.linkedin.com/in/randy-hac-4577a71b0/)
* Huey's [Github](https://github.com/jang55) and [LinkedIn](https://www.linkedin.com/in/jonathan-ang-b1508b286/)


## Show your support

Give a ⭐️ if this project helped you!
