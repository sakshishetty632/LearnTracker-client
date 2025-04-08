import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-report',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatButtonModule, RouterLink],
  templateUrl: './view-report.component.html',
  styleUrl: './view-report.component.css',
})
export class ViewReportComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['req_id', 'project', 'location', 'client_manager', 'tech_stack', 'position', 'current_status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  showReport = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private router: Router) { }
  

  ngOnInit(): void {
    this.viewReport();
  }

  ngAfterViewInit(): void {
    // this.dataSource.data = this.dataSource.data;
    this.viewReport();
    this.dataSource.paginator = this.paginator;
  }
  
  // Fetch data and set up pagination
  viewReport(): void {
    this.apiService.getRequests().subscribe((data: any[]) => {
      this.showReport = true;
      this.dataSource.data = data;
      if(this.paginator){
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  // Navigate to the edit form
  editRequest(req: any): void {
    this.router.navigate(['/report/edit', req.req_id]);
  }

  // Delete a request and refresh the table
  deleteRequest(reqId: number): void {
    if (confirm('Are you sure you want to delete this report?')) {
      this.apiService.deleteRequest(reqId).subscribe({
        next: () => {
          alert('Report deleted successfully');
          this.viewReport(); // Refresh the table
        },
        error: (err) => console.error('Error deleting report:', err),
      });
    }
  }
}
