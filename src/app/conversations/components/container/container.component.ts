import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConversationsService } from '@services/conversations.service';
import { ApiResponse } from '@models/api-response';
import { Message } from '@models/message';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  messages: Message[];
  title: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private conversationsService: ConversationsService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getMessages(params.id);
    });

    this.route.queryParams.subscribe(params => {
      this.title = params.title;
    });
  }

  getMessages(conversationId): void {
    this.conversationsService.getMessages(conversationId, 30)
      .subscribe((res: ApiResponse) => {
        this.messages = res.payload;
      });
  }
}
