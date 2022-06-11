import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { FirestoreId } from './app.beans';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private toastController: ToastController) { }

  stripFirestoreId<T extends FirestoreId>(item: T): T {
    const itemCopy = Object.assign({}, item);
    delete itemCopy.id;
    return itemCopy;
  }

  async presentToast(options: ToastOptions) {
    const toast = await this.toastController.create(options);
    await toast.present();
  }
}
