export class userAlreadyExistsError extends Error{
    constructor() {
        super('Email already exists!')
    }
}