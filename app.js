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
app.use(express.static('images'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/dashboard', (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(401).send('Unauthorized');
    }
    res.render('dashboard', { username });
});
app.get('/search', (req, res) => {
    
    const { moviename } = req.query;
    // console.log(moviename);
    if (!moviename) {
        return res.status(400).send('Bad Request');
    }
    
    const apiKey = '8f7a9f39';
    const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(moviename)}&apikey=${apiKey}`;
    request(apiUrl, { json: true }, (err, response, body) => {
        if (err || !body) {
            return res.status(500).send('Internal Server Error');
        }
        res.render('results', { details: body });
    });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.listen(8080, () => {
    console.log('server is running on http://localhost:8080');
});

app.post('/api/users/login', (req, res) => {
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

app.post('/api/users', (req, res) => {
    const userData = req.body;
    db.collection('Loginpage').add(userData)
        .then((docRef) => {
            res.status(201).json({ message: "User added successfully", username: userData.name });
        })
        .catch((error) => {
            console.error("Error adding user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

app.post('/search', (req, res) => {
    const { moviename } = req.body;
    // console.log(moviename+"hi");
    if (moviename){
        res.status(201).json({ message: "User added successfully", moviename: moviename });
    }
     else {
            res.status(404).json({ error: 'Movie not found' });
        }
    });

