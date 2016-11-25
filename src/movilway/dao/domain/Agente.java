package movilway.dao.domain;

import java.io.Serializable;

@SuppressWarnings("serial")
public class Agente implements Serializable {

	private Long agenteId;
	private TipoAgente tipoAgente;
	private String nombre;
	private Boolean estatus;	

	public Long getId() {
		return this.agenteId;
	}
	
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

}
