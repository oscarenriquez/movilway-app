package movilway.dao.exception;

/**
* Clase que encapsula las excepciones generadas desde las diferentes transacciones de Hibernate.
*/
public class InfraestructureException extends Exception {

	private static final long serialVersionUID = -8963005780773705175L;
	private String message;

	public InfraestructureException(String message) {
		super(message);
		this.message = message;
	}

	public InfraestructureException(Throwable throwable) {
		super(throwable);
		message = throwable.getMessage();
	}

	public InfraestructureException(String message, Throwable throwable) {
		super(message, throwable);
		this.message = message;
	}

	@Override
	public String getMessage() {
		return message;
	}
}
