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
	public static final String CANCELADO = "CANCELADO";
	private Long detalleId;
	private Agente agente;
	private Campana campana;
	private PuntoVenta puntoVenta;
	private Date fechaProgramada;
	private String estatus;
	private Boolean efectiva;
	
	public static final Comparator<CampanaDetalle> BY_ID = new Comparator<CampanaDetalle>() {
		@Override
		public int compare(CampanaDetalle o1, CampanaDetalle o2) {	
			return o1.detalleId.compareTo(o2.detalleId);
		}
	};
	
	public static final Comparator<CampanaDetalle> BY_SALDO = new Comparator<CampanaDetalle>() {
		@Override
		public int compare(CampanaDetalle o1, CampanaDetalle o2) {	
			return o1.puntoVenta.getSaldo().compareTo(o2.puntoVenta.getSaldo());
		}
	};
	
	public static final Comparator<CampanaDetalle> BY_AGENTE = new Comparator<CampanaDetalle>() {
		@Override
		public int compare(CampanaDetalle o1, CampanaDetalle o2) {	
			return o1.agente.getAgenteId().compareTo(o2.agente.getAgenteId());
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

	public Boolean getEfectiva() {
		return efectiva;
	}

	public void setEfectiva(Boolean efectiva) {
		this.efectiva = efectiva;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((campana == null) ? 0 : campana.hashCode());
		result = prime * result + ((puntoVenta == null) ? 0 : puntoVenta.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CampanaDetalle other = (CampanaDetalle) obj;
		if (campana == null) {
			if (other.campana != null)
				return false;
		} else if (!campana.equals(other.campana))
			return false;
		if (puntoVenta == null) {
			if (other.puntoVenta != null)
				return false;
		} else if (!puntoVenta.equals(other.puntoVenta))
			return false;
		return true;
	}

}
