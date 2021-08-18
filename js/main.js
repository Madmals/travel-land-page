const nav = document.querySelector('nav')
const body = document.querySelector('body')
const button = document.querySelector("#submit");



//api travel test
let imgs = document.querySelector('.image_all')

const test_api = async () => {


	let place = document.querySelector(".location").value

	let res = await fetch(`https://api.unsplash.com/search/photos?client_id=5DUHnuUyhRR32OnW2yeGm4XRa0jfJBmabeD1Relm8c4&query=${place}?page=1`)
	let data = await res.json()
	let a = data.results.map(urls => `${urls.urls.raw}?&w=768&h=500&fit=crop`)




	for (let i = 0; i < 8; i++) {

		let imgnew = document.createElement('div')
		imgnew.innerHTML = `
			<div class="img${[i + 1]}">
				<img class="img${[i + 1]}" src="${a[i]}"
					alt="">
			</div>
		`
		imgs.appendChild(imgnew)

	}

}


//clear list of image 
const clear = () => {
	while (imgs.firstChild) {
		imgs.removeChild(imgs.lastChild)
	}
}



//api compliment
let rev = document.querySelector(".review")
const compliment = async () => {
	let res = await fetch("https://complimentr.com/api")
	let data = await res.json()
	rev.innerHTML = data.compliment

}



//api avatar

let avatars = document.querySelector(".avatarimg")
const avatar = async () => {
	let res = await fetch("https://randomuser.me/api/?page=3&results=10")
	let data = await res.json()
	data.results.map(eahcone => {
		let pic = eahcone.picture.large
		avatars.src = pic
	})

}

//api place information\\\


function initMap() {

	let places = new google.maps.LatLng(3.1390, 101.6869);
	map = new google.maps.Map(document.getElementById('map'), {
		center: places,
		zoom: 14,
	});


	//geolocation init
	geocoder = new google.maps.Geocoder();

	const geo_address = (geocoder, resultMap) => {

		let address = document.querySelector(".location").value

		geocoder.geocode({ address: address })
			.then(({ results }) => {


				let places = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
				map = new google.maps.Map(document.getElementById('map'), {
					center: places,
					zoom: 14,
					mapId: "8d193001f940fde3"
				});


				let request = {
					location: places,
					radius: '1500',
					type: ['lodging']
				};


				const callback = (res, status) => {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						for (let i = 0; i < res.length; i++) {
							createMarker(res[i]);
						}
					}
				}

				//create marker for lodging
				const createMarker = (data) => {
					let image = {
						url: data.icon,
						size: new google.maps.Size(71, 71),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 34),
						scaledSize: new google.maps.Size(25, 25),
					};


					new google.maps.Marker({
						map,
						icon: image,
						title: data.name,
						position: data.geometry.location,
					});


				}

				//init places api
				service = new google.maps.places.PlacesService(map);

				//init nearby search nearby api
				service.nearbySearch(request, callback);



				return map;



			})
			.catch((e) => console.log(e))



	}

	//search button
	button.addEventListener('click', () => {
		clear()
		test_api()
		geo_address(geocoder, map)
	})

}


setInterval(() => {
	compliment()
	avatar()
}, 8000);


test_api();

//burger show menu

bur = document.querySelector(".burger")
navbur = document.querySelector('.bur_add')

bur.addEventListener('click', (e) => {

	//this allow other event handlers on same element to be executed
	e.stopImmediatePropagation();


	navbur.classList.toggle('show_menu')
})

// click outside of element

body.addEventListener('click', (e) => {
	if(e.currentTarget != navbur) {
		navbur.classList.remove('show_menu')
	}

})


//nav on scroll change background
window.addEventListener('scroll', (e) => {

	if (window.scrollY > 0) {
		nav.style.background = "rgb(218, 231, 222)"
	} else {
		nav.style.background = "white"
	}


})