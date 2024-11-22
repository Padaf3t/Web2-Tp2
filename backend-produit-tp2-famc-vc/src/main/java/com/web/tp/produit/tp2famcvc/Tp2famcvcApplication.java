package com.web.tp.produit.tp2famcvc;

import com.web.tp.produit.tp2famcvc.verification.ProduitValidateur;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Tp2famcvcApplication {

	public static void main(String[] args) {
		SpringApplication.run(Tp2famcvcApplication.class, args);
	}

	@Bean
	ProduitValidateur getValidateurProduit(){
		return new ProduitValidateur();
	}

}
