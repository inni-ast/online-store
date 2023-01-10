import { Page } from "../core/templates/page";

export const enum ErrorTypes {
  NotFound = 404,
}

export class ErrorPage extends Page {
  private errorType: ErrorTypes | string;

  static TextObject = {
    mainTitle: "Error! The page was not found.",
    total: "404",
  };

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
    const title = this.createTitle(ErrorPage.TextObject.mainTitle);
    this.container.append(title);
    return this.container;
  }
}
