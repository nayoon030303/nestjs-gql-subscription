import { Injectable } from '@nestjs/common';
import { MessageType } from './property.object.type';

@Injectable()
export class AppService {
  private message = 'Hello World';
  private id = 1;

  getMessage(): MessageType {
    const msg: MessageType = {
      id: this.id,
      message: this.message,
    };

    return msg;
  }

  setMessage(msg) {
    this.message = msg;
    const property = {
      id: this.id,
      message: this.message,
    };
    return property;
  }
}
