System.register(['angular2/core', 'socket.io-client/socket.io.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, io;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (io_1) {
                io = io_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(element) {
                    this.element = element;
                    var self = this;
                    self.messages = [];
                    self.socket = io.connect();
                    self.socket.on('connect', function (msgs) {
                        console.log('connected');
                        self.socket.on('messages', function (msgs) {
                            self.messages = msgs;
                        });
                        self.socket.on('message', function (msg) {
                            self.messages.push(msg);
                        });
                    });
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    [].forEach.call(this.element.nativeElement.querySelectorAll('.mdl-textfield'), function (textfield) {
                        componentHandler.upgradeElement(textfield);
                    });
                };
                AppComponent.prototype.onKeyUp = function ($event) {
                    this.socket.emit('message', {
                        username: this.username,
                        message: this.newMessage
                    });
                    this.newMessage = '';
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <div class=\"main-card-square mdl-card mdl-shadow--2dp\">\n          <div class=\"mdl-card__title mdl-card--expand\">\n            <h2 class=\"mdl-card__title-text\">Edlio Temp Chat</h2>\n          </div>\n          <div class=\"mdl-card__supporting-text\">\n              <ul>\n                  <li *ngFor=\"#message of messages\">\n                    <b>{{message.username}}: </b> <br>\n                    <span class=\"item-text-body\">{{message.message}}</span>\n                  </li>\n              </ul>\n          </div>\n          <div class=\"mdl-card__actions mdl-card--border chat-form\">\n            <div class=\"mdl-textfield mdl-js-textfield username\">\n                <input class=\"mdl-textfield__input\" type=\"text\" id=\"username\"\n                    [(ngModel)]=\"username\">\n                <label class=\"mdl-textfield__label\" for=\"username\">Username</label>\n            </div>\n            <div class=\"mdl-textfield mdl-js-textfield message\">\n                <input class=\"mdl-textfield__input\" type=\"text\" id=\"message\"\n                    [(ngModel)]=\"newMessage\"\n                    (keyup.enter)=\"onKeyUp($event)\">\n                <label class=\"mdl-textfield__label\" for=\"message\">Message</label>\n            </div>\n          </div>\n        </div>\n    ",
                        styles: ["\n        .main-card-square {\n            flex: 1;\n            max-width: 78em;\n            margin: 1em;\n        }\n\n        .chat-form {\n            width: 100%;\n            display: flex;\n        }\n\n        .username {\n            flex: 0 0 5em;\n            margin-right: 0.5em;\n        }\n\n        .message {\n            flex: 1;\n        }\n\n        .mdl-card__supporting-text {\n            max-height: 50em;\n            overflow: auto;\n            background: url(\"http://www.brandsoftheworld.com/sites/default/files/styles/logo-award-medium/public/20110823/edlio_monotone_unframed.png?itok=hVU3WI-h\") top center no-repeat;\n            max-height: 700px;\n            margin: 1em auto;\n        }\n\n        ul {\n            width: 100%;\n        }\n\n        li {\n            list-style: none;\n            list-style-type: none;\n            line-height: 2em;\n            border-bottom: 1px solid #d6d6d6;\n            width: 100%;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map