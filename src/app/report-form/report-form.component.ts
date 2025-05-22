import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
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
  studentId: string | null = null;

  // Dropdown Data
  branches: string[] = [
    "Bachelor of Arts (BA)",
    "Bachelor of Fine Arts (BFA)",
    "Bachelor of Design (BDes)",
    "Bachelor of Journalism & Mass Communication (BJMC)",
    "Bachelor of Hotel Management (BHM)",
    "Bachelor of Fashion Design",
    "Bachelor of Performing Arts",
    "Bachelor of Commerce (BCom)",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Business Management (BBM)",
    "Bachelor of Computer Applications (BCA)",
    "Bachelor of Accounting & Finance (BAF)",
    "Bachelor of Financial Markets (BFM)",
    "Bachelor of Science (BSc)",
    "Bachelor of Pharmacy (BPharm)",
    "Bachelor of Medical Laboratory Technology (BMLT)",
    "Bachelor of Technology (BTech)",
    "Bachelor of Engineering (BEng)",
    // "Bachelor of Computer Engineering",
    // "Bachelor of Civil Engineering",
    // "Bachelor of Mechanical Engineering",
    "Bachelor of Laws (LLB)",
    "Integrated 5-year LLB programs",
    "Bachelor of Education (BEd)",
    "Bachelor of Physical Education (BPEd)",
    "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
    "Bachelor of Dental Surgery (BDS)",
    "Bachelor of Physiotherapy (BPT)",
    "Bachelor of Nursing (BSc Nursing)",
    "Bachelor of Audiology & Speech-Language Pathology (BASLP)",
    "Bachelor of Agriculture (BSc Agriculture)",
    "Bachelor of Horticulture",
    "Bachelor of Interior Design",
    "Bachelor of Product Design"
  ];

  course: { [key: string]: string[] } = {
    "Bachelor of Arts (BA)": [
      "English Literature",
      "History",
      "Psychology",
      "Political Science",
      "Sociology",
      "Philosophy",
      "Economics",
      "Geography",
      "Ancient History"
    ],
    "Bachelor of Fine Arts (BFA)": [
      "Painting",
      "Sculpture",
      "Applied Arts",
      "Photography",
      "Printmaking",
      "Animation"
    ],
    "Bachelor of Design (BDes)": [
      "Fashion Design",
      "Product Design",
      "Interior Design",
      "Graphic Design",
      "Textile Design",
      "Communication Design"
    ],
    "Bachelor of Journalism & Mass Communication (BJMC)": [
      "Journalism",
      "Broadcast Journalism",
      "Public Relations",
      "Advertising",
      "Media Studies"
    ],
    "Bachelor of Hotel Management (BHM)": [
      "Food Production",
      "Hotel Operations",
      "Housekeeping",
      "Front Office Management",
      "Event Management"
    ],
    "Bachelor of Fashion Design": [
      "Textile Design",
      "Fashion Merchandising",
      "Garment Production",
      "Fashion Illustration"
    ],
    "Bachelor of Performing Arts": [
      "Dance",
      "Music",
      "Theater",
      "Film Acting"
    ],
    "Bachelor of Commerce (BCom)": [
      "General Commerce",
      "Accounting",
      "Business Studies",
      "Taxation",
      "Auditing"
    ],
    "Bachelor of Business Administration (BBA)": [
      "Business Management",
      "Entrepreneurship",
      "International Business",
      "Human Resource Management"
    ],
    "Bachelor of Business Management (BBM)": [
      "Business Strategy",
      "Organizational Behavior",
      "Marketing Management",
      "Business Ethics"
    ],
    "Bachelor of Computer Applications (BCA)": [
      "Computer Programming",
      "Web Development",
      "Software Engineering",
      "Database Management"
    ],
    "Bachelor of Accounting & Finance (BAF)": [
      "Financial Accounting",
      "Management Accounting",
      "Cost Accounting",
      "Financial Management"
    ],
    "Bachelor of Financial Markets (BFM)": [
      "Capital Markets",
      "Investment Management",
      "Derivatives",
      "Risk Management"
    ],
    "Bachelor of Science (BSc)": [
      "Astrophysics",
      "Applied Mathematics",
      "Physical Chemistry",
      "Inorganic Chemistry",
      "Plant Science",
      "Animal Science",
      "Ecology",
      "Environmental Biology",
      "Genetics",
      "Biochemistry",
      "Microbial Biotechnology",
      "Environmental Management",
      "Algorithms",
      "Data Structures",
      "Artificial Intelligence",
      "Cyber Security"
    ],
    "Bachelor of Pharmacy (BPharm)": [
      "Pharmacology",
      "Pharmaceutical Chemistry",
      "Pharmaceutical Analysis",
      "Pharmacognosy"
    ],
    "Bachelor of Medical Laboratory Technology (BMLT)": [
      "Clinical Pathology",
      "Hematology",
      "Microbiology",
      "Biochemistry"
    ],
    "Bachelor of Technology (BTech)": [
      "Computer Science",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering"
    ],
    "Bachelor of Engineering (BEng)": [
      "Chemical Engineering",
      "Information Technology",
      "Biotechnology Engineering",
      "Aeronautical Engineering",
      "Computer Engineering",
      "Civil Engineering",
      "Mechanical Engineering"
    ],
    "Bachelor of Laws (LLB)": [
      "Criminal Law",
      "Corporate Law",
      "Constitutional Law",
      "Intellectual Property Law"
    ],
    "Integrated 5-year LLB programs": [
      "Corporate Law",
      "Family Law",
      "International Law",
      "Civil Law"
    ],
    "Bachelor of Education (BEd)": [
      "Special Education",
      "Elementary Education",
      "Secondary Education",
      "Adult Education"
    ],
    "Bachelor of Physical Education (BPEd)": [
      "Sports Science",
      "Kinesiology",
      "Fitness Training",
      "Coaching"
    ],
    "Bachelor of Medicine, Bachelor of Surgery (MBBS)": [
      "General Medicine",
      "Surgery",
      "Pediatrics",
      "Orthopedics"
    ],
    "Bachelor of Dental Surgery (BDS)": [
      "Oral Surgery",
      "Prosthodontics",
      "Periodontics",
      "Orthodontics"
    ],
    "Bachelor of Physiotherapy (BPT)": [
      "Musculoskeletal Physiotherapy",
      "Neurological Physiotherapy",
      "Sports Physiotherapy",
      "Cardiopulmonary Physiotherapy"
    ],
    "Bachelor of Nursing (BSc Nursing)": [
      "Community Health Nursing",
      "Medical-Surgical Nursing",
      "Obstetrics and Gynecology Nursing",
      "Pediatric Nursing"
    ],
    "Bachelor of Audiology & Speech-Language Pathology (BASLP)": [
      "Speech Therapy",
      "Audiology",
      "Rehabilitation"
    ],
    "Bachelor of Agriculture (BSc Agriculture)": [
      "Agronomy",
      "Soil Science",
      "Horticulture",
      "Plant Pathology"
    ],
    "Bachelor of Horticulture": [
      "Fruit Science",
      "Vegetable Science",
      "Floriculture",
      "Landscape Architecture"
    ],
    "Bachelor of Interior Design": [
      "Space Planning",
      "Design Theory",
      "Furniture Design",
      "Lighting Design"
    ],
    "Bachelor of Product Design": [
      "Industrial Design",
      "Ergonomics",
      "User Experience Design",
      "Design Research"
    ]
  };
  filteredcourses: string[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize Form
    this.requestForm = this.fb.group({
      student_id: ['', Validators.required],
      course: ['', Validators.required],
      branch: ['', Validators.required],
      student_name: ['', Validators.required],
      learning_modules: ['', Validators.required],
      grade: ['', Validators.required],
      performance_note: ['', Validators.required]
    });
    this.filteredcourses = this.course[this.branches[0]];

    this.requestForm.get('branch')?.valueChanges.subscribe((branch: string) => {
      this.onbranchChange(branch);
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.studentId = id;
        this.loadRequestData(this.studentId);
      }
    });
  }
  
  onbranchChange(branch: string): void {
    // Update the filtered courses based on the selected branch
    this.filteredcourses = this.course[branch] || [];
    // Optionally, reset the selected course if no valid course exists for the new branch
    this.requestForm.get('course')?.reset();
  }

  // Load request data for editing
  loadRequestData(studentId: string): void {
    this.apiService.getRequests().subscribe((requests) => {
      const request = requests.find(req => req.student_id === studentId);
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

    if (this.isEditMode && this.studentId !== null) {
      // Update existing record
      this.apiService.updateRequest(this.studentId, this.requestForm.value).subscribe(() => {
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
