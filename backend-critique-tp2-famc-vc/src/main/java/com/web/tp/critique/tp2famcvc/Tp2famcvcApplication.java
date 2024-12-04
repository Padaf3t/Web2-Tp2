package com.web.tp.critique.tp2famcvc;

import com.web.tp.critique.tp2famcvc.validation.CritiqueValidateur;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * Classe principale et point d'entrée de l'application Spring Boot "tp2famcvc".
 */
@SpringBootApplication
public class Tp2famcvcApplication {

	/**
	 * Point d'entrée.
	 *
	 * @param args Les arguments de ligne de commande.
	 */
	public static void main(String[] args) {
		SpringApplication.run(Tp2famcvcApplication.class, args);
	}

	/**
	 * Méthode de configuration Spring qui crée et retourne un bean utilisé pour la validation des critiques.
	 *
	 * @return Une instance de la classe CritiqueValidateur.
	 */
	@Bean
	CritiqueValidateur getCritiqueValidateur(){
		return new CritiqueValidateur();
	}

}
