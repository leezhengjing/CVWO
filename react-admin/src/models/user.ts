import { Role } from "./role";

export class User {
    constructor(
        public id = 0,
        public first_name = '',
        public last_name = '',
        public email = '',
        public role = new Role()
    ) {
    }

    get name() {
        return this.first_name + ' ' + this.last_name;
    }
    // for my learning, the get turns the name() function to act like a property of the class. i.e. user.name instead of user.name()
}