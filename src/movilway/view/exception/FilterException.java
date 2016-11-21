package movilway.view.exception;

public class FilterException extends Exception {

	private static final long serialVersionUID = -7309306602284087594L;
	private String message;

	public FilterException(String message) {
		super(message);
		this.message = message;
	}

	public FilterException(Throwable throwable) {
		super(throwable);
		this.message = throwable.getMessage();
	}

	public FilterException(String message, Throwable throwable) {
		super(message, throwable);
		this.message = message;
	}

	@Override
	public String getMessage() {
		return message;
	}

}
