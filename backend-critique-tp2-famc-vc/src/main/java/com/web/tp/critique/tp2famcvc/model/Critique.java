package com.web.tp.critique.tp2famcvc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

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
//    @Builder.Default
//    private double moyenne = (double)(appreciation+qualiteSonore+qualiteVisuelle)/3;

//    public double getMoyenne() {
//        return (double)(getAppreciation()+getQualiteSonore()+getQualiteVisuelle())/3;
//    }

    public static double calculerMoyenne(int qualiteVisuelle, int qualiteSonore, int appreciation) {
        return (qualiteVisuelle + qualiteSonore + appreciation) / 3.0;
    }
}
