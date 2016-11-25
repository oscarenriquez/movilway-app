package movilway.dao.domain;

import java.io.Serializable;

@SuppressWarnings("serial")
public class CampanaDetalle implements Serializable {

	private Long detalleId;
	private Agente agente;
	private Campana campana;
	private PuntoVenta puntoVenta;
	private String estatus;
	
	public Long getId() {
		return this.detalleId;
	}
	
	public Long getDetalleId() {
		return this.detalleId;
	}

	public void setDetalleId(Long detalleId) {
		this.detalleId = detalleId;
	}

	public Agente getAgente() {
		return this.agente;
	}

	public void setAgente(Agente agente) {
		this.agente = agente;
	}

	public Campana getCampana() {
		return this.campana;
	}

	public void setCampana(Campana campana) {
		this.campana = campana;
	}

	public PuntoVenta getPuntoVenta() {
		return puntoVenta;
	}

	public void setPuntoVenta(PuntoVenta puntoVenta) {
		this.puntoVenta = puntoVenta;
	}

	public String getEstatus() {
		return this.estatus;
	}

	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}

}
