const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#main-nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('#main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const email='contact@exemple.fr';const subject=encodeURIComponent('Demande de devis - Tanguy Blin Carrelage');const body=encodeURIComponent(`Bonjour Tanguy,\n\nNom : ${f.get('name')}\nTéléphone : ${f.get('phone')}\nCommune du chantier : ${f.get('city')}\n\nProjet :\n${f.get('message')}\n\nMerci.`);window.location.href=`mailto:${email}?subject=${subject}&body=${body}`});

// Carte OpenStreetMap
const map = L.map('map').setView([48.057063, -0.630066], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Marqueur de l'entreprise
const marker = L.marker([48.057063, -0.630066]).addTo(map);

marker.bindPopup(`
    <strong>Tanguy Blin Carrelage</strong><br>
    19 rue de la Bourdigale<br>
    53210 Louvigné<br><br>
    <a href="tel:+33645052799">06 45 05 27 99</a>
`).openPopup();