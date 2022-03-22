export class ResponseBuilder {
  private data: any;
  private message: string;
  private statusCode: number;
  private page: number;
  private total: number;

  constructor(data?: any) {
    this.data = data;
  }

  public withCode(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  public withMessage(message: string) {
    this.message = message;
    return this;
  }

  public withPage({ page, total }) {
    this.page = page;
    this.total = total;
    return this;
  }

  public build() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      pagination: this.page && {
        page: Number(this.page),
        total: this.total,
      },
    };
  }

  public buildWithPagination() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      pagination: this.page && {
        page: Number(this.page),
        total: this.total,
      },
    };
  }
}
