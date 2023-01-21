import { Post } from "./post";


// Default user values
export class Thread {
    constructor(
        public id: number,
        public name: String,
        public posts: Post[]
    ) {
    }
}
