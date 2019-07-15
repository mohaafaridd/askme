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

  tabOptions: Array<Action> = this.setTabOptions();

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
      options: {
        primary: {
          // User can't edit someone's question
          access: false,
          icon: 'edit',
          functionality: 'edit'
        },
        seconadry: {
          // User can delete someone's question
          access: true,
          icon: 'delete',
          functionality: 'delete'
        }
      }
    };

    const questions: Action = {
      label: 'Questions',
      authorized: true,
      options: {
        primary: {
          // User can edit his question
          access: true,
          icon: 'edit',
          functionality: 'edit'
        },
        seconadry: {
          // User can delete his question
          access: true,
          icon: 'delete',
          functionality: 'delete'
        }
      }
    };

    const pinding: Action = {
      label: 'Pinding Questions',
      authorized: true,
      options: {
        primary: {
          // User can reply to someone's pinding question
          access: true,
          icon: 'reply',
          functionality: 'reply'
        },
        seconadry: {
          // User can delete someone's pinding question
          access: true,
          icon: 'delete',
          functionality: 'delete'
        }
      }
    };

    output.push(replies, questions, pinding);

    return output;
  }
}
