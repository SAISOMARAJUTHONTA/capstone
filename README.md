# 📮 Postal Application 📦

Postal Application is a web application that utilizes the PostOffice API to fetch information related to post offices and locates them using Google Maps API.

## 🚀 Features

- **PostOffice API Integration:** Fetch detailed information about post offices.
- **Google Maps Integration:** Locate post offices on a map.
- **Authentication:** Firebase authentication for secure user access.

## 🛠️ Technologies Used

- **Backend:** Built with Node.js and Express.js.
- **Authentication:** Firebase Authentication.
- **APIs:** PostOffice API for post office information, Google Maps API for location services.


## 🚀 Getting Started

### Prerequisites

- Ensure you have Node.js and npm installed on your system.

### Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/SAISOMARAJUTHONTA/capstone.git
    ```

2. **Navigate to Project Directory:**
    ```bash
    cd capstone
    ```

3. **Initialize npm:**
    ```bash
    npm init -y
    ```

4. **Install Dependencies:**
    ```bash
    npm install express
    npm install body-parser
    npm install firebase-admin
    npm install ejs
    npm install request
    npm install nodemon -g
    ```

5. **Start the Server:**
    ```bash
    nodemon server.js
    ```

### Configuration

- Make sure to include the `serviceAccountKey.json` file from Google Firestore in the root directory of the project for Firebase authentication and Firestore access.
