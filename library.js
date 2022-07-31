let myLibrary = [
    {
        title: "1984",
        author: "George Orwell",
        year: "5555",
        genre: "Science Fiction",
        haveRead: true,
    },
    {
        title: "Where the Wild Things Are",
        author: "Maurice Sendak",
        year: "5555",
        genre: "Children's",
        haveRead: true,
    },
    {
        title: "A Scanner Darkly",
        author: "Philip K. Dick",
        year: "5555",
        genre: "Science Fiction",
        haveRead: true,
    },
];

function Book() {

}

function addBookToLibrary() {

}

let library = document.querySelector("#book-container");
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
    library.appendChild(document.createElement("hr"))
}