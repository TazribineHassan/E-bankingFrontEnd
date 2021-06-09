import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  collapse = false;
  topbutton = true;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.collapse = !this.collapse;
    this.topbutton=!this.collapse;
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
