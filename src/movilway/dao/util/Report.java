package movilway.dao.util;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.Serializable;
import java.sql.Connection;
import java.util.Map;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperPrintManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.export.JRXlsAbstractExporterParameter;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;
import net.sf.jasperreports.engine.util.JRLoader;

public class Report implements Serializable {

	private static final long serialVersionUID = 1L;
	private JasperReport reporte;
    private JasperPrint print;
    private byte[] arrayBytes;
    
    public Report() {
		super();
	}



	/**
     * Exportar reporte a axcel
     * 
     * @param rutaJrxml
     * @param rutaArchivoXLS
     * @param parametros
     * @param conexion
     * @throws JRException
     * @throws FileNotFoundException 
     */
    public void reporteExcelImpresion(InputStream rutaJrxml, String rutaArchivoXLS, Map<String, Object> parametros, Connection conexion) throws JRException, FileNotFoundException {
        this.reporte = JasperCompileManager.compileReport(rutaJrxml);

        //luego ponemos los parametros que necesitamos:  
        print = JasperFillManager.fillReport(this.reporte, parametros, conexion);
        JRXlsExporter exportador = new JRXlsExporter();
        exportador.setParameter(JRExporterParameter.JASPER_PRINT, print);
        exportador.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, rutaArchivoXLS);
        exportador.setParameter(JRExporterParameter.IGNORE_PAGE_MARGINS, true);
        exportador.setParameter(JRXlsAbstractExporterParameter.IS_WHITE_PAGE_BACKGROUND, false);
        exportador.setParameter(JRXlsAbstractExporterParameter.IS_IGNORE_CELL_BORDER, false);
        exportador.setParameter(JRXlsAbstractExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_COLUMNS, true);
        exportador.setParameter(JRXlsExporterParameter.IS_DETECT_CELL_TYPE, true);
        exportador.setParameter(JRXlsExporterParameter.IS_FONT_SIZE_FIX_ENABLED, true);
        exportador.exportReport();
    }
    
    /**
     * Metodo para generar el reporte en pdf si que se puedan copiar las imagenes ni el texto  
     * 
     * @param dataSourceName
     * @param params
     * @param conn
     * @return
     * @throws ClassNotFoundException
     * @throws JRException 
     */
    
    @SuppressWarnings("rawtypes")
	public JasperPrint jasperReportView(InputStream dataSourceName, Map<String, Comparable> params, Connection conn) throws ClassNotFoundException, JRException {
        this.reporte = (JasperReport) JRLoader.loadObject(dataSourceName);
        this.print = JasperFillManager.fillReport(this.reporte, params, conn);

        if (this.print.getPages().isEmpty()) {
            return this.print;
        }
        return this.print;
    }
    
    @SuppressWarnings("rawtypes")
	public byte[] jasperReportPDF(InputStream dataSourceName, Map<String, Comparable> params, Connection conn) throws ClassNotFoundException, JRException {
        this.reporte = (JasperReport) JRLoader.loadObject(dataSourceName);
        this.arrayBytes = JasperRunManager.runReportToPdf(this.reporte, params, conn);
        return this.arrayBytes;
    }
     
    @SuppressWarnings("rawtypes")
	public boolean jasperReport(InputStream dataSourceName, Map<String, Comparable> params, Connection conn) throws ClassNotFoundException, JRException {
        this.reporte = (JasperReport) JRLoader.loadObject(dataSourceName);
        this.print = JasperFillManager.fillReport(this.reporte, params, conn);

        if (this.print.getPages().isEmpty()) {
            return false;
        }

        //Medoto que se encarga de imprimir directamente
        JasperPrintManager.printReport(this.print, false);
        //jrViewer = new JasperViewer(this.print, true); 
        
        return true;
    }
    
    @SuppressWarnings("rawtypes")
	public boolean jasperReport(InputStream dataSourceName, Map<String, Comparable> params) throws ClassNotFoundException, JRException {
        this.reporte = (JasperReport) JRLoader.loadObject(dataSourceName);
        this.print = JasperFillManager.fillReport(this.reporte, params);

        if (this.print.getPages().isEmpty()) {
            return false;
        }

        //Medoto que se encarga de imprimir directamente
        JasperPrintManager.printReport(this.print, false);
        //jrViewer = new JasperViewer(this.print, true); 
        return true;
    }
}
