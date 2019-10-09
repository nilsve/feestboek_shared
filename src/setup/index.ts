import { ConfigurationData } from "../configuration/interfaces";
import configuration from "../configuration/configuration";

/*
    Call this function at the start of the application. 
    It will load the configuration data which some of functionality requires.
*/
export function setupFeestboek(configurationData: ConfigurationData): void {
    configuration.loadConfiguration(configurationData);
}