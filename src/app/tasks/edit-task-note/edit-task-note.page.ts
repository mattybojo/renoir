import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonContent, IonItem, IonList, IonTextarea, ModalController } from '@ionic/angular/standalone';
import { take } from 'rxjs';
import { ModalHeaderComponent } from "../../shared/components/modal-header/modal-header.component";
import { Task } from '../tasks.beans';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-edit-task-note',
  templateUrl: './edit-task-note.page.html',
  styleUrls: ['./edit-task-note.page.scss'],
  standalone: true,
  imports: [IonButton, IonTextarea, IonItem, IonList, IonContent, CommonModule, FormsModule, ReactiveFormsModule, ModalHeaderComponent]
})
export class EditTaskNotePage implements OnInit {

  @Input() task!: Task;

  form!: FormGroup;

  // DI
  private tasksService = inject(TasksService);
  private modalCtrl = inject(ModalController);

  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      notes: new FormControl(this.task.notes),
    });
  }

  saveItem(): void {
    // Create updated task object
    const updatedTask: Task = { ...this.task, ...this.form.getRawValue() };

    this.tasksService.saveTask(updatedTask).pipe(take(1)).subscribe(() => {
      // Close the modal
      this.modalCtrl.dismiss(updatedTask);
    });
  }

  closeModal(): void {
    this.modalCtrl.dismiss();
  }
}
