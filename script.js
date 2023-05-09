const APP_TOKEN = 'DF029Ol44rGJ0Al30EHaITQrV' // <- Replace this with your app token
const RESOURCE_ID = '43nn-pn8j' // <- Replace this with the ID for the data resource that you want to look up
const LIMIT = 20 // <- Replace this with the number of records you want to pull

fetch('https://data.cityofnewyork.us/resource/43nn-pn8j.json')
  .then(response => response.json())
  .then((data) => {
    // let parentElement = document.getElementById('background')

    for(let i = 0; i < data.length; i++) {
    //  Only show data with a grade of A and cuisine_description containing "pizza"
    if(data[i].grade == "A" && data[i].cuisine_description.includes("Pizza")) {
      let newDiv = document.createElement ('div')
        newDiv.innerHTML =` 
          <h4>${data[i].grade}</h4>
          <p>${data[i].boro}</p>
         <p>${data[i].street}</p>
          <p>${data[i].zipcode}</p>
         <p>${data[i].dba}</p>
<p>${data[i].cuisine_description}</p>
          `
  //  parentElement.append(newDiv)
   }
  }
});
   
   



let allRestaurants = []
const $restaurant1 = document.getElementById('restaurant1')
const $restaurant2 = document.getElementById('restaurant2')

// Helper Functions
function calculateDistance(lat1, lon1, lat2, lon2) {
  lat1 = parseFloat(lat1)
  lon1 = parseFloat(lon1)
  lat2 = parseFloat(lat2)
  lon2 = parseFloat(lon2)

  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)) * 0.621371; // 2 * R; R = 6371 km, 0.621371 miles per km
}

// Filter Data (if replaceing json with API, replace "restaruants.json" with api) / to filter out you can use &&
fetch('restaurants.json')
  .then((response) => response.json())
  .then((json) => {

    console.log(json)
json.forEach(row => {
  if(row.dba&&row.cuisine_description&&row.zipcode&&row.phone&&row.building){allRestaurants.push(row)} 


  
});

      // filteredData = json.filter(function(rest) {
      //   return rest.dba !== null && rest.cuisine_description !== null && rest.latitude !== null && rest.longitude!== null && rest.phone !== null 
      // })

      // allRestaurants = filteredData

      console.log('data restaurants filter', allRestaurants)
  });





// Construct the URL that we need to make requests
const url = `https://data.cityofnewyork.us/resource/${RESOURCE_ID}.json?$limit=${LIMIT}&$$app_token=${APP_TOKEN}`


console.log(`Fetching url - ${url}`)

// fetch(url)
//   .then((response) => response.json())
//   .then((json) => {
//     //  return restaurants.loc=json.filter(function(restaurants){*function goes here})
//   });

//   fetch('data/DPR_RunningTracks_001.json')
//   .then((response) => response.json())
//   .then((json) => {
//       runningTracks = json.filter(function(track) {
//         return track.lat !== null && track.long !== null
//       })

//       console.log('running tracks', runningTracks)
//   });


document.getElementById("set-restaurants-1").addEventListener('click',function(){
  console.log('button click')

  const randomRestaurant1 = allRestaurants[Math.floor(Math.random()*allRestaurants.length)];
  const randomRestaurant2 = allRestaurants[Math.floor(Math.random()*allRestaurants.length)];

  console.log(randomRestaurant1, randomRestaurant2)

  console.log('set the information for the left side restaurant', 'title = ', randomRestaurant1.dba)

  document.getElementById('left-restaurant-title').innerHTML = randomRestaurant1.dba


  document.getElementById('left-basic-info').innerHTML = ""
  document.getElementById('left-basic-info').innerHTML += randomRestaurant1.cuisine_description

  document.getElementById('left-restaurant-description').innerHTML = ""
  document.getElementById('left-restaurant-description').innerHTML += randomRestaurant1.building + "&nbsp" + randomRestaurant1.street +"&nbsp"+randomRestaurant1.zipcode
if(randomRestaurant1.phone){
  let phone = document.createElement("h4") //created h4 element, called phone
  phone.innerHTML+= randomRestaurant1.phone // added phone data from json to phone html element
  document.getElementById('left-restaurant-description').append(phone) //added dom element to left restaurant description
  phone.classList.add("phonenumber") // adding a class to phone



  
}


})





document.getElementById("set-restaurants-2").addEventListener('click',function(){
  console.log('button click')

  const randomRestaurant1 = allRestaurants[Math.floor(Math.random()*allRestaurants.length)];
  const randomRestaurant2 = allRestaurants[Math.floor(Math.random()*allRestaurants.length)];

  console.log(randomRestaurant1, randomRestaurant2)

  console.log('set the information for the right side restaurant', 'title = ', randomRestaurant1.dba)

  document.getElementById('right-restaurant-title').innerText = randomRestaurant1.dba

  document.getElementById('right-basic-info').innerHTML = ""
  document.getElementById('right-basic-info').innerHTML += randomRestaurant2.cuisine_description

  document.getElementById('right-restaurant-description').innerHTML = ""
  document.getElementById('right-restaurant-description').innerHTML += randomRestaurant2.building + "&nbsp" + randomRestaurant2.street +"&nbsp"+randomRestaurant2.zipcode
if(randomRestaurant1.phone){
  let phone = document.createElement("h4") //created h4 element, called phone
  phone.innerHTML+= randomRestaurant1.phone // added phone data from json to phone html element
  document.getElementById('right-restaurant-description').append(phone)  //added dom element to left restaurant description
  phone.classList.add("phonenumber") // adding a class to phone
}

})
