import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTaskNotePage } from './edit-task-note.page';

describe('EditTaskNotePage', () => {
  let component: EditTaskNotePage;
  let fixture: ComponentFixture<EditTaskNotePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
