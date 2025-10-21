export interface StarterData {
    img: string;
    name: string;
    price: string;
    description: string;
}

export const starterArray: StarterData[] = [
    {
        img: require('../assets/menu/slices-of-bread-with-salmon-and-avocad0.jpg'),
        name: "Crab and Avocado toast with pickled red onions",
        price: "115,00",
        description: "Fresh crab meat mixed with creamy avocado, served on toasted artisanal bread and topped with tangy pickled red onions."
    },
]