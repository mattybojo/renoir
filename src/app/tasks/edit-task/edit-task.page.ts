import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonList, IonModal, IonSelect, IonSelectOption, IonTextarea, ModalController } from '@ionic/angular/standalone';
import { isEmpty } from 'lodash-es';
import { take } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ModalHeaderComponent } from "../../shared/components/modal-header/modal-header.component";
import { Category, Task } from '../tasks.beans';
import { createTask } from '../tasks.helpers';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
  standalone: true,
  imports: [IonButton, IonDatetime, IonModal, IonDatetimeButton, IonInput, IonTextarea, IonItem, IonList, IonContent, IonSelect, IonSelectOption, CommonModule, FormsModule, ReactiveFormsModule, ModalHeaderComponent]
})
export class EditTaskPage implements OnInit {

  @Input() task!: Task;
  @Input() categories!: Category[];

  title!: string;
  form!: FormGroup;

  // DI
  private tasksService = inject(TasksService);
  private authService = inject(AuthService);

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (isEmpty(this.task)) {
      this.task = createTask();
    }
    this.title = isEmpty(this.task) ? 'Create new task' : 'Edit task';

    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      label: new FormControl(this.task.label, [Validators.required]),
      category: new FormControl(this.task.category, [Validators.required]),
      notes: new FormControl(this.task.notes),
      dueDate: new FormControl(new Date(this.task.dueDate).toISOString()),
      lastCompletedDate: new FormControl(new Date(this.task.lastCompletedDate).toISOString())
    });
  }

  saveItem(): void {
    let dateIsoString: Date = this.form!.get('lastCompletedDate')!.value;
    const lastCompletedDate = !!dateIsoString ? new Date(dateIsoString).getTime() : 0;
    dateIsoString = this.form!.get('dueDate')!.value;
    const dueDate = !!dateIsoString ? new Date(dateIsoString).getTime() : 0;

    const updatedTask: Task = { ...this.task, ...this.form.getRawValue(), dueDate, lastCompletedDate };
    updatedTask.sharedWith = updatedTask.category !== 'personal' ? this.authService.getSharedWith() : [this.authService.currentUser()!.uid];

    const foundItem = this.categories.find(category => category.category === updatedTask.category);
    if (foundItem) {
      if (updatedTask.sortOrder === -1) {
        if (foundItem.items) {
          updatedTask.sortOrder = foundItem.items.length + 1;
        } else {
          updatedTask.sortOrder = 1;
        }
      }
      this.tasksService.saveTask(updatedTask).pipe(take(1)).subscribe(() => {
        // Close the modal
        this.modalCtrl.dismiss(updatedTask);
      });
    }
  }

  closeModal(): void {
    this.modalCtrl.dismiss();
  }
}
