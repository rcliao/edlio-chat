import {Component, AfterViewInit, ElementRef} from 'angular2/core';
import * as io from 'socket.io-client/socket.io.js';

@Component({
    selector: 'my-app',
    template: `
        <div class="main-card-square mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">Edlio Temp Chat</h2>
          </div>
          <div class="mdl-card__supporting-text">
              <ul>
                  <li *ngFor="#message of messages">
                    <b>{{message.username}}: </b> <br>
                    <span class="item-text-body">{{message.message}}</span>
                  </li>
              </ul>
          </div>
          <div class="mdl-card__actions mdl-card--border chat-form">
            <div class="mdl-textfield mdl-js-textfield username">
                <input class="mdl-textfield__input" type="text" id="username"
                    [(ngModel)]="username">
                <label class="mdl-textfield__label" for="username">Username</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield message">
                <input class="mdl-textfield__input" type="text" id="message"
                    [(ngModel)]="newMessage"
                    (keyup.enter)="onKeyUp($event)">
                <label class="mdl-textfield__label" for="message">Message</label>
            </div>
          </div>
        </div>
    `,
    styles: [`
        .main-card-square {
            flex: 1;
            max-width: 78em;
            margin: 1em;
        }

        .chat-form {
            width: 100%;
            display: flex;
        }

        .username {
            flex: 0 0 5em;
            margin-right: 0.5em;
        }

        .message {
            flex: 1;
        }

        .mdl-card__supporting-text {
            max-height: 50em;
            overflow: auto;
            background: url("http://www.brandsoftheworld.com/sites/default/files/styles/logo-award-medium/public/20110823/edlio_monotone_unframed.png?itok=hVU3WI-h") top center no-repeat;
            max-height: 700px;
            margin: 1em auto;
        }

        ul {
            width: 100%;
        }

        li {
            list-style: none;
            list-style-type: none;
            line-height: 2em;
            border-bottom: 1px solid #d6d6d6;
            width: 100%;
        }
    `]
})
export class AppComponent implements AfterViewInit {
    messages: String[]
    newMessage: String
    username: String
    socket: any

    ngAfterViewInit() {
        [].forEach.call(
            this.element.nativeElement.querySelectorAll('.mdl-textfield'),
            function(textfield) {
                componentHandler.upgradeElement(textfield);
            }
        );
    }

    constructor(public element: ElementRef) {
        var self: any = this;

        self.messages = [];

        self.socket = io.connect();

        self.socket.on('connect', function(msgs) {
            console.log('connected');

            self.socket.on('messages', function(msgs) {
                self.messages = msgs;
            });

            self.socket.on('message', function(msg) {
                self.messages.push(msg);
            });
        })
    }

    onKeyUp($event: KeyboardEvent) {
        this.socket.emit('message', {
            username: this.username,
            message: this.newMessage
        });
        this.newMessage = '';
    }
}
