import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonList, IonModal, IonSelect, IonSelectOption, IonTextarea, ModalController } from '@ionic/angular/standalone';
import { add } from 'date-fns';
import { isEmpty } from 'lodash-es';
import { take } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ModalHeaderComponent } from "../../shared/components/modal-header/modal-header.component";
import { Category, Task, TaskDateType, TaskIncrementType } from '../tasks.beans';
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

  readonly DEFAULT_INCREMENT: number = 14;

  @Input() task!: Task;
  @Input() categories!: Category[];

  @ViewChild('dueDateEl') dueDateEl!: IonDatetime;

  title!: string;
  form!: FormGroup;

  // Tasks can be set a max of 5 years out from current year
  maxDate: number = new Date().getFullYear() + 5;

  // Accessors
  get formDueDate() {
    return this.form.get('dueDate')!.value;
  }

  get formLastCompletedDate() {
    return this.form.get('lastCompletedDate')!.value;
  }

  // DI
  private tasksService = inject(TasksService);
  private authService = inject(AuthService);
  private modalCtrl = inject(ModalController);

  constructor() { }

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
      dueDate: new FormControl(!this.task.dueDate ? undefined : new Date(this.task.dueDate).toISOString()),
      lastCompletedDate: new FormControl(!this.task.lastCompletedDate ? undefined : new Date(this.task.lastCompletedDate).toISOString())
    });
  }

  calculateNewDueDate(type: TaskDateType, increment: string | number | null | undefined, incrementType: TaskIncrementType): void {
    let baseDate: string = type === 'due' ? this.formDueDate : this.formLastCompletedDate;
    let addend: number = +increment!;

    // Calculate new date based on user-selected prefs
    let newDate: Date = add(baseDate, { [incrementType]: addend });

    // Set the new date in the form
    this.form.get('dueDate')!.setValue(newDate.toISOString());
  }

  saveItem(): void {
    // Special handling for dates
    let dateIsoString: Date = this.form!.get('lastCompletedDate')!.value;
    const lastCompletedDate = !!dateIsoString ? new Date(dateIsoString).getTime() : 0;
    dateIsoString = this.form!.get('dueDate')!.value;
    const dueDate = !!dateIsoString ? new Date(dateIsoString).getTime() : 0;

    // Create updated task object
    const updatedTask: Task = { ...this.task, ...this.form.getRawValue(), dueDate, lastCompletedDate };

    // Update permissions
    updatedTask.sharedWith = updatedTask.category !== 'personal' ? this.authService.getSharedWith() : [this.authService.currentUser()!.uid];
    updatedTask.uid = this.authService.currentUser()!.uid;

    // Ensure category exists so that we can calculate sortOrder based on number of items present
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
