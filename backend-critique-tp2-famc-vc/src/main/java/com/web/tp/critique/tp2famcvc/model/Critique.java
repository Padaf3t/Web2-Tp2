package com.web.tp.critique.tp2famcvc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

/**
 * Représente une critique faite pour un produit (film)
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
@ToString
public class Critique {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @EqualsAndHashCode.Include
    private long id;
    private LocalDate date;
    private int eidr;
    private int qualiteVisuelle;
    private int qualiteSonore;
    private int appreciation;
    private double moyenne = 0;

    /**
     * Calcule la moyenne des notes mises dans le cadre de la critique
     * (moyenne de qualité visuelle, qualité sonore et appréciation
     *
     * @param qualiteVisuelle : la qualité visuelle du film
     * @param qualiteSonore : la qualité sonore du film
     * @param appreciation : l'appréciation du film
     * @return la moyenne calculée
     */
    public static double calculerMoyenne(int qualiteVisuelle, int qualiteSonore, int appreciation) {
        return (qualiteVisuelle + qualiteSonore + appreciation) / 3.0;
    }
}
