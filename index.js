const base_url_quran = "https://api-alquranid.herokuapp.com/surah";
const base_url_waktu = "https://api.myquran.com/v1/sholat/jadwal/0228/";
let ul_quran = document.querySelector('.ul_quran');
let ul_waktu = document.querySelector('.ul_waktu');

waktuSholat();
function waktuSholat(){
	let tahun = new Date().getFullYear();
	let bulan = new Date().getMonth();
	let tanggal = new Date().getDate();
	fetch(`${base_url_waktu}/${tahun}/${bulan}/${tanggal}`)
	.then(res => res.json())
	.then(res =>{
		const data = res.data.jadwal;
		for(const item of Object.entries(data)){
			let li = `<li class="column">${item[0]} <br>
					  ${item[1]}</li>
			`
			ul_waktu.innerHTML += li;
		}
	});
}

function tampilkanAyat(e){
	e.preventDefault();

	const myForm = document.querySelector('#search_form');
	const form = new FormData(myForm);
	const query = form.get("cari");

	fetch(`${base_url_quran}/${query}`)
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
				ul_quran.innerHTML += li;
			})
		}
	});
}

function muatHalaman(){
	const myForm = document.querySelector('#search_form');
	myForm.addEventListener("submit", tampilkanAyat);
}
window.addEventListener("load", muatHalaman);