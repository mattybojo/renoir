import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { ComponentInfo, FirestoreId } from './app.beans';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isLoading = false;

  constructor(private toastController: ToastController, private modalController: ModalController,
    private loadingController: LoadingController, private location: Location) { }

  stripFirestoreId<T extends FirestoreId>(item: T): T {
    const itemCopy = Object.assign({}, item);
    delete itemCopy.id;
    return itemCopy;
  }

  async getModalPresentingElement(): Promise<HTMLIonModalElement> {
    return this.modalController.getTop();
  }

  async presentToast(options: ToastOptions): Promise<void> {
    const toast = await this.toastController.create(options);
    await toast.present();
  }

  async presentModal(options: ModalOptions): Promise<void> {
    const modal = await this.modalController.create(options);
    await modal.present();
  }

  async presentLoadingModal(options: LoadingOptions = {
    message: 'Loading data.  Please wait...',
    spinner: 'dots'
  }): Promise<void> {
    this.isLoading = true;
    return await this.loadingController.create(options).then(
      (loader: HTMLIonLoadingElement) => {
        loader.present().then(() => {
          if (!this.isLoading) {
            loader.dismiss();
          }
        });
      }
    );
  }

  async presentLoadingModalSave(options: LoadingOptions = {
    message: 'Saving...',
    spinner: 'dots'
  }): Promise<void> {
    await this.presentLoadingModal(options);
  }

  async presentLoadingModalDelete(options: LoadingOptions = {
    message: 'Deleting...',
    spinner: 'dots'
  }): Promise<void> {
    await this.presentLoadingModal(options);
  }

  async dismissLoadingModal(): Promise<boolean> {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  getComponentInfo(name: string): ComponentInfo {
    let info: ComponentInfo;

    switch (name) {
      case 'shopping-list':
        info = { icon: 'cart', path: '/shopping-list' };
        break;
      case 'unit-cost':
        info = { icon: 'pricetag-outline', path: '/unit-cost' };
        break;
      default:
        console.error(`Unknown component: ${name}`);
    }

    return info;
  }

  goBack(): void {
    this.location.back();
  }
}
