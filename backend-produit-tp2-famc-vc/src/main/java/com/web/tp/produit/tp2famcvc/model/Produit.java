package com.web.tp.produit.tp2famcvc.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
@ToString
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(unique = true)
    @EqualsAndHashCode.Include
    private int eidr;

    @Column(unique = true)
    @EqualsAndHashCode.Include
    private String nom;

    private LocalDate dateSortie;
    private String realisateur;

    @Enumerated(EnumType.STRING)
    private EnumSousCategorie genre;

    private int dureeMinute;
    private String paysOrigine;
    private String afficheSrc;
}
