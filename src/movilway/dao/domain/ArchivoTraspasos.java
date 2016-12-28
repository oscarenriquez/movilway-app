package movilway.dao.domain;

import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class ArchivoTraspasos implements Serializable {

	public static final String TXT  = ".txt";
	private Long archivotraspasosId;
	private Long empresaId;
	private byte[] archivo;
	private String nombreArchivo;
	private Integer numLinea;
	private String texto;
	private Date fechahoraCarga;
	private String usuarioCarga;

	public Long getId() {
		return this.archivotraspasosId;
	}
	
	public Long getArchivotraspasosId() {
		return this.archivotraspasosId;
	}

	public void setArchivotraspasosId(Long archivotraspasosId) {
		this.archivotraspasosId = archivotraspasosId;
	}

	public Long getEmpresaId() {
		return this.empresaId;
	}

	public void setEmpresaId(Long empresaId) {
		this.empresaId = empresaId;
	}

	public byte[] getArchivo() {
		return this.archivo;
	}

	public void setArchivo(byte[] archivo) {
		this.archivo = archivo;
	}

	public String getNombreArchivo() {
		return nombreArchivo;
	}

	public void setNombreArchivo(String nombreArchivo) {
		this.nombreArchivo = nombreArchivo;
	}

	public Integer getNumLinea() {
		return this.numLinea;
	}

	public void setNumLinea(Integer numLinea) {
		this.numLinea = numLinea;
	}

	public String getTexto() {
		return this.texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public Date getFechahoraCarga() {
		return this.fechahoraCarga;
	}

	public void setFechahoraCarga(Date fechahoraCarga) {
		this.fechahoraCarga = fechahoraCarga;
	}

	public String getUsuarioCarga() {
		return this.usuarioCarga;
	}

	public void setUsuarioCarga(String usuarioCarga) {
		this.usuarioCarga = usuarioCarga;
	}

}
