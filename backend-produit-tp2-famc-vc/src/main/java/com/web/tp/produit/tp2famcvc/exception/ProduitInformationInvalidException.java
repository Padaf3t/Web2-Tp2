package com.web.tp.produit.tp2famcvc.exception;

/**
 * Exception concernant la validite des informations pour la creation ou modification d'un produit
 */
public class ProduitInformationInvalidException extends RuntimeException{
    public ProduitInformationInvalidException(String message){super(message);}
}
