export interface MainData {
    img: any;
    name: string;
    price: string;
    description: string;
}

export const mainArray: MainData[] = [
    {
        img: require('../assets/menu/mexican-enchiladas.png'),
        name: "New Mexican red Chile Chicken enchiladas",
        price: "245,00",
        description: "Corn tortillas filled with shredded chicken, smothered in a rich New Mexican red chile sauce, topped with melted cheddar cheese and crema."
    },
]