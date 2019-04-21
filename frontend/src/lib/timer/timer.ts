export class Timer {
  public static wait(time: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
