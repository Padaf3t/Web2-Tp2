package com.web.tp.produit.tp2famcvc.exception;

/**
 * Exception si le produit n'a pas été trouvé
 */
public class ProduitNonTrouveException extends RuntimeException {
    public ProduitNonTrouveException(String message) {
        super(message);
    }
}
