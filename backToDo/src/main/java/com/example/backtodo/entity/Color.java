package com.example.backtodo.entity;

public enum Color {
    RED("Red"),
    BLUE("Blue"),
    GREEN("Green"),
    YELLOW("Yellow"),
    ORANGE("Orange"),
    VIOLET("Violet");

    public String getColor() {
        return color;
    }

    private String color;

    Color(String color){
        this.color = color;
    }
}
