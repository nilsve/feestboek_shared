/*
    The JWT data
*/
export interface UserData {
    exp: number; // UTC date when token expires
    userInfo: UserInfo;
}

/*
    The user info
*/
export interface UserInfo {
    id: string;
    username: string;
    email: string;
    rights: AccessRights;
}

export enum AccessRights {
    NormalUser = 'normal',
    Admin = 'admin',
}