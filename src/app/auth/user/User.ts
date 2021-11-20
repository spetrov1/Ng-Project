

export class User {

    constructor(public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationTime: Date) {}

    get token() {
        // TODO check if it is okay
        if (new Date().getTime() > new Date().getTime() + this._tokenExpirationTime.getTime()) {
            return null;
        }
        return this._token;
    }
    
}