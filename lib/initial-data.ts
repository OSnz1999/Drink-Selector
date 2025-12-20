import { AppData } from "./types";

export const INITIAL_DATA: AppData = {
    categories: [
        { id: "bourbon", name: "Bourbon" },
        { id: "whisky", name: "Whisky" },
        { id: "gin", name: "Gin" },
        { id: "vodka", name: "Vodka" },
        { id: "rum", name: "Rum" },
        { id: "beer", name: "Beer" },
        { id: "wine", name: "Wine" },
    ],
    mixers: [
        { id: "cola", name: "Cola" },
        { id: "coke-zero", name: "Coke Zero" },
        { id: "lemonade", name: "Lemonade" },
        { id: "tonic", name: "Tonic" },
        { id: "soda", name: "Soda water" },
        { id: "ginger-ale", name: "Ginger ale" },
        { id: "ginger-beer", name: "Ginger beer" },
        { id: "oj", name: "Orange juice" },
        { id: "sparkling", name: "Sparkling water" },
        { id: "neat", name: "No mixer / neat" },
        { id: "water", name: "Water" },
    ],
    drinks: [
        {
            id: "jd",
            name: "Jack Daniel's",
            categoryId: "bourbon",
            image: "",
            mixerIds: ["cola", "coke-zero", "ginger-ale", "soda", "neat"],
        },
        {
            id: "bombay",
            name: "Bombay Sapphire",
            categoryId: "gin",
            image: "",
            mixerIds: ["tonic", "lemonade", "soda", "neat"],
        },
        {
            id: "grey-goose",
            name: "Grey Goose",
            categoryId: "vodka",
            image: "",
            mixerIds: ["soda", "lemonade", "oj", "neat"],
        },
        {
            id: "bacardi",
            name: "Bacardi Superior",
            categoryId: "rum",
            image: "",
            mixerIds: ["cola", "coke-zero", "oj", "ginger-beer"],
        }
    ],
    nonAlcoholicMixerIds: ["cola", "coke-zero", "lemonade", "ginger-beer", "oj", "sparkling", "water"],
    events: [
        { id: "wedding", name: "Wedding Party", date: new Date().toISOString().split('T')[0] },
        { id: "tasting", name: "Whisky Tasting", date: new Date(Date.now() + 86400000).toISOString().split('T')[0] }
    ],
    bookings: []
};
