class User{
    public id: string;
	public username: string;
    public password: string;
    public email: string;

	constructor( id:string, username: string, password: string, email:string ){
        this.id = id;
		this.username = username;
        this.password = password;
        this.email = email;
	}

    // public toJSON(){
    //     return {'id': this.id, 'username': this.username, 'password':this.password, 'email':this.email};
    // }

    public isAdmin(user){
        return false;
    }
}

class Item{
    public id: string;
    public title: string;
    public code: string;
    public description: string;
    public price: number;
    public owner: User;

    constructor( id:string, title: string, code: string, description:string, price:number, owner:User ){
        this.id = id;
        this.title = title;
        this.code = code;
        this.description = description;
        this.price = price;
        this.owner = owner;
    }

    // public toJSON(){
    //     return {'id': this.id, 'title': this.title, 'code':this.code, 'description':this.description, 'price':this.price};
    // }
}

class Offer{
    public id: string;
    public price: number;
    public created: string;
    public item: Item;
    public buyer: User;

    constructor( id:string, price:number, created: string, item: Item, buyer: User ){
        this.id = id;
        this.price = price;
        this.created = created;
        this.item = item;
        this.buyer = buyer;
    }

    // public toJSON(){
    //     return {'id': this.id, 'username': this.username, 'password':this.password, 'email':this.email};
    // }
}
// class Permission {
//     public id: string;
//     public reviewer: User;
//     public employee: User;
//     public allow: boolean;

//     constructor(id: string, reviewer: User, employee: User, allow: boolean) {
//         this.id = id;
//         this.reviewer = reviewer;
//         this.employee = employee;
//         this.allow = allow;
//     }
//     public toDBO(){
//         return {'id': this.id, 'reviewerID': this.reviewer.id, 'employeeID':this.employee.id, 'allow':this.allow};
//     }
// }

// class Review {
//     public id: string;
//     public reviewer: User;
//     public employee: User;
//     public note: string;
//     public rating: number;
//     public completed: boolean;

//     constructor(id: string, reviewer: User, employee: User, note:string, rating:number, completed: boolean) {
//         this.id = id;
//         this.reviewer = reviewer;
//         this.employee = employee;
//         this.note = note;
//         this.rating = rating;
//         this.completed = completed;
//     }

//     public toDBO(){
//         return {'id': this.id, 'reviewerID': this.reviewer.id, 'employeeID':this.employee.id, 'note':this.note, 'rating':this.rating, 'completed':this.completed};
//     }
// }


// class Feedback {
//     public id: string;
//     public reviewer: User;
//     public employee: User;
//     public note: string;

//     constructor(id: string, reviewer: User, employee: User, note:string) {
//         this.id = id;
//         this.reviewer = reviewer;
//         this.employee = employee;
//         this.note = note;
//     }

//     public toDBO(){
//         return {'id': this.id, 'reviewerID': this.reviewer.id, 'employeeID':this.employee.id, 'note':this.note};
//     }
// }
