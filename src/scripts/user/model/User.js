export default class User {
    constructor(data = {}) {
        this.last_name = data.last_name || '',
        this.first_name = data.first_name || '',
        this.email = data.email || '',
        this.password = data.password || ''
        this.role = data.role || 'Editor'
    }

    constuct(data) {
        this.constructor(data);
    }
}