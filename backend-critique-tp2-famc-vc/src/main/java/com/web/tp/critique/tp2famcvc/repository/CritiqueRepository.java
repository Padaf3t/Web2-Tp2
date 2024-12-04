package com.web.tp.critique.tp2famcvc.repository;

import com.web.tp.critique.tp2famcvc.model.Critique;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

/**
 * Interface fournissant des méthodes personnalisées pour obtenir des informations sur les critiques
 */
public interface CritiqueRepository extends CrudRepository<Critique, Long> {
    Critique findFirstByEidrAndDate(int eidr, LocalDate date);
    List<Critique> findAllByEidr(int eidr);
}
