interface iTask {
  readonly id?: number;
  readonly title: string;
  readonly description: string;
}
interface iError {
  readonly statusCode: number;
  readonly message: string;
}
