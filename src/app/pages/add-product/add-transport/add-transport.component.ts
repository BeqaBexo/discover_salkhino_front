import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Transport, TranslateTransp } from '../add-product-service/add-service.model';

import { TransportService } from './transport-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-transport',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-transport.component.html',
  styleUrl: './add-transport.component.scss'
})
export class AddTransportComponent implements OnInit, OnChanges {
  @Input() transportToEdit: Transport | null = null;

  transportForm: FormGroup;
  selectedFiles: File[] = [];
  translations: TranslateTransp = new TranslateTransp();

  constructor(
    private fb: FormBuilder,
    private transportService: TransportService
  ) {
    this.transportForm = this.fb.group({
      id: [0],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      year: [null, Validators.required],
      fuel: [''],
      location: [''],
      rentalType: ['', Validators.required],
      boxType: [''],
      isActive: [true],
      weight: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transportToEdit'] && this.transportToEdit) {
      this.transportForm.patchValue(this.transportToEdit);
    }
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
  if (this.transportForm.valid) {
    const formValue = this.transportForm.value;
    const transportData: Transport = {
      ...formValue,
      id: this.transportToEdit?.id ?? 0,
      dateTime: new Date(),
      isActive: true
    };

    // თუ transportToEdit არსებობს → განახლება
    if (this.transportToEdit) {
      this.transportService.updateTransport(transportData).subscribe({
        next: () => {
          alert('ტრანსპორტი განახლდა!');
          this.transportForm.reset();
          this.transportToEdit = null;
        },
        error: (err) => {
          console.error('განახლების შეცდომა:', err);
        }
      });
    } else {
      // თუ არა — ახალი transport
      this.transportService.addTransport(transportData).subscribe({
        next: (newId: number) => {
          alert('ტრანსპორტი დაემატა!');
          this.transportForm.reset();
        },
        error: (err) => {
          console.error('დამატების შეცდომა:', err);
        }
      });
    }
  }
}


  get fileNames(): string {
    return this.selectedFiles.length > 0
      ? this.selectedFiles.map(f => f.name).join(', ')
      : '';
  }

  ngOnInit(): void {
    this.transportService.getTranslations('ka').subscribe({
      next: (result) => {
        this.translations = result;
      },
      error: (err) => {
        console.error('Error fetching translations:', err);
      },
    });
  }
}