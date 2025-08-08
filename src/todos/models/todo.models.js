import { v4 as uuidv4 } from 'uuid';

/**
 * @param {string} description - The description of the Todo item
 */

export class Todo{

    constructor( description ){
        this.id = uuidv4();
        this.title = description;
        this.completed = false;
    }

}
