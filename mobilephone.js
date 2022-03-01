const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);

    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    data.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h2 class="card-text">${phone.brand}</h2>
                    <button id="button-details" type="button" class="btn btn-primary">Explore</button>
                </div>
            </div>`;
        searchResult.appendChild(div)
    })
}