export interface StarterData {
  id?: string;
  img?: string | number;
  name: string;
  price: string;
  description: string;
}

export const starterArray: StarterData[] = [
    {
        img: require('../assets/menu/bread-with-salmon-and-avocado.png'),
        name: "Crab and Avocado toast with pickled red onions",
        price: "115,00",
        description: "Classic country bread, lump crab meat with creamy avocado, pickled onions, jalapeño, and arugula."
    },
    {
        img: require('../assets/menu/corn-chowder.png'),
        name: "Spicy roasted Corn and Queso fresco empanadas",
        price: "95,00",
        description: "These spicy fillings are sealed in corn dough, served with a fresh jalapeño cream."
    },
    {
        img: require('../assets/menu/tuna-tartare.png'),
        name: "Tuna Tartare with Soy-Lime Dressing",
        price: "135,00",
        description: "Diced tuna with soy-lime dressing, avocado, and sesame wedges."
    },
]
