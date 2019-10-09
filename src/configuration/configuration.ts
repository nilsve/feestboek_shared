import { ConfigurationData } from "./interfaces";

/*
    Global configuration object...
    Not the best way to do this, but it works for this usecase.
    The limitation this imposes is that you can only have 1 configuration per app instance. Not a problem for us though.
*/
export class Configuration {
    private configurationData?: ConfigurationData;
    
    loadConfiguration(configurationData: ConfigurationData): void {
        if (this.configurationData) {
            throw new Error('Configuration has already been loaded!');
        }

        this.configurationData = configurationData;
    }

    getConfiguration(): ConfigurationData {
        if (this.configurationData) {
            return this.configurationData
        } else {
            throw new Error('Configuration data has not been loaded!');
        }
    }
}

export default new Configuration();