//select the target element to display the data
const display = document.querySelector(".mainContainer");
display.innerHTML = "";
const url = "https://restcountries.com/v2/all";

//create getData function to read the data

const getData = async () => {
  //Using fetch get data from wether API
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const countriesInfo = await data.json();
    displayData(countriesInfo);
    return countriesInfo;
    // console.log(response);
  } catch (e) {
    console.log(e);
  }
};
getData();

//select search element for search box

let searchBox = document.getElementById("search");
let searchInput = document.getElementById("input");
//logic for search functionality
searchBox.addEventListener("click", async () => {
  let enteredText = searchInput.value;
  let filteredCountries = [];
  const countriesData = await getData();
  //   console.log(countriesData);
  //   console.log("text", enteredText);
  if (enteredText != " ")
    //write the logic to filter the data
    filteredCountries = countriesData.filter((country) =>
      country.name.toLocaleLowerCase().includes(enteredText.toLocaleLowerCase())
    );
  //call displayData function to display the filtered data

  displayData(filteredCountries);
  console.log(filteredCountries);
});

//write the logic to perform clear search operation
function clearSearch() {
  searchInput.value = "";
  displayData(getData());
}

//logic to display the data

function displayData(countrydata) {
  console.log(countrydata);
  display.innerHTML = "";
  countrydata.forEach((country) => {
    display.innerHTML += `
        <div class="subContainer">
        <div class="card" style="width: 18rem;">
      <img src="${country.flags.png}" class="card-img-top" alt="country flag" />
      <div class="card-body">
        <h5 class="card-title">${country.name}</h5>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Region: ${country.region}</li>
        <li class="list-group-item">Subregion: ${country.subregion}</li>
        <li class="list-group-item">Population: ${country.population}</li>
      </ul>        
      </div>
    </div>
        </div>
        `;
  });
}
