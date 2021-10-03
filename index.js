const base_url_quran = "https://api-alquranid.herokuapp.com/surah";
const base_url_waktu = "https://api.myquran.com/v1/sholat/jadwal/0228/";
let ul_quran = document.querySelector('.ul_quran');
let ul_waktu = document.querySelector('.ul_waktu');

// Accordion Function
var acc = document.getElementsByClassName("accordion");
var i;


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
		array.forEach(function(surah, index){
			let accordion = document.createElement('button');
			let panel = document.createElement('div');
			let p = document.createElement('p');

			panel.appendChild(p);
			accordion.setAttribute("ayat", `${index+1}`)
			accordion.classList.add('accordion');
			panel.classList.add('panel');
			p.classList.add('p-panel');
			const namaSurah = document.createTextNode(`${surah.nama}`);
			 // add the text node to the newly created div

			 accordion.appendChild(namaSurah);
			 accContainer.appendChild(accordion);
			 accContainer.appendChild(panel);
		})
		let accordions = document.querySelectorAll('.accordion');
		accordions.forEach(function(e){
			e.addEventListener("click", function() {
		    e.classList.toggle("active");
		    let panel = this.nextElementSibling;
		    if (panel.style.display === "block") {
		      panel.style.display = "none";
		    } else {
		      panel.style.display = "block";
		    }
	 		 });
		})
		let pPanel = document.querySelectorAll('.p-panel');

		getAyat(accordions);
		function getAyat(element){
			element.forEach(function(e){
				e.addEventListener('click', function(){
					let i = e.getAttribute('ayat');
					let sibling = e.nextElementSibling;
					fetchAyat(i, sibling);
				})
			})
		}


		function fetchAyat(query, sibling){
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
						sibling.innerHTML += li;
					})
				}
			});
		}

		// akhir
	})
}



	// const myForm = document.querySelector('#search_form');
	// const form = new FormData(myForm);
	// const query = form.get("cari");

	
