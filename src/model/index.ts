// enums
export enum UserRole{
    user="User",
    admin="Admin"
}
export enum UserStatus{
    active='Active',
    inActive='In Active'
}

// User Data Model
export interface UserModel{
    id:string;
    name:string;
    email:string;
    role:UserRole,
    status:UserStatus
}