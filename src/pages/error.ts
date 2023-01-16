import { Page } from "../core/templates/page";
import { Error404 } from "../modules/const";

export const enum ErrorTypes {
  NotFound = 404,
}

export class ErrorPage extends Page {
  private errorType: ErrorTypes | string;

  constructor(
    el: string,
    id: string,
    nameClass: string,
    errorType: ErrorTypes | string
  ) {
    super(el, id, nameClass);
    this.errorType = errorType;
  }

  render() {
    const title = this.createTitle(Error404);
    this.container.append(title);
    return this.container;
  }
}
