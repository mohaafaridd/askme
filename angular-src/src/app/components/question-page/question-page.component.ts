import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { CustomResponse } from 'src/app/models/models';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {


  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService
  ) {
    this.bootstrap();
  }

  get question$() {
    return this.questionsService.question$;
  }

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      const lastEvent = e instanceof NavigationEnd;
      if (lastEvent) {
        this.bootstrap();
      }
    });
  }

  bootstrap() {
    const { id } = this.activeRoute.snapshot.params;
    this.questionsService.getQuestion(id);
  }

}
