export type AdType = {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    picture: string;
    owner: string;
    category: CategoryType | CategoryHeaderType;
    createdAt: string;
    tags?: TagType[];
};

export type CategoryType = {
    id: number;
    name: string;
    ads: AdType[];
};

export type CategoryHeaderType = {
    id: number;
    name: string;
};


export type TagType = {
    id: number;
    name: string;
};

