window.onload = function(){
  console.log('App started');
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();  // now tell it where to go and the action to take
  request.open("GET", url);   // next tell it what to do when it completes = async nature of it
  request.onload = function() {
    if(request.status === 200){
      console.log('got the day success');
  //    console.log(request.responseText);
      var jsonString = request.responseText;
      var countries = JSON.parse(jsonString);
  //    console.log('countries', countries);
   //   console.log('first country', countries[0]);

      var countryList = [];

      for(var i = 0; i < countries.length; i++) {
        countryList.push(countries[i].name)
      }
     console.log(countryList);


   var sel = document.getElementById('pays');
for(var i = 0; i < countryList.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = countryList[i];
    opt.value = countryList[i];
    sel.appendChild(opt);
}








    }
  };
  request.send();   
};
