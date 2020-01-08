import configuration from "../configuration/configuration";
import { ConfigurationData } from "../configuration/interfaces";
import { generateJwt, validateJwt } from "./jwt";
import { UserInfo, AccessRights, TokenType } from "./interfaces";

const testConfig: ConfigurationData = {
    jwtSecret: 'bla',
    jwtDuration: 60,
}

const userInfo: UserInfo = {
    id: 'abc',
    email: 'test@test.nl',
    username: 'test',
    rights: AccessRights.Admin,
};

describe('jwt validation', () => {
    beforeAll(() => {
        configuration['configurationData'] = undefined;
        configuration.loadConfiguration(testConfig);
    });

    it('should be able to generate a JWT and then parse it', async (done) => {
        const jwt = await generateJwt(userInfo, TokenType.AccessToken);
        expect(jwt).toBeTruthy();
        const parsedAccessToken = await validateJwt(jwt);
        expect(parsedAccessToken.userInfo).toEqual(userInfo, 'should contain the same userinfo');
        expect(parsedAccessToken.type).toEqual(TokenType.AccessToken);
        try {
            await validateJwt(jwt, TokenType.RefreshToken);
            expect(false).toBe(true, 'Check should have failed becuase of an invalid token type')
        } catch (err) {
        }   
        done();
    })
});