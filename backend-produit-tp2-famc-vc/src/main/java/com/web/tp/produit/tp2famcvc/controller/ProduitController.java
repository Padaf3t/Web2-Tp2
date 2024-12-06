package com.web.tp.produit.tp2famcvc.controller;

import com.web.tp.produit.tp2famcvc.exception.ProduitInformationInvalidException;
import com.web.tp.produit.tp2famcvc.exception.ProduitNonTrouveException;
import com.web.tp.produit.tp2famcvc.model.EnumSousCategorie;
import com.web.tp.produit.tp2famcvc.model.Produit;
import com.web.tp.produit.tp2famcvc.repository.ProduitRepository;
import com.web.tp.produit.tp2famcvc.verification.ProduitValidateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collection;

/**
 * Controller gérant la BD de produit
 */
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ProduitController implements CommandLineRunner {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private ProduitValidateur produitValidateur;

    private Logger logger = LoggerFactory.getLogger(ProduitController.class);

    /**
     * Permet de récupérer la liste de produit
     * @return la liste de produit
     */
    @GetMapping(value = "/produits", produces = {"application/json"})
    Collection<Produit> listAllProduits(){
        logger.info("****Obtention de la liste de produits");
        return (Collection<Produit>) produitRepository.findAll();
    }

    /**
     * Permet de récupérer un produit en particulier selon l'eidr
     * @param eidr, l'identifiant unique du produit
     * @return le produit contanant l'eidr voulu
     */
    @GetMapping(value = "/produits/{eidr}", produces = {"application/json"})
    Produit getProduit(@PathVariable int eidr){
        logger.info("****Obtention du produit " + eidr);
        return produitRepository.findFirstByEidr(eidr);
    }

    /**
     * Permet de retourner la liste de sous catégorie de produit
     * @return la liste de sous catégorie de produit
     */
    @GetMapping(value = "/produits/souscategorie", produces = {"application/json"})
    Collection<EnumSousCategorie> listAllSousCategories(){
        logger.info("****Obtention des sous categories");
        return Arrays.asList(EnumSousCategorie.values());
    }

    /**
     * Permet d'ajouter un produit en BD
     * @param produit le produit à ajouter
     * @return l'eidr du produit ajouter
     * @throws ProduitInformationInvalidException
     */
    @PostMapping("/produits/post")
    int ajouteProduits(@RequestBody Produit produit) throws ProduitInformationInvalidException {
        logger.info("****Ajouter un produit " + produit);
        int EIDR = -1;
        String message = produitValidateur.validateProduit(produit);
        if (message.equals("")) {
            EIDR = produitRepository.save(produit).getEidr();
            logger.info("**le nouvel EIDR est : " + EIDR);
        } else {
            throw new ProduitInformationInvalidException(message);
        }
        return EIDR;
    }

    /**
     * Permet de modifier un produit en BD
     * @param newProduit le produit a modifier
     * @return le produit modifier
     * @throws ProduitInformationInvalidException
     */
    @PutMapping("/produits/put")
    Produit updateProduit(@RequestBody Produit newProduit) throws ProduitInformationInvalidException {

        logger.info("****Updater un produit " + newProduit.getEidr());
        Produit retProduit = null;
        String message = produitValidateur.validateProduit(newProduit);
        if (message.equals("")) {
            retProduit = produitRepository.findFirstByEidr(newProduit.getEidr());
            retProduit.setDateSortie(newProduit.getDateSortie());
            retProduit.setRealisateur(newProduit.getRealisateur());
            retProduit.setGenre(newProduit.getGenre());
            retProduit.setDureeMinute(newProduit.getDureeMinute());
            retProduit.setPaysOrigine(newProduit.getPaysOrigine());
            retProduit.setAfficheSrc(newProduit.getAfficheSrc());
            produitRepository.save(retProduit);
        }
        else{
            throw new ProduitInformationInvalidException(message);
        }

        return retProduit;
    }

    /**
     * Permet de supprimer un produit selon son eidr
     * @param eidr l'identifiant unique du produit à supprimer
     * @throws ProduitNonTrouveException
     */
    @DeleteMapping("/produits/delete/{eidr}")
    void deleteProduit(@PathVariable int eidr) throws ProduitNonTrouveException {
        logger.info("**** Suppression d'un produit " + eidr);
        Produit produit = produitRepository.findFirstByEidr(eidr);
        if(produit != null){
            produitRepository.deleteById(produit.getId());
        }
        else{
            logger.warn("l'EIDR' demandé n'existe pas");
            throw new ProduitNonTrouveException("Produit n'existe pas");
        }
    }

    @Override
    public void run(String... args) throws Exception {

        logger.info("*******Démarage de la Backend Produit********");

        //Ajout des produits de base en BD s'ils ont été supprimé
        if(produitRepository.findFirstByEidr(1) == null){
            produitRepository.save(Produit.builder()
                    .eidr(1)
                    .nom("Mean Girls")
                    .dateSortie(LocalDate.of(2004, 4,30))
                    .realisateur("Mark Waters")
                    .genre(EnumSousCategorie.COMEDIE)
                    .dureeMinute(97)
                    .paysOrigine("États-Unis")
                    .afficheSrc("https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2023/08/03140532/2ZkuQXvVhh45uSvkBej4S7Ix1NJ-scaled.jpg")
                    .build());
            logger.info("****Le film 1 à été réinitialisé en BD***");
        }
        if(produitRepository.findFirstByEidr(2) == null){
            produitRepository.save(Produit.builder()
                    .eidr(2)
                    .nom("The secret life of Walter Mitty")
                    .dateSortie(LocalDate.of(2013, 12,25))
                    .realisateur("Ben Stiller")
                    .genre(EnumSousCategorie.AVENTURE)
                    .dureeMinute(114)
                    .paysOrigine("États-Unis")
                    .afficheSrc("https://musicart.xboxlive.com/7/c19d1100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080")
                    .build());
            logger.info("****Le film 2 à été réinitialisé en BD***");
        }
        if(produitRepository.findFirstByEidr(3) == null){
            produitRepository.save(Produit.builder()
                    .eidr(3)
                    .nom("Requiem for a dream")
                    .dateSortie(LocalDate.of(2000, 11,3))
                    .realisateur("Darren Aronofsky")
                    .genre(EnumSousCategorie.DRAME)
                    .dureeMinute(102)
                    .paysOrigine("États-Unis")
                    .afficheSrc("https://upload.wikimedia.org/wikipedia/en/3/39/Kronos_requiem.jpg")
                    .build());
            logger.info("****Le film 3 à été réinitialisé en BD***");
        }
        if(produitRepository.findFirstByEidr(4) == null){
            produitRepository.save(Produit.builder()
                    .eidr(4)
                    .nom("Eurovision Song Contest: The Story of Fire Saga")
                    .dateSortie(LocalDate.of(2020, 6,26))
                    .realisateur("David Dobkin")
                    .genre(EnumSousCategorie.COMEDIE)
                    .dureeMinute(123)
                    .paysOrigine("États-Unis")
                    .afficheSrc("https://images.immediate.co.uk/production/volatile/sites/3/2020/06/eurovision-movie-93d009c.jpg")
                    .build());
            logger.info("****Le film 4 à été réinitialisé en BD***");
        }
        if(produitRepository.findFirstByEidr(5) == null){
            produitRepository.save(Produit.builder()
                    .eidr(5)
                    .nom("Das Cabinet des Dr. Caligari")
                    .dateSortie(LocalDate.of(1920, 2,26))
                    .realisateur("Robert Wiene")
                    .genre(EnumSousCategorie.HORREUR)
                    .dureeMinute(67)
                    .paysOrigine("Allemagne")
                    .afficheSrc("https://upload.wikimedia.org/wikipedia/en/2/2f/The_Cabinet_of_Dr._Caligari_poster.jpg")
                    .build());
            logger.info("****Le film 5 à été réinitialisé en BD***");
        }
        if(produitRepository.findFirstByEidr(6) == null){
            produitRepository.save(Produit.builder()
                    .eidr(6)
                    .nom("Bronenossets «Potiomkine»")
                    .dateSortie(LocalDate.of(1925, 12,21))
                    .realisateur("Sergueï Eisenstein")
                    .genre(EnumSousCategorie.GUERRE)
                    .dureeMinute(74)
                    .paysOrigine("Union soviétique")
                    .afficheSrc( "https://resizing.flixster.com/YFgZQ3FIJ3xCaiwhbzfQHmU7M_E=/206x305/v2/https://resizing.flixster.com/jrE1djRZ-qnITwyr6QCY2mXCLS8=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzY5YzA5NjAxLTNmMmYtNGI1OS1hNDZjLTVkNDI3YTkwOWNjMi5qcGc=")
                    .build());
            logger.info("****Le film 6 à été réinitialisé en BD***");
        }
        if(produitRepository.findFirstByEidr(7) == null){
            produitRepository.save(Produit.builder()
                    .eidr(7)
                    .nom("Le Fabuleux Destin d'Amélie Poulain")
                    .dateSortie(LocalDate.of(2001, 4,25))
                    .realisateur("Jean-Pierre Jeunet")
                    .genre(EnumSousCategorie.COMEDIE)
                    .dureeMinute(122)
                    .paysOrigine("France")
                    .afficheSrc("https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg")
                    .build());
            logger.info("****Le film 7 à été réinitialisé en BD***");
        }
        if(produitRepository.findFirstByEidr(8) == null){
            produitRepository.save(Produit.builder()
                    .eidr(8)
                    .nom("La vita è bella")
                    .dateSortie(LocalDate.of(1997, 12,13))
                    .realisateur("Roberto Benigni")
                    .genre(EnumSousCategorie.DRAME)
                    .dureeMinute(116)
                    .paysOrigine("Italie")
                    .afficheSrc("https://festival-villerupt.com/ffi/uploads/2021/04/la-vita-e-bella.jpg")
                    .build());
            logger.info("****Le film 8 à été réinitialisé en BD***");

        }
        if(produitRepository.findFirstByEidr(9) == null){
            produitRepository.save(Produit.builder()
                    .eidr(9)
                    .nom("Get Out")
                    .dateSortie(LocalDate.of(2017, 2,24))
                    .realisateur("Jordan Peele")
                    .genre(EnumSousCategorie.HORREUR)
                    .dureeMinute(104)
                    .paysOrigine("États-Unis")
                    .afficheSrc("https://videocentreville.com/wp-content/uploads/2022/01/Get-Out-DVD-a-vendre..jpg")
                    .build());
            logger.info("****Le film 9 à été réinitialisé en BD***");
        }
    }

    @ExceptionHandler(ProduitNonTrouveException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    Error handleProduitNotFound(ProduitNonTrouveException ex) {
        return new Error(ex.getMessage().toString());
    }
    @ExceptionHandler(ProduitInformationInvalidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    Error handleInvalidProduitInformation(ProduitInformationInvalidException ex) {
        return new Error(ex.getMessage().toString());
    }
}
