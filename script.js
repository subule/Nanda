var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["bookId"] = document.getElementById("bookId").value;
    formData["bookTitle"] = document.getElementById("bookTitle").value;
    formData["author"] = document.getElementById("author").value;
    formData["price"] = document.getElementById("price").value;
    formData["genre"] = document.getElementById("genre").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("bookList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.bookId;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.bookTitle;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.author;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.price;  
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.genre;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("bookId").value = "";
    document.getElementById("bookTitle").value = "";
    document.getElementById("author").value = "";
    document.getElementById("price").value = "";
    document.getElementById("genre").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("bookId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("bookTitle").value = selectedRow.cells[1].innerHTML;
    document.getElementById("author").value = selectedRow.cells[2].innerHTML;
    document.getElementById("price").value = selectedRow.cells[3].innerHTML;
    document.getElementById("genre").value = selectedRow.cells[4].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.bookId;
    selectedRow.cells[1].innerHTML = formData.bookTitle;
    selectedRow.cells[2].innerHTML = formData.author;
    selectedRow.cells[3].innerHTML = formData.price;
    selectedRow.cells[4].innerHTML = formData.genre;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("bookList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("bookId").value == "") {
        isValid = false;
        document.getElementById("BookIdNotFoundError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("BookIdNotFoundError").classList.contains("hide"))
            document.getElementById("BookIdNotFoundError").classList.add("hide");
    }
    return isValid;
}
$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });