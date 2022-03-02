const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // console.log(searchText);
    searchInput.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data.slice(0, 20)))
}
const displayPhoneDetails = (phones) => {
    console.log(phones);
    const searchResult = document.getElementById("search-result");
    searchResult.innerHTML = '';
    const phoneInfo = document.getElementById('phone-info')
    phoneInfo.innerHTML = '';
    const error = document.getElementById('error');
    error.innerHTML = '';
    if (phones.length == 0) {
        const div = document.createElement('div')
        div.innerHTML = `<p class="text-center">no result found</p>`;
        error.appendChild(div);

    }
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col');

        div.innerHTML = `
        <div class="card h-100 display d-flex bg-success bg-opacity-25 ">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto " alt="...">
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

    div.innerHTML = `
    <div class="mb-5 mx-auto mt-5 d-flex"> 
     <img src="${phone.image}" class="card-img-top w-25 h-25 pt-5" alt="...">
   <div class="card-body mx-auto">
       <h2 class="card-title">${phone.brand}</h2>
       <h3><span>Release Date:</span>${phone.releaseDate ? phone.releaseDate : 'Not found'}</h3>
       <h3><span>slug:</span>${phone.slug}</h3>
       <h3><span>Name:</span>${phone.name}</h3>
       
     <h2 class="card-title">Features</h2>
       <p><span> DisplaySize: </span>${phone.mainFeatures.displaySize}</p>
       <p><span>Storage: </span>${phone.mainFeatures.storage}</p>
       <p><span>Chipset: </span>${phone.mainFeatures.chipSet}</p>
       <p><span>Memory: </span>${phone.mainFeatures.memory}</p>
       <p><span>Sensors: </span>${phone.mainFeatures.sensors}</p>
        
       <h2 class="card-title">Others</h2>
       <p><span> WLAN </span>${phone.others ? phone.others.WLAN : 'Not Found'}</p>
       <p><span> Bluetooth: </span>${phone.others ? phone.others.Bluetooth : 'Not Found'}</p>
        <p><span> GPS:  </span>${phone.others ? phone.others.GPS : 'Not Found'}</p>
       <p><span> NFC:</span>${phone.others ? phone.others.NFC : 'Not Found'}</p>
       <p><span> Radio: </span>${phone.others ? phone.others.Radio : 'Not Found'}</p>
       <p><span> USB: </span>${phone.others ? phone.others.USB : 'Not Found'}</p>

   </div >
 </div> `;
    phoneInfo.appendChild(div)
}