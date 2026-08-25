/* =================================
   MENU MOBILE
   ================================= */

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('#main-nav a').forEach(a => {
    a.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});


/* =================================
   ANNÉE AUTOMATIQUE
   ================================= */

const year = document.querySelector('#year');

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =================================
   FORMULAIRE DE CONTACT
   ================================= */

document.querySelector('#contact-form')?.addEventListener('submit', e => {

    e.preventDefault();

    const f = new FormData(e.currentTarget);

    const email = 'contact@exemple.fr';

    const subject = encodeURIComponent(
        'Demande de devis - Tanguy Blin Carrelage'
    );

    const body = encodeURIComponent(
        `Bonjour Tanguy,

Nom : ${f.get('name')}
Téléphone : ${f.get('phone')}
Commune du chantier : ${f.get('city')}

Projet :
${f.get('message')}

Merci.`
    );

    window.location.href =
        `mailto:${email}?subject=${subject}&body=${body}`;

});


/* =================================
   ZOOM DES PHOTOS
   ================================= */

document.querySelectorAll('.mosaic-item img').forEach(function (img) {

    img.addEventListener('click', function () {

        // Empêche plusieurs zooms simultanés
        if (document.querySelector('.zoom-image')) {
            return;
        }

        ouvrirImage(this);

    });

});


/* =================================
   OUVERTURE DE L'IMAGE
   ================================= */

function ouvrirImage(img) {

    /*
     * On récupère la position exacte
     * de l'image dans la mosaïque.
     */

    const rect = img.getBoundingClientRect();


    /* -----------------------------
       Création du fond noir
       ----------------------------- */

    const overlay = document.createElement('div');

    overlay.className = 'image-zoom-overlay';

    document.body.appendChild(overlay);


    /* -----------------------------
       Création de la copie
       ----------------------------- */

    const zoomImage = img.cloneNode(true);

    zoomImage.classList.remove('mosaic-item');
    zoomImage.classList.add('zoom-image');


    /* Position de départ */

    zoomImage.style.left =
        rect.left + 'px';

    zoomImage.style.top =
        rect.top + 'px';

    zoomImage.style.width =
        rect.width + 'px';

    zoomImage.style.height =
        rect.height + 'px';


    document.body.appendChild(zoomImage);


    /*
     * On masque temporairement
     * l'image originale.
     */

    img.style.opacity = '0';

    document.body.classList.add(
        'image-zoom-active'
    );


    /* -----------------------------
       Animation vers le plein écran
       ----------------------------- */

    requestAnimationFrame(function () {

        overlay.classList.add('active');


        /*
         * Rapport largeur / hauteur
         * de la photo originale.
         */

        const ratio =
            img.naturalWidth /
            img.naturalHeight;


        /*
         * Largeur maximale :
         * 98 % de l'écran.
         */

        let newWidth =
            window.innerWidth * 0.98;


        /*
         * Calcul de la hauteur
         * en conservant les proportions.
         */

        let newHeight =
            newWidth / ratio;


        /*
         * Hauteur maximale :
         * 95 % de l'écran.
         */

        const maxHeight =
            window.innerHeight * 0.95;


        /*
         * Si la photo dépasse
         * la hauteur disponible,
         * on la réduit.
         */

        if (newHeight > maxHeight) {

            newHeight = maxHeight;

            newWidth =
                newHeight * ratio;
        }


        /*
         * Centrage de la photo.
         */

        const newLeft =
            (window.innerWidth - newWidth) / 2;

        const newTop =
            (window.innerHeight - newHeight) / 2;


        /*
         * Déclenchement de l'animation.
         */

        zoomImage.style.left =
            newLeft + 'px';

        zoomImage.style.top =
            newTop + 'px';

        zoomImage.style.width =
            newWidth + 'px';

        zoomImage.style.height =
            newHeight + 'px';

    });


    /* -----------------------------
       Clic sur la photo
       ----------------------------- */

    zoomImage.addEventListener('click', function () {

        fermerImage(
            img,
            zoomImage,
            overlay,
            rect
        );

    });


    /* -----------------------------
       Clic sur le fond noir
       ----------------------------- */

    overlay.addEventListener('click', function () {

        fermerImage(
            img,
            zoomImage,
            overlay,
            rect
        );

    });

}


/* =================================
   FERMETURE DE L'IMAGE
   ================================= */

function fermerImage(
    img,
    zoomImage,
    overlay,
    rect
) {

    /*
     * L'image retourne exactement
     * à son emplacement d'origine.
     */

    zoomImage.style.left =
        rect.left + 'px';

    zoomImage.style.top =
        rect.top + 'px';

    zoomImage.style.width =
        rect.width + 'px';

    zoomImage.style.height =
        rect.height + 'px';


    /*
     * On fait disparaître
     * le fond noir.
     */

    overlay.classList.remove(
        'active'
    );


    /*
     * On attend la fin de
     * l'animation avant de supprimer
     * les éléments.
     */

    setTimeout(function () {

        img.style.opacity = '';

        zoomImage.remove();

        overlay.remove();

        document.body.classList.remove(
            'image-zoom-active'
        );

    }, 450);

}


/* =================================
   FERMER AVEC ÉCHAP
   ================================= */

document.addEventListener('keydown', function (e) {

    if (e.key !== 'Escape') {
        return;
    }


    const zoomImage =
        document.querySelector('.zoom-image');

    const overlay =
        document.querySelector('.image-zoom-overlay');


    if (!zoomImage || !overlay) {
        return;
    }


    /*
     * Recherche de l'image originale
     * actuellement masquée.
     */

    const images =
        document.querySelectorAll(
            '.mosaic-item img'
        );


    images.forEach(function (img) {

        if (img.style.opacity === '0') {

            const rect =
                img.getBoundingClientRect();


            fermerImage(
                img,
                zoomImage,
                overlay,
                rect
            );

        }

    });

});