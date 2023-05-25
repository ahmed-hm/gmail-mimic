import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core';
import { IEmail } from '../../interfaces/email.interface';

@Component({
  selector: 'app-email-details',
  templateUrl: './email-details.component.html',
  styleUrls: ['./email-details.component.scss'],
})
export class EmailDetailsComponent implements OnInit {
  replyForm: FormGroup;
  email!: IEmail;

  constructor(private httpService: HttpService, private router: Router) {
    this.replyForm = new FormGroup({
      replyTo: new FormControl('', { validators: Validators.required }),
      subject: new FormControl('', { validators: Validators.required }),
      body: new FormControl('', { validators: Validators.required }),
    });
  }

  ngOnInit(): void {
    this.fetchEmail();
  }

  private fetchEmail() {
    const id = this.router.url.split('/').pop();

    this.httpService.get<IEmail>(`emails/${id}`).subscribe(({ data }) => {
      this.email = data;
      this.replyForm.patchValue({
        replyTo: this.email._id,
        subject: `Re: ${this.email.subject}`,
        body: this.email.reply?.body ?? '',
      });
    });
  }

  replyEmail() {
    if (this.replyForm.invalid) return;

    this.httpService.post('emails/reply', this.replyForm.value).subscribe(() => {
      this.router.navigate(['/emails']);
    });
  }
}
