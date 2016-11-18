package movilway.dao.domain;

import java.io.Serializable;
import java.util.Set;

@SuppressWarnings("serial")
public class Agente implements Serializable {

	private Long agenteId;
	private TipoAgente tipoAgente;
	private String nombre;
	private Boolean estatus;
	private Set<CampanaDetalle> campanaDetalles;

	public Long getAgenteId() {
		return this.agenteId;
	}

	public void setAgenteId(Long agenteId) {
		this.agenteId = agenteId;
	}

	public TipoAgente getTipoAgente() {
		return this.tipoAgente;
	}

	public void setTipoAgente(TipoAgente tipoAgente) {
		this.tipoAgente = tipoAgente;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Boolean getEstatus() {
		return this.estatus;
	}

	public void setEstatus(Boolean estatus) {
		this.estatus = estatus;
	}

	public Set<CampanaDetalle> getCampanaDetalles() {
		return this.campanaDetalles;
	}

	public void setCampanaDetalles(Set<CampanaDetalle> campanaDetalles) {
		this.campanaDetalles = campanaDetalles;
	}

}
