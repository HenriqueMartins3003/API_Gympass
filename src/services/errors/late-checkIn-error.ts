export class LateCheckInError extends Error {
    constructor(){
        super('Not possible to validate check-in after 20 minutes from creation!')
    }
}