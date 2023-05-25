import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core';
import { IEmail } from '../../interfaces/email.interface';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
})
export class EmailListComponent implements OnInit {
  emails!: IEmail[];

  // Pagination settings
  pagination = {
    page: 1,
    limit: 10,
    pages: 1,
    total: 0,
  };

  constructor(private router: Router, private httpService: HttpService) {}

  ngOnInit(): void {
    this.fetchEmails();
  }

  // Navigate to email details page
  viewEmail(email: IEmail) {
    this.router.navigate(['/emails', email._id ?? '1']);
  }

  // Handle pagination page change event
  onPageChanged(event: any) {
    this.pagination.page = event.page;
    this.fetchEmails();
  }

  private fetchEmails() {
    this.httpService
      .get<IEmail[]>(`emails?page=${this.pagination.page}&limit=${this.pagination.limit}`)
      .subscribe(({ data, limit, page, pages, total }) => {
        Object.assign(this.pagination, { limit, page, pages, total });
        this.emails = data;
      });
  }
}
