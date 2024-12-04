package com.web.tp.critique.tp2famcvc.validation;

import com.web.tp.critique.tp2famcvc.model.Critique;

import java.time.LocalDate;
import java.util.Date;

/**
 * Classe qui fournit des méthodes pour valider les différentes propriétés d'une critique
 */
public class CritiqueValidateur {

    /**
     * Valide les différentes propriétés d'une critique
     *
     * @param critique La critique à valider.
     * @return Un message d'erreur si la critique n'est pas valide, sinon une chaîne vide.
     */
    public String validateCritique(Critique critique) {
        String message = "";

        if (!validateNote(critique.getAppreciation())) {
            message += "La note d'appréciation doit être entre 0 et 100. ";
        }
        if (!validateNote(critique.getQualiteSonore())) {
            message += "La note de qualité sonore doit être entre 0 et 100. ";
        }
        if (!validateNote(critique.getQualiteVisuelle())) {
            message += "La note de qualité visuelle doit être entre 0 et 100. ";
        }
        if (!validateDate(critique.getDate())) {
            message += "La date ne doit pas être nulle et elle doit être entre le 1er janvier 1970 et la date actuelle. ";
        }
        if (!validateEidr(critique.getEidr())) {
            message += "L'EIDR doit être un nombre positif";
        }

        return message;
    }

    /**
     * Valide qu'une note est comprise entre 0 et 100.
     *
     * @param note La note à valider.
     * @return true si la note est valide, false sinon.
     */
    private boolean validateNote(int note) {
        return note >= 0 && note <= 100;
    }

    /**
     * Valide qu'une date est valide (non nulle et antérieure ou égale à la date du jour).
     *
     * @param date La date à valider.
     * @return true si la date est valide, false sinon.
     */
    private boolean validateDate(LocalDate date) {
        LocalDate today = LocalDate.now();
        return date != null && (date.isEqual(today) || date.isBefore(today));
    }

    /**
     * Valide qu'un EIDR est positif.
     *
     * @param eidr L'EIDR à valider.
     * @return true si l'EIDR est positif, false sinon.
     */
    private boolean validateEidr(int eidr) {
        return eidr >= 0;
    }
}
