package com.web.tp.critique.tp2famcvc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

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
    private Date date;
    private int EIDR;
    private int qualiteVisuelle;
    private int qualiteSonore;
    private int appreciation;

    public double getMoyenne() {
        return (double)(getAppreciation()+getQualiteSonore()+getQualiteVisuelle())/3;
    }
}
