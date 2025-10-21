export interface DessertData {
  id?: string;
  img?: string | number; // number for require(...), string for remote URI
  name: string;
  price: string;
  description: string;
}

export const dessertArray: DessertData[] = [
    {
        img: require('../assets/menu/chocolate-cake.png'),
        name: "Chocolate Espresso layer cake with Chili ganache",
        price: "95,00",
        description: "Rich chocolate cake layers infused with espresso, layered with a spicy chili ganache and frosted with whipped cream.",
        id: undefined
    },
    {
        img: require('../assets/menu/berry-crumb.png'),
        name: "Peach blueberry Crumble with cornmeal streusel",
        price: "85,00",
        description: "Warm fruit filling, crunchy topping, and vanilla ice cream.",
        id: undefined
    },
    {
        img: require('../assets/menu/Coconut-Pie.jpg'),
        name: "Coconut Cream Pie with Toasted Almond Crust",
        price: "90,00",
        description: "Creamy coconut filling, almond crust, and shaved coconut.",
        id: undefined
    },
]