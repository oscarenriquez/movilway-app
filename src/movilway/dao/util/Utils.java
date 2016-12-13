package movilway.dao.util;

import java.math.BigDecimal;
import java.util.Date;

public class Utils {

	public static <T extends Number> Integer  getIntegerValue(T value) {
		if (value != null)
			return value.intValue();
		return 0;
	}
	
	public static <T extends Number> Long  getLongValue(T value) {
		if (value != null)
			return value.longValue();
		return 0L;
	}
	
	public static <T extends Number> BigDecimal  getBigDecimalValue(T value) {
		if (value != null)
			return new BigDecimal(value.doubleValue()) ;
		return new BigDecimal(0D);
	}
	
	public static <T extends Number> Double  getDoubleValue(T value) {
		if (value != null)
			return value.doubleValue() ;
		return 0D;
	}
	
	@SuppressWarnings("unchecked")
	public static <T extends Number> T  getValue(Object value) {
		if (value != null){
			try {
				return (T) value;
			} catch (ClassCastException cce ){
				return null;
			} catch (Exception e){
				return null;
			}
		}
		return null;
	}
	
	public static String  getStringValue(Object value) {
		if (value != null){
			try {
				return (String) value;
			} catch (ClassCastException cce ){
				return "";
			} catch (Exception e){
				return "";
			}
		}
		return "";
	}
	
	public static Date  getDateValue(Object value) {
		if (value != null){
			try {
				return (Date) value;
			} catch (ClassCastException cce ){
				return null;
			} catch (Exception e){
				return null;
			}
		}
		return null;
	}
}
