import { Component, OnInit } from '@angular/core';
import { NgProgressRef } from '@ngx-progressbar/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  progressRef: NgProgressRef;
  
  constructor(private alertify: AlertifyService,
    private spinner: NgxSpinnerService) {
    
   }

  ngOnInit() {
    // this.progressRef.complete();
    this.spinner.hide();
  }

}
