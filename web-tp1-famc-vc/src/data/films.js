import sousCategorie from "../enum/SousCategorie.js";

/**
 * Données originales pour les films
 */
export const films = [
    {
        EIDR : 1,
        nom : "Mean Girls",
        dateSortie : "2004-04-30",
        realisateur : "Mark Waters",
        genre : sousCategorie.COMEDIE,
        dureeMinute : 97,
        paysOrigine : "États-Unis",
        afficheSrc : "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2023/08/03140532/2ZkuQXvVhh45uSvkBej4S7Ix1NJ-scaled.jpg"
    },
    {
        EIDR : 2,
        nom : "The secret life of Walter Mitty",
        dateSortie : "2013-12-25",
        realisateur : "Ben Stiller",
        genre : sousCategorie.AVENTURE,
        dureeMinute : 114,
        paysOrigine : "États-Unis",
        afficheSrc : "https://musicart.xboxlive.com/7/c19d1100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080"
    },
    {
        EIDR : 3,
        nom : "Requiem for a dream",
        dateSortie : "2000-11-03",
        realisateur : "Darren Aronofsky",
        genre : sousCategorie.DRAME,
        dureeMinute : 102,
        paysOrigine : "États-Unis",
        afficheSrc : "https://upload.wikimedia.org/wikipedia/en/3/39/Kronos_requiem.jpg"
    },
    {
        EIDR : 4,
        nom : "Eurovision Song Contest: The Story of Fire Saga",
        dateSortie : "2020-06-26",
        realisateur : "David Dobkin",
        genre : sousCategorie.COMEDIE,
        dureeMinute : 123,
        paysOrigine : "États-Unis",
        afficheSrc : "https://images.immediate.co.uk/production/volatile/sites/3/2020/06/eurovision-movie-93d009c.jpg"
    },
    {
        EIDR : 5,
        nom : "Das Cabinet des Dr. Caligari",
        dateSortie : "1920-02-26",
        realisateur : "Robert Wiene",
        genre : sousCategorie.HORREUR,
        dureeMinute : 67,
        paysOrigine : "Allemagne",
        afficheSrc : "https://upload.wikimedia.org/wikipedia/en/2/2f/The_Cabinet_of_Dr._Caligari_poster.jpg"
    },
    {
        EIDR : 6,
        nom : "Bronenossets «Potiomkine»",
        dateSortie : "1925-12-21",
        realisateur : "Sergueï Eisenstein",
        genre : sousCategorie.GUERRE,
        dureeMinute : 74,
        paysOrigine : "Union soviétique",
        afficheSrc : "https://resizing.flixster.com/YFgZQ3FIJ3xCaiwhbzfQHmU7M_E=/206x305/v2/https://resizing.flixster.com/jrE1djRZ-qnITwyr6QCY2mXCLS8=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzY5YzA5NjAxLTNmMmYtNGI1OS1hNDZjLTVkNDI3YTkwOWNjMi5qcGc="
    },
    {
        EIDR: 7,
        nom: "Le Fabuleux Destin d'Amélie Poulain",
        dateSortie: "2001-04-25",
        realisateur: "Jean-Pierre Jeunet",
        genre: sousCategorie.COMEDIE,
        dureeMinute: 122,
        paysOrigine: "France",
        afficheSrc: "https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg"
    },
    {
        EIDR: 8,
        nom: "La vita è bella",
        dateSortie: "1997-12-13",
        realisateur: "Roberto Benigni",
        genre: sousCategorie.DRAME,
        dureeMinute: 116,
        paysOrigine: "Italie",
        afficheSrc: "https://festival-villerupt.com/ffi/uploads/2021/04/la-vita-e-bella.jpg"
    },
    {
        EIDR: 9,
        nom: "Get Out",
        dateSortie: "2017-02-24",
        realisateur: "Jordan Peele",
        genre: sousCategorie.HORREUR,
        dureeMinute: 104,
        paysOrigine: "États-Unis",
        afficheSrc: "https://videocentreville.com/wp-content/uploads/2022/01/Get-Out-DVD-a-vendre..jpg"
    }
]