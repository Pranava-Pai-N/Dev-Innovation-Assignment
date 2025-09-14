class ExpressError extends Error{
    status;
    errorMessage;

    constructor(status, errorMessage) {
    super();
    this.status = status;
    this.errorMessage = errorMessage;
  }
}

export default ExpressError;