import { sha256, pbkdf2 } from "./encryption";

describe('encryption module', () => {
    it('should generate sha256 hashes', () => {
        expect(sha256('test')).toEqual('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
        expect(sha256('Hallo nog een test')).toEqual('153b6c3143bff7250a6b0974d03705f051195e254578fafcaf4ffe482438bbb2');
        expect(sha256('3()@JF)@J#')).toEqual('b2ebd1a99a4fe49c823bd9b4ffe2da73ebad6896fb19dfbf6f36e5c03657ac10');
    })

    it('should hash passwords', async (done) => {
        expect(await pbkdf2('salty', 'sterkwachtwoord38')).toEqual('93b79842b62b1b4be6d2a7d7145a36e9b03b0bb92394a65042ff9018847ef8509c45ef683e6fed39021cce480726b00de6cd650bd920f2408d3014ea6e322093')
        expect(await pbkdf2('Iets langere salt', 'FEW)(#@H9h032')).toEqual('3d6679172bf0ad424e9426f4e9d851cbf78cd0a231c83f1e497e07e237faa12239af6bdb11017b84756579493f9a24464b3169470e91be9446ae83ea394a525a')
        expect(await pbkdf2('bla', 'nog sterker wachtwoord 39')).toEqual('917b9e857e18213b44d90921717d86483710785f9e258a71dc0ee159241b8bef367c1ef0c12eb2443e611d35999f4f6ab9840652969cfe65f8e8017659b4c769')
        done();
    })
})