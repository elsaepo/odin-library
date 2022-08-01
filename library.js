let library = document.querySelector("#book-container");

let myLibrary = [
    {
        title: "1984",
        author: "George Orwell",
        year: "1949",
        genre: "Science Fiction",
        read: true,
    },
    {
        title: "Where the Wild Things Are",
        author: "Maurice Sendak",
        year: "1963",
        genre: "Children's",
        read: true,
    },
    {
        title: "A Scanner Darkly",
        author: "Philip K. Dick",
        year: "1977",
        genre: "Science Fiction",
        read: true,
    },
];

function Book([title, author, year, genre, read]) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.unshift(book);
    drawLibrary();
}

function drawLibrary(){
    // Deletes the current library DOM (excluding the header and first <hr>)
    for (let i = library.childNodes.length-1; i > 3; i--){
        library.childNodes[i].remove();
    };
    // Create DOM element for each book
    for (let book of myLibrary){
        let bookBox = document.createElement("div");
        bookBox.classList.add("book");
        for (let prop in book){
            let propBox = document.createElement("div");
            propBox.classList.add(`book-${prop}`);
            propBox.textContent = book[prop];
            bookBox.appendChild(propBox);
        }
        library.appendChild(bookBox);
    }
}

drawLibrary();


// Event listener & logic for Book Add button

let formButton = document.querySelector("#add-book");
let addForm = document.querySelector("#add-container");

let addButton = document.querySelector("#add-button");
let addInputs = document.querySelectorAll("#add-form input");

formButton.addEventListener("mousedown", function(){
    addForm.classList.toggle("hidden");
})

addButton.addEventListener("click", function(event){
    // Prevent form submission (so as not to refresh the page)
    event.preventDefault();
    // Creates a book using the Constructor function, passing in the values from input elements
    let addedBook = new Book([...addInputs].map(node => node.value));
    addBookToLibrary(addedBook);
    // Clears the input values
    [...addInputs].map(node => node.value = "");
})