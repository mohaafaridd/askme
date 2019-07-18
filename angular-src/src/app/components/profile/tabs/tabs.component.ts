import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Action } from 'src/app/models/action.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor(
    private profileService: ProfileService,

  ) { }

  tabs: Array<Action> = this.setTabOptions();

  ngOnInit() {
  }

  get replies$() {
    return this.profileService.replies$;
  }

  get questions$() {
    return this.profileService.questions$;
  }

  get pinding$() {
    return this.profileService.pinding$;
  }

  setTabOptions(): Array<Action> {
    const output = [];

    const replies: Action = {
      label: 'Replies',
      authorized: true,
      data: this.replies$,
    };

    const questions: Action = {
      label: 'Questions',
      authorized: true,
      data: this.questions$,
    };

    const pinding: Action = {
      label: 'Pinding Questions',
      authorized: true,
      data: this.pinding$,
    };

    output.push(replies, questions, pinding);

    return output;
  }
}
