package com.web.tp.critique.tp2famcvc.repository;

import com.web.tp.critique.tp2famcvc.model.Critique;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

public interface CritiqueRepository extends CrudRepository<Critique, Long> {
    Critique findFirstByEIDRAndDate(int EIDR, Date date);
}
