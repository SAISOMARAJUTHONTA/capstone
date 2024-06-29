const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
const db = getFirestore();

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname))


app.listen(8080, () => {
    console.log('server is running on http://localhost:8080');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.collection('Loginpage').where('email', '==', email).where('password', '==', password).get()
        .then((snapshot) => {
            if (snapshot.empty) {
                res.status(401).json({ error: 'Invalid email or password' });
            } else {
                const user = snapshot.docs[0].data();
                res.status(200).json({ message: 'Login successful', username: user.name });
            }
        })
        .catch((error) => {
            console.error("Error during login:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.post('/signup', (req, res) => {
    const userData = req.body;
    db.collection('Loginpage').add(userData)
        .then((docRef) => {
            res.status(201).json({ message: "User added successfully", username: userData.email });
        })
        .catch((error) => {
            console.error("Error adding user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

app.post('/search', (req, res) => {
    const { city } = req.body;
    // console.log(moviename+"hi");
    if (city){
        res.status(201).json({ message: "User added successfully", city:city });
    }
     else {
            res.status(404).json({ error: 'city not found' });
        }
    });
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'))
})
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'popup.html'));
})
app.get('/search', (req, res) => {
    const {city}=req.query;
    console.log(city);
    if (!city) {
        return res.status(400).send('Bad Request');
    }
    const apiUrl=`https://api.postalpincode.in/postoffice/${encodeURIComponent(city)}`
    request(apiUrl, { json: true }, (err, response, body) => {
        if (err || !body) {
            return res.status(500).send('Internal Server Error');
        }
        const data=body[0].PostOffice[0];
        res.render('index', { details: data });
    });

})
