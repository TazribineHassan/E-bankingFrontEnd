import { Component, OnInit } from '@angular/core';
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  modalContent: any;

  constructor(private modalService: NgbModal) { }


  ngOnInit(): void {

  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
