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


//button input submit
button.addEventListener('click', () => {
	clear()
	test_api()
})


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

//api place information

function initMap(){
	let places = new google.maps.LatLng(3.1390, 101.6869);
	let map = new google.maps.Map(document.getElementById('map'), {
		center: places,
		zoom: 15,
		mapId: "8d193001f940fde3"
	});

	let request = {
		location: places,
		radius: '500',
		type: ['restaurant']
	};

	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
}

const callback = (results, status) => {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for (let i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
}

const createMarker = (data) => {
	const placesList = document.getElementById('places')
	let image = {
		url: data.icon,
		size: new google.maps.Size(200, 71),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(17, 34),
		scaledSize: new google.maps.Size(100, 25),
	};


	new google.maps.Marker({
		map,
		icon: image,
		title: data.name,
		position: data.geometry.location,
	})
	const li = document.createElement("li");
	li.textContent = data.name;
	placesList.appendChild(li);


}

// function initMap() {
// 	// Create the map.
// 	const pyrmont = { lat: -33.866, lng: 151.196 };
// 	const map = new google.maps.Map(document.getElementById("map"), {
// 		center: pyrmont,
// 		zoom: 17,
// 		mapId: "8d193001f940fde3",
// 	});
// 	// Create the places service.
// 	const service = new google.maps.places.PlacesService(map);
// 	let getNextPage;
// 	const moreButton = document.getElementById("more");

// 	moreButton.onclick = function () {
// 		moreButton.disabled = true;

// 		if (getNextPage) {
// 			getNextPage();
// 		}
// 	};
// 	// Perform a nearby search.
// 	service.nearbySearch(
// 		{ location: pyrmont, radius: 500, type: "store" },
// 		(results, status, pagination) => {
// 			if (status !== "OK" || !results) return;
// 			addPlaces(results, map);
// 			moreButton.disabled = !pagination || !pagination.hasNextPage;

// 			if (pagination && pagination.hasNextPage) {
// 				getNextPage = () => {
// 					// Note: nextPage will call the same handler function as the initial call
// 					pagination.nextPage();
// 				};
// 			}
// 		}
// 	);
// }

// function addPlaces(places, map) {
// 	const placesList = document.getElementById("places");

// 	for (const place of places) {
// 		if (place.geometry && place.geometry.location) {
// 			const image = {
// 				url: place.icon,
// 				size: new google.maps.Size(71, 71),
// 				origin: new google.maps.Point(0, 0),
// 				anchor: new google.maps.Point(17, 34),
// 				scaledSize: new google.maps.Size(25, 25),
// 			};
// 			new google.maps.Marker({
// 				map,
// 				icon: image,
// 				title: place.name,
// 				position: place.geometry.location,
// 			});
// 			const li = document.createElement("li");
// 			li.textContent = place.name;
// 			placesList.appendChild(li);
// 			li.addEventListener("click", () => {
// 				map.setCenter(place.geometry.location);
// 			});
// 		}
// 	}
// }




setInterval(() => {
	compliment()
	avatar()
}, 8000)


test_api()


//nav on scroll change background
window.addEventListener('scroll', (e) => {

	if (window.scrollY > 0) {
		nav.style.background = "rgb(218, 231, 222)"
	} else {
		nav.style.background = "white"
	}

})