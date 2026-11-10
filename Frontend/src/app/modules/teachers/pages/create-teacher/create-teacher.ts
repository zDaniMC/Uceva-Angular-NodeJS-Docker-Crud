import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateTeacherRequest } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-create-teacher',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-teacher.html',
})
export class CreateTeacher {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private teacherService = inject(TeacherService);

  teacherForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    specialty: ['', [Validators.required, Validators.maxLength(100)]],
    status: [true]
  });

  createTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const formValue = this.teacherForm.getRawValue();
    const teacher: CreateTeacherRequest = {
      name: formValue.name!,
      email: formValue.email!,
      phone: formValue.phone!,
      specialty: formValue.specialty!,
      status: formValue.status!
    };
    this.teacherService.create(teacher).subscribe({
      next: () => {
        this.alertService.toast('Profesor registrado correctamente', 'success');
        this.router.navigateByUrl('/teachers');
      },
      error: (error: any) => {
        console.error('Error creating teacher:', error);
        const message = error?.status === 400 ? error.error?.error : null;
        this.alertService.toast(
          message ?? 'Error al crear el profesor. Verifica que el correo y el teléfono no estén repetidos',
          'error'
        );
      }
    });
  }

}
