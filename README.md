
<h1 align="center">Accord <a href="https://accord-ajr.onrender.com/"><img align="right" src="https://i.imgur.com/QBeByit.png" alt="image description" height="135"></a></h1>

[Accord](https://accord-ajr.onrender.com/) is a collaborative effort by Abram Felix, Jonathan Ang, and Randy Hac, crafted as part of AppAcademy's group project. Modeled after Discord, Accord offers users a platform to engage, interact, and join diverse communities.

![](https://github.com/abramfelix1/Accord/assets/62622410/b7695786-c825-41f8-97f5-39edacf3c047)

## Technologies Used
Accord was built using the following technologies:

### Backend:
- **Python**
- **Flask**
  - flask-sqlalchemy
  - flask-socketio
- **SQLAlchemy** (with Alembic for database migrations)

### Frontend:
- **JavaScript**
- **React**
- **Redux**
- **Socket.io**

### Others:
- **AWS**: Cloud infrastructure and services
- **WTForms**: Forms handling

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup: Flask](#backend-setup-flask)
  - [Frontend Setup: React](#frontend-setup-react)
- [Operating](#operating)
- [Accord Showcase!](#accord-showcase)
- [Wiki Documents](#wiki-documents)
- [Future Features](#future-features)
- [Technical Implementation Details](#technical-implementation-details)
- [Authors](#authors)

## Installation

### Backend Setup: Flask

1. **Clone the Repository**
    ```bash
    git clone https://github.com/abramfelix1/Accord.git
    ```

2. **Install Dependencies**
    ```bash
    pipenv install -r requirements.txt
    ```

3. **Configure Environment Settings**
    - Create a `.env` file using the provided example, adjusting settings suitable for your development environment.
    - Ensure the SQLite3 database connection URL is present in the `.env` file.
    - Set a unique name for the `SCHEMA` environment variable, using the `snake_case` convention.

4. **Setup and Start the Flask Server**
    ```bash
    pipenv shell
    flask db upgrade
    flask seed all
    flask run
    ```

### Frontend Setup: React

1. **Navigate to the React App Folder**
    ```bash
    cd react-app
    ```

2. **Install Dependencies and Start the App**
    ```bash
    npm install
    npm start
    ```

3. With both backend and frontend running, you're ready to experience Accord. Cheers!

## Operating

For subsequent sessions, ensure you have two terminal windows:

1. **Backend Server** (ensure database is migrated and seeded as mentioned in the installation process)
    ```bash
    pipenv shell
    flask run
    ```

2. **Frontend Server**
    ```bash
    cd react-app
    npm start
    ```

Enjoy Accord!

## Accord Showcase!
![LogRegFor](https://github.com/abramfelix1/Accord/assets/62622410/dca799ac-7997-4f01-89d2-62c3af04d7cc)
![Welcome](https://github.com/abramfelix1/Accord/assets/62622410/2ba38185-2aa5-4861-bb6e-78903f10338d)
![ChatDash](https://github.com/abramfelix1/Accord/assets/62622410/c4c60d58-a30d-463a-a0e2-fc295f9c0ad1)


## [Wiki Documents](https://github.com/abramfelix1/Accord/wiki)
- [Database Schema](https://github.com/abramfelix1/Accord/wiki/Database-Schema)
- [Features](https://github.com/abramfelix1/Accord/wiki/Feature-List)
- [Backend Routes](https://github.com/abramfelix1/Accord/wiki/Backend-Routes)
- [User Stories](https://github.com/abramfelix1/Accord/wiki/User-Stories)


## Future Features

### Communication Enhancements:
- **Live Voice Chat**: Enable users to join voice channels for real-time conversation.
- **Screen Sharing**: Allow users to share their screens within voice channels.
- **Direct Messaging**: Provide a feature for users to message friends directly.
- **Private Group Chats**: Introduce the ability for users to have private group conversations.

### Social Interactions:
- **Friends System**: A list or system for adding and managing friends.
- **Online/Offline Statuses**: Display user availability status, showing whether they are online, offline, busy, etc.
- **Server Invite Links**: Facilitate the growth of communities by providing server invite links for easy sharing and joining.

### Technical Implementations:
- **WebRTC Integration**: For enhanced voice, video, and screenshare capabilities.

## Technical Implementation Details

```
ADD HERE
```

## Authors
* Abram's [Github](https://github.com/abramfelix1) and [LinkedIn](https://www.linkedin.com/in/abram-felix-98937b162/)
* Johnathan's [Github](https://github.com/jang55) and [LinkedIn](https://www.linkedin.com/in/jonathan-ang-b1508b286/)
* Randy's [Github](https://github.com/randydhack) and [LinkedIn](https://www.linkedin.com/in/randy-hac-4577a71b0/)
