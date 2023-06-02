import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';
import { ApiService } from '../faq-questions/api-service';
import { ChatService } from './chat-service';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.scss']
})
export class ChatComponentComponent implements OnInit {
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;
  searchQuery: string = '';
  private searchQuerySubject: Subject<string> = new Subject<string>();
  date = new Date();
  messages: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private service: ChatService
  ) {
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
    this.messages.push(`You: ${query}`);
    this.scrollToBottom();
  
    this.service.getChatCompletions(query)
      .pipe(delay(500)) // Add a delay of 500 milliseconds
      .subscribe((response: any) => {
        const answer = response.choices[0].message.content;
        this.messages.push(`Bot: ${answer}`);
        this.scrollToBottom();
        this.clearSearchQuery(); // Move the clearSearchQuery call here
      }, error => {
        console.error(error);
      });
  }
  
  clearSearchQuery() {
    setTimeout(() => {
      this.searchQuery = '';
    }, 500); // Delay clearing the search query by 500 milliseconds
  }
  
  scrollToBottom() {
    setTimeout(() => {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }, 0);
  }

}

