package com.web.tp.critique.tp2famcvc.validation;

import com.web.tp.critique.tp2famcvc.model.Critique;

import java.util.Date;

public class CritiqueValidateur {

    public String validateCritique(Critique critique) {
        String message = "";

        if (validateNote(critique.getAppreciation())) {
            message += "La note d'appréciation doit être entre 0 et 100. ";
        }
        if (validateNote(critique.getQualiteSonore())) {
            message += "La note de qualité sonore doit être entre 0 et 100. ";
        }
        if (validateNote(critique.getQualiteVisuelle())) {
            message += "La note de qualité visuelle doit être entre 0 et 100. ";
        }
        if (validateDate(critique.getDate())) {
            message += "La date ne doit pas être nulle et elle doit être entre le 1er janvier 1970 et la date actuelle. ";
        }
        if (validateEIDR(critique.getEIDR())) {
            message += "L'EIDR doit être un nombre positif";
        }

        return message;
    }

    public boolean validateNote(int note) {
        return note >= 0 && note <= 100;
    }

    public boolean validateDate(Date date) {
        long epochTime = 0L;
        long currentTime = System.currentTimeMillis();

        return date != null && (date.getTime() >= epochTime || date.getTime() <= currentTime);
    }

    public boolean validateEIDR(int EIDR) {
        return EIDR >= 0;
    }
}
