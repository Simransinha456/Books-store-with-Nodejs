const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}))

const books = [
    {
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 260,
        bookPrice: 600,
        bookState: "Available"
    },
    {
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Wariko",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    },
    {
        bookName: "The 48 Laws of Power",
        bookAuthor: "Robert Greene",
        bookPages: 300,
        bookPrice: 540,
        bookState: "Available"
    }

]

app.get('/', (req, res) => {
    const data = "Hello, world and welcome!";
    res.render('index', { data: (books) });// Render the EJS template and pass data to it
});

app.post("/", (req, res) => {
    const bookName = req.body.bookName;
    const bookAuthor = req.body.bookAuthor;
    const bookPages = req.body.bookPages;
    const bookPrice = req.body.bookPrice;
    const bookState = req.body.bookState;

    books.push({
        bookName: bookName,
        bookAuthor: bookAuthor,
        bookPages: bookPages,
        bookPrice: bookPrice,
        bookState: "Available"
    });
    res.render("index", { data: books })
})

app.post("/issue", (req, res) => {
    const requestedBook = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBook) {
            book.bookState = "issued";
        }
    })
    res.render("index", { data: books });
});

app.post("/return", (req, res) => {
    const requestedBook = req.body.bookName;
    books.forEach(book => {
        if (book.bookName == requestedBook) {
            book.bookState = "Available";
        }
    })
    res.render("index", { data: books });
});

app.post("/delete", (req, res) => {
    const deleteBook = req.body.bookName;
    let i = 0;
    books.forEach(book => {
        i = i + 1;
        if (book.bookName == deleteBook) {
            books.splice((i - 1), 1);
        }
    });
    res.render("index", { data: books });
});

const students = [
    {
        firstName: "Evans",
        secondName: "Mutembei",
        schoolId: 12345,
        studentClass: "3E",
        booksIssued: ["Blossoms of savannah"]
    },
    {
        firstName: "Marcus",
        secondName: "Kariuki",
        schoolId: 22545,
        studentClass: "2E",
        booksIssued: ["Blossoms of savannah"]
    },
    {
        firstName: "Brian",
        secondName: "Mwema",
        schoolId: 42645,
        studentClass: "3E",
        booksIssued: ["Blossoms of savannah"]
    },
]
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
