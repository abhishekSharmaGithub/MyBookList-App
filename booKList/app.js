//Book Class: Represents a Book

class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

// UI CLass: Handles UI

class UI{
    static displayBooks(){
      const books = Store.getBooks();

    books.forEach((book)=> UI.addBookToList(book));
    }


    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML=`<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class="btn btn-danger btn-sm delete">X</a></td>`

        list.appendChild(row);

    }


    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        setTimeout(()=>{
            div.remove();
        },3000)
    }


    static clearFields(){
    const title=document.querySelector('#title').value=null;
    const author=document.querySelector('#author').value=null;
    const isbn=document.querySelector('#isbn').value=null;

    }

    static deleteBook(rb){

        if(rb.classList.contains('delete')){
            rb.parentElement.parentElement.remove();
            UI.showAlert('Book Deleted','warning');
        }

    }

    
}

//storage class : handles storage

class Store{
    static getBooks(){
        // local storage stores string so parse it
        let books;
        if(localStorage.getItem('books') == null){
            books=[];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;   

    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));


    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn == isbn){
                books.splice(index,1);
            }
            
        })

        localStorage.setItem('books',JSON.stringify(books));

    }
}


document.addEventListener('DOMContentLoaded',UI.displayBooks());

document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();

    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;


        if(title=='' || author=='' || isbn ==''){
            UI.showAlert('Field empty','danger');
        }
        else{
            const newbook = new Book(title,author,isbn);


        UI.addBookToList(newbook);
        Store.addBook(newbook);

        UI.showAlert('Book Added','success');
        UI.clearFields();

        }

});

document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})


    
