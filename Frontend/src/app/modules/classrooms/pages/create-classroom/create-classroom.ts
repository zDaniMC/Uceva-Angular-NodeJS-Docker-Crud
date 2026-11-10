import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateClassroomRequest } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-create-classroom',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-classroom.html',
})
export class CreateClassroom {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private classroomService = inject(ClassroomService);

  classroomForm = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(20)]],
    building: ['', [Validators.required, Validators.maxLength(100)]],
    capacity: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
    status: [true]
  });

  createClassroom(): void {
    if (this.classroomForm.invalid) {
      this.classroomForm.markAllAsTouched();
      return;
    }
    const formValue = this.classroomForm.getRawValue();
    const classroom: CreateClassroomRequest = {
      code: formValue.code!,
      building: formValue.building!,
      capacity: Number(formValue.capacity!),
      status: formValue.status!
    };
    this.classroomService.create(classroom).subscribe({
      next: () => {
        this.alertService.toast('Aula registrada correctamente', 'success');
        this.router.navigateByUrl('/classrooms');
      },
      error: (error: any) => {
        console.error('Error creating classroom:', error);
        const message = error?.status === 400 ? error.error?.error : null;
        this.alertService.toast(
          message ?? 'Error al crear el aula. Verifica que el código no esté repetido',
          'error'
        );
      }
    });
  }

}
