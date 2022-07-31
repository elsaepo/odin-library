let myLibrary = [
    {
        title: "1984",
        author: "George Orwell",
        genre: "Science Fiction"
    },
    {
        title: "Where the Wild Things Are",
        author: "Maurice Sendak",
        genre: "Children's"
    },
    {
        title: "A Scanner Darkly",
        author: "Philip K. Dick",
        genre: "Science Fiction"
    },
];

function Book() {

}

function addBookToLibrary() {

}

let library = document.querySelector("#library-container");
for (let book in myLibrary){
    book = myLibrary[book]
    let bookBox = document.createElement("div");
    bookBox.textContent = `${book.title} by ${book.author}. ${book.genre}`;
    library.appendChild(bookBox);
}