export interface User {
    phone: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    admin: boolean;
    profil: {
        photoUrl: string,
        name: string,
        firstName: string,
        sex: string,
        age: number,
        pseudo: string
    };
}
