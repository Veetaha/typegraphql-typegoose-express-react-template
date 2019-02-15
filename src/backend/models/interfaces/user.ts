import * as Mongoose from 'mongoose';

export interface UserData {
    login:     string;
    password:  string;
    init_date: Date;
}

export interface UserMethods {
    
}

export interface UserStatics {
    
}

export interface UserDoc extends 
Mongoose.Document, 
UserData, 
UserMethods 
{}
export interface UserModel extends 
UserStatics,
Mongoose.Model<UserDoc>
{}