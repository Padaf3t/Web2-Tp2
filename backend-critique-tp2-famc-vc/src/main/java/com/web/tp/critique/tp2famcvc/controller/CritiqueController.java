package com.web.tp.critique.tp2famcvc.controller;

import com.web.tp.critique.tp2famcvc.exception.CritiqueInformationInvalidException;
import com.web.tp.critique.tp2famcvc.model.Critique;
import com.web.tp.critique.tp2famcvc.repository.CritiqueRepository;
import com.web.tp.critique.tp2famcvc.validation.CritiqueValidateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Collection;
import java.util.Date;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CritiqueController implements CommandLineRunner {

    private Logger logger = LoggerFactory.getLogger(CritiqueController.class);

    @Autowired
    private CritiqueRepository critiqueRepository;

    @Autowired
    CritiqueValidateur critiqueValidateur;

    @Override
    public void run(String... args) throws Exception {

        logger.info("********** Ajout des critiques à la BD **********");

        if (critiqueRepository.findFirstByEidrAndDate(1, new Date(2001, Calendar.JANUARY, 1)) == null) {
            Critique critique1 = Critique
                    .builder()
                    .date(new Date(2001, Calendar.JANUARY, 1))
                    .eidr(1)
                    .qualiteVisuelle(90)
                    .qualiteSonore(88)
                    .appreciation(92)
                    .build();
            critiqueRepository.save(critique1);
            logger.info("*** La critique 1 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(1, new Date(2001, Calendar.JANUARY, 2)) == null) {
            Critique critique2 = Critique
                    .builder()
                    .date(new Date(2001, Calendar.JANUARY, 2))
                    .eidr(1)
                    .qualiteVisuelle(95)
                    .qualiteSonore(95)
                    .appreciation(95)
                    .build();
            critiqueRepository.save(critique2);
            logger.info("*** La critique 2 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(2, new Date(2002, Calendar.JANUARY, 1)) == null) {
            Critique critique3 = Critique
                    .builder()
                    .date(new Date(2002, Calendar.JANUARY, 1))
                    .eidr(2)
                    .qualiteVisuelle(80)
                    .qualiteSonore(85)
                    .appreciation(90)
                    .build();
            critiqueRepository.save(critique3);
            logger.info("*** La critique 3 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(2, new Date(2002, Calendar.JANUARY, 2)) == null) {
            Critique critique4 = Critique
                    .builder()
                    .date(new Date(2002, Calendar.JANUARY, 2))
                    .eidr(2)
                    .qualiteVisuelle(95)
                    .qualiteSonore(95)
                    .appreciation(95)
                    .build();
            critiqueRepository.save(critique4);
            logger.info("*** La critique 4 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(3, new Date(2003, Calendar.JANUARY, 1)) == null) {
            Critique critique5 = Critique
                    .builder()
                    .date(new Date(2003, Calendar.JANUARY, 1))
                    .eidr(3)
                    .qualiteVisuelle(30)
                    .qualiteSonore(90)
                    .appreciation(60)
                    .build();
            critiqueRepository.save(critique5);
            logger.info("*** La critique 5 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(3, new Date(2003, Calendar.JANUARY, 2)) == null) {
            Critique critique6 = Critique
                    .builder()
                    .date(new Date(2003, Calendar.JANUARY, 2))
                    .eidr(3)
                    .qualiteVisuelle(100)
                    .qualiteSonore(50)
                    .appreciation(75)
                    .build();
            critiqueRepository.save(critique6);
            logger.info("*** La critique 6 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(4, new Date(2004, Calendar.JANUARY, 1)) == null) {
            Critique critique7 = Critique
                    .builder()
                    .date(new Date(2004, Calendar.JANUARY, 1))
                    .eidr(4)
                    .qualiteVisuelle(75)
                    .qualiteSonore(70)
                    .appreciation(80)
                    .build();
            critiqueRepository.save(critique7);
            logger.info("*** La critique 7 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(4, new Date(2004, Calendar.JANUARY, 2)) == null) {
            Critique critique8 = Critique
                    .builder()
                    .date(new Date(2004, Calendar.JANUARY, 2))
                    .eidr(4)
                    .qualiteVisuelle(80)
                    .qualiteSonore(80)
                    .appreciation(80)
                    .build();
            critiqueRepository.save(critique8);
            logger.info("*** La critique 8 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(5, new Date(2005, Calendar.JANUARY, 1)) == null) {
            Critique critique9 = Critique
                    .builder()
                    .date(new Date(2005, Calendar.JANUARY, 1))
                    .eidr(5)
                    .qualiteVisuelle(79)
                    .qualiteSonore(79)
                    .appreciation(79)
                    .build();
            critiqueRepository.save(critique9);
            logger.info("*** La critique 9 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(5, new Date(2005, Calendar.JANUARY, 2)) == null) {
            Critique critique10 = Critique
                    .builder()
                    .date(new Date(2005, Calendar.JANUARY, 2))
                    .eidr(5)
                    .qualiteVisuelle(80)
                    .qualiteSonore(90)
                    .appreciation(100)
                    .build();
            critiqueRepository.save(critique10);
            logger.info("*** La critique 10 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(6, new Date(2006, Calendar.JANUARY, 1)) == null) {
            Critique critique11 = Critique
                    .builder()
                    .date(new Date(2006, Calendar.JANUARY, 1))
                    .eidr(6)
                    .qualiteVisuelle(50)
                    .qualiteSonore(50)
                    .appreciation(80)
                    .build();
            critiqueRepository.save(critique11);
            logger.info("*** La critique 11 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(6, new Date(2006, Calendar.JANUARY, 2)) == null) {
            Critique critique12 = Critique
                    .builder()
                    .date(new Date(2006, Calendar.JANUARY, 2))
                    .eidr(6)
                    .qualiteVisuelle(60)
                    .qualiteSonore(56)
                    .appreciation(85)
                    .build();
            critiqueRepository.save(critique12);
            logger.info("*** La critique 12 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(6, new Date(2006, Calendar.JANUARY, 3)) == null) {
            Critique critique13 = Critique
                    .builder()
                    .date(new Date(2006, Calendar.JANUARY, 3))
                    .eidr(6)
                    .qualiteVisuelle(100)
                    .qualiteSonore(90)
                    .appreciation(95)
                    .build();
            critiqueRepository.save(critique13);
            logger.info("*** La critique 13 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(7, new Date(2007, Calendar.JANUARY, 1)) == null) {
            Critique critique14 = Critique
                    .builder()
                    .date(new Date(2007, Calendar.JANUARY, 1))
                    .eidr(7)
                    .qualiteVisuelle(60)
                    .qualiteSonore(50)
                    .appreciation(70)
                    .build();
            critiqueRepository.save(critique14);
            logger.info("*** La critique 14 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(7, new Date(2007, Calendar.JANUARY, 2)) == null) {
            Critique critique15 = Critique
                    .builder()
                    .date(new Date(2007, Calendar.JANUARY, 2))
                    .eidr(7)
                    .qualiteVisuelle(83)
                    .qualiteSonore(83)
                    .appreciation(83)
                    .build();
            critiqueRepository.save(critique15);
            logger.info("*** La critique 15 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(8, new Date(2008, Calendar.JANUARY, 1)) == null) {
            Critique critique16 = Critique
                    .builder()
                    .date(new Date(2008, Calendar.JANUARY, 1))
                    .eidr(8)
                    .qualiteVisuelle(80)
                    .qualiteSonore(84)
                    .appreciation(82)
                    .build();
            critiqueRepository.save(critique16);
            logger.info("*** La critique 16 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(8, new Date(2008, Calendar.JANUARY, 2)) == null) {
            Critique critique17 = Critique
                    .builder()
                    .date(new Date(2008, Calendar.JANUARY, 2))
                    .eidr(8)
                    .qualiteVisuelle(89)
                    .qualiteSonore(79)
                    .appreciation(84)
                    .build();
            critiqueRepository.save(critique17);
            logger.info("*** La critique 17 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(9, new Date(2009, Calendar.JANUARY, 1)) == null) {
            Critique critique18 = Critique
                    .builder()
                    .date(new Date(2009, Calendar.JANUARY, 1))
                    .eidr(9)
                    .qualiteVisuelle(82)
                    .qualiteSonore(80)
                    .appreciation(78)
                    .build();
            critiqueRepository.save(critique18);
            logger.info("*** La critique 18 a été ajoutée à la BD ***");
        }

        if (critiqueRepository.findFirstByEidrAndDate(9, new Date(2009, Calendar.JANUARY, 2)) == null) {
            Critique critique19 = Critique
                    .builder()
                    .date(new Date(2009, Calendar.JANUARY, 2))
                    .eidr(9)
                    .qualiteVisuelle(81)
                    .qualiteSonore(79)
                    .appreciation(77)
                    .build();
            critiqueRepository.save(critique19);
            logger.info("*** La critique 19 a été ajoutée à la BD ***");
        }
    }

    @GetMapping(value = "/critiques", produces = {"application/json"})
    public Collection<Critique> listAllCritiques() {
        logger.info("********** Appel de listAllCritiques **********");
        //Thread.sleep(0);
        return (Collection<Critique>) critiqueRepository.findAll();
    }

    @PostMapping("critique/post")
    public void ajouteCritique(@RequestBody Critique critique) {
        logger.info("********** Appel de ajouteCritique **********" + critique.getEidr());
        String message = critiqueValidateur.validateCritique(critique);
        if (message.equals("")) {
            long id = critiqueRepository.save(critique).getId();
            logger.info("*** Critique" + id + " sauvegardée ***");
        }
        else {
            throw new CritiqueInformationInvalidException(message);
        }
    }

}
