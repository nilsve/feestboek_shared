import * as crypto from 'crypto';

/*
  Returns sha256 hash of given object
*/
export function sha256(content: any): string {
    const hash = crypto.createHash("sha256")
      .update(content)
      .digest("hex")
    return hash
}

export function pbkdf2(salt: string, password: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(password, salt, 1000, 64, 'sha256', (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(derivedKey.toString('hex'))
      }
    });
  });
}
