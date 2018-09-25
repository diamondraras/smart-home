export interface User {
    _id: string;
    phone?: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    admin?: boolean;
    profil: {
        _id: string,
        photoUrl?: string,
        name?: string,
        firstName?: string,
        pseudo?: string
    };
}
