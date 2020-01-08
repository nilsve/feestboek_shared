/*
    The JWT data
*/
export enum TokenType {
    RefreshToken = 'REFRESH_TOKEN',
    AccessToken = 'ACCESS_TOKEN',
}

export interface UserToken {
    type: TokenType;
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