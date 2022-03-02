// search phone
const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    searchInput.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data.slice(0, 20)))
}
// display phone deatils
const displayPhoneDetails = (phones) => {

    const searchResult = document.getElementById("search-result");
    searchResult.innerHTML = '';
    const phoneInfo = document.getElementById('phone-info')
    phoneInfo.innerHTML = '';
    const error = document.getElementById('error');
    error.innerHTML = '';
    if (phones.length == 0) {
        const div = document.createElement('div')
        div.innerHTML = `<p class="text-center text-danger fw-bold">No result found</p>`;
        error.appendChild(div);

    }
    phones.forEach(phone => {

        const div = document.createElement('div')
        div.classList.add('col');

        // Inner Html of card
        div.innerHTML = `
        <div class="card  h-100 display d-flex bg-success bg-opacity-25 ">
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
// phone information
const phoneIDeatil = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => dispalyShowDetails(data?.data))

}
// show details
const dispalyShowDetails = phone => {

    const phoneInfo = document.getElementById('phone-info');
    phoneInfo.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
    
    <div class=" row mb-5 mx-auto mt-5 d-flex justify-content-center w-75  "> 
     <div class="col-lg-6 d-flex justify-content-center align-items-center">
     <img  src="${phone.image}" class="card-img-top p-5 h-75" alt="...">
     </div>
   <div class="col-lg-6 card-body mx-auto">
       <h2 class="card-title fw-bold">${phone.brand}</h2>
       <h3><span class="text-primary">Release Date : </span>${phone.releaseDate ? phone.releaseDate : 'Not found'}</h3>
      <h3><span class="text-primary">Name:</span>${phone.name}</h3>
      
      <h2>Features</h2>

      <p><span  class="text-primary fw-bold> DisplaySize: </span>${phone.mainFeatures?.displaySize}</p>
      <p><span  class=" text-primary fw-bold>Storage: </span>${phone.mainFeatures?.storage}</p>
      <p><span  class=" text-primary fw-bold>Memory: </span>${phone.mainFeatures?.memory}</p>
     <p><span class="class-primary fw-bold>Sensors:</span>${phone.mainFeatures?.sensors}"</p>
     <p><span  class=" text-primary fw-bold>Storage: </span>${phone.mainFeatures.chipSet}</p>
 
        
       <h2>Others</h2>
      <p><span> WLAN:  </span>${phone.others ? phone.others.WLAN : 'Not Found'}</p>
       <p><span > Bluetooth: </span>${phone.others ? phone.others.Bluetooth : 'Not Found'}</p>
        <p><span> GPS:  </span>${phone.others ? phone.others.GPS : 'Not Found'}</p>
       <p><span> NFC:</span>${phone.others ? phone.others.NFC : 'Not Found'}</p>
       <p><span> Radio: </span>${phone.others ? phone.others.Radio : 'Not Found'}</p>
       <p><span> USB: </span>${phone.others ? phone.others.USB : 'Not Found'}</p>

       
   </div >
 </div> `;
    phoneInfo.appendChild(div)
}