package movilway.service.util;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ReporteExcel {

	private String archivoSalida;
	private XSSFWorkbook workbookBase;
	private XSSFCellStyle estiloDefault;
	private XSSFCellStyle estiloDate;

	public ReporteExcel() {

	}		

	public void creaEncabezadoReporte(String archivoBase, String archivoSalida, String empresa, String usuario, String subtitulo) throws IOException {
		this.archivoSalida = archivoSalida;

		XSSFWorkbook wbBase = null;

		if ((archivoBase != null) && !archivoBase.isEmpty()) {
			wbBase = leeWorkbook(archivoBase);
		}

		if (wbBase == null) {
			wbBase = new XSSFWorkbook();
		}

		// Si no tiene hoja 0, creemosla
		XSSFSheet xssf_hoja = null;
		
		try {
			xssf_hoja = wbBase.getSheetAt(0);
		} catch (Exception unused) {}

		if (xssf_hoja == null) {
			xssf_hoja = wbBase.createSheet("Hoja 1");
		}

		workbookBase = wbBase;
		valorCelda(xssf_hoja, 2, (short) 0, empresa);
		valorCelda(xssf_hoja, 4, (short) 0, "Fecha de Reporte: " + FechaHoraUtil.getStringDate(new Date()));		
		valorCelda(xssf_hoja, 5, (short) 0, "Generado por: " + usuario);
		valorCelda(xssf_hoja, 5, (short) 2, subtitulo);

		escribeWorkbook(wbBase, archivoSalida);
	}

	public void cargarDataReporte(List<Map<String, Object>> fuente, String[] columnas, boolean cabeceras, int filaInicial, short colInicial) throws IOException {
		XSSFSheet xssf_hoja = workbookBase.getSheetAt(0);

		// Columnas
		Set<String> setDatos = fuente.get(0).keySet();
		List<String> listaString = new ArrayList<String>(setDatos);
		Collections.sort(listaString);
		int i;
		int cantCols = listaString.size();

		// Siempre entra aqui 
		if (columnas == null) {
			columnas = new String[cantCols];
			Iterator<String> iterkey = listaString.iterator();

			for (i = 0; iterkey.hasNext(); i++) {
				columnas[i] = iterkey.next();
			}
		} else {
			cantCols = Math.min(cantCols, columnas.length);
		}

		filaInicial = Math.max(filaInicial, 0);
		colInicial = (short) Math.max(colInicial, 0);

		// Obtengamos estilos
		XSSFCellStyle[] estilosCeldas = new XSSFCellStyle[cantCols];
		short columna;
		for (columna = 0; columna < cantCols; columna++) {
			estilosCeldas[columna] = celda(xssf_hoja, filaInicial, (short) (colInicial + columna)).getCellStyle();
		}

		// Hay que poner cabeceras?
		int fila = filaInicial;
		if (cabeceras) {
			XSSFFont f = workbookBase.createFont();
			XSSFCellStyle e = workbookBase.createCellStyle();
			f.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);
			e.setFont(f);
			for (columna = 0; columna < cantCols; columna++) {
				valorCelda(xssf_hoja, fila, (short) (colInicial + columna), columnas[columna], e);
			}

			fila++;
		}

		// Pongamos datos...
		XSSFDataFormat df = workbookBase.createDataFormat();		
		// short formato;
		Object valor;
		Iterator<Map<String, Object>> iterfuente = fuente.iterator();
		
		while (iterfuente.hasNext()) {
			columna = colInicial;
			Map<String, Object> mapa = iterfuente.next();				
			
			for (i = 0; i < 23; i++) {
				valor = mapa.get(getLlaveXColumna(i));
				// Si es fecha y tiene formato general,
				// creemos un nuevo estilo
				if ((valor instanceof java.util.Date)) {
					estilosCeldas[i] = getEstiloCeldaDate(df);
				}

				valorCelda(xssf_hoja, fila, columna, valor, estilosCeldas[i]);
				columna++;
			}

			fila++;
		}

		escribeWorkbook(workbookBase, archivoSalida);

		workbookBase = null;
	}	

	private XSSFWorkbook leeWorkbook(String nombre) throws IOException {
		XSSFWorkbook wb = null;
		FileInputStream s = new FileInputStream(nombre);

		try {
			wb = new XSSFWorkbook(s);
		} finally {
			s.close();
			s = null;
		}

		return wb;
	}

	private void escribeWorkbook(XSSFWorkbook wb, String nombre) throws IOException {
		FileOutputStream s = new FileOutputStream(nombre);

		try {
			wb.write(s);
		} finally {
			s.close();
			s = null;
		}
	}

	// Si no existe la fila y la celda, la crea...
	private XSSFCell celda(XSSFSheet hoja, int fila, short columna) {
		fila = Math.max(fila, 0);
		columna = (short) Math.max(columna, 0);

		XSSFRow xssf_fila = hoja.getRow(fila);

		if (xssf_fila == null) {
			xssf_fila = hoja.createRow(fila);
		}

		XSSFCell xssf_celda = xssf_fila.getCell(columna);
		if (xssf_celda == null) {
			xssf_celda = xssf_fila.createCell(columna);
		}

		if ((fila > 7) && (columna < 26)) {
			XSSFCellStyle estilo = getEstiloCeldaDefault();
			xssf_celda.setCellStyle(estilo);
		}

		return xssf_celda;
	}

	private String getLlaveXColumna(int columna) {
		String key = "";

		switch (columna) {
			case 0:
				key = "puntoVentaId";
				break;
			case 1:
				key = "telefono";
				break;
			case 2:
				key = "descripcion";
				break;
			case 3:
				key = "nivel";
				break;
			case 4:
				key = "paisId";
				break;
			case 5:
				key = "paisAbrev";
				break;
			case 6:
				key = "estadoId";
				break;
			case 7:
				key = "estadoAbrev";
				break;	
			case 8:
				key = "provinciaId";
				break;
			case 9:
				key = "provinciaAbrev";
				break;
			case 10:
				key = "provinciaDescr";
				break;
			case 11:
				key = "regionId";
				break;
			case 12:
				key = "regionAbrev";
				break;
			case 13:
				key = "direccion";
				break;
			case 14:
				key = "saldo";
				break;
			case 15:
				key = "saldoFechaHora";
				break;
			case 16:
				key = "puntoAbastecimiento";
				break;
			case 17:
				key = "latitud";
				break;
			case 18:
				key = "longitud";
				break;
			case 19:
				key = "puntoVentaIdPadre";
				break;
			case 20:
				key = "telefonoPadre";
				break;
			case 21:
				key = "descripcionPadre";
				break;
			case 22:
				key = "nivelPadre";
				break;			
		}

		return key;
	}

	private XSSFCellStyle getEstiloCeldaDefault() {
		if(estiloDefault == null) {
			estiloDefault = workbookBase.createCellStyle();
			estiloDefault.setBorderBottom(XSSFCellStyle.BORDER_THIN);
			estiloDefault.setBottomBorderColor((short) 8);
			estiloDefault.setBorderLeft(XSSFCellStyle.BORDER_THIN);
			estiloDefault.setLeftBorderColor((short) 8);
			estiloDefault.setBorderRight(XSSFCellStyle.BORDER_THIN);
			estiloDefault.setRightBorderColor((short) 8);
			estiloDefault.setBorderTop(XSSFCellStyle.BORDER_THIN);
			estiloDefault.setTopBorderColor((short) 8);
		}

		return estiloDefault;
	}
	
	private XSSFCellStyle getEstiloCeldaDate(XSSFDataFormat df) {
		if(estiloDate == null) {
			estiloDate = workbookBase.createCellStyle();
			estiloDate.setBorderBottom(XSSFCellStyle.BORDER_THIN);
			estiloDate.setBottomBorderColor((short) 8);
			estiloDate.setBorderLeft(XSSFCellStyle.BORDER_THIN);
			estiloDate.setLeftBorderColor((short) 8);
			estiloDate.setBorderRight(XSSFCellStyle.BORDER_THIN);
			estiloDate.setRightBorderColor((short) 8);
			estiloDate.setBorderTop(XSSFCellStyle.BORDER_THIN);
			estiloDate.setTopBorderColor((short) 8);
			estiloDate.setDataFormat(df.getFormat("dd/mm/yyyy hh:mm:ss"));
		}

		return estiloDate;
	}

	private void valorCelda(XSSFSheet hoja, int fila, short columna, Object valor, XSSFCellStyle estilo) {
		XSSFCell xssf_celda = celda(hoja, fila, columna);

		if (estilo != null) {
			xssf_celda.setCellStyle(estilo);
		}

		if (valor == null) {
			return;
		}

		if (valor instanceof Number) {
			xssf_celda.setCellValue(((Number) valor).doubleValue());
		} else if (valor instanceof Boolean) {
			xssf_celda.setCellValue(((Boolean) valor).booleanValue());
		} else if (valor instanceof java.util.Date) {
			xssf_celda.setCellValue((java.util.Date) valor);
		} else {
			xssf_celda.setCellValue(valor.toString());
		}
	}

	private void valorCelda(XSSFSheet hoja, int fila, short columna, Object valor) {
		valorCelda(hoja, fila, columna, valor, null);
	}
}
