import { Injectable } from '@angular/core';
import { ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { FirestoreId } from './app.beans';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private toastController: ToastController, private modalController: ModalController) { }

  stripFirestoreId<T extends FirestoreId>(item: T): T {
    const itemCopy = Object.assign({}, item);
    delete itemCopy.id;
    return itemCopy;
  }

  async getModalPresentingElement(): Promise<HTMLIonModalElement> {
    return this.modalController.getTop();
  }

  async presentToast(options: ToastOptions) {
    const toast = await this.toastController.create(options);
    await toast.present();
  }

  async presentModal(options: ModalOptions) {
    const modal = await this.modalController.create(options);
    await modal.present();
  }
}
