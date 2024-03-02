import { Account, Client, ID } from "appwrite"
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.endpoint)
      .setProject(config.projectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) return this.login({ email, password });
      else return userAccount;
    } catch (error) {
      throw {
        file: 'auth.js',
        function: 'createAccount',
        error
      };
    }
  }

  async login({ email, password }) {
    try {
      await this.account.createEmailSession(email, password);
      return true;
    } catch (error) {
      throw {
        file: 'auth.js',
        function: 'login',
        error
      };
    }
  }

  async getUser() {
    try {
      const user = await this.account.get();
      if (user) return user;
      return null;
    } catch (error) {
      throw {
        file: 'auth.js',
        function: 'getUser',
        error
      };
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw {
        file: 'auth.js',
        function: 'logout',
        error
      };
    }
  }

}

const authService = new AuthService();
export default authService;