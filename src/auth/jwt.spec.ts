import configuration from "../configuration/configuration";
import { ConfigurationData } from "../configuration/interfaces";
import { generateJwt, validateJwt } from "./jwt";
import { UserInfo, AccessRights } from "./interfaces";

const testConfig: ConfigurationData = {
    jwtSecret: 'bla',
    jwtDuration: 60,
}

const userInfo: UserInfo = {
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
        const jwt = await generateJwt(userInfo);
        expect(jwt).toBeTruthy();
        const parsedUserInfo = await validateJwt(jwt);
        expect(parsedUserInfo).toEqual(userInfo, 'should contain the same information');
        done();
    })
});