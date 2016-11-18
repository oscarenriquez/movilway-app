package movilway.dao.domain;

import java.io.Serializable;
import java.util.Set;

@SuppressWarnings("serial")
public class RespuestaLlamada implements Serializable {

	private Long respuestaId;
	private Long empresaId;
	private String descripcion;
	private String abrev;
	private Boolean estatus;
	private Boolean efectiva;
	private Boolean generaLlamada;
	private Set<Llamada> llamadas;

	public Long getRespuestaId() {
		return this.respuestaId;
	}

	public void setRespuestaId(Long respuestaId) {
		this.respuestaId = respuestaId;
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

	public Boolean getEfectiva() {
		return this.efectiva;
	}

	public void setEfectiva(Boolean efectiva) {
		this.efectiva = efectiva;
	}

	public Boolean getGeneraLlamada() {
		return this.generaLlamada;
	}

	public void setGeneraLlamada(Boolean generaLlamada) {
		this.generaLlamada = generaLlamada;
	}

	public Set<Llamada> getLlamadas() {
		return this.llamadas;
	}

	public void setLlamadas(Set<Llamada> llamadas) {
		this.llamadas = llamadas;
	}

}
