const searchphone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    if (searchText == '') {
        const showmessage = document.getElementById('show-message');
        showmessage.innerHTML = `<p class="text-center">wright something</p>`;

    }
    else {
        searchField.value = '';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)));

    }


}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    data.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-100">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body mx-auto">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h2 class="card-text">${phone.brand}</h2>
                    <button onclick="phoneDetail(this,'${phone.slug}') " id="button-details" type="button" class="btn btn-primary">Explore</button>
                </div>
            </div>`;
        searchResult.appendChild(div)
    })
}
const phoneDetail = (phone, phoneId) => {
    console.log(phoneId);
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetail(data.data))

}
const displayDetail = phone => {
    console.log(phone.data.others.USB);
    const info = document.getElementById('info');
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="container row row-cols-1 row-cols-md-2 g-4">
    <div class="col-6">
    <img src="${phone.data.image}" alt="">
   </div>
  
   <h2><span>${phone.brand}</span></h2>
   <h2><span>${phone.phone_name}</span></h2>
   <h2><span>${phone.slug}</span></h2>
   <h3><span>Release date:</span>${phone.data.releaseDate} </h3>
    <h2>Features </h2>
   <p> <span>DisplaySize :</span>${phone.data.mainFeatures.displaySize}
   <p> <span>ChipSet :</span>${phone.data.mainFeatures.chipSet}
   <p> <span>Memeory :</span>${phone.data.mainFeatures.memory}

   <p> <span>Storage :</span>${phone.data.mainFeatures.storage}

   <h2> Others </h2>
   <p> <span> Bluetooth: </span>${phone.data.others.Bluetooth} </p>
   <p> <span> GPS: </span>${phone.data.others.GPS} </p>
   <p> <span>NFC: </span>${phone.data.others.NFC} </p>
   <p> <span> Radio: </span>${phone.data.others.Radio} </p>
   <p> <span> USB: </span>${phone.data.others.USB} </p>
   
 </div>`
    info.appendChild(div);
}