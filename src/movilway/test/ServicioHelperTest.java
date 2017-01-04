package movilway.test;

public class ServicioHelperTest {

	public static void main(String[] args) {
		StringBuilder hola = new StringBuilder();
		hola.append("hola, ");
		hola.delete(hola.length() - 3, hola.length() -1);
		
		System.out.println(hola.toString());
		
	}
}
