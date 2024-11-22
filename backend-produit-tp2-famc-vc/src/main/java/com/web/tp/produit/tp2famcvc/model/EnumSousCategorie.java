package com.web.tp.produit.tp2famcvc.model;

public enum EnumSousCategorie {
    AVENTURE("Aventure"),
    COMEDIE("Comédie"),
    DRAME("Drame"),
    GUERRE("Guerre"),
    HORREUR("Horreur");

    private final String label;

    // Constructor to set the label for each enum constant
    EnumSousCategorie(String label) {
        this.label = label;
    }

    // Getter to retrieve the label of the enum constant
    public String getLabel() {
        return label;
    }
}
