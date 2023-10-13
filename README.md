
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

1. **Backend Server** (ensure the database is migrated and seeded as mentioned in the installation process)
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
- **WebRTC Integration**: For enhanced voice, video, and screen share capabilities.

## Technical Implementation Details


### Abram - (Redux State & Sockets)
Before implementing sockets, we had a reducer for each model (Servers, Channels, Messages, Members) which worked perfectly fine for a single user. We realized that the sockets won't dispatch updates properly given the data the emitter sends to the response. So we rebuilt the redux state to only have one reducer with about 20 action creators that contain and update all data for "Servers". Which is a deeply nested state that contains data about each server that belongs to the current user, containing "Channels", "Messages", and "Members" in each server. Making this change greatly increased the efficiency of the flow of data in our frontend and decreased the amount of requests to the backend.
After rebuilding the redux state, figuring out how to implement sockets was the next challenge. We created a dynamic function that emits an event based on an action type of "CREATE", "DELETE", and "EDIT" that will dispatch the corresponding action creator for the corresponding request. The function is then called in submit handlers for messages, channels, and members. EX: Chats
```javascript
export function chatUpdate(payload) {
  socket.emit("chat_update", payload);
}

export function handleChatUpdates(callbacks, chid) {
  socket.on("chat_update_response", (data) => {
    const {
      server_id,
      channel_id,
      message_id,
      Action_Type: actionType,
      message: message,
    } = data;
    if (channel_id == chid && callbacks[actionType]) {
      callbacks[actionType](data);
    }
  });
}
```

```javascript
  useEffect(() => {
    const callbacks = {
      CREATE: (data) => dispatch(addMessage(data)),
      DELETE: (data) => dispatch(deleteMessage(data)),
      EDIT: (data) => dispatch(updateMessage(data)),
    };

    handleChatUpdates(callbacks, channelid);

    return () => {
      socket.off("chat_update_response");
    };
  }, [dispatch, channelid]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };
```


### Jonathan - (Organizing the Messaging Output System)
Before we implemented the layout for chat, we were thinking it was going to be an easy setup to due. It turned out to be a bit tougher than we thought. The first task was to compare each message and determine if they use was the same user from the last message sent in the chat. Once the logic was figured out and able to determine whether it needed a full message card or just a message text only for the user sending the message. We wanted to make the message go from the bottom up just like how most chat rooms behave. Finding a way to make the messages go in that direction didn't take too long, but the messages were coming in the wrong direction. So we had the order of the messages coming in as well. From there, were had to determine a new logic and check the messages coming in backward and compare it there. The dates and times were another tough issue we had to work with. We didn't want it just to show the date and time, but to let the user know whether the message was sent "Today", "Yesterday", or anytime before that as a certain format MM/DD/YYYY. Each time should also be set to the exact local time you are writing the messages out. Now we have a functional chat that styles each message correctly as if it was a real discord chatting system. Ex: Message ChatBox

<img width="298" alt="image" src="https://github.com/abramfelix1/Accord/assets/95331968/2da47e06-bf85-4d72-abb8-9eb67c0f6b38">


### Randy - (AWS)
When following the instructions to implement AWS in our projects. Everything was working fine on the local host and was able to upload images to our ("Server Profile" and "User Profile"), however, when it came to deploying the application to a live server, it was not working the way we wanted as it kept crashing the website due to a recursion error.

I spent a day trying to figure out the issue and ended up doing something different that wasn't related to the fix. After spending hours, we noticed that the socket and AWS had compatibility issues due to threading. To fix the issue, all we needed to do was to install eventlet, and invoke a built-in method "eventlet.monkey_patch()", create a variable called "CONFIG" that invokes "TransferConfig(use_threads=False)", provide the config to the upload function to AWS server.

```Python monkey_patch()
import eventlet <--
eventlet.monkey_patch() <--

import boto3
from boto3.s3.transfer import TransferConfig <--
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif", "svg"}
CONFIG = TransferConfig(use_threads=False) <--
```

``` Python

def upload_file_to_s3(file, acl="public-read"):
    # print("IN FILE UPLOAD", file)
    # print("s3 key", os.environ.get("S3_KEY"))
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={"ACL": acl, "ContentType": file.content_type},
            Config=CONFIG, <----
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    print(
        file.filename,
        "&**********&**********&**********&**********&**********&**********&**********&**********&**********",
    )

```


## Authors
* Abram's [Github](https://github.com/abramfelix1) and [LinkedIn](https://www.linkedin.com/in/abram-felix-98937b162/)
* Johnathan's [Github](https://github.com/jang55) and [LinkedIn](https://www.linkedin.com/in/jonathan-ang-b1508b286/)
* Randy's [Github](https://github.com/randydhack) and [LinkedIn](https://www.linkedin.com/in/randy-hac-4577a71b0/)
