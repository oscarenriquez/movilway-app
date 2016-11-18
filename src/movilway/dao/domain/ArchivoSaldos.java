package movilway.dao.domain;

import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class ArchivoSaldos implements Serializable {

	private Long archivosaldosId;
	private Long empresaId;
	private byte[] archivo;
	private Integer numLinea;
	private String texto;
	private Date fechahoraCarga;
	private String usuarioCarga;
	
	public Long getArchivosaldosId() {
		return this.archivosaldosId;
	}

	public void setArchivosaldosId(Long archivosaldosId) {
		this.archivosaldosId = archivosaldosId;
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
