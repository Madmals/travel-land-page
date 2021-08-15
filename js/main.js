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
const compliment = async()=>{
	let res = await fetch("https://complimentr.com/api")
	let data = await res.json()
	rev.innerHTML = data.compliment
	
}



//api avatar

let avatars = document.querySelector(".avatarimg")
const avatar = async()=>{
	let res = await fetch("https://randomuser.me/api/?page=3&results=10")
	let data = await res.json()
	data.results.map(eahcone=>
		{let pic = eahcone.picture.large
		avatars.src = pic
		})
	
}



test_api()

setInterval(()=>{compliment()
avatar()
},8000)




//nav on scroll change background
window.addEventListener('scroll', (e) => {

	if (window.scrollY > 0) {
		nav.style.background = "rgb(218, 231, 222)"
	} else {
		nav.style.background = "white"
	}

})