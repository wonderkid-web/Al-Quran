const base_url_quran = "https://api-alquranid.herokuapp.com/surah";
const base_url_waktu = "https://api.myquran.com/v1/sholat/jadwal/0228/";
let ul_quran = document.querySelector('.ul_quran');
let ul_waktu = document.querySelector('.ul_waktu');

// Accordion Function
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

waktuSholat();
function waktuSholat(){
	let tahun = new Date().getFullYear();
	let bulan = new Date().getMonth();
	let tanggal = new Date().getDate();
	fetch(`${base_url_waktu}/${tahun}/${bulan}/${tanggal}`)
	.then(res => res.json())
	.then(res =>{
		let lokasi = document.querySelector('.lokasi');
		lokasi.innerHTML += ` ${res.data.daerah}`;
		const data = res.data.jadwal;
		for(const item of Object.entries(data)){
			let li = `
					<div class="li_waktu">
						<div>
							 <span class="fw-bold h5">${item[0]}</span>  
							  <br>
							  ${item[1]}</div>
						</div>	
					</div>
						
			`;
			ul_waktu.innerHTML += li;
		}
	});
}
fetchSurah();
function fetchSurah(){
	const accContainer = document.querySelector('.accordion-section');
	fetch(`${base_url_quran}`)
	.then(res=>res.json())
	.then(res=>{
		const array = res.data;
		array.forEach(function(surah){
			let accordion = document.createElement('button');
			accordion.classList.add('accordion');
			const namaSurah = document.createTextNode(`${surah.nama}`);
			 // add the text node to the newly created div
			 accordion.appendChild(namaSurah);
			 accContainer.appendChild(accordion);
		})
	})
}
function tampilkanAyat(e){
	e.preventDefault();

	// const myForm = document.querySelector('#search_form');
	// const form = new FormData(myForm);
	// const query = form.get("cari");

	fetch(`${base_url_quran}/`)
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
				// ul_quran.innerHTML += li;
			})
				console.log(res)
		}
	});
}

window.addEventListener("load", tampilkanAyat);