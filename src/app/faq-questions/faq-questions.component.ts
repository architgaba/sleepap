import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api-service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-faq-questions',
  templateUrl: './faq-questions.component.html',
  styleUrls: ['./faq-questions.component.scss']
})
export class FaqQuestionsComponent implements OnInit {

  searchQuery: string='';
  private searchQuerySubject: Subject<string> = new Subject<string>();

  date=new Date();
  isShowDivSummary=true;
  courseId = null
  summary: any[]=[];
  result=null;
  
  constructor(private router: Router, private route: ActivatedRoute, private _fb: FormBuilder,private service: ApiService) {
    console.log(this.courseId)

    this.searchQuerySubject.pipe(debounceTime(300)).subscribe(query => {
      this.sendQuery(query);
    });
  }
  onSearchQueryChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target.value;
    this.searchQuerySubject.next(query);
  }

  @HostListener('document:keydown.enter')
  onEnterKey() {
    this.sendQuery(this.searchQuery);
  }
  ngOnInit(): void {
  }

  sendQuery(query: string) {
    this.service.postQueryToKnowledgeBase(query)
      .subscribe((response:any)=> {
        this.summary = response.answers;
        console.log(response);
      }, error => {
        // Handle any errors
        console.error(error);
      });
  }
  navigate() {
    this.router.navigate(['./dashboard/quiz-connection']);
  }
    toggleDivSummary() {
    this.isShowDivSummary = !this.isShowDivSummary;
  }
  isNoAnswerFound(summary:any): boolean {
    return summary?.[0]?.answer === 'No answer found';
  }
}
