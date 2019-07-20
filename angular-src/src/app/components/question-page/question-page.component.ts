import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

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
  ) { }

  get question$() {
    return this.questionsService.question$;
  }

  ngOnInit() {
    this.bootstrap();
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
