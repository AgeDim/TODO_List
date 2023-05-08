package com.example.backtodo.entity;

public enum Priority {
    HIGH("High"),
    MEDIUM("Medium"),
    LOW("Low");

    public String getPriority() {
        return priority;
    }

    private String priority;

    Priority(String priority){
        this.priority = priority;
    }
}
