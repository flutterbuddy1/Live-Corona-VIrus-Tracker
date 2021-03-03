const countries = document.querySelector('#countries');
const list = document.querySelector('#list');
const list1 = document.querySelector('#list1');


let url = "https://api.covid19api.com/summary";

let request = new Request(url);
fetch(request)
.then((response)=>{
	return response.json();
}).then((data)=>{
	console.log(data);
	for (var i = 0; i < data.Countries.length; i++) {
		let option = document.createElement('option');
		option.value = i;
		option.innerHTML = data.Countries[i].Country;
		countries.appendChild(option);
		// Creating List Item For Recovered
		let item = document.createElement('div');
		item.className="item";
		let country = document.createElement('h5');
		country.innerHTML= data.Countries[i].Country;
		let recovered = document.createElement('h6');
		recovered.innerHTML= data.Countries[i].TotalRecovered;
		item.appendChild(country);
		item.appendChild(recovered);
		list.appendChild(item);
		// Creating List Item For Deaths
		let item1 = document.createElement('div');
		item1.className="item1";
		let country1 = document.createElement('h5');
		country1.innerHTML= data.Countries[i].Country;
		let deaths = document.createElement('h6');
		deaths.innerHTML= data.Countries[i].TotalDeaths;
		item1.appendChild(country1);
		item1.appendChild(deaths);
		list1.appendChild(item1);

		if (data) 
		{
			document.getElementById('loading').style.display = 'none';
			document.getElementById('loading1').style.display = 'none';

		}

		document.getElementById('tc').innerHTML = data.Global.TotalConfirmed;
		document.getElementById('td').innerHTML = data.Global.TotalDeaths;
		document.getElementById('tr').innerHTML = data.Global.TotalRecovered;
	
	}
		var chartVal = [ 
		data.Global.TotalDeaths , 
		data.Global.TotalConfirmed ,
		data.Global.TotalRecovered ];
	countries.addEventListener('change',function(e){
		if (countries.value == "global") 
		{
		document.getElementById('tc').innerHTML = data.Global.TotalConfirmed;
		document.getElementById('td').innerHTML = data.Global.TotalDeaths;
		document.getElementById('tr').innerHTML = data.Global.TotalRecovered;
		return chartVal;
		}else{
		document.getElementById('tc').innerHTML = data.Countries[countries.value].TotalConfirmed;
		document.getElementById('td').innerHTML = data.Countries[countries.value].TotalDeaths;
		document.getElementById('tr').innerHTML = data.Countries[countries.value].TotalRecovered;
		}
		});

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Deaths', 'Confirmed', 'Recovered'],
        datasets: [{
            label: 'Global',
            data: chartVal,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}).catch((error)=>{
	console.log(error);
	alert('Please Connect To The Internet');
});