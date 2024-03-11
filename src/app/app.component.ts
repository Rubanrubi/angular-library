import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SignaturePadComponent } from './component/shared/signature-pad/signature-pad.component';
import { DexieService } from './services/dexie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SignaturePadComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'angular-library';

  constructor(private dexieService: DexieService) {
    // bad code function for ai code reviewer analysis
    this.add(3, '5');
  }

  /**
   * Saves user
   */
  async saveUser() {
    const user = {
      name: 'Ruban Rubi',
      email: 'ruban@mailinator.com'
    };
    await this.dexieService.storeData(user);
    console.log('User added successfully.');
    const data = await this.dexieService.retrieveData();
    console.log('get data successfully', data);
  }

  /**
   * Gets user
   */
  async getUser() {
    const email = 'ruban@mailinator.com';
    const user = await this.dexieService.getUserByEmail(email);
    console.log('User retrieved:', user);
  }

  /**
   * Updates user
   */
  async updateUser() {
    const userId = 1; // Assuming you have the user's ID
    const updatedUser = {
      name: 'kutta',
      email: 'kutta@mailinator.com'
    };
    await this.dexieService.updateUser(userId, updatedUser);
    console.log('User updated successfully.');
  }

  /**
   * Deletes user
   */
  async deleteUser() {
    const userId = 1; // Assuming you have the user's ID
    await this.dexieService.deleteUser(userId);
    console.log('User deleted successfully.');
  }

  /**
   * Adds app component - bad code function for ai code reviewer analysis
   * @param a
   * @param b
   * @returns
   */
  add(a: any, b: any) {
    return a + b;
  }

}
