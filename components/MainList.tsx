export interface MainData {
  id?: string;
  img?: string | number; // number for require(...), string for remote URI
  name: string;
  price: string;
  description: string;
}


export const mainArray: MainData[] = [
    {
        img: require('../assets/menu/mexican-enchiladas.png'),
        name: "New Mexican red Chile Chicken enchiladas",
        price: "245,00",
        description: "Corn tortillas filled with shredded chicken, smothered in a rich New Mexican red chile sauce, topped with melted cheddar cheese and crema.",
        id: "mexican-enchiladas-1"
    },
    {
        img: require('../assets/menu/grilled-steak.png'),
        name: "Cajun spicy Grilled Ribeye with bourbon butter",
        price: "243,00",
        description: "Char-grilled steak topped with bourbon butter and house-smoked herbs.",
        id: "grilled-steak-1"
    },
    {
        img: require('../assets/menu/tuna-tartare.png'),
        name: "Seared Tuna with Mango Habanero Sauce",
        price: "225,00",
        description: "Pan-seared tuna with spicy mango habanero glaze.",
        id: "seared-tuna-1"
    },
]