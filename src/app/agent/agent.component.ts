import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  collapse = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.collapse = !this.collapse;
  }
}
