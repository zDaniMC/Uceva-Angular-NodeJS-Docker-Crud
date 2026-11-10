import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Teacher, UpdateTeacherRequest } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-update-teacher',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-teacher.html',
})
export class UpdateTeacher {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private teacherService = inject(TeacherService);

  teacherForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    specialty: ['', [Validators.required, Validators.maxLength(100)]],
    status: [true]
  });

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isFinite(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.getTeacher();
  }

  getTeacher() {
    this.teacherService.getById(this.id).subscribe({
      next: (teacher) => {
        if (!teacher) {
          this.alertService.toast('No se encontró el profesor', 'error');
          this.goToList();
          return;
        }
        this.setValues(teacher);
      },
      error: (error: any) => {
        console.error('Error fetching teacher:', error);
        this.alertService.toast('Error al consultar el profesor', 'error');
        this.goToList();
      }
    });
  }

  setValues(teacher: Teacher): void {
    this.teacherForm.patchValue({
      id: String(teacher.id),
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      specialty: teacher.specialty,
      status: teacher.status
    });
  }

  updateTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const formValue = this.teacherForm.getRawValue();
    const teacher: UpdateTeacherRequest = {
      name: formValue.name!,
      email: formValue.email!,
      phone: formValue.phone!,
      specialty: formValue.specialty!,
      status: formValue.status!
    };

    this.teacherService.update(this.id, teacher).subscribe({
      next: () => {
        this.alertService.toast('Profesor actualizado correctamente', 'success');
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating teacher:', error);
        const message = error?.status === 400 || error?.status === 404 ? error.error?.error : null;
        this.alertService.toast(
          message ?? 'Error al actualizar el profesor. Verifica que el correo y el teléfono no estén repetidos',
          'error'
        );
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('/teachers');
  }

}
