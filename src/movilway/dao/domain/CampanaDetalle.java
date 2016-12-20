package movilway.dao.domain;

import java.io.Serializable;
import java.util.Comparator;
import java.util.Date;

@SuppressWarnings("serial")
public class CampanaDetalle implements Serializable {

	public static final String EN_ESPERA = "EN ESPERA";
	public static final String ASIGNADA = "ASIGNADA";
	public static final String LLAMADA_ENCURSO = "LLAMADA EN CURSO";
	public static final String COMPLETADO = "COMPLETADO";
	private Long detalleId;
	private Agente agente;
	private Campana campana;
	private PuntoVenta puntoVenta;
	private Date fechaProgramada;
	private String estatus;
	
	public static final Comparator<CampanaDetalle> BY_ID = new Comparator<CampanaDetalle>() {
		@Override
		public int compare(CampanaDetalle o1, CampanaDetalle o2) {	
			return o1.detalleId.compareTo(o2.detalleId);
		}
	};
	
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

	public Date getFechaProgramada() {
		return fechaProgramada;
	}

	public void setFechaProgramada(Date fechaProgramada) {
		this.fechaProgramada = fechaProgramada;
	}

	public String getEstatus() {
		return this.estatus;
	}

	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}

}
