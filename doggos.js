const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector(".breeds"); // <select> tag

fetch(BREEDS_URL)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		const breedsObject = data.message; // returns and object of all the dog breeds from the API.
		const breedsArray = Object.keys(breedsObject); // Object.keys is a function that takes in an object and returns and array, so we can iterate.

		for (let i = 0; i < breedsArray.length; i++) {
			const option = document.createElement("option"); // create a new <option> tag for every breed in the array.
			option.value = breedsArray[i]; // returns a string representing the value of the value attribute of the option element.
			option.innerText = breedsArray[i]; // adds the breed name text into the <option> tags of the HTML.
			select.appendChild(option); // appendChild() is a node method that adds a node to the end of the list of children of a specified parent node. This will add the new <option> tags with the specified value and innerText to the end of the <select> tag until the loop finishes.
		}
	});

select.addEventListener("change", function (event) {
	let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
	getDoggo(url);
});

const img = document.querySelector(".dog-img");
const spinner = document.querySelector(".spinner");

function getDoggo(url) {
	spinner.classList.add("show");
	img.classList.remove("show"); // img.style.display = "none"; will also work here
	fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			img.src = data.message; //  data.message will be the image url
		});
}

img.addEventListener("load", function () { // removes the delay from the loading animation between the image showing up.
	spinner.classList.remove("show"); // hides the loading animation
	img.classList.add("show"); // shows the new image
})