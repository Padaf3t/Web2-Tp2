package com.web.tp.produit.tp2famcvc.repository;

import com.web.tp.produit.tp2famcvc.model.Produit;
import org.springframework.data.repository.CrudRepository;

public interface ProduitRepository extends CrudRepository<Produit, Long> {
    Produit findFirstByEidr(int EIDR);
}
