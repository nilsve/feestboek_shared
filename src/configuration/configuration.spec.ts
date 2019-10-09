import configuration from "./configuration";
import { ConfigurationData } from "./interfaces";

const config: ConfigurationData = {
    jwtSecret: 'test',
    jwtDuration: 60,
}

describe('Configuration settings', () => {
    beforeEach(() => {
        // Since this is a singleton class we need to reset it each time
        configuration['configurationData'] = undefined;
    })
    it('should load configuration settings', () => {
        configuration.loadConfiguration(config);

        expect(configuration.getConfiguration()).toEqual(config, 'It should have loaded the config');
    });

    it('should throw an error when you try to overwrite the configuration', () => {
        let errorThrown = false;
        configuration.loadConfiguration(config);
        try {
            configuration.loadConfiguration(config);
        } catch (err) {
            errorThrown = true;
        }

        expect(errorThrown).toBeTruthy('It shouldn\'t allow you to overwrite the config');
    });
});