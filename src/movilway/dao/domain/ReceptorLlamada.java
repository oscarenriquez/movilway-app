package movilway.dao.domain;

import java.io.Serializable;
import java.util.Set;

@SuppressWarnings("serial")
public class ReceptorLlamada implements Serializable {

	private Long receptorId;
	private Long empresaId;
	private String descripcion;
	private String abrev;
	private Boolean estatus;
	private Set<Llamada> llamadas;

	public Long getId() {
		return this.receptorId;
	}
	
	public Long getReceptorId() {
		return this.receptorId;
	}

	public void setReceptorId(Long receptorId) {
		this.receptorId = receptorId;
	}

	public Long getEmpresaId() {
		return this.empresaId;
	}

	public void setEmpresaId(Long empresaId) {
		this.empresaId = empresaId;
	}

	public String getDescripcion() {
		return this.descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getAbrev() {
		return this.abrev;
	}

	public void setAbrev(String abrev) {
		this.abrev = abrev;
	}

	public Boolean getEstatus() {
		return this.estatus;
	}

	public void setEstatus(Boolean estatus) {
		this.estatus = estatus;
	}

	public Set<Llamada> getLlamadas() {
		return this.llamadas;
	}

	public void setLlamadas(Set<Llamada> llamadas) {
		this.llamadas = llamadas;
	}

}
