// Enter key setting 
var input = document.getElementById("input-feild");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-button").click();
    }
});
// Calling API pressing search
const searchResult = () => {
    const inputFeild = document.getElementById('input-feild');
    const inputValue = inputFeild.value;
    inputFeild.value = '';
    // Empty Feild Checking
    if (inputValue === '') {
        const showResult = document.getElementById('show-results');
        showResult.textContent = '';
        const displayTotalFound = document.getElementById('total-result');
        displayTotalFound.textContent = '';
        document.getElementById('empty-feild').style.display = 'block'
    }
    else {
        document.getElementById('empty-feild').style.display = 'none'
        // Setting a dynamic url 
        const url = `https://openlibrary.org/search.json?q=${inputValue}`;
        // Calling total result found funtion 
        displayTotalFound(url);
        // Fetching for results 
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data.docs));
        document.getElementById('spinner-display').style.display = 'block';

    }
}
// Total Result Count 
const displayTotalFound = url => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayTotalResult(data.numFound));
}
const displayTotalResult = (data) => {
    const displayTotalFound = document.getElementById('total-result');
    displayTotalFound.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `<p>Total ${data} Results Found</p>`;
    displayTotalFound.appendChild(div);
}
// Showing Results that are found 
const displayResult = datas => {
    if (datas.length === 0) {
        document.getElementById('spinner-display').style.display = 'none';
        const showResult = document.getElementById('show-results');
        showResult.textContent = '';
        document.getElementById('unknown-search').style.display = 'block';
    }

    else {

        const showResult = document.getElementById('show-results');
        showResult.textContent = '';
        document.getElementById('spinner-display').style.display = 'none';
        document.getElementById('unknown-search').style.display = 'none';
        datas.forEach(data => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
            <img class="pt-3 w-75 mx-auto" src="https://covers.openlibrary.org/b/id/${data.cover_i ? data.cover_i : ''}-M.jpg" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text"> <span class="text-danger" >${data.author_name ? data.author_name : 'Author Unknown '}</span> <br>
              First Published: ${data.first_publish_year ? data.first_publish_year : 'Publish Date not found'} </p>
            </div>
          </div>
        
        `;
            showResult.appendChild(div);
        });
    }


}