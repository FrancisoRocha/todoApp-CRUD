import { v4 as uuidv4 } from 'uuid';

/**
 * @param {string} description - The description of the Todo item
 */

export class Todo{

    constructor( descriptio ){
        this.id = uuidv4();
        this.descriptio = descriptio;
        this.done = false;
        this.createAt = new Date();
    }

}
