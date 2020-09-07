function Book(title, author, isbn) {
  this.title = title,
  this.author = author,
  this.isbn = isbn
}

// UI control
function UI() {
  
}

UI.prototype.addBookToList = function(book){
  const row = document.createElement('tr');
  const list = document.getElementById('book-list');

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `
  list.appendChild(row)
}

UI.prototype.showAlert = function(message,className){
  const div = document.createElement('div');

  div.className= `alert ${className}`;

  const container = document.querySelector('.container');

  div.appendChild(document.createTextNode(message));

  const bookForm = document.getElementById('book-form');

  container.insertBefore(div,bookForm);

  setTimeout(()=>{
    document.querySelector('.alert').remove();
  },3000)
}

UI.prototype.clearFields = function(book){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
} 

UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove()
  }
}


document.getElementById('book-form').addEventListener('submit',(e)=>{
  e.preventDefault()

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  const book = new Book(title,author,isbn);


  const ui = new UI();

  if(title === '' || author === '' || isbn === ''){
    ui.showAlert('Please fill all fields','error');
  }else{
    ui.addBookToList(book);

    ui.showAlert('Book Added!','success')

    ui.clearFields();
  }

  
})

document.getElementById('book-list').addEventListener('click',(e)=>{
  e.preventDefault();

  const ui = new UI();
  ui.deleteBook(e.target);

  ui.showAlert('Book Removed!','success')
  
})