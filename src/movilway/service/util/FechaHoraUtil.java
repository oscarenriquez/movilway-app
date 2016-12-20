package movilway.service.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public final class FechaHoraUtil {

	public static final Locale LOCAL = new Locale("es", "ES");

	public static final Date getFechaDateMonth(String fecha) {
		SimpleDateFormat sdf = new SimpleDateFormat("MM/yyyy");
		Date fechaFormat = null;
		try {
			fechaFormat = sdf.parse(fecha);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return fechaFormat;
	}

	public static final Date getDateOfTime(String time) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		Date fecha = null;
		try {
			fecha = sdf.parse(time);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return fecha;
	}

	public static final Date getLastDayOfMonth(Date fecha) {
		Calendar now = Calendar.getInstance();

		now.setTime(fecha);
		now.set(Calendar.DAY_OF_MONTH, now.getActualMaximum(Calendar.DAY_OF_MONTH));

		return now.getTime();
	}

	public static final Date getFirstDayOfMonth(Date fecha) {
		Calendar now = Calendar.getInstance();

		now.setTime(fecha);
		now.set(Calendar.DAY_OF_MONTH, 1);

		return now.getTime();
	}

	public static final String getLastDayOfMonth() {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Calendar now = Calendar.getInstance();
		now.set(Calendar.DAY_OF_MONTH, now.getActualMaximum(Calendar.DAY_OF_MONTH));
		return sdf.format(now.getTime());
	}

	public static final String getToday() {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Calendar now = Calendar.getInstance();
		return sdf.format(now.getTime());
	}
	
	public static final String getFechaStringLarga(Date fecha) {		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		return sdf.format(fecha.getTime());
	}

	public static final String getTime(Calendar fecha) {
		int horas = fecha.get(Calendar.HOUR_OF_DAY);
		int minutos = fecha.get(Calendar.MINUTE);
		int segundos = fecha.get(Calendar.SECOND);

		StringBuilder sb = new StringBuilder();
		sb.append(horas).append(":");
		if (String.valueOf(minutos).length() == 1) {
			sb.append("0").append(minutos).append(":");
		} else {
			sb.append(minutos).append(":");
		}

		if (String.valueOf(segundos).length() == 1) {
			sb.append("0").append(segundos);
		} else {
			sb.append(segundos);
		}

		return sb.toString();
	}

	public static final String getStringDate(Date fecha) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		return sdf.format(fecha);
	}

	public static final Date getDate(Calendar fecha) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Calendar nuevaFecha = Calendar.getInstance();

		try {
			nuevaFecha.setTime(sdf.parse(sdf.format(fecha.getTime())));
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return nuevaFecha.getTime();
	}

	public static final Date getParseDate(String fecha) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Calendar nuevaFecha = Calendar.getInstance();
		Date result = null;
		if ((fecha != null) && !fecha.isEmpty()) {
			try {
				nuevaFecha.setTime(sdf.parse(fecha));
				result = new Date(nuevaFecha.getTime().getTime());
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	public static final String getParseDate(Date fecha) {
		String result = "";
		if (fecha != null) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				result = sdf.format(fecha);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	public static final Date getParseDateLong(String fecha) {
		Date result = null;
		if (fecha != null && !fecha.isEmpty()) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
				result = sdf.parse(fecha);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}
	
	public static final String getFormatDateLong(Date fecha) {
		String result = "";
		if (fecha != null) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
				result = sdf.format(fecha);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	public static final String getFechaLarga(Calendar fecha) {
		SimpleDateFormat sdf = new SimpleDateFormat("EEEE, dd/MM/yyyy HH:mm:ss", LOCAL);
		String fechaConFormato = sdf.format(fecha.getTime());
		return (fechaConFormato.substring(0, 1).toUpperCase() + fechaConFormato.substring(1));
	}

	public static final Date getFechaString(String fecha) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date fechaFormat = null;
		try {
			fechaFormat = sdf.parse(fecha);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return fechaFormat;
	}

	public static final String getFechaString(Date fecha) {
		SimpleDateFormat sdf = new SimpleDateFormat("ddMMyyyy");
		Calendar nuevaFecha = Calendar.getInstance();

		try {
			nuevaFecha.setTime(sdf.parse(sdf.format(fecha)));
		} catch (ParseException e) {
			e.printStackTrace();
		}

		sdf = new SimpleDateFormat("dd/MM/yyyy");

		return sdf.format(nuevaFecha.getTime());
	}

	public static final String getHoraFormateada(Integer hora) {
		StringBuilder sb = new StringBuilder();
		if (hora.toString().length() == 1) {
			sb.append("0").append(hora).append(":00");
		} else {
			sb.append(hora).append(":00");
		}

		return sb.toString();
	}

	public static final String getMediaHoraFormateada(Integer hora) {
		StringBuilder sb = new StringBuilder();
		if (hora.toString().length() == 1) {
			sb.append("0").append(hora).append(":30");
		} else {
			sb.append(hora).append(":30");
		}

		return sb.toString();
	}

	public static final String getHoraFormateada(String hora) {
		StringBuilder sb = new StringBuilder();
		if (hora.length() == 1) {
			sb.append("0").append(hora).append(":00");
		} else {
			sb.append(hora).append(":00");
		}

		return sb.toString();
	}

	public static final String getMediaHoraFormateada(String hora) {
		StringBuilder sb = new StringBuilder();
		if (hora.length() == 1) {
			sb.append("0").append(hora).append(":30");
		} else {
			sb.append(hora).append(":30");
		}

		return sb.toString();
	}

	public static final String calculaTiempoAtencion(String horaAtencion, String horaFin) {
		int hh, mm, ss, tt = 0;

		if ((horaFin != null) && !horaFin.isEmpty()) {
			String[] hora = horaFin.split(":");

			hh = Integer.parseInt(hora[0]);
			mm = Integer.parseInt(hora[1]);
			ss = Integer.parseInt(hora[2]);
			tt = (hh * 3600) + (mm * 60) + ss;
		} else {
			Calendar horaActual = Calendar.getInstance();

			hh = horaActual.get(Calendar.HOUR_OF_DAY);
			mm = horaActual.get(Calendar.MINUTE);
			ss = horaActual.get(Calendar.SECOND);
			tt = (hh * 3600) + (mm * 60) + ss;
		}

		int hhh = 0, mmm = 0, sss = 0, ttt = 0;

		if ((horaAtencion != null) && !horaAtencion.isEmpty()) {
			String[] horas = horaAtencion.split(":");

			hhh = Integer.parseInt(horas[0]);
			mmm = Integer.parseInt(horas[1]);
			sss = Integer.parseInt(horas[2]);
			ttt = (hhh * 3600) + (mmm * 60) + sss;
		}

		int diferencia = ttt - tt;
		int h = 0, m = 0, s = 0, t = 0;

		t = diferencia;
		if (t != 0) {
			if (t > 3599) {
				h = t / 3600;
				t %= t / 3600;
			}
			if (t > 59) {
				m = t / 60;
				s = t % 60;
			} else {
				s = t;
			}

		}

		StringBuilder sb = new StringBuilder();
		sb.append(h).append(":");
		if (String.valueOf(m).length() == 1) {
			sb.append("0").append(m).append(":");
		} else {
			sb.append(m).append(":");
		}

		if (String.valueOf(s).length() == 1) {
			sb.append("0").append(s);
		} else {
			sb.append(s);
		}

		return sb.toString();
	}

	public static final String calculaTiempoAtencion(int time1, int time2) {
		int diferencia = time2 - time1;
		int h = 0, m = 0, s = 0, t = 0;
		t = diferencia;
		if (t != 0) {
			if (t > 3599) {
				h = t / 3600;
				t %= t / 3600;
			}
			if (t > 59) {
				m = t / 60;
				s = t % 60;
			} else {
				s = t;
			}

		}
		StringBuilder sb = new StringBuilder();
		sb.append(h).append(":");
		if (String.valueOf(m).length() == 1) {
			sb.append("0").append(m).append(":");
		} else {
			sb.append(m).append(":");
		}

		if (String.valueOf(s).length() == 1) {
			sb.append("0").append(s);
		} else {
			sb.append(s);
		}

		return sb.toString();
	}

	public static final Date getFechaDate(String fecha) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date fechaFormat = null;
		try {
			fechaFormat = sdf.parse(fecha);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return fechaFormat;
	}

	public static final Date getFechaDateLarga(String fecha) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date fechaFormat = null;
		try {
			fechaFormat = sdf.parse(fecha);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return fechaFormat;
	}
	
	public static final String getDateFormatString(Date fecha) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

		return sdf.format(fecha);
	}
}
