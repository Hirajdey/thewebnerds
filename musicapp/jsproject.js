

window.addEventListener('load', () => {

	const tapBox = document.querySelectorAll('.tapBox');
	const sounds = document.querySelectorAll('.sounds');
	const bableDropWrap = document.querySelector('.bableDropWrap');

	const color = [
		'#381460',
		'#b21f66',
		'#fe346e',
		'#ffbd69',
		'#be79df',
		'#fbcffc',
		'#5b8c5a'
	];

	tapBox.forEach((etap, index) => {

		etap.addEventListener('click',() => {
			sounds[index].currentTime = 0;
			sounds[index].play();

			bableSlide(index);
		});

	});


	const bableSlide = index =>{
		let babel = document.createElement('div');
				babel.setAttribute('class','bableDrop');

		    bableDropWrap.appendChild(babel);
				babel.style.backgroundColor = color[index];
				babel.style.animation = 'jump 1s ease';
				babel.addEventListener('animationend', function(){
					bableDropWrap.removeChild(this);
				});
	}

});



window.addEventListener('load',() =>{

	const timeZone = document.querySelector('.timezoneBox h2');
	const weatherIcon = document.querySelector('.weatherIconBox h2');
	const tempElm = document.querySelector('.temperaterBox h2 .temp');
	const tempElmBox = document.querySelector('.temperaterBox h2');
	const summaryElm = document.querySelector('.summary');

	let long;
	let lat;

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => { 
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/9a694978af26006a10ac4bef9685c01e/${lat},${long}`;

			fetch(api).then(response =>{ 
					return response.json();

				}).then(data =>{
					console.log(data);
					timeZone.textContent = data.timezone;

					const {temperature, summary, icon} = data.currently;
					console.log(temperature);
					console.log(icon);

					const temper = Math.floor(temperature);
					tempElm.textContent = temper;
					summaryElm.textContent = summary;

					tempElmBox.addEventListener('click',() =>{
						const tempf = document.querySelector('.tempf');
						const tempInC = (temper - 32) * (5/9); //(32°F − 32) × 5/9
						if(tempf.textContent === 'F'){
							tempElm.textContent = Math.floor(tempInC);
							tempf.textContent = 'C';
						}else{
							tempElm.textContent = temper;
							tempf.textContent = 'F';
						}
					});

					setIcons(icon, document.querySelector('.icon'));

				});

		});	
	}

	// https://darkskyapp.github.io/skycons/
	const setIcons = (icon, iconID) => {	
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconID,Skycons[currentIcon]);
	}

});





