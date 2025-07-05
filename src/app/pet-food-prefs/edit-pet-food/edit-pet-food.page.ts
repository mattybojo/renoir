import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonInput, IonItem, IonList, IonSelect, IonSelectOption, ModalController } from '@ionic/angular/standalone';
import { camelCase, capitalize, isEmpty, startCase } from 'lodash-es';
import { take } from 'rxjs';
import { ModalHeaderComponent } from "../../shared/components/modal-header/modal-header.component";
import { PetFood, PetFoodPrefs, PetFoodRating } from '../pet-food-prefs.beans';
import { createPetFood, createPetFoodRatings } from '../pet-food-prefs.helpers';
import { PetFoodPrefsService } from '../pet-food-prefs.service';

@Component({
  selector: 'app-edit-pet-food',
  templateUrl: './edit-pet-food.page.html',
  styleUrls: ['./edit-pet-food.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonList, IonContent, IonSelect, IonSelectOption, CommonModule, FormsModule, ReactiveFormsModule, ModalHeaderComponent]
})
export class EditPetFoodPage implements OnInit {

  @Input() petFood!: PetFood;

  title!: string;
  form!: FormGroup;

  petFoodRatings: PetFoodRating[] = createPetFoodRatings();
  newPetFoodObj: PetFood = createPetFood();

  // DI
  private petFoodPrefsService = inject(PetFoodPrefsService);
  private modalCtrl = inject(ModalController);

  constructor() { }

  ngOnInit() {
    if (isEmpty(this.petFood)) {
      this.petFood = createPetFood();
    }
    this.title = isEmpty(this.petFood) ? 'Create new pet food' : 'Edit pet food';

    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      brand: new FormControl(this.petFood.brand, [Validators.required]),
      name: new FormControl(this.petFood.name, [Validators.required]),
    });

    // Add preferences for each cat
    for (var key in this.newPetFoodObj.prefs) {
      if (this.newPetFoodObj.prefs.hasOwnProperty(key) && key !== 'avg') {
        this.form.addControl(key, new FormControl(this.petFood.prefs[key as keyof PetFoodPrefs], [Validators.required]));
      }
    }
  }

  saveItem(): void {
    const controls = this.form.controls;
    // Create updated pet food object
    const updatedPetFood: PetFood = { ...this.petFood, brand: controls['brand'].getRawValue(), name: controls['name'].getRawValue() };
    updatedPetFood.displayName = `${startCase(camelCase(updatedPetFood.brand))} ${capitalize(updatedPetFood.name)}`;
    updatedPetFood.prefs = {
      ...updatedPetFood.prefs,
      simba: controls['simba'].getRawValue(),
      rory: controls['rory'].getRawValue(),
      willy: controls['willy'].getRawValue(),
      milo: controls['milo'].getRawValue(),
    };

    let total = 0, count = 0;
    for (var key in updatedPetFood.prefs) {
      if (updatedPetFood.prefs.hasOwnProperty(key) && key !== 'avg') {
        total += updatedPetFood.prefs[key as keyof PetFoodPrefs];
        count++;
      }
    }
    updatedPetFood.prefs.avg = total / count;

    console.log(updatedPetFood);

    this.petFoodPrefsService.savePetFood(updatedPetFood).pipe(take(1)).subscribe(() => {
      // Close the modal
      this.modalCtrl.dismiss(updatedPetFood);
    });
  }

  closeModal(): void {
    this.modalCtrl.dismiss();
  }
}
