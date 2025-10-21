export interface DessertData {
    img: any;
    name: string;
    price: string;
    description: string;
}

export const dessertArray: DessertData[] = [
    {
        img: require('../assets/menu/chocolate-cake.png'),
        name: "Chocolate Espresso layer cake with Chili ganache",
        price: "95,00",
        description: "Rich chocolate cake layers infused with espresso, layered with a spicy chili ganache and frosted with whipped cream."
    },
]