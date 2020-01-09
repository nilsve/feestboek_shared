import { requireLogin, getJwtFromBearer } from "./middlewares";
import { ConfigurationData } from "../configuration/interfaces";
import configuration from "../configuration/configuration";

const testConfig: ConfigurationData = {
    jwtSecret: 'bla',
    refreshTokenValidDuration: 60,
    accessTokenValidDuration: 60,
}

describe('authentication middlewares', () => {
    beforeAll(() => {
        configuration['configurationData'] = undefined;
        configuration.loadConfiguration(testConfig);
    })
    it('can get bearer token from jwt', () => {
        const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDE1NzUwMjUsInVzZXJJbmZvIjp7InVzZXJuYW1lIjoidGVzdDJAcGt2aXN1YWwubmwiLCJlbWFpbCI6IiIsInJpZ2h0cyI6Im5vcm1hbCJ9LCJpYXQiOjE1NzI1NDQ2MjV9.GEnsN9MOy6qA_PbxwUJ3-HWY_j4BEJu2uvDykW5vPB4';
        expect(getJwtFromBearer(`Bearer ${jwt}`)).toEqual(jwt);
    })
})