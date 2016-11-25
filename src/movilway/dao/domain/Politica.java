package movilway.dao.domain;

import java.io.Serializable;

@SuppressWarnings("serial")
public class Politica implements Serializable {

	private Long politicaId;
	private TipoCampana tipoCampana;
	private Integer numLinea;
	private String texto;
	private Boolean estatus;
	
	public Long getId() {
		return this.politicaId;
	}
	
	public Long getPoliticaId() {
		return this.politicaId;
	}

	public void setPoliticaId(Long politicaId) {
		this.politicaId = politicaId;
	}

	public TipoCampana getTipoCampana() {
		return this.tipoCampana;
	}

	public void setTipoCampana(TipoCampana tipoCampana) {
		this.tipoCampana = tipoCampana;
	}

	public Integer getNumLinea() {
		return this.numLinea;
	}

	public void setNumLinea(Integer numLinea) {
		this.numLinea = numLinea;
	}

	public String getTexto() {
		return this.texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public Boolean getEstatus() {
		return this.estatus;
	}

	public void setEstatus(Boolean estatus) {
		this.estatus = estatus;
	}

}
