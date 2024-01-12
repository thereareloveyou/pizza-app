export interface UserData {
    id: number,
    email: string,
    passwordHash: string,
    address: string,
    name: string,
    restoreToken: boolean,
    phone: string
}