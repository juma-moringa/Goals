import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert-service/alert.service';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { Quote } from '../quote-class/quote';
import { HttpClient } from '@angular/common/http';
import { QuoteRequestService } from '../quote-http/quote-request.service';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
})
export class GoalComponent implements OnInit {

  goals:Goal[];
  alertService:AlertService;
  quote!:Quote;

  addNewGoal(goal: Goal) {
    let goalLength = this.goals.length;
    goal.id = goalLength + 1;
    goal.completeDate = new Date(goal.completeDate);
    this.goals.push(goal);
  }
  toggleDetails(index: number) {
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }
  completeGoal(isComplete: any, index: number) {
    if (isComplete) {
      this.goals.splice(index, 1);
    }
  }
  deleteGoal(isComplete: any, index: number) {
    if (isComplete) {
      let toDelete = confirm(
        `Are you sure you want to delete ${this.goals[index].name}?`
      );
      if (toDelete) {
        this.goals.splice(index, 1);
        this.alertService.alertMe("The goal has been deleted")
      }
    }
  }
  // goals: Goal[]
  constructor(goalService:GoalService, alertService:AlertService, private http:HttpClient ,private quoteService:QuoteRequestService ) {
    this.goals = goalService.getGoals()
    this.alertService = alertService;
  }
  ngOnInit() {

    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote
  }

 
  // ngOnInit(): void {
  //   interface ApiResponse{
  //     author:string;
  //     quote:string;
  //   }

    
  //   this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
  //     // Succesful API request
  //     this.quote = new Quote(data.author, data.quote)
  //   },err=>{
  //       this.quote = new Quote("Winston Churchill","Never never give up!")
  //       console.log("An error occurred")
  //   })
  // }
}
