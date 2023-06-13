export class UserModel {

    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public status: boolean,
        public last_login: string,
        public is_superuser: boolean
    ){}
}
