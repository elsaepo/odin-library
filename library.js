let myLibrary = [
    {
        title: "1984",
        author: "George Orwell",
        year: "5555",
        genre: "Science Fiction",
        read: true,
    },
    {
        title: "Where the Wild Things Are",
        author: "Maurice Sendak",
        year: "5555",
        genre: "Children's",
        read: true,
    },
    {
        title: "A Scanner Darkly",
        author: "Philip K. Dick",
        year: "5555",
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



let library = document.querySelector("#book-container");

function drawLibrary(){
    console.log(library.childNodes)
    for (let i = library.childNodes.length-1; i > 3; i--){
        library.childNodes[i].remove();
    };
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
}
drawLibrary();


let addButton = document.querySelector("#add-button");
let addForm = document.querySelectorAll("#add-form input");
addButton.addEventListener("click", function(event){
    event.preventDefault();
    let addedBook = new Book([...addForm].map(node => node.value));
    addBookToLibrary(addedBook);
})