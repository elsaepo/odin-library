const library = document.querySelector("#book-container");

let nextBookID = 4;
const myLibrary = [
    {
        title: "1984",
        author: "George Orwell",
        year: "1949",
        genre: "Science Fiction",
        read: true,
        bookID: 1,
    },
    {
        title: "Where the Wild Things Are",
        author: "Maurice Sendak",
        year: "1963",
        genre: "Children's",
        read: true,
        bookID: 2,
    },
    {
        title: "A Scanner Darkly",
        author: "Philip K. Dick",
        year: "1977",
        genre: "Science Fiction",
        read: false,
        bookID: 3,
    },
];

class Book {
    constructor([title, author, year, genre, read]){
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
        this.read = read;
        this.bookID = nextBookID++;
    }
}

function addBookToLibrary(book) {
    myLibrary.unshift(book);
    drawLibrary();
}

function sortBooks(header, direction) {
    myLibrary.sort(function (a, b) {
        if (a[header] > b[header]) {
            return direction === "down" ? -1 : 1;
        } else return direction === "down" ? 1 : -1;
    })
    drawLibrary();
}

function getID(node){
    return node.parentElement.getAttribute("data");
}

function getIndexFromID(id){
    return myLibrary.findIndex(obj => obj.bookID === Number(id));
}

function toggleRead(book) {
    let thisBookID = getID(book);
    let thisBookIndex = getIndexFromID(thisBookID);
    if (myLibrary[thisBookIndex].read) {
        myLibrary[thisBookIndex].read = false;
    } else {
        myLibrary[thisBookIndex].read = true;
    }
    book.parentElement.classList.toggle("read-bg");
    book.firstChild.classList.toggle("read-true");
}

function deleteBook(book){
    let thisBookID = getID(book);
    let thisBookIndex = getIndexFromID(thisBookID);
    myLibrary.splice(thisBookIndex, 1);
    book.parentElement.remove();
}

function drawLibrary() {
    // Deletes the current library DOM (excluding the header and first <hr>)
    for (let i = library.childNodes.length - 1; i > 3; i--) {
        library.childNodes[i].remove();
    };
    // Create DOM element for each book
    for (let book of myLibrary) {
        let bookBox = document.createElement("div");
        bookBox.classList.add("book");
        if (book.read) { bookBox.classList.add("read-bg") };

        // Iterate through properties & create element
        for (let prop in book) {
            if (prop === "bookID") { break; };
            let propBox = document.createElement("div");
            propBox.classList.add(`book-${prop}`);
            // For read button with true or false selected
            if (prop === "read") {
                let readButton = document.createElement("div");
                readButton.classList.add(`read-${book.read}`);
                propBox.appendChild(readButton);
            } else {
                propBox.textContent = book[prop];
            }
            bookBox.appendChild(propBox);
        }
        let deleteBox = document.createElement("div");
        deleteBox.classList.add("book-delete")
        bookBox.appendChild(deleteBox);
        bookBox.setAttribute("data", `${book.bookID}`);
        library.appendChild(bookBox);
    }
    createSwitches();
    createDeleteButtons();
}

drawLibrary();


// Event listeners for toggling read/unread, deleting books
function createSwitches() {
    let readSwitches = document.querySelectorAll(".book-read");
    readSwitches.forEach(button => {
        button.addEventListener("mousedown", function () {
            toggleRead(this)
        })
    })
}

function createDeleteButtons() {
    let deleteButtons = document.querySelectorAll(".book-delete");
    deleteButtons.forEach(button => {
        button.addEventListener("mousedown", function () {
            deleteBook(this)
        })
    })
}

// Event listeners for sorting the table
// I think this could be refactored to avoid using first/last children so much

let bookHeaders = document.querySelectorAll(".book-sort");

bookHeaders.forEach(book => {
    book.addEventListener("mousedown", function () {
        // Determine the sort direction
        let sortDirection = "down";
        let sortSymbol = this.lastElementChild;
        if (sortSymbol.classList.contains("sort-down")) {
            sortDirection = "up";
        };
        // Reset all symbols
        bookHeaders.forEach(header => {
            header.lastElementChild.classList.remove("sort-down", "sort-up");
        })
        // Re-add the correct sort direction symbol
        sortSymbol.classList.add(`sort-${sortDirection}`);
        sortBooks(this.firstElementChild.textContent.toLowerCase(), sortDirection);
    })
})


// Event listener & logic for Book Add button

let formButton = document.querySelector("#add-book");
let addForm = document.querySelector("#add-container");
let addButton = document.querySelector("#add-button");
let addInputs = document.querySelectorAll("#add-form input");

formButton.addEventListener("mousedown", function (event) {
    addForm.classList.toggle("hidden");
    if (event.target.classList.contains("clicked")) {
        event.target.classList.remove("clicked");
        event.target.classList.add("clicked-reverse");
        event.target.textContent = "+";
    } else {
        event.target.classList.remove("clicked-reverse");
        event.target.classList.add("clicked");
        event.target.textContent = "-";
    }

})

addButton.addEventListener("click", function (event) {
    // Prevent form submission (so as not to refresh the page)
    //event.preventDefault();
    // Creates a book using the Constructor function, passing in the values from input elements
    let addedBook = new Book([...addInputs].map(node => node.checked || node.value));
    addBookToLibrary(addedBook);
    // Clears the input values
    [...addInputs].map(node => node.value = "");
})