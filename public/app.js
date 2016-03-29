window.onload = function(){
  console.log('App started');

// put any global vars here

  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();  // now tell it where to go and the action to take
  var selCountry;
  var population;
  var capital;
  var countryList = [];
  var borders = [];


// check if anything persistent
 var storedCountry = JSON.parse(localStorage.getItem('country-stats')) || []; 

// now use the persistent stuff if there is any
 if (storedCountry.length > 0) {
    selCountry = storedCountry[0].name;
    population = storedCountry[1].population;
    capital = storedCountry[2].capital;

    outputList(selCountry, capital,population);
 } 

  request.open("GET", url);   // next tell it what to do when it completes = async nature of it
  request.onload = function() {
    if(request.status === 200){
      var jsonString = request.responseText;
      var countries = JSON.parse(jsonString);


      for(var i = 0; i < countries.length; i++) {
        countryList.push(countries[i].name)
      }
   // console.log(countryList);


   var sel = document.getElementById('pays');
   for(var i = 0; i < countryList.length; i++) {
      var opt = document.createElement('option');
      opt.innerHTML = countryList[i];
      opt.value = countryList[i];
      sel.appendChild(opt);
    }

    sel.onchange = function() {
      selCountry = sel.options[sel.selectedIndex].text;
      //console.log('selected country: ', selCountry); 

      for(var i = 0; i < countries.length; i++) {
        if (countries[i].name === selCountry) {
          population =  countries[i].population;
          capital = countries[i].capital;
          borders = countries[i].borders; // NB sometimes no borders.
        }
      }  
     //   console.log(capital, population);
      outputList(selCountry, capital,population);
   
        console.log('capital: ', capital);
        console.log('borders: ', borders);
// persist
      storedCountry = [
        {'name': selCountry},
        {'population': population},
        {'capital': capital}
      ];

   //   console.log('persistent countrystats: ', storedCountry);
        localStorage.setItem('country-stats', JSON.stringify(storedCountry));

    }
 




    }
  };
  request.send();   
};

var outputList = function(selCountry, capital, population) {
        document.getElementById('name').innerHTML = selCountry;
        document.getElementById('capital').innerHTML = capital;
        document.getElementById('population').innerHTML = population;
}
