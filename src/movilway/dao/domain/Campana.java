package movilway.dao.domain;

import java.io.Serializable;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@SuppressWarnings("serial")
public class Campana implements Serializable {

	public static final String EN_ESPERA = "EN ESPERA";
	public static final String ASIGNADA = "ASIGNADA";	
	public static final String COMPLETADO = "COMPLETADO";	
	private Long campanaId;
	private TipoCampana tipoCampana;
	private Date fechahoraInicio;
	private String observaciones;
	private String estatus;
	private Long userId;
	private Date fechahoraFin;
	private Set<CampanaDetalle> campanaDetalles;
	
	public static final Comparator<Campana> BY_DATE = new Comparator<Campana>() {
		@Override
		public int compare(Campana o1, Campana o2) {	
			return o1.fechahoraInicio.compareTo(o2.fechahoraFin);
		}
	};
	
	public Long getId() {
		return this.campanaId;
	}
	
	public Long getCampanaId() {
		return this.campanaId;
	}

	public void setCampanaId(Long campanaId) {
		this.campanaId = campanaId;
	}

	public TipoCampana getTipoCampana() {
		return this.tipoCampana;
	}

	public void setTipoCampana(TipoCampana tipoCampana) {
		this.tipoCampana = tipoCampana;
	}

	public Date getFechahoraInicio() {
		return this.fechahoraInicio;
	}

	public void setFechahoraInicio(Date fechahoraInicio) {
		this.fechahoraInicio = fechahoraInicio;
	}

	public String getObservaciones() {
		return this.observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public String getEstatus() {
		return this.estatus;
	}

	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}

	public Long getUserId() {
		return this.userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Date getFechahoraFin() {
		return this.fechahoraFin;
	}

	public void setFechahoraFin(Date fechahoraFin) {
		this.fechahoraFin = fechahoraFin;
	}

	public Set<CampanaDetalle> getCampanaDetalles() {
		return this.campanaDetalles;
	}

	public void setCampanaDetalles(Set<CampanaDetalle> campanaDetalles) {
		this.campanaDetalles = campanaDetalles;
	}
	
	public void addCampanaDetalle(CampanaDetalle campanaDetalle) {
		if(campanaDetalles == null) {
			campanaDetalles = new HashSet<>();
		}
		
		campanaDetalle.setCampana(this);
		campanaDetalles.add(campanaDetalle);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((campanaId == null) ? 0 : campanaId.hashCode());
		result = prime * result + ((estatus == null) ? 0 : estatus.hashCode());
		result = prime * result + ((fechahoraFin == null) ? 0 : fechahoraFin.hashCode());
		result = prime * result + ((fechahoraInicio == null) ? 0 : fechahoraInicio.hashCode());
		result = prime * result + ((observaciones == null) ? 0 : observaciones.hashCode());
		result = prime * result + ((tipoCampana == null) ? 0 : tipoCampana.hashCode());
		result = prime * result + ((userId == null) ? 0 : userId.hashCode());
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
		Campana other = (Campana) obj;
		if (campanaId == null) {
			if (other.campanaId != null)
				return false;
		} else if (!campanaId.equals(other.campanaId))
			return false;
		if (estatus == null) {
			if (other.estatus != null)
				return false;
		} else if (!estatus.equals(other.estatus))
			return false;
		if (fechahoraFin == null) {
			if (other.fechahoraFin != null)
				return false;
		} else if (!fechahoraFin.equals(other.fechahoraFin))
			return false;
		if (fechahoraInicio == null) {
			if (other.fechahoraInicio != null)
				return false;
		} else if (!fechahoraInicio.equals(other.fechahoraInicio))
			return false;
		if (observaciones == null) {
			if (other.observaciones != null)
				return false;
		} else if (!observaciones.equals(other.observaciones))
			return false;
		if (tipoCampana == null) {
			if (other.tipoCampana != null)
				return false;
		} else if (!tipoCampana.equals(other.tipoCampana))
			return false;
		if (userId == null) {
			if (other.userId != null)
				return false;
		} else if (!userId.equals(other.userId))
			return false;
		return true;
	} 

	
}
