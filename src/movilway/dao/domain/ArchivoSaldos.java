package movilway.dao.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@SuppressWarnings("serial")
public class ArchivoSaldos implements Serializable {

	public static final String XLS = ".xls";
	public static final String XLSX = ".xlsx";
	private Long archivosaldosId;
	private Long empresaId;
	private byte[] archivo;
	private String nombreArchivo;
	private Integer numLinea;
	private String texto;
	private Date fechahoraCarga;
	private String usuarioCarga;
	private Set<HistoricoSaldos> setSaldos;
	
	public Long getId() {
		return this.archivosaldosId;
	}
	
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

	public Set<HistoricoSaldos> getSetSaldos() {
		return setSaldos;
	}

	public void setSetSaldos(Set<HistoricoSaldos> setSaldos) {
		this.setSaldos = setSaldos;
	}

	public void addHistoricoSaldos (HistoricoSaldos historicoSaldos) {
		if(setSaldos == null) {
			setSaldos = new HashSet<>();
		}
		
		historicoSaldos.setArchivoSaldos(this);
		setSaldos.add(historicoSaldos);
	}
}
