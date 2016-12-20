package movilway.dao.domain;

import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class Llamada implements Serializable {

	private LlamadaId id;
	private Long empresaId;
	private ReceptorLlamada receptorLlamada;
	private RespuestaLlamada respuestaLlamada;
	private Date fechahoraInicio;
	private Date fechahoraFin;
	private String comentarios;
	private Integer telefonoLlamado;
	private String referencia;
	
	public LlamadaId getId() {
		return this.id;
	}

	public void setId(LlamadaId id) {
		this.id = id;
	}	
	
	public Long getEmpresaId() {
		return empresaId;
	}

	public void setEmpresaId(Long empresaId) {
		this.empresaId = empresaId;
	}

	public ReceptorLlamada getReceptorLlamada() {
		return this.receptorLlamada;
	}

	public void setReceptorLlamada(ReceptorLlamada receptorLlamada) {
		this.receptorLlamada = receptorLlamada;
	}

	public RespuestaLlamada getRespuestaLlamada() {
		return this.respuestaLlamada;
	}

	public void setRespuestaLlamada(RespuestaLlamada respuestaLlamada) {
		this.respuestaLlamada = respuestaLlamada;
	}

	public Date getFechahoraInicio() {
		return this.fechahoraInicio;
	}

	public void setFechahoraInicio(Date fechahoraInicio) {
		this.fechahoraInicio = fechahoraInicio;
	}

	public Date getFechahoraFin() {
		return this.fechahoraFin;
	}

	public void setFechahoraFin(Date fechahoraFin) {
		this.fechahoraFin = fechahoraFin;
	}

	public String getComentarios() {
		return this.comentarios;
	}

	public void setComentarios(String comentarios) {
		this.comentarios = comentarios;
	}

	public Integer getTelefonoLlamado() {
		return this.telefonoLlamado;
	}

	public void setTelefonoLlamado(Integer telefonoLlamado) {
		this.telefonoLlamado = telefonoLlamado;
	}

	public String getReferencia() {
		return this.referencia;
	}

	public void setReferencia(String referencia) {
		this.referencia = referencia;
	}

}
