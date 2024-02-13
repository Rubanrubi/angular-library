import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DexieService {

  private db!: Dexie;

  constructor() {
    this.initDatabase();
  }

  /**
   * Inits database
   */
  private initDatabase() {
    this.db = new Dexie('demo-db');
    this.db.version(1).stores({
      users: '++id, name, email' // Define your schema here
    });
  }

  /**
   * Adds user
   * @param user
   */
  async addUser(user: any) {
    await this.db.table('users').add(user);
  }

  /**
   * Gets user by email
   * @param email
   * @returns
   */
  async getUserByEmail(email: string) {
    return await this.db.table('users').where('email').equals(email).first();
  }

  /**
   * Updates user
   * @param userId
   * @param updatedUser
   */
  async updateUser(userId: number, updatedUser: any) {
    await this.db.table('users').update(userId, updatedUser);
  }

  /**
   * Deletes user
   * @param userId
   */
  async deleteUser(userId: number) {
    await this.db.table('users').delete(userId);
  }


}

