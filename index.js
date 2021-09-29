const base_url = "https://api-alquranid.herokuapp.com/surah";
let ul = document.querySelector('.ul');

function tampilkanAyat(e){
	e.preventDefault();

	const myForm = document.querySelector('#search_form');
	const form = new FormData(myForm);
	const query = form.get("cari");

	fetch(`${base_url}/${query}`)
	.then(res=>res.json())
	.then(res=>{
		const array = res.data;
		insertion(array);
		function insertion(array){
			array.forEach(function(ayat, index){
				let li = `<li>
							${index + 1} | ${ayat.ar} <br>
							${ayat.id}</span> <br>
							<span style="font-size: 20px;"><i>${ayat.tr}</i></span>
							<hr>
						  </li>`;
				ul.innerHTML += li;
			})
		}
	});
}

function muatHalaman(){
	const myForm = document.querySelector('#search_form');
	myForm.addEventListener("submit", tampilkanAyat);
}
window.addEventListener("load", muatHalaman);