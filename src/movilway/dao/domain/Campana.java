package movilway.dao.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@SuppressWarnings("serial")
public class Campana implements Serializable {

	private Long campanaId;
	private TipoCampana tipoCampana;
	private Date fechahoraInicio;
	private String observaciones;
	private String estatus;
	private Long userId;
	private Date fechahoraFin;
	private Set<CampanaDetalle> campanaDetalles;
	
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

}
