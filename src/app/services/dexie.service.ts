import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class DexieService {

  private db!: Dexie;
  private key: string = '070997'
  private isProduction: boolean = true;

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

  /**
   * Encrypts data
   * @param data
   * @returns data
   */
  private encryptData(data: any): string {
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, this.key).toString();
    return encrypted;
  }

  /**
   * Decrypts data
   * @param encryptedData
   * @returns data
   */
  private decryptData(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.key);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
  }

  /**
   * Stores data
   * @param data
   */
  async storeData(data: any) {
    const encryptedData = this.isProduction ? this.encryptData(data) : JSON.stringify(data);
    await this.db.table('users').add({ encryptedData });
  }

  /**
   * Retrieves data
   * @returns
   */
  async retrieveData() {
    const storedData = await this.db.table('users').toArray();
    const decryptedData = storedData.map(item => this.isProduction ? this.decryptData(item.encryptedData) : JSON.parse(item.encryptedData));
    return decryptedData;
  }



}

