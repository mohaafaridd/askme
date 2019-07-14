import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
  }

  get user$() {
    return this.profileService.user$;
  }

}
