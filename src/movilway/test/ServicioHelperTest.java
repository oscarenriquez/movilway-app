package movilway.test;

import movilway.view.helper.ServicioHelper;

public class ServicioHelperTest {

	public static void main(String[] args) {
		ServicioHelper servicioHelper = new ServicioHelper();
		
		String string = servicioHelper.getStringValue("ABY/HILMA OROZCO");
		String boolea = servicioHelper.getBooleanValue("tRUE  a");
		String number = servicioHelper.getNumberValue("111615");
		System.out.println(string);
		System.out.println(boolea);
		System.out.println(number);
		
	}
}
