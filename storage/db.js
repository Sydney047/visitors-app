class Users {
    constructor() {
        this.storage = {};
        this.id = 0;
    }

    getUsers () {
        return Object.values( this.storage );
    }
    addUser( firstName, lastName, email, age, bio ) {
        this.storage = { ...this.storage, [ this.id ]: { id: this.id, firstName, lastName, email, age, bio } };
        this.id += 1;
    }
    updateUser ( id, firstName, lastName, email, age, bio ) {
        let users = {}
        Object.values( this.storage ).map( user => {
            if ( email === user.email ) {
                users = { ...users, [ id ]: { ...user, firstName, lastName, age: age } }
            } else users = { ...users, user }
        })
        this.storage = users
    }
    deleteUser ( userId, email ) {
        let id = null;
        Object.values( this.storage ).map( user => {
            if ( email === user.email && user.id === Number( userId ) ) {
                id = user.id;
            } 
        });
        delete this.storage[ id ];
        
    }
    searchUser ( searchValue ) {
        let searchResult = null;
        Object.values( this.storage ).map( user => {
            if ( searchValue === user.email ) {
                searchResult = user;
            } 
        });
        console.log( searchResult);
        return searchResult;
        
        
    }
}

module.exports = new Users();