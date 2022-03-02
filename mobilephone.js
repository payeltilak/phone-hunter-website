const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    console.log(searchText);
    searchInput.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data.slice(0, 20)))
}
const displayPhoneDetails = (phones) => {
    console.log(phones);
    const searchResult = document.getElementById("saerch-result");
    searchResult.innerHTML = '';

    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col');

        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body mx-auto">
                <h2 class="card-title">${phone.phone_name}</h2>
                <h3 class="card-text">${phone.brand}</h3>

                <button onclick="phoneIDeatil('${phone.slug}')" type="button" class="btn btn-primary">Explore</button>
            </div>
            </div>`;
        searchResult.appendChild(div);
    })
}
const phoneIDeatil = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => dispalyShowDetails(data.data))
}
const dispalyShowDetails = phone => {
    console.log(phone);
    const phoneInfo = document.getElementById('phone-info');
    phoneInfo.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = ` <img src="${phone.image}" class="card-img-top w-25" alt="...">
   <div class="card-body">
       <h2 class="card-title">${phone.brand}</h2>
       <h3><span>Release Date:</span>${phone.releaseDate}</h3>
       <h3><span>slug:</span>${phone.slug}</h3>
       <h3><span>Name:</span>${phone.name}</h3>
       
     <h2 class="card-title">Features</h2>
       <p><span> DisplaySize:</span>${phone.displaySize}</p>
       <p><span>Storage:</span>${phone.mainFeatures.storage}</p>
       <p><span>Chipset:</span>${phone.mainFeatures.chipSet}</p>
       <p><span>Memory:</span>${phone.mainFeatures.memory}</p>
       <p><span>Sensors:</span>${phone.mainFeatures.sensors}</p>
        
       <h2 class="card-title">Others</h2>
       <p><span> WLAN:</span>${phone.others.WLAN}</p>
       <p><span> Bluetooth:</span>${phone.others.Bluetooth}</p>
       <p><span> GPS:</span>${phone.others.GPS}</p>
       <p><span> NFC:</span>${phone.others.NFC}</p>
       <p><span> Radio:</span>${phone.others.Radio}</p>
       <p><span> USB:</span>${phone.others.USB}</p>

 </div > `;
    phoneInfo.appendChild(div)
}