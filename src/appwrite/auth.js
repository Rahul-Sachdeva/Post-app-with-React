import conf from '../conf/conf.js'
import {Client, Account, ID} from "appwrite"

/*
import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<PROJECT_ID>');                 // Your project ID

const account = new Account(client);

const user = await account.create(
    ID.unique(), 
    'email@example.com', 
    'password'
);
*/

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // Call Another Method // to Login
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password)
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            console.log("Client is: ",this.client);
            const user1 = await this.account.get();
            console.log(user1)
            return user1;
        }
        catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService(); 

// We created an object and then we will use it's methods later to perform required functionality

export default authService

