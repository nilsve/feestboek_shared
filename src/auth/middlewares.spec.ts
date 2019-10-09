import { requireLogin } from "./middlewares";
import { ConfigurationData } from "../configuration/interfaces";
import configuration from "../configuration/configuration";

const testConfig: ConfigurationData = {
    jwtSecret: 'bla',
    jwtDuration: 60,
}

xdescribe('authentication middlewares', () => {
    beforeAll(() => {
        configuration['configurationData'] = undefined;
        configuration.loadConfiguration(testConfig);
    })
    it('', () => {
        //  requireLogin({
        //     headers: {
        //         authorization: ''
        //     }
        // })
    })
})