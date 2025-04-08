import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, MatButtonModule],
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent implements OnInit {
  requestForm!: FormGroup;
  isEditMode = false;
  reqId: string | null = null;

  // Dropdown Data
  locations: string[] = [
    'Mumbai',
    'Thane',
    'Pune',
    'Nashik',
    'Nagpur',
    'Aurangabad',
    'Solapur',
    'Kolhapur',
    'Amravati',
    'Satara',
    'Sangli'
  ];

  project: string[] = [
    'Project 1',
    'Project 2',
    'Project 3',
    'Project 4',
    'Project 5',
    'Project 6',
    'Project 7'
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize Form
    this.requestForm = this.fb.group({
      req_id: ['', Validators.required],
      project: ['', Validators.required],
      location: ['', Validators.required],
      client_manager: ['', Validators.required],
      tech_stack: ['', Validators.required],
      position: ['', Validators.required],
      current_status: ['', Validators.required]
    });

    // Check if we are in "Edit" mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.reqId = id;
        this.loadRequestData(this.reqId);
      }
    });
  }

  // Load request data for editing
  loadRequestData(reqId: string): void {
    this.apiService.getRequests().subscribe((requests) => {
      const request = requests.find(req => req.req_id === reqId);
      if (request) {
        this.requestForm.patchValue(request);
      } else {
        alert('Request not found!');
        this.router.navigate(['/report']);
      }
    });
  }

  // Handle Form Submission (Create or Update)
  submitForm(): void {
    if (this.requestForm.invalid) {
      alert('Please fill all fields');
      return;
    }

    if (this.isEditMode && this.reqId !== null) {
      // Update existing record
      this.apiService.updateRequest(this.reqId, this.requestForm.value).subscribe(() => {
        alert('Request updated successfully');
        this.router.navigate(['/report']);
      });
    } else {
      // Create new record
      this.apiService.submitRequest(this.requestForm.value).subscribe(() => {
        alert('Request submitted successfully');
        this.requestForm.reset();
        //this.router.navigate(['/report']);
      });
    }
  }
}
