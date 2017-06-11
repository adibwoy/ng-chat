export class Message {
  timeStamp: string;

  constructor(public message: string, public sentBy: number, public sentTo: number) {
    this.timeStamp = this.generateTimeStamp();
  }

  generateTimeStamp(): string {
    const date = new Date();
    return "" + date.getMonth()
      + "/" + date.getDate() + "/"
      + date.getFullYear() + " "
      + date.getHours() + ":"
      + date.getMinutes();
  }
}
