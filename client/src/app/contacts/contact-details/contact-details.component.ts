import { Component, OnInit } from '@angular/core';
import { ContactListService } from 'src/app/services/contact-list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';


import { Contact } from 'src/app/models/contact';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  title:string;
  contact: Contact;

  constructor(
    private activedRoute:ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private contactListService: ContactListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activedRoute.snapshot.data.title;
    this.contact = new Contact();
  }
  private onDetailsPageSubmit():void{
    switch(this.title){
      case 'Add Contact':
      this.contactListService.addContact(this.contact).subscribe(data => {
        if(data.success){
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        } else {
          this.flashMessage.show('Add Contact Failed', {cssClass: 'alert-danger', timeOut: 3000});
        }
      });
      break;

      case 'Edit Contact':
      break;
    }
  }
}
