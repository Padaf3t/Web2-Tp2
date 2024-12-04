package com.web.tp.produit.tp2famcvc.verification;

import com.web.tp.produit.tp2famcvc.model.Produit;

import java.time.LocalDate;

/**
 * Sert à la validation des paramètre d'un produit
 */
public class ProduitValidateur {

    public String validateProduit(Produit produit) {
        String messageErreur = "";

        if(produit == null){
            messageErreur = "Produit null";
        }
        else{
            if(!validerStringsRemplies(produit.getNom(),produit.getRealisateur(),produit.getPaysOrigine(),produit.getAfficheSrc())){
                messageErreur += "Champs non remplis";
            }
            if(!validerLongueurMaxString(256, produit.getNom(),produit.getRealisateur(),produit.getPaysOrigine(),produit.getAfficheSrc())){
                messageErreur += "Champs trop long";
            }
            if(!validerNombrePositif(produit.getEidr(), produit.getDureeMinute())){
                messageErreur += "Champs doivent être positif";
            }
            if(!validateDate(produit.getDateSortie())){
                messageErreur += "Date doit être aujourd'hui ou dans le passé";
            }
        }

        return messageErreur;

    }

    private boolean validerNombrePositif(double... listeItems) {
        for (double item : listeItems) {
            if (item < 0) {
                return false;
            }
        }
        return true;
    }

    private boolean validerStringsRemplies(String... listeItems) {
        for (String item : listeItems) {
            if (item == null || item.trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    private boolean validerLongueurMaxString(int longueurMax, String... listeItems) {
        for (String item : listeItems) {
            if (item != null && item.length() > longueurMax) {
                return false;
            }
        }
        return true;
    }

    private boolean validateDate(LocalDate date) {
        LocalDate today = LocalDate.now();
        return date != null && (date.isEqual(today) || date.isBefore(today));
    }


}
