const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const jwtsecret = "jwttokensecretaleatorio";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// middleware
function auth(req, res, next) {
    const authToken = req.headers["authorization"];

    if (authToken != undefined) {

        const bearer = authToken.split(' ');
        const token = bearer[1];

        jwt.verify(token, jwtsecret, (err, data) => {
            if (err) {
                res.status(401)
                res.json({ err: "Token invalido" })
            } else {

                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        });

    } else {
        res.status(401);
        res.json({ err: "Token invaldio" })
    }
    
}

var DB = {
    games: [
        {
            id: 23,
            title: "Call of duty MW",
            year: 2019,
            price: 60
        },

        {
            id: 65,
            title: "Sea of thieves",
            year: 2018,
            price: 40
        },

        {
            id: 2,
            title: "God of War Ragnarok",
            year: 2022,
            price: 90
        }
    ],
    users: [
        {
            id: 1,
            name: "Matheus Coelho",
            email: "matheus@email.com",
            password: "nodejs"
        },

        {
            id: 20,
            name: "Claudia",
            email: "claudia@email.com",
            password: "javascript"
        }
    ]
}

// endpoints
app.get("/games", auth, (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
})


app.get("/games/:id", auth, (req, res) => {
    //isNaN se não for número
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {

        const id = parseInt(req.params.id)

        const game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            res.sendStatus = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
});

app.post("/games",auth,(req, res) => {

    const { title, price, year } = req.body;

    DB.games.push({
        id: 1717,
        title,
        price,
        year
    });

    res.sendStatus(200);

});


app.delete("/games/:id",(req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id)
        const index = DB.games.findIndex(g => g.id == id);

        if (index == -1) {
            res.sendStatus(404);
        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }

    }
});


app.put("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {

        const id = parseInt(req.params.id)

        const game = DB.games.find(g => g.id == id);

        if (game != undefined) {

            const { title, price, year } = req.body;

            if (title != undefined) {
                game.title = title;
            }

            if (price != undefined) {
                game.price = price;
            }

            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    }


});

app.post("/auth", (req, res) => {
    const { email, password } = req.body;

    if (email != undefined) {

        const user = DB.users.find(u => u.email == email);

        if (user != undefined) {
            if (user.password == password) {
                jwt.sign({ id: user.id, email: user.email }, jwtsecret, { expiresIn: "24h" }, (err, token) => {
                    if (err) {
                        res.status(400);
                        res.json({ err: "Falha interna" })
                    } else {
                        res.status(200);
                        res.json({ token: token });
                    }
                })

            } else {
                res.status(401);
                res.json({ err: "Credenciais ivalidas" });
            }

        } else {
            res.status(404);
            res.json({ err: "O email não existe na base de dados!" })
        }

    } else {
        res.status(400);
        res.json({ err: "Email invalido" })
    }
})


app.listen(8080, () => {
    console.log("API RODANDO!");
})