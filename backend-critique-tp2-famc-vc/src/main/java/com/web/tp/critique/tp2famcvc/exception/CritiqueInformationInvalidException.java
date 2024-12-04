package com.web.tp.critique.tp2famcvc.exception;

/**
 * Exception personnalisée pour signaler des informations de critique invalides.
 */
public class CritiqueInformationInvalidException extends RuntimeException {
    public CritiqueInformationInvalidException(String message) {
        super(message);
    }
}
