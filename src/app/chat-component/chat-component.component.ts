import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
  
    setTimeout(() => {
      this.service.getChatCompletions(query)
        .subscribe((response: any) => {
          const answer = response.choices[0].message.content;
          this.messages.push(`Bot: ${answer}`);
          this.scrollToBottom();
        }, error => {
          console.error(error);
        });
  
      this.searchQuery = '';
    }, 500); // Add a delay of 500 milliseconds
  }
  
  scrollToBottom() {
    setTimeout(() => {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }, 0);
  }

}

