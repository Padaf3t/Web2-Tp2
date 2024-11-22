package com.web.tp.critique.tp2famcvc;

import com.web.tp.critique.tp2famcvc.validation.CritiqueValidateur;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Tp2famcvcApplication {

	public static void main(String[] args) {
		SpringApplication.run(Tp2famcvcApplication.class, args);
	}

	@Bean
	CritiqueValidateur getCritiqueValidateur(){
		return new CritiqueValidateur();
	}

}
